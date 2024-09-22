'use client'

import { useEffect, useState } from "react";
import { GroupingFormValues } from "../interfaces/GroupingForm";
import { useFormikContext } from "formik";
import { MembersTable } from "./MembersTable";



interface MembersInputProps {
    globalStyle?: string;
}


export const MembersInput = ({ globalStyle }: MembersInputProps) => {

    const { values, setFieldValue } = useFormikContext<GroupingFormValues>();
    const [name, setName] = useState('');
    const [ members, setMembers] = useState<string []>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    // Función para agregar o modificar parientes
    const handleAddMembers = () => {
        if (!name) return;

        if (editingIndex !== null) {
            // Si estamos editando un pariente, actualizamos el existente
            const updatedMembers = values.members.map((member, index) =>
                index === editingIndex ? name: member
            );
            setMembers(updatedMembers);
            setFieldValue("members", updatedMembers); // También actualiza el valor en Formik
            setEditingIndex(null);
        } else {
            // Agregamos un nuevo valor y lo concatenamos con los anteriores
            const updatedMembers = [...members, name];

            setMembers(updatedMembers);
            setFieldValue("members", [...values.members, name]); // Concatenar con los valores existentes
        }

        // Reseteamos los campos de entrada
        setName('');
    };

    // Función para eliminar pariente
    const handleDeleteMembers = (index: number) => {
        const updatedmembers = values.members.filter((_, i) => i !== index);
        setFieldValue("members", updatedmembers);
    };

    // Función para editar pariente
    const handleEditMembers = (index: number) => {
        setName(values.members[index]);
        setEditingIndex(index); // Guardamos el índice para saber cuál estamos editando
    };

    useEffect(() => {
        if (members.length > 0 && (!values.members)) {
            setFieldValue("members", members);
        }
    }, [members]);

    return (
        <div className={`${globalStyle}`}>

                <span className={`flex text-gray-900 text-sm font-medium leading-6 mb-2`}>Creadores</span>
                <div className="flex flex-col md:flex-row md:space-x-8">
                    {/* Inputs */}
                    <div className="flex flex-col col-span-1 space-y-6 w-full md:min-w-[215px] md:max-w-[380px]">

                        <input
                            id="members"
                            type="text"
                            value={name}
                            className={`text-input w-full  rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
                        ring-gray-300 hover:ring-gray-400 h-9 placeholder:text-gray-400 focus:ring-2 focus:ring-[#003366] sm:text-sm sm:leading-6 font-normal disabled:opacity-70 disabled:cursor-not-allowed`}
                            placeholder="Nombres y Apellidos"
                            onChange={(e) => setName(e.target.value)}
                        />

                        <div className="flex md:justify-end ">

                            <button onClick={handleAddMembers}>
                                <span className="text-sm font-medium text-white px-3 py-2 bg-d-blue rounded-md">Agregar</span>
                            </button>
                        </div>
                    </div>

                    {/* Tabla */}

                    <div className="flex">
                        {values.members.length > 0 &&
                            <MembersTable
                                members={values.members}
                                onDelete={handleDeleteMembers}
                                onEdit={handleEditMembers}
                            />
                        }
                    </div>
                </div>

        </div>
    )
}
