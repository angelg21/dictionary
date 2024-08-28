'use client'

import { useState } from 'react'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { TrashIcon } from '@heroicons/react/24/outline'

const people = [
    {
        id: 1,
        name: 'Wade Cooper',
        avatar:
            'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 2,
        name: 'Arlene Mccoy',
        avatar:
            'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 3,
        name: 'Devon Webb',
        avatar:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
    },
    {
        id: 4,
        name: 'Tom Cook',
        avatar:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 5,
        name: 'Tanya Fox',
        avatar:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 6,
        name: 'Hellen Schmidt',
        avatar:
            'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 7,
        name: 'Caroline Schultz',
        avatar:
            'https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 8,
        name: 'Mason Heaney',
        avatar:
            'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 9,
        name: 'Claudie Smitham',
        avatar:
            'https://images.unsplash.com/photo-1584486520270-19eca1efcce5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 10,
        name: 'Emil Schaefer',
        avatar:
            'https://images.unsplash.com/photo-1561505457-3bcad021f8ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
]
interface personItem {
    id: number;
    name: string;
    avatar: string;
}


interface SelectPersonProps {
    title: string;
    people?: personItem[];
}
export const SelectPersonInput = ({ title }: SelectPersonProps) => {

    const [selected, setSelected] = useState<personItem>(people[3])
    const [selectedItems, setSelectedItems] = useState<personItem[]>([]);

    // Add the selected item to the selectedItems array if it's not already added
    const handleAddItem = () => {
        if (!selectedItems.find(item => item.id === selected.id)) {
            setSelectedItems([...selectedItems, selected]);
        }
    };

    //Remove the selected item to the selectedItems array
    const handleRemoveItem = (id: number) => {
        setSelectedItems(selectedItems.filter(item => item.id !== id));
    };

    return (
        <div className='my-3'>
            <Listbox value={selected} onChange={setSelected} >
                <Label className="block text-sm font-medium leading-6 text-gray-900">{title}</Label>
                <div className="relative mt-2">
                    <div className='flex'>

                        <ListboxButton className="relative w-full cursor-default rounded-tl-md rounded-bl-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 focus:outline-none focus:ring-2 focus:ring-d-blue sm:text-sm sm:leading-6">
                            <span className="flex items-center">
                                <img alt="" src={selected.avatar} className="h-5 w-5 flex-shrink-0 rounded-full" />
                                <span className="text-sm font-medium ml-3 block truncate">{selected.name}</span>
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
                                value={person}
                                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-d-blue data-[focus]:text-white"
                            >
                                <div className="flex items-center">
                                    <img alt="" src={person.avatar} className="h-5 w-5 flex-shrink-0 rounded-full" />
                                    <span className="ml-3 block truncate text-sm font-medium group-data-[selected]:font-semibold">
                                        {person.name}
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

            {/* Table to display selected items */}
            {selectedItems.length > 0 && (
                <div className="mt-4">
                    <table className="min-w-full bg-white border border-gray-200">
                        <tbody>
                            {selectedItems.map((item) => (
                                <tr key={item.id} className='flex justify-between h-9'>
                                    <td className="flex items-center px-3 py-2 border-b">
                                        <img src={item.avatar} alt={item.name} className="h-5 w-5 rounded-full" />
                                        <span className='text-sm font-medium ml-3'>{item.name}</span>
                                    </td>
                                    <td className="flex items-center px-4 py-2 border-b text-center">
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
    )
}
