from channels.generic.websocket import AsyncWebsocketConsumer
import json

class VideoCallConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Obtén el nombre de la sala desde los parámetros de la URL (por ejemplo, ws://localhost:8000/ws/call/sala1/)
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'video_call_%s' % self.room_name

        # Unirse al grupo de la sala
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Salir del grupo de la sala
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        # Obtener el mensaje JSON enviado desde el cliente
        data = json.loads(text_data)
        signal_type = data.get('type')
        signal_payload = data.get('payload')

        if signal_type == 'signal':
            # Reenviar la señal recibida a todos los miembros del grupo de la sala (excepto al remitente)
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'forward_signal',
                    'payload': signal_payload,
                    'sender_channel_name': self.channel_name
                }
            )

    async def forward_signal(self, event):
        # Enviar la señal recibida a todos los miembros del grupo de la sala (excepto al remitente original)
        signal_payload = event['payload']
        sender_channel_name = event['sender_channel_name']

        await self.send(text_data=json.dumps({
            'type': 'signal',
            'payload': signal_payload
        }), exclude=[sender_channel_name])
