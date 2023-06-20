"use client";
import { useState, useRef, useEffect } from "react";
import Linea from "@/components/tools/line";
import Marker from "@/components/tools/marker";
import PointCenter from "@/components/tools/pointCenter";
import Row from "@/components/tools/row";
import LineTwoPoints from "@/components/tools/lineTwoPoints";
import RowTwoPoints from "@/components/tools/rowTwoPoints";
import FragmentedLine from "@/components/tools/fragmentedLine";
import RadiusLine from "@/components/tools/radiusLine";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [lastPositionX, setLastPositionX] = useState(0);
  const [lastPositionY, setLastPositionY] = useState(0);
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  function handleMouseDown(event: React.MouseEvent<HTMLDivElement>) {
    setIsDragging(true);
    setLastPositionX(event.clientX);
    setLastPositionY(event.clientY);
  }

  function handleMouseUp(event: React.MouseEvent<HTMLDivElement>) {
    if (isDragging) {
      setIsDragging(false);
      setLastPositionX(0);
      setLastPositionY(0);
    }
  }

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!isDragging) return;

    const deltaX = event.clientX - lastPositionX;
    const deltaY = event.clientY - lastPositionY;

    if (containerRef.current) {
      containerRef.current.scrollLeft -= deltaX;
      containerRef.current.scrollTop -= deltaY;
    }

    setLastPositionX(event.clientX);
    setLastPositionY(event.clientY);
  }

  return (
    <div>
      <div
        className="relative w-screen h-screen border border-yellow-500 overflow-hidden cursor-grab active:cursor-grabbing bg-zinc-950"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <PointCenter />

        <FragmentedLine
          pointX={550}
          pointY={250}
          pointX2={1500}
          pointY2={250}
          cargaTrafico={[
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20,
          ]}
          nFragements={20}
          colorHexa="blue"
        />

        <RadiusLine
          pointX={500}
          pointY={450}
          pointX2={1500}
          pointY2={450}
          nFragements={1}
          rotacion={0}
        />

        <Linea
          pointX={500}
          pointY={450}
          rotacion={0}
          longitud={1000}
          colorHexa="blue"
        />

      </div>
    </div>
  );
}
