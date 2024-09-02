'use client';
import { useState, useEffect } from 'react';
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { TrashIcon } from '@heroicons/react/24/outline';
import { getUsersByRole } from '@/src/worksheets/actions/get-users-byrole';

interface personItem {
    id: string;
    fullName: string;
    imageUrl: string;
}

interface SelectPersonProps {
    title: string;
    type: 'editor' | 'reviewer';
    excludeIds?: string[];
    onAdd: (id: string) => void;
    onRemove: (id: string) => void;
    currentSelection: string | null; // Agregar para manejar la selección actual
    onSelectionChange: (id: string | null) => void; // Agregar para manejar los cambios de selección
}

export const SelectPersonInput = ({ title, type, excludeIds = [], onAdd, onRemove, currentSelection, onSelectionChange }: SelectPersonProps) => {
    const [selectedItems, setSelectedItems] = useState<personItem[]>([]);
    const [people, setPeople] = useState<personItem[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await getUsersByRole({ type, excludeIds });
            if (response.ok) {
                setPeople(response.data);
            } else {
                console.error(response.message);
            }
        };
        fetchUsers();
    }, [type, excludeIds]);

    const handleAddItem = () => {
        if (currentSelection && !selectedItems.find(item => item.id === currentSelection)) {
            const selectedPerson = people.find(person => person.id === currentSelection);
            if (selectedPerson) {
                setSelectedItems([...selectedItems, selectedPerson]);
                onAdd(currentSelection);
                onSelectionChange(null);
            }
        }
    };

    const handleRemoveItem = (id: string) => {
        setSelectedItems(selectedItems.filter(item => item.id !== id));
        onRemove(id);
    };

    return (
        <div className='my-3'>
            <Listbox value={currentSelection} onChange={onSelectionChange}>
                <Label className="block text-sm font-medium leading-6 text-gray-900">{title}</Label>
                <div className="relative mt-2">
                    <div className='flex'>
                        <ListboxButton className="relative w-full cursor-default rounded-tl-md rounded-bl-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 focus:outline-none focus:ring-2 focus:ring-d-blue sm:text-sm sm:leading-6">
                            <span className="flex items-center">
                                {currentSelection ? (
                                    <>
                                        {people.find(person => person.id === currentSelection)?.imageUrl !== '' ? (
                                            <img alt="" src={people.find(person => person.id === currentSelection)?.imageUrl} className="h-5 w-5 flex-shrink-0 rounded-full" />
                                        ) : (
                                            <span className="inline-block h-5 w-5 overflow-hidden rounded-full bg-gray-100">
                                                <svg fill="currentColor" viewBox="0 0 24 24" className="h-full w-full text-gray-300">
                                                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                </svg>
                                            </span>
                                        )}
                                        <span className="text-sm font-medium ml-3 block truncate">{people.find(person => person.id === currentSelection)?.fullName}</span>
                                    </>
                                ) : (
                                    <span className="text-sm font-medium ml-3 block truncate">Seleccionar...</span>
                                )}
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                            </span>
                        </ListboxButton>

                        <button
                            type='button'
                            className='flex justify-center items-center h-[36px] w-full max-w-24 bg-d-blue hover:bg-[#00284D] rounded-tr-md rounded-br-md '
                            onClick={handleAddItem}
                        >
                            <span className='font-medium text-sm text-white '>Agregar</span>
                        </button>
                    </div>

                    <ListboxOptions
                        transition
                        className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                    >
                        {people.map((person) => (
                            <ListboxOption
                                key={person.id}
                                value={person.id}
                                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-d-blue data-[focus]:text-white"
                            >
                                <div className="flex items-center">
                                    {person.imageUrl !== '' ? (
                                        <img alt="" src={person.imageUrl} className="h-5 w-5 flex-shrink-0 rounded-full" />
                                    ) : (
                                        <span className="inline-block h-5 w-5 overflow-hidden rounded-full bg-gray-100">
                                            <svg fill="currentColor" viewBox="0 0 24 24" className="h-full w-full text-gray-300">
                                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                            </span>
                                        )}
                                    <span className="ml-3 block truncate text-sm font-medium group-data-[selected]:font-semibold">
                                        {person.fullName}
                                    </span>
                                </div>

                                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-d-blue group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                                    <CheckIcon aria-hidden="true" className="h-5 w-5" />
                                </span>
                            </ListboxOption>
                        ))}
                    </ListboxOptions>
                </div>
            </Listbox>

            {selectedItems.length > 0 && (
                <div className="mt-4 max-h-[72px] overflow-y-auto overflow-hidden">
                    <table className="min-w-full bg-white border border-gray-200 overflow-y-auto">
                        <tbody>
                            {selectedItems.map((item) => (
                                <tr key={item.id} className='flex justify-between h-9 border-b'>
                                    <td className="flex items-center px-3 py-2">
                                        {item.imageUrl !== '' ? (
                                            <img alt={item.fullName} src={item.imageUrl} className="h-5 w-5 rounded-full" />
                                        ) : (
                                            <span className="inline-block h-5 w-5 overflow-hidden rounded-full bg-gray-100">
                                                <svg fill="currentColor" viewBox="0 0 24 24" className="h-full w-full text-gray-300">
                                                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                </svg>
                                            </span>
                                        )}
                                        <span className='text-sm font-medium ml-3'>{item.fullName}</span>
                                    </td>
                                    <td className="flex items-center px-4 py-2 text-center">
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveItem(item.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

