"use client";
import { useState, useRef, useEffect } from "react";
import Linea from "@/components/tools/line";
import Marker from "@/components/tools/marker";
import PointCenter from "@/components/tools/pointCenter";
import Row from "@/components/tools/row";
import LineTwoPoints from "@/components/tools/lineTwoPoints";
import RowTwoPoints from "@/components/tools/rowTwoPoints";
import FragmentedLine from "@/components/tools/fragmentedLine";

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
        <Marker pointX={100} pointY={150} radio={10} colorHexa="blue" />
        <Marker
          pointX={screenSize.width / 2}
          pointY={screenSize.height / 2}
          radio={10}
          colorHexa="green"
        />

        <Linea
          pointX={100}
          pointY={150}
          rotacion={0}
          longitud={2000}
          colorHexa="#fff"
        />

        <Row
          pointX={1000}
          pointY={500}
          rotacion={0}
          longitud={200}
          colorHexa="yellow"
          start
          end
        />

        <LineTwoPoints
          pointX={1000}
          pointY={400}
          pointX2={1200}
          pointY2={400}
          colorHexa="white"
        />

        <RowTwoPoints
          pointX={1000}
          pointY={600}
          pointX2={1200}
          pointY2={400}
          colorHexa="yellow"
          start
          end
        />

        <FragmentedLine
          pointX={50}
          pointY={50}
          pointX2={150}
          pointY2={120}
          cargaTrafico={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          nFragements={10}
        />

        <LineTwoPoints
          pointX={50}
          pointY={50}
          pointX2={100}
          pointY2={100}
          colorHexa="transparent"
        />
      </div>
    </div>
  );
}
