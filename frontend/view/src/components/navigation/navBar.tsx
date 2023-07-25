"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { Switch } from "@headlessui/react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [theme, setTheme] = useState(false);
  const [nextNav, setNextNav] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const moodTheme = (
    <Switch.Group>
      <div className="flex items-center text-white">
        <Switch.Label className="mr-4 text-lg font-semibold">
          <FontAwesomeIcon icon={faMoon} className="w-6 h-6 text-white" />
        </Switch.Label>
        <Switch
          checked={theme}
          onChange={setTheme}
          className={`${
            theme ? "bg-purple-200" : "bg-purple-900"
          } relative inline-flex items-center h-6 rounded-full w-11`}
        >
          <span className="sr-only">Switch</span>
          <span
            className={`${
              theme
                ? "translate-x-6 bg-purple-900"
                : "translate-x-1 bg-purple-200"
            } inline-block w-4 h-4 transform rounded-full`}
          />
        </Switch>
        <Switch.Label className="ml-4 text-lg font-semibold">
          <FontAwesomeIcon icon={faSun} className="w-6 h-6 text-white" />
        </Switch.Label>
      </div>
    </Switch.Group>
  );

  const moodAuth = (
    <Switch.Group>
      <div className="flex items-center text-transparent">
        <Switch.Label className="mr-4 text-lg font-semibold">
          Origin
        </Switch.Label>
        <Switch
          checked={nextNav}
          onChange={setNextNav}
          className={`${
            nextNav ? "bg-transparent" : "bg-transparent"
          } relative inline-flex items-center h-6 rounded-full w-11`}
        >
          <span className="sr-only">Switch</span>
          <span
            className={`${
              nextNav
                ? "translate-x-6 bg-transparent"
                : "translate-x-1 bg-transparent"
            } inline-block w-4 h-4 transform  rounded-full`}
          />
        </Switch>
        <Switch.Label className="ml-4 text-lg font-semibold">Next</Switch.Label>
      </div>
    </Switch.Group>
  );

  const navIsAuth = (
    <nav className="flex justify-center items-center gap-4">
      <div className="bg-purple-700 hover:bg-purple-900 py-2.5 px-3.5 rounded-3xl shadow-nav shadow-white hover:shadow-white transition duration-200 hover:shadow-nav_hover transform hover:translate-y-1">
        <Link href={"/blog"}>
          <span className="text-white font-bold text-xl">Blog</span>
        </Link>
      </div>
      <div className="bg-purple-700 hover:bg-purple-900 py-2.5 px-3.5 rounded-3xl shadow-nav shadow-white hover:shadow-white transition duration-200 hover:shadow-nav_hover transform hover:translate-y-1">
        <Link href={"/meet"}>
          <span className="text-white font-bold text-xl">Reuniones</span>
        </Link>
      </div>

      <div className="bg-purple-700 hover:bg-purple-900 px-4 py-3 rounded-full shadow-nav shadow-white hover:shadow-white transition duration-200 hover:shadow-nav_hover transform hover:translate-y-1">
        <Link href={"/"}>
          <FontAwesomeIcon icon={faHouse} className="w-10 h-10 text-white" />
        </Link>
      </div>

      <div className="bg-purple-700 hover:bg-purple-900 py-2.5 px-3.5 rounded-3xl shadow-nav shadow-white hover:shadow-white transition duration-200 hover:shadow-nav_hover transform hover:translate-y-1">
        <Link href={"/chat"}>
          <span className="text-white font-bold text-xl">Mensajeria</span>
        </Link>
      </div>
      <div className="bg-purple-700 hover:bg-purple-900 py-2.5 px-3.5 rounded-3xl shadow-nav shadow-white hover:shadow-white transition duration-200 hover:shadow-nav_hover transform hover:translate-y-1">
        <Link href={"/nosotros"}>
          <span className="text-white font-bold text-xl">Nosotros</span>
        </Link>
      </div>
    </nav>
  );

  const navNotAuth = (
    <nav className="flex justify-center items-center gap-4">
      <div className="bg-purple-700 hover:bg-purple-900 py-2.5 px-3.5 rounded-3xl shadow-nav shadow-white hover:shadow-white transition duration-200 hover:shadow-nav_hover transform hover:translate-y-1">
        <Link href={"/"}>
          <span className="text-white font-bold text-xl">Blog</span>
        </Link>
      </div>
      <div className="bg-purple-700 hover:bg-purple-900 py-2.5 px-3.5 rounded-3xl shadow-nav shadow-white hover:shadow-white transition duration-200 hover:shadow-nav_hover transform hover:translate-y-1">
        <Link href={"/"}>
          <span className="text-white font-bold text-xl">Reuniones</span>
        </Link>
      </div>

      <div className="bg-purple-700 hover:bg-purple-900 px-4 py-3 rounded-full shadow-nav shadow-white hover:shadow-white transition duration-200 hover:shadow-nav_hover transform hover:translate-y-1">
        <Link href={"/"}>
          <FontAwesomeIcon icon={faHouse} className="w-10 h-10 text-white" />
        </Link>
      </div>

      <div className="bg-purple-700 hover:bg-purple-900 py-2.5 px-3.5 rounded-3xl shadow-nav shadow-white hover:shadow-white transition duration-200 hover:shadow-nav_hover transform hover:translate-y-1">
        <Link href={"/"}>
          <span className="text-white font-bold text-xl">Mensajeria</span>
        </Link>
      </div>
      <div className="bg-purple-700 hover:bg-purple-900 py-2.5 px-3.5 rounded-3xl shadow-nav shadow-white hover:shadow-white transition duration-200 hover:shadow-nav_hover transform hover:translate-y-1">
        <Link href={"/"}>
          <span className="text-white font-bold text-xl">Nosotros</span>
        </Link>
      </div>
    </nav>
  );

  return (
    <header className="bg-gradient-to-b from-purple-950 to-gray-950 ">
      <div className="flex h-10 items-center justify-center bg-purple-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
        Get free delivery on orders over $100
      </div>
      <div className="flex justify-between items-center container mx-auto px-4 py-6">
        {moodAuth}
        {navIsAuth}
        {moodTheme}
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
