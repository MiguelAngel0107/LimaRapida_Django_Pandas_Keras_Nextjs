"use client";
import React, { useState, useEffect } from "react";
import { calcularAngulo, calcularMagnitud } from "../functions/calcMagAng";

interface LineTwoPointsProps {
  pointX: number;
  pointY: number;
  pointX2: number;
  pointY2: number;
  grosor: number;
  colorHexa: string;
}

function LineTwoPoints({
  pointX,
  pointY,
  pointX2,
  pointY2,
  grosor = 1,
  colorHexa = "#fff",
}: LineTwoPointsProps): JSX.Element {
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

  return <div style={estiloLinea}></div>;
}

export default LineTwoPoints;
