
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { useState } from 'react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';

interface SelectedLenguageProps {
    globalStyle?: string;
    setWork: (work: any) => void;
    work: any;
    setSelectedLanguage: (value: string) => void; // Añadir esta prop para poder resetear
    selectedLanguage: string;
}

export const SelectLenguage = ({ globalStyle, setWork, work, selectedLanguage, setSelectedLanguage }: SelectedLenguageProps) => {


    const languages = ['Español', 'Inglés'];

    const handleLanguageChange = (language: string) => {
        setSelectedLanguage(language);
        setWork({ ...work, originalLanguage: language }); // Actualizamos el campo originalLanguage en el estado de work
    };

    return (
        <div className="">
            <div className={`flex flex-col ${globalStyle}`}>
                <span  className={`text-gray-900 text-sm font-medium leading-6 mb-2`}>Idioma original</span>

                <Listbox value={selectedLanguage} onChange={handleLanguageChange}>
                    <div className="relative">
                        <ListboxButton className="relative w-full cursor-default bg-white  py-2 pl-3 pr-10 text-left shadow-md rounded-md text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-d-blue">
                            <span className="block truncate text-sm font-normal">
                                {selectedLanguage ? selectedLanguage : "Seleccionar idioma"}
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                            </span>
                        </ListboxButton>
                        <ListboxOptions className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {languages.map((language) => (
                                <ListboxOption
                                    key={language}
                                    value={language}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-d-blue text-white' : 'text-gray-900'}`
                                    }
                                >
                                    {({ selected }) => (
                                        <>
                                            <span className={`block  truncate text-sm leading-6 ${selected ? 'font-normal' : 'font-medium'}`}>
                                                {language}
                                            </span>
                                        </>
                                    )}
                                </ListboxOption>
                            ))}
                        </ListboxOptions>
                    </div>
                </Listbox>
            </div>


        </div>
    )
}
