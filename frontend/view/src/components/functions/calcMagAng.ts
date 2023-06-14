export function calcularMagnitud(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  const dx: number = x2 - x1;
  const dy: number = y2 - y1;
  const magnitud: number = Math.sqrt(dx * dx + dy * dy);
  return magnitud;
}

export function calcularAngulo(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  const angulo: number = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
  return angulo;
}
