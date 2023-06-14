"use client";
import React, { useEffect, useState } from "react";
import Linea from "./line";
import { calcularCoordenadasFinales } from "../functions/calcCoorEnd";

interface RowProps {
  pointX: number;
  pointY: number;
  rotacion: number;
  longitud: number;
  grosor: number;
  colorHexa: string;
  start: boolean;
  end: boolean;
}

function Row({
  pointX,
  pointY,
  rotacion,
  longitud,
  grosor = 1,
  colorHexa = "#fff",
  start = false,
  end = false,
}: RowProps) {
  const [pointsEnd, setPointsEnd] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    setPointsEnd(
      calcularCoordenadasFinales([pointX, pointY], longitud, rotacion)
    );
  }, [pointX, pointY, rotacion, longitud]);

  const estiloLinea: React.CSSProperties = {
    position: "absolute",
    left: `${pointX}px`,
    top: `${pointY}px`,
    width: `${longitud}px`,
    transform: `rotate(${rotacion}deg)`,
    transformOrigin: "0 0",
    backgroundColor: `${colorHexa}`,
    height: `${grosor}px`,
  };

  return (
    <>
      {start && (
        <>
          <Linea
            pointX={pointX}
            pointY={pointY}
            rotacion={rotacion + 35}
            longitud={10}
            grosor={grosor}
            colorHexa={colorHexa}
          />
          <Linea
            pointX={pointX}
            pointY={pointY}
            rotacion={rotacion - 35}
            longitud={10}
            grosor={grosor}
            colorHexa={colorHexa}
          />
        </>
      )}
      <div style={estiloLinea}></div>
      {end && (
        <>
          <Linea
            pointX={pointsEnd[0]}
            pointY={pointsEnd[1]}
            rotacion={rotacion + 145}
            longitud={10}
            grosor={grosor}
            colorHexa={colorHexa}
          />
          <Linea
            pointX={pointsEnd[0]}
            pointY={pointsEnd[1]}
            rotacion={rotacion - 145}
            longitud={10}
            grosor={grosor}
            colorHexa={colorHexa}
          />
        </>
      )}
    </>
  );
}

export default Row;
