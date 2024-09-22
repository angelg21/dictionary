'use client'

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import { Field, useFormikContext } from 'formik';

interface SelectDateProps {
    title?: string;
    setIssueDate: React.Dispatch<React.SetStateAction<string>>;
    globalStyle?: string;
}





export const SelectDateMagazine = ({globalStyle, setIssueDate}:SelectDateProps) => {

    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);

    const currentYear = new Date().getFullYear();

    const days = Array.from({ length: 31 }, (_, i) => 31 - i); // Days 1 al 31
    const months = Array.from({ length: 12 }, (_, i) => 12 - i); // Mnths del 1 al 31
    const years = Array.from({ length: currentYear - 1700 + 1 }, (_, i) => currentYear - i); // Years 1750-currentYear

    // Obtener el contexto de Formik
    const { setFieldValue } = useFormikContext();

    // Lógica para formatear la fecha
    function formatDate(selectedDay: number | null, selectedMonth: number | null, selectedYear: number | null) {
        const monthNames = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
    
        // Si se selecciona el día, el mes y el año
        if (selectedDay !== null && selectedMonth !== null && selectedYear !== null) {
            return `${selectedDay} de ${monthNames[selectedMonth - 1]} de ${selectedYear}`;
        }
        // Si se selecciona solo el mes y el año
        else if (selectedMonth !== null && selectedYear !== null) {
            return `${monthNames[selectedMonth - 1]} de ${selectedYear}`;
        }
        // Si se selecciona solo el año
        else if (selectedYear !== null) {
            return `Año ${selectedYear}`;
        }
        // Si no se selecciona nada
        else {
            return '';
        }
    }
    

    const formattedDate = formatDate(selectedDay, selectedMonth, selectedYear);


        useEffect(() => {
            if(formattedDate)
                setIssueDate(formattedDate);
        }, [formattedDate, setIssueDate]);

    return (
        <div className={`flex flex-col ${globalStyle}`}>
            <div className='flex justify-between w-full max-w-[289px] space-x-4'>

                <div className='relative w-full'>
                    <Listbox value={selectedDay} onChange={setSelectedDay}>
                        <ListboxButton className="relative w-full max-w-[75px] h-[36px] cursor-default rounded-tl-md rounded-bl-md bg-white text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 focus:outline-none focus:ring-2 focus:ring-d-blue sm:text-sm sm:leading-6">
                            <span className="flex ">
                                {selectedDay ? (
                                    <span className="text-sm font-medium ml-4">{selectedDay}</span>
                                ) : (
                                    <span className="text-sm text-d-gray-text font-medium ml-3 ">Día</span>
                                )}
                            </span>
                            {/* <span className="md:hidden xl:flex pointer-events-none absolute inset-y-0 right-0 flex items-center mr-3">
                                <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400 " />
                            </span> */}
                        </ListboxButton>

                        <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full max-w-[75px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {days.map((day) => (
                                <ListboxOption
                                    key={day}
                                    value={day}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-4  ${active ? 'text-white bg-d-blue' : 'text-gray-900'
                                        }`
                                    }
                                >
                                    {({ selected }) => (
                                        <>
                                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                {day}
                                            </span>
                                        </>
                                    )}
                                </ListboxOption>
                            ))}
                        </ListboxOptions>
                    </Listbox>
                </div>

                <div className='relative w-full'>
                    <Listbox value={selectedMonth} onChange={setSelectedMonth}>
                        <ListboxButton className="relative w-full max-w-[75px] h-[36px] cursor-default bg-white text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 focus:outline-none focus:ring-2 focus:ring-d-blue sm:text-sm sm:leading-6">
                            <span className="flex ">
                                {selectedMonth ? (
                                    <span className="text-sm font-medium ml-4">{selectedMonth}</span>
                                ) : (
                                    <span className="text-sm text-d-gray-text font-medium ml-3 ">Mes</span>
                                )}
                            </span>
                            {/* <span className="md:hidden xl:flex pointer-events-none absolute inset-y-0 right-0 flex items-center mr-3">
                                <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                            </span> */}
                        </ListboxButton>

                        <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full max-w-[75px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {months.map((month) => (
                                <ListboxOption
                                    key={month}
                                    value={month}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-4  ${active ? 'text-white bg-d-blue' : 'text-gray-900'
                                        }`
                                    }
                                >
                                    {({ selected }) => (
                                        <>
                                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                {month}
                                            </span>
                                        </>
                                    )}
                                </ListboxOption>
                            ))}
                        </ListboxOptions>
                    </Listbox>
                </div>

                <div className='relative w-full'>
                    <Listbox value={selectedYear} onChange={setSelectedYear}>
                        <ListboxButton className="relative w-full md:max-w-[76px] xl:min-w-[90px] h-[36px] cursor-default rounded-tr-md rounded-br-md bg-white text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 focus:outline-none focus:ring-2 focus:ring-d-blue sm:text-sm sm:leading-6">
                            <span className="flex ">
                                {selectedYear ? (
                                    <span className="text-sm font-medium ml-4">{selectedYear}</span>
                                ) : (
                                    <span className="text-sm text-d-gray-text font-medium ml-3 ">Año</span>
                                )}
                            </span>
                            {/* <span className="md:hidden xl:flex pointer-events-none absolute inset-y-0 right-0 flex items-center mr-3">
                                <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                            </span> */}
                        </ListboxButton>

                        <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full md:max-w-[76px] xl:min-w-[90px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {years.map((year) => (
                                <ListboxOption
                                    key={year}
                                    value={year}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-4  ${active ? 'text-white bg-d-blue' : 'text-gray-900'
                                        }`
                                    }
                                >
                                    {({ selected }) => (
                                        <>
                                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                {year}
                                            </span>
                                        </>
                                    )}
                                </ListboxOption>
                            ))}
                        </ListboxOptions>
                    </Listbox>
                </div>
                
            </div>
        </div>
    )
}
