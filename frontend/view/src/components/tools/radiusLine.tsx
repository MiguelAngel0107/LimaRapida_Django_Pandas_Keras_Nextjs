"use client";
import React, { useEffect, useState } from "react";
import { obtenerTamanoSegmentos } from "../functions/calcCoorSegments";
import {
  calcularCoordenadasFinales,
  calcularLongitudSecante,
  calcularLongitudSecante_django,
} from "../functions/calcCoorEnd";
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

  function calculateRotationStart(i: number): number {
    return 90 - (90 / (nFragements / 2)) * (i + 1);
  }
  function calculateRotationEnd(i: number): number {
    return -(90 / (nFragements / 2)) * (i + 1);
  }

  function calculateLongitud(catetoA: number, catetoB: number): number {
    const hipotenusa = Math.sqrt(Math.pow(catetoA, 2) + Math.pow(catetoB, 2));
    return hipotenusa;
  }

  function Render(): JSX.Element[] {
    const elements: JSX.Element[] = [];
    let PointStart: [number, number] = [pointX, pointY];
    for (let i: number = 0; i < nFragements / 2; i++) {
      elements.push(
        <Linea
          key={i}
          pointX={PointStart[0]}
          pointY={PointStart[1]}
          longitud={calcularLongitudSecante_django(
            calculateRotationStart(i),
            longitud
          )}
          rotacion={calculateRotationStart(i)}
          grosor={1}
          colorHexa="red"
        />
      );
      console.log("Long 1");
      console.log(calcularLongitudSecante_django(calculateRotationEnd(i), longitud));

      PointStart = calcularCoordenadasFinales(
        PointStart,
        calcularLongitudSecante_django(calculateRotationStart(i), longitud),
        calculateRotationStart(i)
      );
    }
    for (let i: number = 0; i < nFragements / 2; i++) {
      elements.push(
        <Linea
          key={i}
          pointX={PointStart[0]}
          pointY={PointStart[1]}
          longitud={calcularLongitudSecante_django(
            calculateRotationStart(i),
            longitud
          )}
          rotacion={calculateRotationEnd(i)}
          grosor={1}
          colorHexa="green"
        />
      );
      console.log("Long 2");
      console.log(calcularLongitudSecante_django(calculateRotationEnd(i), longitud));

      PointStart = calcularCoordenadasFinales(
        PointStart,
        calcularLongitudSecante_django(calculateRotationStart(i), longitud),
        calculateRotationEnd(i)
      );
    }
    return elements;
  }

  return <>{Render()}</>;
}

export default RadiusLine;
