import React from "react";

function PointCenter(): JSX.Element {
  return (
    <div
      style={{
        width: "10px",
        height: "10px",
        backgroundColor: "red",
        borderRadius: "50%",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 20,
      }}
    />
  );
}

export default PointCenter;
