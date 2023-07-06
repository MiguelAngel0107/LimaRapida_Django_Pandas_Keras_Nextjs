"use client";
import React, { useState } from "react";
import Link from "next/link";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-purple-950 to-indigo-950 py-6">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center">
          <div>
            <Link href="#" className="text-white text-2xl font-bold">
              Mi Sitio
            </Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
              </svg>
            </button>
          </div>
          <div className="hidden md:flex md:items-center">
            <Link
              href="/"
              className="text-gray-300 hover:text-white px-4 transition-colors duration-300 group"
            >
              Inicio
              <div className="h-0.5 bg-white w-full transform origin-left scale-x-0 group-hover:scale-x-100 transition duration-500" />
            </Link>
            <Link
              href="/blog"
              className="text-gray-300 hover:text-white px-4 transition-colors duration-300 group"
            >
              Blog - Encuestas
              <div className="h-0.5 bg-white w-full transform origin-left scale-x-0 group-hover:scale-x-100 transition duration-500" />
            </Link>
            <Link
              href="/game"
              className="text-gray-300 hover:text-white px-4 transition-colors duration-300 group"
            >
              Juego de Imagenes
              <div className="h-0.5 bg-white w-full transform origin-left scale-x-0 group-hover:scale-x-100 transition duration-500" />
            </Link>
            <Link
              href="/meet"
              className="text-gray-300 hover:text-white px-4 transition-colors duration-300 group"
            >
              VideoConferencia
              <div className="h-0.5 bg-white w-full transform origin-left scale-x-0 group-hover:scale-x-100 transition duration-500" />
            </Link>
            <Link
              href="/chat"
              className="text-gray-300 hover:text-white px-4 transition-colors duration-300 group"
            >
              Chat en Vivo
              <div className="h-0.5 bg-white w-full transform origin-left scale-x-0 group-hover:scale-x-100 transition duration-500" />
            </Link>
            <Link
              href="/nosotros"
              className="text-gray-300 hover:text-white px-4 transition-colors duration-300 group"
            >
              Nosotros
              <div className="h-0.5 bg-white w-full transform origin-left scale-x-0 group-hover:scale-x-100 transition duration-500" />
            </Link>
          </div>
        </nav>
        {isMenuOpen && (
          <div className="mt-8 md:hidden flex flex-col gap-2">
            <Link
              href="/"
              className="text-gray-300 hover:text-white px-4 transition-colors duration-300 group"
            >
              Inicio
            </Link>
            <Link
              href="/blog"
              className="text-gray-300 hover:text-white px-4 transition-colors duration-300 group"
            >
              Blog - Encuestas
            </Link>
            <Link
              href="/game"
              className="text-gray-300 hover:text-white px-4 transition-colors duration-300 group"
            >
              Juego de Imagenes
            </Link>
            <Link
              href="/meet"
              className="text-gray-300 hover:text-white px-4 transition-colors duration-300 group"
            >
              VideoConferencia
            </Link>
            <Link
              href="/chat"
              className="text-gray-300 hover:text-white px-4 transition-colors duration-300 group"
            >
              Chat en Vivo
            </Link>
            <Link
              href="/nosotros"
              className="text-gray-300 hover:text-white px-4 transition-colors duration-300 group"
            >
              Nosotros
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
