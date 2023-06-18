export function dividirSegmentoEnPartes(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  numPartes: number
): { x1: number; y1: number; x2: number; y2: number }[] {
  const segmentos: { x: number; y: number }[] = [];

  // Calcular el incremento en x e y para cada parte
  const dx: number = (x2 - x1) / numPartes;
  const dy: number = (y2 - y1) / numPartes;

  // Calcular las coordenadas de los puntos intermedios
  for (let i = 1; i < numPartes; i++) {
    const xIntermedio: number = x1 + dx * i;
    const yIntermedio: number = y1 + dy * i;
    segmentos.push({ x: xIntermedio, y: yIntermedio });
  }

  const coorFragementos: { x1: number; y1: number; x2: number; y2: number }[] =
    [];

  for (let i = 0; i < segmentos.length; i++) {
    if (i === 0) {
      coorFragementos.push({
        x1: x1,
        y1: y1,
        x2: segmentos[i].x,
        y2: segmentos[i].y,
      });
    } else {
      coorFragementos.push({
        x1: segmentos[i - 1].x,
        y1: segmentos[i - 1].y,
        x2: segmentos[i].x,
        y2: segmentos[i].y,
      });
    }
  }
  coorFragementos.push({
    x1: segmentos[segmentos.length - 1].x,
    y1: segmentos[segmentos.length - 1].y,
    x2: x2,
    y2: y2,
  });

  return coorFragementos;
}

export function obtenerTamanoSegmentos(
  puntoInicial: [number, number],
  puntoFinal: [number, number],
  cantidadPartes: number
): number {
  // Obtener las coordenadas x de los puntos extremos
  const xInicial: number = puntoInicial[0];
  const xFinal: number = puntoFinal[0];

  // Calcular la longitud total de la recta
  const longitudTotal: number = xFinal - xInicial;

  // Calcular el tamaño de cada segmento
  const tamanoSegmento: number = longitudTotal / cantidadPartes;

  return tamanoSegmento;
}
