import React from "react";
import Image from "next/image";
import type { chatProps } from "@/redux/slices/reducers/chat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { Switch, Transition, Dialog } from "@headlessui/react";
import Link from "next/link";

interface ListProps {
  list: chatProps[] | null;
  state: chatProps;
  setState: React.Dispatch<React.SetStateAction<chatProps>>;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ListContacts(props: ListProps) {
  const contacts = props.list;
  return (
    <div className="flex-1 p-4 bg-transparent text-white">
      <h2 className="text-lg font-medium mb-4">Contactos</h2>
      <ul className="space-y-4">
        {contacts?.map((contact, index) => (
          <li
            key={index}
            className={`flex items-center space-x-4 px-2 py-2 rounded-lg cursor-pointer border border-white ${
              props.state.id_chat == contact.id_chat
                ? "bg-violet-600 text-white"
                : "hover:bg-violet-600 hover:text-white"
            }`}
            onClick={() => props.setState(contact)}
          >
            <div className="flex-1">
              <h2 className="text-lg font-medium">{contact.nombre_chat}</h2>
            </div>
          </li>
        ))}
      </ul>
      <Transition show={props.isMenuOpen}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 overflow-hidden"
          open={props.isMenuOpen}
          onClose={() => props.setIsMenuOpen(false)}
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
              enterFrom="translate-x-full" // Entra desde la derecha
              enterTo="translate-x-0" // Llega a la posición normal (en pantalla)
              leave="transform transition ease-in-out duration-300 sm:duration-500"
              leaveFrom="translate-x-0" // Sale desde la posición normal (en pantalla)
              leaveTo="translate-x-full" // Termina en la posición de la derecha
              className="fixed top-0 right-0 h-full bg-gray-900 max-w-xs w-full"
            >
              <div className="flex flex-col gap-2 p-6">
                <ul className="space-y-4 text-white">
                  {contacts?.map((contact, index) => (
                    <li
                      key={index}
                      className={`flex items-center space-x-4 px-2 py-2 rounded-lg cursor-pointer border border-white ${
                        props.state.id_chat == contact.id_chat
                          ? "bg-violet-600 text-white"
                          : "hover:bg-violet-600 hover:text-white"
                      }`}
                      onClick={() => {
                        props.setState(contact);
                        props.setIsMenuOpen(false); 
                      }}
                    >
                      <div className="flex-1">
                        <h2 className="text-lg font-medium">
                          {contact.nombre_chat}
                        </h2>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default ListContacts;
