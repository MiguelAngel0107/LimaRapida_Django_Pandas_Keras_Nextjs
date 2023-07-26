import React from "react";

function SideSettings() {
  return (
    <div className="bg-transparent text-white p-4">
      <h2 className="text-lg font-medium mb-4">Configuraciones</h2>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <span className="text-sm font-medium">Notificaciones</span>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-indigo-600"
            />
            <span className="ml-2">Activar notificaciones</span>
          </label>
        </div>
        <div className="flex flex-col space-y-2">
          <span className="text-sm font-medium">Tema</span>
          <div className="flex items-center space-x-2">
            <label className="cursor-pointer">
              <input
                type="radio"
                name="theme"
                value="light"
                className="form-radio h-4 w-4 text-indigo-600"
              />
              <span className="ml-2">Claro</span>
            </label>
            <label className="cursor-pointer">
              <input
                type="radio"
                name="theme"
                value="dark"
                className="form-radio h-4 w-4 text-indigo-600"
              />
              <span className="ml-2">Oscuro</span>
            </label>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <span className="text-sm font-medium">Idioma</span>
          <select className="form-select w-full text-indigo-600">
            <option value="es">Español</option>
            <option value="en">Inglés</option>
            <option value="fr">Francés</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default SideSettings;
