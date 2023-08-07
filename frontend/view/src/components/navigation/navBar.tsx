"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMoon,
  faSun,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { Switch, Transition, Dialog } from "@headlessui/react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  logout,
  refresh,
  check_authenticated,
  load_user,
} from "@/redux/slices/actions/auth";

const NavBar = () => {
  const dispatch = useAppDispatch();
  const isAutheticated = useAppSelector((state) => state.Auth.isAuthenticated);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [theme, setTheme] = useState(false);
  const [nextNav, setNextNav] = useState(false);

  useEffect(() => {
    dispatch(refresh());
    dispatch(check_authenticated());
    dispatch(load_user());
  }, []);

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

  function ExitSession() {
    dispatch(logout());
  }

  const navDesktop = (
    <nav className="hidden sm:flex justify-center items-center gap-4">
      <div className="bg-purple-700 hover:bg-purple-900 py-2.5 px-3.5 rounded-3xl shadow-nav shadow-white hover:shadow-white transition duration-300 hover:shadow-nav_hover transform hover:translate-y-1">
        <Link href={"/blog"}>
          <span className="text-white font-bold text-xl">Buscar</span>
        </Link>
      </div>

      <div className="bg-purple-700 hover:bg-purple-900 py-2.5 px-3.5 rounded-3xl shadow-nav shadow-white hover:shadow-white transition duration-300 hover:shadow-nav_hover transform hover:translate-y-1">
        <Link href={"/meet"}>
          <span className="text-white font-bold text-xl">Reuniones</span>
        </Link>
      </div>

      <div className="bg-purple-700 hover:bg-purple-900 px-4 py-3 rounded-full shadow-nav shadow-white hover:shadow-white transition duration-300 hover:shadow-nav_hover transform hover:translate-y-1">
        <Link href={"/"}>
          <FontAwesomeIcon icon={faHouse} className="w-10 h-10 text-white" />
        </Link>
      </div>

      <div className="bg-purple-700 hover:bg-purple-900 py-2.5 px-3.5 rounded-3xl shadow-nav shadow-white hover:shadow-white transition duration-300 hover:shadow-nav_hover transform hover:translate-y-1">
        <Link href={"/chat"}>
          <span className="text-white font-bold text-xl">Mensajeria</span>
        </Link>
      </div>
      <div className="bg-purple-700 hover:bg-purple-900 py-2.5 px-3.5 rounded-3xl shadow-nav shadow-white hover:shadow-white transition duration-300 hover:shadow-nav_hover transform hover:translate-y-1">
        <Link href={"/blog"}>
          <span className="text-white font-bold text-xl">Posting</span>
        </Link>
      </div>
    </nav>
  );

  const navMobile = (
    <nav className="flex sm:hidden justify-between w-full items-center gap-4 px-6">
      <div className="bg-purple-700 hover:bg-purple-900 px-4 py-3 rounded-full shadow-nav shadow-white hover:shadow-white transition duration-300 hover:shadow-nav_hover transform hover:translate-y-1">
        <Link href={"/"}>
          <FontAwesomeIcon icon={faHouse} className="w-10 h-10 text-white" />
        </Link>
      </div>
      <div className="bg-purple-700 hover:bg-purple-900 px-4 py-3 rounded-full shadow-nav shadow-white hover:shadow-white transition duration-300 hover:shadow-nav_hover transform hover:translate-y-1">
        <button onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} className="w-10 h-10 text-white" />
        </button>
      </div>
    </nav>
  );

  return (
    <header className="bg-gradient-to-b from-purple-950 to-gray-950 ">
      <div className="flex h-9 items-center justify-between bg-purple-900 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
        <div>
          <Link
            className="text-white font-bold text-sm px-2 no-underline hover:underline"
            href={"/#"}
          >
            Términos y Condiciones
          </Link>
        </div>

        {isAutheticated ? (
          <div className="flex gap-4">
            <Link
              className="text-white font-bold text-sm px-2 border-2 rounded-3xl hover:bg-white hover:text-purple-700"
              href={"/auth/user"}
            >
              Dashboard
            </Link>
            <button
              onClick={ExitSession}
              className="text-white font-bold text-sm px-2 border-2 rounded-3xl hover:bg-white hover:text-purple-700"
            >
              Exit
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link
              className="text-white font-bold text-sm px-2 border-2 rounded-3xl hover:bg-white hover:text-purple-700"
              href={"/auth/login"}
            >
              Login
            </Link>
            <Link
              className="text-white font-bold text-sm px-2 border-2 rounded-3xl hover:bg-white hover:text-purple-700"
              href={"/auth/register"}
            >
              Signup
            </Link>
          </div>
        )}
      </div>
      <div className="flex justify-center lg:justify-between items-center container mx-auto px-4 py-6">
        <div className=" hidden lg:block">{moodAuth}</div>
        {navDesktop}
        {navMobile}
        <div className=" hidden lg:block">{moodTheme}</div>
      </div>
      <Transition show={isMenuOpen}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 overflow-hidden"
          open={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Transition.Child
              as={Dialog.Overlay}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className="absolute inset-0 bg-gray-500 bg-opacity-75"
            />
            <Transition.Child
              as={Dialog.Panel}
              enter="transform transition ease-in-out duration-300 sm:duration-500"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-300 sm:duration-500"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
              className="relative bg-gray-900 max-w-xs w-full h-full"
            >
              <div className="flex flex-col gap-2 p-6">
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white px-4 py-2 rounded-md transition-colors duration-300 group"
                >
                  Inicio
                </Link>
                <Link
                  href="/blog"
                  className="text-gray-300 hover:text-white px-4 py-2 rounded-md transition-colors duration-300 group"
                >
                  Blog - Encuestas
                </Link>
                <Link
                  href="/game"
                  className="text-gray-300 hover:text-white px-4 py-2 rounded-md transition-colors duration-300 group"
                >
                  Juego de Imagenes
                </Link>
                <Link
                  href="/meet"
                  className="text-gray-300 hover:text-white px-4 py-2 rounded-md transition-colors duration-300 group"
                >
                  VideoConferencia
                </Link>
                <Link
                  href="/chat"
                  className="text-gray-300 hover:text-white px-4 py-2 rounded-md transition-colors duration-300 group"
                >
                  Chat en Vivo
                </Link>
                <Link
                  href="/nosotros"
                  className="text-gray-300 hover:text-white px-4 py-2 rounded-md transition-colors duration-300 group"
                >
                  Nosotros
                </Link>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </header>
  );
};

export default NavBar;
