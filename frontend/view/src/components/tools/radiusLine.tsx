"use client";
import React, { useEffect, useState } from "react";
import { obtenerTamanoSegmentos } from "../functions/calcCoorSegments";
import {
  calcularCoordenadasFinales,
  calcularLongitudSecante,
  calcularLongitudSecante_django,
} from "../functions/calcCoorEnd";
import Linea from "./line";
import Marker from "./marker";

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
    setLongitud(
      obtenerTamanoSegmentos([pointX, pointY], [pointX2, pointY2], nFragements)
    );
  }, [pointX, pointY, pointX2, pointY2, nFragements]);

  function calculateRotation(i: number): number {
    return 90 - (90 / (nFragements / 2)) * (i + 1);
  }

  function secante(angulo: number, radio: number): number {
    console.log("Angulo", angulo);
    console.log("Radio", radio);

    // Convertir el ángulo de grados a radianes
    const angulo_radianes = angulo * (Math.PI / 180);

    // Calcular la longitud de la secante
    let longitud_secante = (2 * radio) / Math.cos(angulo_radianes);
    longitud_secante = Math.round(longitud_secante * 100) / 100;

    console.log(longitud_secante);
    return longitud_secante;
  }

  function Render(): JSX.Element[] {
    const elements: JSX.Element[] = [];
    let PointStart: [number, number] = [pointX, pointY];

    for (let i: number = 0; i < nFragements - 1; i++) {
      console.log("-----------------------------------------------");
      console.log("Ciclo", i);
      const longitudSecante = longitud// secante(calculateRotation(i), longitud);

      elements.push(
        <Linea
          key={i}
          pointX={PointStart[0]}
          pointY={PointStart[1]}
          longitud={longitudSecante}
          rotacion={calculateRotation(i)}
          grosor={2}
          colorHexa={`red`}
        />
      );

      elements.push(
        <Marker
          pointX={PointStart[0]}
          pointY={PointStart[1]}
          radio={5}
          colorHexa="white"
        />
      );

      PointStart = calcularCoordenadasFinales(
        PointStart,
        longitudSecante,
        calculateRotation(i)
      );

      elements.push(
        <Marker
          pointX={PointStart[0]}
          pointY={PointStart[1]}
          radio={5}
          colorHexa="transparent"
        />
      );
    }
    return elements;
  }

  return <>{Render()}</>;
}

export default RadiusLine;
