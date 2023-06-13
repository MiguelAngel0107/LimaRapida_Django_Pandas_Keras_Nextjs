import React from 'react';

interface LineaProps {
  rotacion: number;
  longitud: string;
}

function Linea({ rotacion, longitud }: LineaProps): JSX.Element {
  const estiloLinea: React.CSSProperties = {
    width: longitud,
    height: '2px',
    backgroundColor: 'black',
    transform: `rotate(${rotacion}deg)`,
    transformOrigin: '100 100',
  };

  return (
    <div style={estiloLinea}></div>
  );
}

export default Linea;
