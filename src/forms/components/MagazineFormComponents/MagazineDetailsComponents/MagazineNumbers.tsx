'use client'

import { useFormikContext } from "formik";
import { MagazineFormValues } from "../interfaces/MagazineForm";
import { useEffect, useState } from "react";;
import { CreatorsMagazineTable } from "./CreatorsMagazineTable";
import { PlacePublicationMagazineForm } from "./PlacePublicationMagazineForm";
import { SelectDate } from "../../SelectDate/SelectDate";
import { SelectDateMagazine } from "./SelectDateMagazine";
import { NumbersMagazineTable } from "./NumbersMagazineTable";

interface MagazineInputProps {
    globalStyle?: string;
}

export const MagazineNumbers = ({ globalStyle }: MagazineInputProps) => {

    const { values, setFieldValue } = useFormikContext<MagazineFormValues>();

    const [number, setNumber] = useState('');
    const [translator, setTranslator] = useState('');
    const [lenguage, setLenguage] = useState('')
    const [issueDate, setIssueDate] = useState('');
    const [publicationPlace, setPublicationPlace] = useState({ city: '', printingHouse: '', publisher: ''});
    const [numbers, setNumbers] = useState<{ number: string, issueDate: string, publicationPlace: { city: string, printingHouse: string, publisher: string }, lenguage: string, translator: string }[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    // Función para agregar o modificar números de la revista
    const handleAddNumber = () => {
        if (!number) return;

        if (editingIndex !== null) {
            // Si estamos editando un número, actualizamos el existente
            const updatedNumbers = values.numbers.map((num, index) =>
                index === editingIndex ? { number, issueDate, publicationPlace, lenguage, translator } : num
            );
            setNumbers(updatedNumbers);
            setFieldValue("numbers", updatedNumbers); // Actualiza también en Formik
            setEditingIndex(null);
        } else {
            // Agregamos un nuevo número y lo concatenamos con los anteriores
            const newNumber = { number, issueDate, publicationPlace, lenguage, translator };
            const updatedNumbers = [...numbers, newNumber];

            setNumbers(updatedNumbers);
            setFieldValue("numbers", [...values.numbers, newNumber]); // Concatenar con los valores existentes
        }

        // Reseteamos los campos de entrada
        setNumber('');
        setIssueDate('');
        setPublicationPlace({ city: '', printingHouse: '', publisher: ''});
        setLenguage('');
        setTranslator('');
    };

    // Función para eliminar pariente
    // Función para eliminar un número
    const handleDeleteNumber = (index: number) => {
        const updatedNumbers = values.numbers.filter((_, i) => i !== index);
        setFieldValue("numbers", updatedNumbers);
    };

    // Función para editar pariente
    const handleEditNumber = (index: number) => {
        setNumber(values.numbers[index].number);
        setIssueDate(values.numbers[index].issueDate);
        setPublicationPlace(values.numbers[index].publicationPlace);
        setLenguage(values.numbers[index].lenguage);
        setTranslator(values.numbers[index].translator)
        setEditingIndex(index); // Guardamos el índice para saber cuál estamos editando
    };

    useEffect(() => {
        if (numbers.length > 0 && (!values.numbers || values.numbers[0].number === '')) {
            setFieldValue("numbers", numbers);
        }
    }, [numbers]);

    return (
        <div className={`${globalStyle}`}>

            <span className={`flex text-gray-900 text-sm font-medium leading-6 mb-2`}>Números publicados</span>
            <div className="flex flex-col space-y-3">
                {/* Inputs */}
                <div className="flex flex-col col-span-3 space-y-6 w-full">
                    <div className="flex flex-col max-md:space-y-4 md:flex-row md:space-x-4">

                        <SelectDateMagazine
                            setIssueDate={setIssueDate}
                            globalStyle={"w-full"}
                        />
                        <input
                            id="NombreCreador"
                            type="text"
                            value={number}
                            className={`text-input w-full max-w-32 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
                        ring-gray-300 hover:ring-gray-400 h-9 placeholder:text-gray-400 focus:ring-2 focus:ring-[#003366] sm:text-sm sm:leading-6 font-normal disabled:opacity-70 disabled:cursor-not-allowed`}
                            placeholder="Número"
                            onChange={(e) => setNumber(e.target.value)}
                        />
                        <input
                            id="NombreCreador"
                            type="text"
                            value={lenguage}
                            className={`text-input w-full  rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
                        ring-gray-300 hover:ring-gray-400 h-9 placeholder:text-gray-400 focus:ring-2 focus:ring-[#003366] sm:text-sm sm:leading-6 font-normal disabled:opacity-70 disabled:cursor-not-allowed`}
                            placeholder="Idioma"
                            onChange={(e) => setLenguage(e.target.value)}
                        />
                        <input
                            id="NombreCreador"
                            type="text"
                            value={translator}
                            className={`text-input w-full  rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
                        ring-gray-300 hover:ring-gray-400 h-9 placeholder:text-gray-400 focus:ring-2 focus:ring-[#003366] sm:text-sm sm:leading-6 font-normal disabled:opacity-70 disabled:cursor-not-allowed`}
                            placeholder="Traductor"
                            onChange={(e) => setTranslator(e.target.value)}
                        />
                    </div>

                    <PlacePublicationMagazineForm
                        publicationPlace={publicationPlace}
                        setPublicationPlace={setPublicationPlace}
                        type="text"
                        label="Lugar"
                        labelTextStyle="text-gray-900 text-sm"
                        inputWidth="w-full"
                        focusBorderColor="focus:ring-[#003366]"
                        globalStyle=""
                    />
                    <div className="flex md:justify-end ">

                        <button onClick={handleAddNumber}>
                            <span className="text-sm font-medium text-white px-3 py-2 bg-d-blue rounded-md">Agregar</span>
                        </button>
                    </div>
                </div>

                {/* Tabla */}

                <div className="flex">
                    {values.numbers.length > 0 &&
                        <NumbersMagazineTable
                            numbers={values.numbers}
                            onDelete={handleDeleteNumber}
                            onEdit={handleEditNumber}
                        />
                    }
                </div>
            </div>

        </div>
    )
}
