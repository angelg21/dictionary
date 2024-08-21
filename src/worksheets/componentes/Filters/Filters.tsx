
import React from "react"
import { BookOpenIcon, UsersIcon, FolderIcon } from '@heroicons/react/24/outline'

const WorkSheetsFilters = [
    { id: '1', title: 'Todos', Icon: <FolderIcon />, iconStyle: 'bg-d-yellow' },
    { id: '2', title: 'Autores', Icon: <UsersIcon />, iconStyle: 'bg-d-green' },
    { id: '3', title: 'Trabajos Colectivos', Icon: <BookOpenIcon />, iconStyle: 'bg-d-blue' },
]

export const Filters = () => {

    return (

        <fieldset>
            <legend className="text-[16px] font-medium text-d-gray-text leading-6 sm:hidden mb-4">Filtrar por:</legend>
            <div className="  flex items-center sm:justify-start sm:space-x-5 sm:space-y-0">
                <span className="hidden sm:flex text-[16px] font-medium text-d-gray-text" >Filtrar por: </span>
                {WorkSheetsFilters.map((filter) => (
                    <div key={filter.id} className="flex items-center mr-5">

                        <input
                            defaultChecked={filter.id === '1'}
                            id={filter.id}
                            name="notification-method"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-d-blue focus:ring-d-blue hover:ring-d-blue"
                        />
                        <div className={`p-1  ml-3 rounded-md hidden sm:flex ${filter.iconStyle}`}>
                            {React.cloneElement(filter.Icon, { className: `w-4 h-4 text-white` })}
                        </div>
                        <label htmlFor={filter.id} className="ml-2 block text-[16px] font-medium text-d-gray-text leading-6 ">
                            {filter.title}
                        </label>
                    </div>
                ))}
            </div>
        </fieldset>
    )
}
