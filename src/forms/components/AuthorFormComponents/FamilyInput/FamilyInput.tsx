'use client'

import { useEffect, useState } from "react";
import { FamilyTable } from "../FamilyTable/FamilyTable";
import { useFormikContext } from "formik";
import { AuthorFormValues } from "../interfaces/AuthorForm";




interface FamilyInputProps {
    globalStyle?: string;
}

export const FamilyInput = ({ globalStyle }: FamilyInputProps) => {
    const { values, setFieldValue } = useFormikContext<AuthorFormValues>();
    const [name, setName] = useState('');
    const [relationship, setRelationship] = useState('');
    const [relatives, setRelatives] = useState<{ name: string, relationship: string }[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    // Función para agregar o modificar parientes
    const handleAddRelative = () => {
        if (!name || !relationship) return;

        if (editingIndex !== null) {
            // Si estamos editando un pariente, actualizamos el existente
            const updatedRelatives = values.relatives.map((relative, index) =>
                index === editingIndex ? { name, relationship } : relative
            );
            setRelatives(updatedRelatives);
            setFieldValue("relatives", updatedRelatives); // También actualiza el valor en Formik
            setEditingIndex(null);
        } else {
            // Agregamos un nuevo valor y lo concatenamos con los anteriores
            const newRelative = { name, relationship };
            const updatedRelatives = [...relatives, newRelative];

            setRelatives(updatedRelatives);
            setFieldValue("relatives", [...values.relatives, newRelative]); // Concatenar con los valores existentes
        }

        // Reseteamos los campos de entrada
        setName('');
        setRelationship('');
    };

    // Función para eliminar pariente
    const handleDeleteRelative = (index: number) => {
        const updatedRelatives = values.relatives.filter((_, i) => i !== index);
        setFieldValue("relatives", updatedRelatives);
    };

    // Función para editar pariente
    const handleEditRelative = (index: number) => {
        setName(values.relatives[index].name);
        setRelationship(values.relatives[index].relationship);
        setEditingIndex(index); // Guardamos el índice para saber cuál estamos editando
    };

    useEffect(() => {
        if (relatives.length > 0 && ( !values.relatives)) {
            setFieldValue("relatives", relatives);
        }
    }, [relatives]);

    return (
        <div className={`${globalStyle}`}>
            <span className={`flex text-gray-900 text-sm font-medium leading-6 mb-2`}>Familiares</span>
            <div className="flex flex-col md:flex-row md:justify-between md:space-x-8">
                {/* Inputs */}
                <div className="flex flex-col space-y-6 w-[50%] md:min-w-[215px] ">

                    <input
                        id={name}
                        type="text"
                        value={name}
                        className={`text-input w-full  rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
                        ring-gray-300 hover:ring-gray-400 h-9 placeholder:text-gray-400 focus:ring-2 focus:ring-[#003366] sm:text-sm sm:leading-6 font-normal disabled:opacity-70 disabled:cursor-not-allowed`}
                        placeholder="Nombres y Apellidos"
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        type="text"
                        value={relationship}
                        className={`text-input w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
                        ring-gray-300 hover:ring-gray-400 h-9 placeholder:text-gray-400 focus:ring-2 focus:ring-[#003366] sm:text-sm sm:leading-6 font-normal disabled:opacity-70 disabled:cursor-not-allowed`}
                        placeholder="Parentezco"
                        onChange={(e) => setRelationship(e.target.value)}
                    />
                    <div className="flex md:justify-end ">

                        <button onClick={handleAddRelative}>
                            <span className="text-sm font-medium text-white px-3 py-2 bg-d-blue rounded-md">Agregar</span>
                        </button>
                    </div>
                </div>

                {/* Tabla */}

                <div className="flex">
                    {values.relatives.length > 0 &&
                        <FamilyTable
                            relatives={values.relatives}
                            onDelete={handleDeleteRelative}
                            onEdit={handleEditRelative}
                        />

                    }
                </div>
            </div>
        </div>
    )
}
