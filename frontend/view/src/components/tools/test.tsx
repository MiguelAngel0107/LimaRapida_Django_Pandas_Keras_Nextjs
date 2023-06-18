import React, { useEffect, useState } from "react";
import axios from "axios";
import Linea from "./line";

interface RadiusLineProps {
  pointX: number;
  pointY: number;
  pointX2: number;
  pointY2: number;
  nFragements: number;
  rotacion: number;
  maxPointAlt: number;
  colorHexa: string;
}

async function calcularLongitudSecanteDjango(
  angulo: number,
  radio: number
): Promise<number> {
  const url = `http://localhost:8000/functions/calculate-secante/?angulo=${angulo}&radio=${radio}`;
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(url, config);
    if (res.status === 200) {
      return res.data.longitud_secante;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }

  return 0;
}

function RadiusLine({
  pointX,
  pointY,
  pointX2,
  pointY2,
  nFragements,
  rotacion,
  maxPointAlt,
  colorHexa = "white",
}: RadiusLineProps): JSX.Element {
  const [longitud, setLongitud] = useState(0);

  useEffect(() => {
    const obtenerLongitud = async () => {
      const nuevaLongitud = await calcularLongitudSecanteDjango(
        calcularRotationStart(0),
        longitud
      );
      setLongitud(nuevaLongitud);
    };

    obtenerLongitud();
  }, [pointX, pointY, pointX2, pointY2, nFragements]);

  function calcularRotationStart(i: number): number {
    return 90 - (90 / (nFragements / 2)) * (i + 1);
  }

  function calcularRotationEnd(i: number): number {
    return -(90 / (nFragements / 2)) * (i + 1);
  }

  const elements: JSX.Element[] = [];

  for (let i = 0; i < nFragements / 2; i++) {
    const longitudSecante = calcularLongitudSecanteDjango(
      calcularRotationStart(i),
      longitud
    );

    const puntoInicio: [number, number] = [pointX, pointY];
    const puntoFin = calcularCoordenadasFinales(
      puntoInicio,
      longitudSecante,
      calcularRotationStart(i)
    );

    elements.push(
      <Linea
        key={i}
        pointX={puntoInicio[0]}
        pointY={puntoInicio[1]}
        longitud={longitudSecante}
        rotacion={calcularRotationStart(i)}
        grosor={1}
        colorHexa="red"
      />
    );

    puntoInicio = puntoFin;
    const longitudSecante2 = calcularLongitudSecanteDjango(
      calcularRotationEnd(i),
      longitud
    );

    const puntoFin2 = calcularCoordenadasFinales(
      puntoInicio,
      longitudSecante2,
      calcularRotationEnd(i)
    );

    elements.push(
      <Linea
        key={i}
        pointX={puntoInicio[0]}
        pointY={puntoInicio[1]}
        longitud={longitudSecante2}
        rotacion={calcularRotationEnd(i)}
        grosor={1}
        colorHexa="green"
      />
    );

    puntoInicio = puntoFin2;
  }

  return <>{elements}</>;
}

export default RadiusLine;
