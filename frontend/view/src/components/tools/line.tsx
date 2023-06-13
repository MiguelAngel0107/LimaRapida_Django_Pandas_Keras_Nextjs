import React from "react";

interface LineaProps {
  pointX: number;
  pointY: number;
  rotacion: number;
  longitud: string;
}

function Linea({
  pointX,
  pointY,
  rotacion,
  longitud,
}: LineaProps): JSX.Element {
  const estiloLinea: React.CSSProperties = {
    width: longitud,
    height: "2px",
    backgroundColor: "black",
    transform: `rotate(${rotacion}deg)`,
    transformOrigin: `${pointX}px ${pointY}px`,
    position: "absolute",
  };

  return <div style={estiloLinea}></div>;
}

export default Linea;
