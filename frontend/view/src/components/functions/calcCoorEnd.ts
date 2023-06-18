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

import axios from "axios";

export function calcularLongitudSecante(angulo: number, radio: number): number {
  // Convertir el ángulo de grados a radianes
  const anguloRadianes = angulo * (Math.PI / 180);

  // Calcular la longitud de la secante
  const longitudSecante = 2 * radio * Math.sin(anguloRadianes / 2);

  console.log(longitudSecante);
  return longitudSecante;
}

export async function calcularLongitudSecante_django(
  angulo: number,
  radio: number
): Promise<number> {
  let longitudSecante = 0;
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(
      `http://localhost:8000/functions/calculate-secante/?angulo=${angulo}&radio=${radio}`,
      config
    );

    if (res.status === 200) {
      const longitudSecante2 = res.data.longitud_secante;
      console.log("Success");
      console.log(longitudSecante2);
    }
  } catch (err) {
    console.error(err);
    //throw err;
  }

  return longitudSecante;
}
