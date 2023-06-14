export function calcularCoordenadasFinales(
  puntoInicial: [number, number],
  magnitud: number,
  angulo: number
): [number, number] {
  // Convertir el ángulo de grados a radianes
  const anguloRad = angulo * (Math.PI / 180);

  // Calcular los componentes de dirección del segmento
  const dx = magnitud * Math.cos(anguloRad);
  const dy = magnitud * Math.sin(anguloRad);

  // Calcular las coordenadas finales
  const xFinal = puntoInicial[0] + dx;
  const yFinal = puntoInicial[1] + dy;

  // Devolver las coordenadas finales como un arreglo
  return [xFinal, yFinal];
}
