"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";

export default function Alert() {
  const alert = useAppSelector((state) => state.Alert.alert);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (alert != null) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [alert]);

  return (
    <div className="fixed bottom-20 sm:right-20 right-5">
      <Transition
        show={show}
        enter="transform transition duration-300 ease-out"
        enterFrom="translate-x-full"
        enterTo="translate-y-0"
        leave="transform transition duration-300 ease-out"
        leaveFrom="translate-y-0"
        leaveTo="translate-x-full"
      >
        <div
          role="alert"
          className={`rounded-xl p-4 shadow-xl bg-gradient-to-t ${
            alert && alert.alertType == "green"
              ? "from-green-950 to-gray-950"
              : "from-red-950 to-gray-950"
          }`}
        >
          <div className="flex items-start gap-4">
            {alert && alert.alertType == "green" ? (
              <span className="text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
            ) : (
              <span className="text-red-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="11"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 16l8-8M8 8l8 8"
                  />
                </svg>
              </span>
            )}

            <div className="flex-1">
              <strong className="block font-medium text-gray-900 dark:text-white">
                {alert && alert.alertType == "red" ? <>Fail</> : <>Success</>}
              </strong>

              <p className="mt-1 text-sm text-gray-700 dark:text-gray-200 dark:hover:bg-gray-800">
                {alert && alert.msg}
              </p>

              {/*<div className="mt-4 flex gap-2">
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 rounded-lg bg-violet-700 px-4 py-2 text-white hover:bg-violet-900"
                >
                  <span className="text-sm"> Preview </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </Link>

                <button className="block rounded-lg px-4 py-2 text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
                  <span className="text-sm">Revert</span>
                </button>
            </div>*/}


            </div>

            <button className="text-gray-500 transition hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-500">
              <span className="sr-only">Dismiss popup</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </Transition>
    </div>
  );
}
