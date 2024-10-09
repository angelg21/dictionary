'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from 'react'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useSession } from "next-auth/react";

const workSheetsMenu = [
    {
        path: '/dashboard/worksheets/sheetsToComplete',
        name: 'Fichas por Completar',
        current: false
    },
    {
        path: '/dashboard/worksheets/sheetsToReview',
        name: 'Fichas por Revisar',
        current: false
    },
    {
        path: '/dashboard/worksheets/validatedSheets',
        name: 'Fichas Validadas',
        current: true
    },
    {
        path: '/dashboard/worksheets/rejectedSheets',
        name: 'Fichas Rechazadas',
        current: false
    },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export const TabsMenu = () => {

    const [selected, setSelected] = useState(workSheetsMenu[0])
    const pathName = usePathname();
    const { data: session } = useSession();

    const userRoles = session?.user?.roles || []; // Supongo que los roles vienen en un array

    const filteredMenu = workSheetsMenu.filter(item => {
        if (userRoles.includes('admin')) {
            return true; // Si es admin, ve todo
        } else if (userRoles.includes('editor') && item.path.includes('sheetsToComplete')) {
            return true; // Si es editor, ve solo 'Fichas por Completar'
        } else if (userRoles.includes('reviewer') && item.path.includes('sheetsToReview')) {
            return true; // Si es revisor, ve solo 'Fichas por Revisar'
        }
        return false;
    });

    return (
        <div>
            <Listbox value={selected} onChange={setSelected}>

                {/* Worksheets Menu mobile  */}
                <div className="relative mt-2 sm:hidden">
                    <ListboxButton className="relative w-full  max-w-lg  cursor-default rounded-md bg-white py-1.5 pl-3 pr-12 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-d-blue sm:text-sm sm:leading-6">
                        <span className="block truncate">{selected.name}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                        </span>
                    </ListboxButton>

                    <ListboxOptions
                        transition
                        className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                    >
                        {filteredMenu.map((item) => (
                            <Link href={item.path} key={item.path}>
                                <ListboxOption
                                    value={item}
                                    className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-d-blue data-[focus]:text-white"
                                >
                                    <span className="block truncate font-normal group-data-[selected]:font-semibold">{item.name}</span>

                                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-d-blue group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                                        <CheckIcon aria-hidden="true" className="h-5 w-5" />
                                    </span>
                                </ListboxOption>
                            </Link>
                        ))}
                    </ListboxOptions>
                </div>
            </Listbox>

            {/* Worksheets Menu desktop  */}
            <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                    <nav aria-label="Tabs" className="-mb-px flex space-x-9">
                        {filteredMenu.map((tab) => (
                            <Link href={tab.path} key={tab.path}>
                                <div

                                    aria-current={tab.current ? 'page' : undefined}
                                    className={classNames(
                                        pathName === tab.path
                                            ? 'border-d-blue text-d-blue'
                                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                        'group inline-flex items-center border-b-2 px-1 py-4 text-[15px] font-semibold'
                                    )}
                                >

                                    <span>{tab.name}</span>
                                </div>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    )
}



