'use client'

import { useFormikContext } from "formik";
import { useState } from "react";
import { AuthorFormValues, WorkFormValues } from "../../AuthorFormComponents/interfaces/AuthorForm";
import { SelectDateMagazine } from "../../MagazineFormComponents/MagazineDetailsComponents/SelectDateMagazine";
import { PlacePublicationMagazineForm } from "../../MagazineFormComponents/MagazineDetailsComponents/PlacePublicationMagazineForm";
import { NumbersMagazineTable } from "../../MagazineFormComponents/MagazineDetailsComponents/NumbersMagazineTable";

interface WorkEditionsProps {
    globalStyle?: string;
    work: WorkFormValues;
    setWork: React.Dispatch<React.SetStateAction<WorkFormValues>>;
}


export const WorkEditions = ({ globalStyle, work, setWork }: WorkEditionsProps) => {

    const { values, setFieldValue } = useFormikContext<AuthorFormValues>();

    const [editiontitle, setEditiontitle] = useState('');
    const [translator, setTranslator] = useState('');
    const [language, setLanguage] = useState('')
    const [publicationDate, setPublicationDate] = useState('');
    const [publicationPlace, setPublicationPlace] = useState({ city: '', printingHouse: '', publisher: '' });
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);

    const [updateCounter, setUpdateCounter] = useState(0);

    const handleAddEdition = () => {
        // Verificar que todos los campos requeridos no estén vacíos
        if (!editiontitle) {
            alert('Debe colocar el titulo de la edicion');
            return; // Salir de la función 
        }

        const newEdition = { editiontitle, publicationDate, publicationPlace, language, translator };

        if (editingIndex !== null) {
            // Editando una edición existente
            const updatedEditions = work.editions.map((edition, index) =>
                index === editingIndex ? newEdition : edition
            );
            setWork({ ...work, editions: updatedEditions });
            setEditingIndex(null);
        } else {
            // Agregando una nueva edición
            const updatedEditions = [...work.editions, newEdition];
            setWork({
                ...work,
                editions: updatedEditions
            });
        }

        resetFields();
    };

    const handleDeleteEdition = (index: number) => {
        const updatedEditions = work.editions.filter((_, i) => i !== index);
        setWork({ ...work, editions: updatedEditions });
    };

    const handleEditEdition = (index: number) => {
        const edition = work.editions[index];
        setEditiontitle(edition.editiontitle);
        setPublicationDate(edition.publicationDate);
        setPublicationPlace(edition.publicationPlace);
        setLanguage(edition.language);
        setTranslator(edition.translator);
        setEditingIndex(index);
        setUpdateCounter(prev => prev + 1);
    };

    const resetFields = () => {
        setEditiontitle('');
        setSelectedDay(null);
        setSelectedMonth(null)
        setSelectedYear(null)
        setPublicationPlace({ city: '', printingHouse: '', publisher: '' });
        setLanguage('');
        setTranslator('');
    }

    return (
        <div className={`${globalStyle}`}>

            <span className={`flex text-gray-900 text-sm font-medium leading-6 mb-2`}>Ediciones publicadas</span>
            <div className="flex flex-col space-y-3">
                {/* Inputs */}
                <div className="flex flex-col col-span-3 space-y-6 w-full">
                    <div className="flex flex-col max-md:space-y-4 md:flex-row md:space-x-4">

                        <SelectDateMagazine
                            publicationDate={publicationDate}
                            setPublicationDate={setPublicationDate}
                            globalStyle={"w-full"}
                            setSelectedDay={setSelectedDay}
                            setSelectedMonth={setSelectedMonth}
                            setSelectedYear={setSelectedYear}
                            selectedMonth={selectedMonth}
                            selectedYear={selectedYear}
                            selectedDay={selectedDay}
                            updateCounter={updateCounter}
                        />
                        <input
                            id="NombreCreador"
                            type="text"
                            value={language}
                            className={`text-input w-full  rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
                        ring-gray-300 hover:ring-gray-400 h-9 placeholder:text-gray-400 focus:ring-2 focus:ring-[#003366] sm:text-sm sm:leading-6 font-normal disabled:opacity-70 disabled:cursor-not-allowed`}
                            placeholder="Idioma"
                            onChange={(e) => setLanguage(e.target.value)}
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

                    <input
                        id="NombreCreador"
                        type="text"
                        value={editiontitle}
                        className={`text-input w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
                        ring-gray-300 hover:ring-gray-400 h-9 placeholder:text-gray-400 focus:ring-2 focus:ring-[#003366] sm:text-sm sm:leading-6 font-normal disabled:opacity-70 disabled:cursor-not-allowed`}
                        placeholder="Edición"
                        onChange={(e) => setEditiontitle(e.target.value)}
                    />
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

                        <button onClick={handleAddEdition}>
                            <span className="text-sm font-medium text-white px-3 py-2 bg-d-blue rounded-md">Agregar</span>
                        </button>
                    </div>
                </div>

                {/* Tabla */}

                {/* Tabla para mostrar las ediciones */}
                <div className="flex">
                    {work.editions && (
                        <NumbersMagazineTable
                            editions={work.editions}
                            onDelete={handleDeleteEdition}
                            onEdit={handleEditEdition}
                        />
                    )}
                </div>
            </div>

        </div>
    );
};

