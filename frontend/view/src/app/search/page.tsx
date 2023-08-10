"use client";
import React, { useState, Fragment } from "react";
import { searchUsers } from "@/redux/slices/actions/search";
import { Combobox, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";

interface searchProps {
  id: number;
  name: string;
}

export default function Page() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<searchProps[]>([]);

  const handleQueryChange = async (newQuery: string) => {
    setQuery(newQuery);
    if (newQuery) {
      const searchResults = await searchUsers(newQuery);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  };
  return (
    <div className="w-full h-96 flex justify-center py-10 px-6">
      <Combobox value={results} onChange={setResults}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-purple-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              onChange={(e) => handleQueryChange(e.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              enter
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {results.length === 0 ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                results.map((person) => (
                  <div
                    key={person.id}
                    className={`relative cursor-default select-none p-2 m-2 pr-4 border-2 rounded-md flex justify-center border-purple-600 text-black active:text-purple-600 active:border-transparent`}
                    onClick={() => router.push(`/search/profile/${person.id}`)}
                  >
                    <div>
                      <span className={`block truncate font-normal active:font-semibold`}>
                        {person.name}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
