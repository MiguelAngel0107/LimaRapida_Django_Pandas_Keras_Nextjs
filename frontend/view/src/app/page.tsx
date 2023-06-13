"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import Linea from "@/components/tools/line";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [lastPositionX, setLastPositionX] = useState(0);
  const [lastPositionY, setLastPositionY] = useState(0);

  function handleMouseDown(event: any) {
    setIsDragging(true);
    setLastPositionX(event.clientX);
    setLastPositionY(event.clientY);
  }

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  function handleMouseMove(event: any) {
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
        className="absolute w-screen h-screen border border-gray-300 overflow-hidden"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <Linea rotacion={45} longitud="2000px" />
        <Linea rotacion={30} longitud="650px" />
      </div>
    </div>
  );
}
