'use client'

import { useEffect, useState } from "react";
import { SimpleInputWithoutFormik } from "../SimpleInputWithoutFormik/SimpleInputWithoutFormik";
import { SelectDateWithProps } from "../SelectDateWithProps/SelectDateWithProps";
import { ExpandableInputWork } from "../WorksFormComponents/EpandableInputWork/ExpandableInputWork";
import { MultimediaInput } from "../MultimediaInput/MultimediaInput";
import { PlusIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { useFormikContext } from "formik";
import { AuthorFormValues } from "../AuthorFormComponents/interfaces/AuthorForm";
import { ButtonWithIconLeft } from "@/src/components/ButtonWithIconLeft/ButtonWithIconLeft";
import { WorksTable } from "../WorksFormComponents/WorksTable/WorksTable";
import Link from "next/link";
import { DebugFormikValues } from "../DebugFormikValues/DebugFormikValues";
import { CrtiticismsTable } from "./CrtiticismsTable";
import { MultimediaChargedWorks } from "../WorksFormComponents/MultimediaChargedWorks/MultimediaChargedWorks";



export const CriticismsForm = () => {

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = 'authorCriticismsPreset';
    const { values, setFieldValue } = useFormikContext<AuthorFormValues>();

    const [multimediaField, setMultimediaField] = useState(
        { title: '', link: '', type: '', description: '' }
    ); 
    const [descriptionMedia, setDescriptionMedia] = useState('');
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [typeMultimediaField, setTypeMultimediaField] = useState<File | undefined>(undefined)

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const [criticisms, setCriticisms] = useState({
        title: '',
        type: '',
        author: '',
        publicationDate: '',
        link: '',
        bibliographicReference: '',
        description: '',
        multimedia: [
            {
                title: '',
                link: '',
                type: '',
                description: ''
            }
        ]
    });



    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setTypeMultimediaField(file)
        const fileType = file.type.startsWith('image') ? 'image' : 'raw';
        const fileTypeForm = file.type.split('/')[0];

        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);
        console.log(typeMultimediaField)
        console.log(imageUrl)

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${fileType}/upload`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            setImageUrl(data.secure_url); // URL segura de la imagen



            setMultimediaField((preMultimediaField) => ({
                ...preMultimediaField,
                title: file.name,
                link: data.secure_url, // URL del archivo subido
                type: fileTypeForm,        // Tipo de archivo (image o raw)
            }));
        } catch (error) {
            console.log('Error al subir la imagen:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddMultimediaField = () => {
        setMultimediaField({
            ...multimediaField,
            description: descriptionMedia,
        });
    }

    const handleDeleteMultimedia = (index: number) => {
        const updatedMultimedias = criticisms.multimedia.filter((_, i) => i !== index);
        setCriticisms({ ...criticisms, multimedia: updatedMultimedias });
    };

    const handleAddCriticisms = () => {
        const cleanedMultimedia = criticisms.multimedia.filter(media =>
            media.title || media.link || media.type || media.description
        );
        // Agregar la obra al array de works en Formik
        if (criticisms.title) {
            const updatedCriticis = { ...criticisms, multimedia: cleanedMultimedia };
            const updatedCriticisms = [...values.criticism, updatedCriticis];
            setFieldValue('criticism', updatedCriticisms);
        }
        setIsFormVisible(false)
        // Limpiar los campos del input
        setCriticisms({
            title: '',
            type: '',
            author: '',
            publicationDate: '',
            link: '',
            bibliographicReference: '',
            description: '',
            multimedia: [
                {
                    title: '',
                    link: '',
                    type: '',
                    description: ''
                }
            ]
        });
        setSelectedDay(null)
        setSelectedMonth(null)
        setSelectedYear(null)

    };

    const handleFormVisible = () => {
        setIsFormVisible(true); // Al presionar el botón, mostrar el formulario
    };

    const handleFormNotVisible = () => {
        setIsFormVisible(false); // Al presionar el botón, mostrar el formulario
    };

    useEffect(() => {
        if (multimediaField.link && multimediaField.title && multimediaField.type && multimediaField.description) {
            setCriticisms({ ...criticisms, multimedia: [...criticisms.multimedia, multimediaField] });
            setDescriptionMedia('')
        }
    }, [multimediaField.description]);
    return (
        <div className="h-calc(100vh) overflow-y-auto mb-14 px-1">
            <div>
                {
                    isFormVisible ?
                        (
                            <div className="grid grid-cols-1 gap-y-8 md:grid-cols-3 md:gap-y-7 md:gap-x-7 xl:gap-x-14 xl:gap-y-8">

                                <SimpleInputWithoutFormik
                                    id="criticisms-title"
                                    value={criticisms.title}
                                    onChange={(e) => setCriticisms({ ...criticisms, title: e.target.value })}
                                    type="text"
                                    label="Título"
                                    labelTextStyle="text-gray-900 text-sm"
                                    inputWidth="w-full h-9"
                                    focusBorderColor="focus:ring-[#003366]"
                                    globalStyle="col-span-1 md:col-span-2"
                                />

                                <SimpleInputWithoutFormik
                                    id="criticisms-type"
                                    value={criticisms.type}
                                    onChange={(e) => setCriticisms({ ...criticisms, type: e.target.value })}
                                    type="text"
                                    label="Tipo"
                                    labelTextStyle="text-gray-900 text-sm"
                                    inputWidth="w-full h-9"
                                    focusBorderColor="focus:ring-[#003366]"
                                    globalStyle="col-span-1 md:col-span-1"
                                />

                                <SimpleInputWithoutFormik
                                    id="criticisms-author"
                                    value={criticisms.author}
                                    onChange={(e) => setCriticisms({ ...criticisms, author: e.target.value })}
                                    type="text"
                                    label="Autor"
                                    labelTextStyle="text-gray-900 text-sm"
                                    inputWidth="w-full h-9"
                                    focusBorderColor="focus:ring-[#003366]"
                                    globalStyle="col-span-1 md:col-span-1"
                                />


                                <SelectDateWithProps
                                    title="Fecha de publicación"
                                    globalStyle="col-span-1"
                                    setState={setCriticisms} // Pasamos la función setWork como prop
                                    state={criticisms}
                                    setSelectedDay={setSelectedDay}
                                    setSelectedMonth={setSelectedMonth}
                                    setSelectedYear={setSelectedYear}
                                    selectedMonth={selectedMonth}
                                    selectedYear={selectedYear}
                                    selectedDay={selectedDay}
                                />

                                <SimpleInputWithoutFormik
                                    id="criticisms-link"
                                    value={criticisms.link}
                                    onChange={(e) => setCriticisms({ ...criticisms, link: e.target.value })}
                                    type="text"
                                    label="Referencia bibliográfica"
                                    labelTextStyle="text-gray-900 text-sm"
                                    inputWidth="w-full h-9"
                                    focusBorderColor="focus:ring-[#003366]"
                                    globalStyle="col-span-1 md:col-span-1"
                                />

                                <ExpandableInputWork
                                    id="criticisms-description"
                                    value={criticisms.description}
                                    onChange={(e) => setCriticisms({ ...criticisms, description: e.target.value })}
                                    label={"Descripción o resumen"}
                                    labelTextStyle={"text-gray-900 text-sm"}
                                    globalStyle={"col-span-full"}
                                />


                                <div className="col-span-full grid grid-cols-1 gap-y-8 md:gap-y-5 md:grid-rows-3 md:grid-cols-2 md:gap-x-7 xl:gap-x-14">
                                    <MultimediaInput
                                        title={"Archivos multimedia"}
                                        globalStyle={"col-span-1 md:row-span-3"}
                                        handleMultimediaFileChange={handleImageUpload}
                                        loading={loading}
                                        imageUrl={imageUrl}
                                        typeMultimediaField={typeMultimediaField}
                                    />

                                    <ExpandableInputWork
                                        id="media-description"
                                        value={descriptionMedia}
                                        onChange={(e) => setDescriptionMedia(e.target.value)}
                                        label={"Descripción"}
                                        labelTextStyle={"text-gray-900 text-sm"}
                                        globalStyle={"col-span-1 md:row-span-2"}
                                    />



                                    <button
                                        type="button"
                                        onClick={handleAddMultimediaField}
                                        className="flex justify-center items-center bg-d-blue h-[47px] w-full text-white px-4 py-2 rounded-full col-span-1 md:row-span-1"
                                    >
                                        Agregar Archivo
                                        <PlusIcon aria-hidden="true" className="h-7 w-7 text-white ml-4" />
                                    </button>

                                </div>

                                <MultimediaChargedWorks
                                    globalStyle="col-span-full md:col-sapn-3"
                                    multimedias={criticisms.multimedia}
                                    handleDeleteMultimedia={handleDeleteMultimedia}
                                />

                                <div className="flex flex-col max-md:space-y-6 max-md:w-full col-span-1 md:col-span-full md:space-x-8 md:flex-row md:justify-end md:mt-16">

                                    <button
                                        type="button"
                                        onClick={handleFormNotVisible}
                                        className="bg-red-700 text-white text-sm font-medium leading-6 md:w-[162px] py-2 rounded-full"
                                    >
                                        Cancelar
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleAddCriticisms}
                                        className="bg-d-blue text-white text-sm font-medium leading-6 md:w-[162px] py-2 rounded-full"
                                    >
                                        Cargar Obra
                                    </button>
                                </div>

                            </div>
                        ) :
                        (

                            <div className='flex flex-col mt-8'>
                                <div
                                    className='w-full flex justify-end items-end'
                                    onClick={handleFormVisible}
                                >
                                    <ButtonWithIconLeft
                                        title="Agregar Critica"
                                        textColor="text-white"
                                        backgroundColor="bg-d-green"
                                        hover="hover:bg-d-green-light"
                                        icon=<PlusIcon />
                                        iconColor="text-white"
                                    />
                                </div>
                                <CrtiticismsTable
                                    criticisms={values.criticism}
                                />
                                <div className='flex max-md:flex-col max-md:space-y-6 md:flex-row md:justify-between'>
                                    <Link href={'/dashboard/forms/authorForm/authorDetails'}>
                                        <button className={`flex max-md:justify-center rounded-full px-5 py-3 text-white bg-d-blue`}>
                                            <ArrowLeftIcon className="w-6 h-6 text-white mr-4" />
                                            <span className="text-[15px] font-medium">Anterior</span>
                                        </button>
                                    </Link>
                                    <Link href={'/dashboard/forms/authorForm/criticisms'}>
                                        <button className={`flex max-md:justify-center rounded-full px-5 py-3 text-white bg-d-blue`}>
                                            <span className="text-[15px] font-medium mr-4">Siguiente</span>
                                            <ArrowRightIcon className="w-6 h-6 text-white" />
                                        </button>
                                    </Link>


                                </div>
                            </div>
                        )
                }

            </div>
            <DebugFormikValues/>
        </div>
    )
}
