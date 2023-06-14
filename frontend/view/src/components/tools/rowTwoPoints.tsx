"use client";
import React, { useEffect, useState } from "react";
import Linea from "./line";
import { calcularAngulo, calcularMagnitud } from "../functions/calcMagAng";

interface RowProps {
  pointX: number;
  pointY: number;
  pointX2: number;
  pointY2: number;
  grosor: number;
  colorHexa: string;
  start: boolean;
  end: boolean;
}

function RowTwoPoints({
  pointX,
  pointY,
  pointX2,
  pointY2,
  grosor = 1,
  colorHexa = "#fff",
  start = false,
  end = false,
}: RowProps) {
  const [longitud, setLongitud] = useState(0);
  const [rotacion, setRotacion] = useState(0);

  useEffect(() => {
    setLongitud(calcularMagnitud(pointX, pointY, pointX2, pointY2));
    setRotacion(calcularAngulo(pointX, pointY, pointX2, pointY2));
  }, [pointX, pointY, pointX2, pointY2]);

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
            pointX={pointX2}
            pointY={pointY2}
            rotacion={rotacion + 145}
            longitud={10}
            grosor={grosor}
            colorHexa={colorHexa}
          />
          <Linea
            pointX={pointX2}
            pointY={pointY2}
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

export default RowTwoPoints;
