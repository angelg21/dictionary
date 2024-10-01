'use client'

import { useFormikContext } from "formik";
import { GroupingFormValues } from "../interfaces/GroupingForm";
import { useEffect, useState } from "react";
import { ExpandableInputWork } from "../../WorksFormComponents/EpandableInputWork/ExpandableInputWork";
import { GroupingPublicationTable } from "./GroupingPublicationTable";


interface PublicationInputProps {
    globalStyle?: string;
}

export const GroupPublicationsInput = ({globalStyle}: PublicationInputProps) => {

    const { values, setFieldValue } = useFormikContext<GroupingFormValues>();
    const [title, setTitle] = useState('');
    const [year, setYear] = useState<number | ''>('');
    const [authors, setAuthors] = useState('');
    const [summary, setSummary] = useState('');
    const [publications, setPublications] = useState<{ title: string, year: number|'', authors: string, summary: string }[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const handleAddPublications = () => {
        if (!title ) return;

        if (editingIndex !== null) {
            // Si estamos editando un pariente, actualizamos el existente
            const updatedPublications = values.groupPublications.map((publication, index) =>
                index === editingIndex ? { title, year, authors, summary } : publication
            );
            setPublications(updatedPublications);
            setFieldValue("groupPublications", updatedPublications); // También actualiza el valor en Formik
            setEditingIndex(null);
        } else {
            // Agregamos un nuevo valor y lo concatenamos con los anteriores
            const newPublication = { title, year, authors, summary };
            const updatedPublications = [...publications, newPublication];

            setPublications(updatedPublications);
            setFieldValue("groupPublications", Array.isArray(values.groupPublications) 
            ? [...values.groupPublications, newPublication] 
            : [newPublication]); // Concatenar con los valores existentes
        }

        // Reseteamos los campos de entrada
        setTitle('');
        setYear('');
        setAuthors('');
        setSummary('');
    };

    // Función para eliminar pariente
    const handleDeletePublications = (index: number) => {
        const updatedPublications = values.groupPublications.filter((_, i) => i !== index);
        setFieldValue("groupPublications", updatedPublications);
    };

    // Función para editar pariente
    const handleEditPublications = (index: number) => {
        setTitle(values.groupPublications[index].title);
        setYear(values.groupPublications[index].year);
        setAuthors(values.groupPublications[index].authors);
        setSummary(values.groupPublications[index].summary);
        setEditingIndex(index); // Guardamos el índice para saber cuál estamos editando
    };

    useEffect(() => {
        if (publications.length > 0 && (!values.groupPublications)) {
            setFieldValue("groupPublications", publications);
        }
    }, [publications]);

    return (
        <div className={`${globalStyle}`}>

            <span className={`flex text-gray-900 text-sm font-medium leading-6 mb-2`}>Publicaciones</span>
            <div className="flex flex-col md:flex-row md:space-x-8">
                {/* Inputs */}
                <div className="flex flex-col col-span-1 space-y-6 w-full md:min-w-[215px] md:max-w-[380px]">

                    <div className="flex flex-row space-x-4">

                        <input
                            key="titleInput"
                            id="title"
                            type="text"
                            value={title}
                            className={`text-input w-full  rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
                        ring-gray-300 hover:ring-gray-400 h-9 placeholder:text-gray-400 focus:ring-2 focus:ring-[#003366] sm:text-sm sm:leading-6 font-normal disabled:opacity-70 disabled:cursor-not-allowed`}
                            placeholder="Título"
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <input
                            key="yearInput"
                            id="year"
                            type="number"
                            value={year}
                            className={`text-input w-full max-w-28 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
                            ring-gray-300 hover:ring-gray-400 h-9 placeholder:text-gray-400 focus:ring-2 focus:ring-[#003366] sm:text-sm sm:leading-6 font-normal disabled:opacity-70 disabled:cursor-not-allowed`}
                            placeholder="Año"
                            onChange={(e) => setYear(parseInt(e.target.value))}
                        /> 
                    </div>

                    <input
                        type="text"
                        value={authors}
                        className={`text-input w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
                        ring-gray-300 hover:ring-gray-400 h-9 placeholder:text-gray-400 focus:ring-2 focus:ring-[#003366] sm:text-sm sm:leading-6 font-normal disabled:opacity-70 disabled:cursor-not-allowed`}
                        placeholder="Autores"
                        onChange={(e) => setAuthors(e.target.value)}
                    />

                    <ExpandableInputWork
                        id="summary"
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        label={"Descripción"}
                        labelTextStyle={"text-gray-900 text-sm"}
                        globalStyle={"md:col-span-2 md:row-span-2"}
                    />
                    <div className="flex md:justify-end ">

                        <button onClick={handleAddPublications}>
                            <span className="text-sm font-medium text-white px-3 py-2 bg-d-blue rounded-md">Agregar</span>
                        </button>
                    </div>
                </div>

                {/* Tabla */}

                <div className="flex">
                    {values.groupPublications?.length > 0 &&
                        <GroupingPublicationTable
                            publications={values.groupPublications}
                            onDelete={handleDeletePublications}
                            onEdit={handleEditPublications}
                        />
                    }
                </div>
            </div>

        </div>
    )
}
