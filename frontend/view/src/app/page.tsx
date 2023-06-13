"use client";
import { useState, useRef } from "react";
import Linea from "@/components/tools/line";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [lastPositionX, setLastPositionX] = useState(0);
  const [lastPositionY, setLastPositionY] = useState(0);

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
        className="relative w-screen h-screen border border-gray-300 overflow-hidden cursor-grab active:cursor-grabbing"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div
          style={{
            width: "10px",
            height: "10px",
            backgroundColor: "red",
            borderRadius: "50%",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        <Linea pointX={50} pointY={25} rotacion={95} longitud="2000px" />
        <Linea pointX={25} pointY={50} rotacion={30} longitud="650px" />
      </div>
    </div>
  );
}
