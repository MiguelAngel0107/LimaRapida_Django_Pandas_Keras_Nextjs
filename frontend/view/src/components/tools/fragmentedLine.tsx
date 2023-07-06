"use client";
import React, { useEffect, useState } from "react";
import { dividirSegmentoEnPartes } from "../functions/calcCoorSegments";
import LineTwoPoints from "./lineTwoPoints";

interface FragmentedLineProps {
  pointX: number;
  pointY: number;
  pointX2: number;
  pointY2: number;
  nFragements: number;
  cargaTrafico: number[];
  colorHexa: string;
}

function FragmentedLine({
  pointX,
  pointY,
  pointX2,
  pointY2,
  nFragements,
  cargaTrafico = new Array(nFragements).fill(1),
  colorHexa = "white",
}: FragmentedLineProps): JSX.Element {
  const [arrayFragments, setArrayFragments] = useState<
    { x1: number; y1: number; x2: number; y2: number }[]
  >([]);

  useEffect(() => {
    setArrayFragments(
      dividirSegmentoEnPartes(pointX, pointY, pointX2, pointY2, nFragements)
    );
  }, [pointX, pointY, pointX2, pointY2, nFragements]);

  if (cargaTrafico.length !== nFragements) {
    cargaTrafico = new Array(nFragements).fill(1);
  }
  return (
    <>
      {arrayFragments &&
        arrayFragments.map((coordenadas, index) => (
          <LineTwoPoints
            key={index}
            pointX={coordenadas.x1}
            pointY={coordenadas.y1}
            pointX2={coordenadas.x2}
            pointY2={coordenadas.y2}
            grosor={cargaTrafico[index]}
            colorHexa={colorHexa}
          />
        ))}
    </>
  );
}

export default FragmentedLine;
