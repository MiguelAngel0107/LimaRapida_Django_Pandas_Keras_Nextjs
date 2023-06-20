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

interface Punto {
  x: number;
  y: number;
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
    function calcularLongitudSegmento(
      puntoInicio: Punto,
      puntoFin: Punto
    ): number {
      const distanciaX = puntoFin.x - puntoInicio.x;
      const distanciaY = puntoFin.y - puntoInicio.y;

      const longitud = Math.sqrt(
        distanciaX * distanciaX + distanciaY * distanciaY
      );

      return longitud / (nFragements * 2 - 1);
    }
    // Ejemplo de uso:
    const punto1: Punto = { x: pointX, y: pointY };
    const punto2: Punto = { x: pointX2, y: pointY2 };
    setLongitud(calcularLongitudSegmento(punto1, punto2));
  }, [pointX, pointY, pointX2, pointY2, nFragements]);

  function calculateRotation(i: number): number {
    return 90 - (90 / nFragements) * (i + 1);
  }

  function secante(angulo: number, radio: number): number {
    const angulo_radianes = angulo * (Math.PI / 180);
    let longitud_secante = radio / Math.cos(angulo_radianes);
    return longitud_secante;
  }

  function Render(): JSX.Element[] {
    const elements: JSX.Element[] = [];
    let PointEnd: [number, number] = [pointX, pointY];

    for (let i: number = 0; i < nFragements * 2 - 1; i++) {
      const longitudSecante = secante(calculateRotation(i), longitud);

      elements.push(
        <Linea
          key={i}
          pointX={PointEnd[0]}
          pointY={PointEnd[1]}
          longitud={longitudSecante}
          rotacion={calculateRotation(i)}
          grosor={2}
          colorHexa={`red`}
        />
      );

      PointEnd = calcularCoordenadasFinales(
        PointEnd,
        longitudSecante,
        calculateRotation(i)
      );
    }

    return elements;
  }

  return <>{Render()}</>;
}

export default RadiusLine;
