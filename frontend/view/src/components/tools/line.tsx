import React from "react";

interface LineaProps {
  pointX: number;
  pointY: number;
  rotacion: number;
  longitud: number;
  grosor: number;
  colorHexa: string;
}

function Linea({
  pointX,
  pointY,
  rotacion,
  longitud,
  grosor = 1,
  colorHexa = "#fff",
}: LineaProps): JSX.Element {
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

export default Linea;
