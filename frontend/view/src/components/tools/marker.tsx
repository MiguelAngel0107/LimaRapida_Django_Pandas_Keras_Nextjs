import React from "react";

interface MarkerProps {
  pointX: number;
  pointY: number;
  radio: number;
  colorHexa: string;
}

function Marker({ pointX, pointY, radio, colorHexa = "#fff" }: MarkerProps): JSX.Element {
  return (
    <div
      style={{
        width: `${radio}px`,
        height: `${radio}px`,
        backgroundColor: `${colorHexa}`,
        borderRadius: "50%",
        position: "absolute",
        left: `${pointX - radio / 2}px`,
        top: `${pointY - radio / 2}px`,
        zIndex: 10,
      }}
    />
  );
}

export default Marker;
