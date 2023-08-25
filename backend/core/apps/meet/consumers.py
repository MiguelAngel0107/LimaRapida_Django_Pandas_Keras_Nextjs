from channels.generic.websocket import AsyncWebsocketConsumer
import json


class VideoCallConsumerChat(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name
        
        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data['message']
        username = data['username']
        room = data['room']

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'username': username
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']
        username = event['username']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'username': username
        }))



class VideoCallConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Obtén el nombre de la sala desde los parámetros de la URL (por ejemplo, ws://localhost:8000/ws/call/sala1/)
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'video_call_testing_%s' % self.room_name

        # Unirse al grupo de la sala
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

        await self.send(text_data=json.dumps({
            'type': 'connected',
            'idUser': self.channel_name,
            'name': self.room_name
        }))

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

        sdp = data.get('sdp')
        candidate = data.get('candidate')
        sdpMid = data.get('sdpMid')
        sdpMLineIndex = data.get('sdpMLineIndex')

        msg_client = data.get('msg')

        # print(data)
        # print("--------------------------")
        # print(signal_type)
        # print(sdp)
        # print(msg_client)

        if signal_type == 'send_offer':
            # Enviar la oferta recibida a todos los miembros del grupo de la sala (excepto al remitente)
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'forward_offer',
                    'sdp': sdp,
                    'sender_channel_name': self.channel_name
                }
            )
        elif signal_type == 'send_answer':
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'forward_answer',
                    'sdp': sdp,
                    'sender_channel_name': self.channel_name
                }
            )
        elif signal_type == 'send_ice_candidate':
            # Enviar el candidato recibido a todos los miembros del grupo de la sala (excepto al remitente)
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'forward_candidate',
                    'candidate': candidate,
                    'sdpMid': sdpMid,
                    'sdpMLineIndex': sdpMLineIndex,
                    'sender_channel_name': self.channel_name
                }
            )
        elif signal_type == 'renegotiation_offer':
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'forward_renegotiation_offer',
                    'sdp': sdp,
                    'receiver': msg_client,
                    'sender_channel_name': self.channel_name
                }
            )
        elif signal_type == 'renegotiation_answer':
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'forward_renegotiation_answer',
                    'sdp': sdp,
                    'receiver': msg_client,
                    'sender_channel_name': self.channel_name
                }
            )

    async def forward_offer(self, event):
        # Enviar la oferta recibida a todos los miembros del grupo de la sala (excepto al remitente original)
        sdp = event['sdp']
        sender_channel_name = event['sender_channel_name']

        if self.channel_name != sender_channel_name:
            await self.send(text_data=json.dumps({
                'type': 'offer',
                'sdp': sdp["sdp"],
                'idUser': sender_channel_name
            }))

    async def forward_answer(self, event):
        # Enviar la respuesta recibida a todos los miembros del grupo de la sala (excepto al remitente original)
        sdp = event['sdp']
        sender_channel_name = event['sender_channel_name']

        if self.channel_name != sender_channel_name:
            await self.send(text_data=json.dumps({
                'type': 'answer',
                'sdp': sdp["sdp"],
                'idUser': sender_channel_name
            }))

    async def forward_candidate(self, event):
        # Enviar el candidato recibido a todos los miembros del grupo de la sala (excepto al remitente original)
        candidate = event['candidate']
        sdpMid = event['sdpMid']
        sdpMLineIndex = event['sdpMLineIndex']
        sender_channel_name = event['sender_channel_name']

        if self.channel_name != sender_channel_name:
            await self.send(text_data=json.dumps({
                'type': 'candidate',
                'candidate': candidate,  # ["candidate"],
                'sdpMid': sdpMid,
                'sdpMLineIndex': sdpMLineIndex,
                'idUser': sender_channel_name
            }))

    async def forward_renegotiation_offer(self, event):
        # Enviar la oferta recibida a todos los miembros del grupo de la sala (excepto al remitente original)
        sdp = event['sdp']
        receiver = event['receiver']
        sender_channel_name = event['sender_channel_name']

        if self.channel_name != sender_channel_name:
            await self.send(text_data=json.dumps({
                'type': 're_offer',
                'sdp': sdp,
                'receiver': receiver,
                'idUser': sender_channel_name
            }))

    async def forward_renegotiation_answer(self, event):
        # Enviar la respuesta recibida a todos los miembros del grupo de la sala (excepto al remitente original)
        sdp = event['sdp']
        receiver = event['receiver']
        sender_channel_name = event['sender_channel_name']

        if self.channel_name != sender_channel_name:
            await self.send(text_data=json.dumps({
                'type': 're_answer',
                'sdp': sdp,
                'receiver': receiver,
                'idUser': sender_channel_name
            }))
