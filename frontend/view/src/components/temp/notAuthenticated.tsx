import React from "react";
import Link from "next/link";
export default function NotAuthenticated() {
  return (
    <div className="grid h-screen px-4 bg-white place-content-center dark:bg-gray-950">
      <div className="max-w-md mx-auto p-6 rounded-lg shadow-lg bg-transparent border-4 border-purple-900">
        <h1 className="text-3xl text-center font-semibold text-gray-900 dark:text-white">
          ¡Ups! Acceso restringido
        </h1>
        <p className="mt-4 text-white text-center">
          Parece que estás intentando acceder a una página que requiere inicio
          de sesión.
        </p>
        <p className="mt-2 text-white text-center">
          Por favor, regístrate o inicia sesión para continuar.
        </p>
        <div className="mt-4 flex justify-center font-semibold">
          <Link href={'/auth/login'} className="px-4 py-2 text-white bg-purple-800 rounded-md shadow-md hover:bg-white hover:text-purple-800 mr-2 hover:border-purple-800 border-2">
            Iniciar sesión
          </Link>
          <Link href={'/auth/register'} className="px-4 py-2 text-purple-800 bg-white rounded-md shadow-md hover:bg-purple-800 hover:text-white hover:border-white border-2 ml-2">
            Registrarse
          </Link>
        </div>
      </div>
    </div>
  );
}
