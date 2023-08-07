"use client";
import { Transition } from "@headlessui/react";
import React, { ReactNode, useState } from "react";

function Layout({
  children,
  admin,
  team,
}: {
  children: React.ReactNode;
  admin: React.ReactNode;
  team: React.ReactNode;
}) {
  const [isShowing, setIsShowing] = useState(true);
  const [style, setStyle] = useState(true);
  const [childrenDefault, setChildrenDefault] = useState("");

  function isAdmin() {
    setChildrenDefault("admin");
    setIsShowing((isShowing) => !isShowing);
    setTimeout(() => {
      setStyle((prevState) => !prevState);
    }, 2500);
  }

  function isTeam() {
    setChildrenDefault("team");
    setIsShowing((isShowing) => !isShowing);
    setTimeout(() => {
      setStyle((prevState) => !prevState);
    }, 2500);
  }

  function renderChildren(childrenProps: string): React.ReactNode {
    switch (childrenProps) {
      case "admin":
        return admin;
      case "team":
        return team;
      default:
        return <></>;
    }
  }

  return (
    <div
      className={`text-white ${
        style ? "flex w-full justify-center gap-10" : ""
      } `}
    >
      <Transition
        show={isShowing}
        enter="transition-transform duration-500"
        enterFrom="transform translate-x-[100%]"
        enterTo="transform translate-x-0"
        leave="transition-transform duration-500"
        leaveFrom="transform translate-x-0"
        leaveTo="transform translate-x-[-100%]"
      >
        <div className=" bg-purple-700 w-[40vw] h-[70vh] rounded-3xl p-4 flex flex-col justify-center">
          
          <button
            type="button"
            className=" rounded-3xl border-2 border-white p-2 hover:bg-white hover:text-purple-700 font-semibold"
            onClick={isAdmin}
          >
            Crear Reunion
          </button>
        </div>
      </Transition>

      <Transition
        show={isShowing}
        enter="transition-transform duration-500"
        enterFrom="transform translate-x-[-100%]"
        enterTo="transform translate-x-0"
        leave="transition-transform duration-500"
        leaveFrom="transform translate-x-0"
        leaveTo="transform translate-x-[100%]"
      >
        <div className=" bg-white text-purple-700 w-[40vw] h-[70vh] rounded-3xl p-4 flex flex-col justify-center">
          
          <button
            type="button"
            className="rounded-3xl border-2 border-purple-700 p-2 hover:bg-purple-700 hover:text-white font-semibold"
            onClick={isTeam}
          >
            Entrar Reunion
          </button>
        </div>
      </Transition>

      {renderChildren(childrenDefault)}
    </div>
  );
}

export default Layout;
