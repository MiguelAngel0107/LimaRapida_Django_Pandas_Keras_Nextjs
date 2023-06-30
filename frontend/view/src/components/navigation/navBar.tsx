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
            <a href="#" className="text-white text-2xl font-bold">
              Mi Sitio
            </a>
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
            <a
              href="#"
              className="text-gray-300 hover:text-white px-4 transition-colors duration-300"
            >
              Inicio
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white px-4 transition-colors duration-300"
            >
              Blog - Encuestas
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white px-4 transition-colors duration-300"
            >
              Juego de Imagenes
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white px-4 transition-colors duration-300"
            >
              VideoConferencia
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white px-4 transition-colors duration-300"
            >
              Chat en Vivo
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white px-4 transition-colors duration-300"
            >
              Nosotros
            </a>
          </div>
        </nav>
        {isMenuOpen && (
          <div className="mt-2 md:hidden">
            <a
              href="#"
              className="block text-gray-300 hover:text-white px-4 py-2 transition-colors duration-300"
            >
              Opción 1
            </a>
            <a
              href="#"
              className="block text-gray-300 hover:text-white px-4 py-2 transition-colors duration-300"
            >
              Opción 2
            </a>
            <a
              href="#"
              className="block text-gray-300 hover:text-white px-4 py-2 transition-colors duration-300"
            >
              Opción 3
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
