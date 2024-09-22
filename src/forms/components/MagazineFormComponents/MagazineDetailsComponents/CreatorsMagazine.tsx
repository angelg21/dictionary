'use client'

import { useFormikContext } from "formik";
import { MagazineFormValues } from "../interfaces/MagazineForm";
import { useEffect, useState } from "react";;
import { CreatorsMagazineTable } from "./CreatorsMagazineTable";

interface MagazineInputProps {
    globalStyle?: string;
}

export const CreatorsMagazine = ({ globalStyle }: MagazineInputProps) => {

    const { values, setFieldValue } = useFormikContext<MagazineFormValues>();
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [creators, setCreators] = useState<{ name: string, role: string }[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    // Función para agregar o modificar parientes
    const handleAddCreators = () => {
        if (!name || !role) return;

        if (editingIndex !== null) {
            // Si estamos editando un pariente, actualizamos el existente
            const updatedCreators = values.creators.map((creator, index) =>
                index === editingIndex ? { name, role } : creator
            );
            setCreators(updatedCreators);
            setFieldValue("creators", updatedCreators); // También actualiza el valor en Formik
            setEditingIndex(null);
        } else {
            // Agregamos un nuevo valor y lo concatenamos con los anteriores
            const newCreator = { name, role };
            const updatedCreators = [...creators, newCreator];

            setCreators(updatedCreators);
            setFieldValue("creators", [...values.creators, newCreator]); // Concatenar con los valores existentes
        }

        // Reseteamos los campos de entrada
        setName('');
        setRole('');
    };

    // Función para eliminar pariente
    const handleDeleteCreators = (index: number) => {
        const updatedCreators = values.creators.filter((_, i) => i !== index);
        setFieldValue("creators", updatedCreators);
    };

    // Función para editar pariente
    const handleEditCreators = (index: number) => {
        setName(values.creators[index].name);
        setRole(values.creators[index].role);
        setEditingIndex(index); // Guardamos el índice para saber cuál estamos editando
    };

    useEffect(() => {
        if (creators.length > 0 && (!values.creators)) {
            setFieldValue("creators", creators);
        }
    }, [creators]);
    return (
        <div className={`${globalStyle}`}>

                <span className={`flex text-gray-900 text-sm font-medium leading-6 mb-2`}>Creadores</span>
                <div className="flex flex-col md:flex-row  md:space-x-8">
                    {/* Inputs */}
                    <div className="flex flex-col col-span-1 space-y-6 w-full md:min-w-[215px] md:max-w-[380px]">

                        <input
                            id="NombreCreador"
                            type="text"
                            value={name}
                            className={`text-input w-full  rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
                        ring-gray-300 hover:ring-gray-400 h-9 placeholder:text-gray-400 focus:ring-2 focus:ring-[#003366] sm:text-sm sm:leading-6 font-normal disabled:opacity-70 disabled:cursor-not-allowed`}
                            placeholder="Nombres y Apellidos"
                            onChange={(e) => setName(e.target.value)}
                        />

                        <input
                            id="Tipocargo"
                            type="text"
                            value={role}
                            className={`text-input w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
                        ring-gray-300 hover:ring-gray-400 h-9 placeholder:text-gray-400 focus:ring-2 focus:ring-[#003366] sm:text-sm sm:leading-6 font-normal disabled:opacity-70 disabled:cursor-not-allowed`}
                            placeholder="Cargo"
                            onChange={(e) => setRole(e.target.value)}
                        />
                        <div className="flex md:justify-end ">

                            <button onClick={handleAddCreators}>
                                <span className="text-sm font-medium text-white px-3 py-2 bg-d-blue rounded-md">Agregar</span>
                            </button>
                        </div>
                    </div>

                    {/* Tabla */}

                    <div className="flex">
                        {values.creators.length > 0 &&
                            <CreatorsMagazineTable
                                creators={values.creators}
                                onDelete={handleDeleteCreators}
                                onEdit={handleEditCreators}
                            />
                        }
                    </div>
                </div>

        </div>
    )
}
