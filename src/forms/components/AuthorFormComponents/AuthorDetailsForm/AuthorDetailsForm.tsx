'use client'

import { useParams } from "next/navigation";
import { CheckTypeGender } from "../CheckTypeGender/CheckTypeGender"
import { DebugFormikValues } from "../../DebugFormikValues/DebugFormikValues"
import { ExpandableInput } from "../../ExandableInput/ExpandableInput"
import { FamilyInput } from "../FamilyInput/FamilyInput"
import { MultimediaCharged } from "../../MultimediaCharged/MultimediaCharged"
import { MultimediaInput } from "../../MultimediaInput/MultimediaInput"
import { SelectDate } from "../../SelectDate/SelectDate"
import { SimpleInputWithLabel } from "../../SimpleInputWithLabel/SimpleInputWithLabel"
import Link from "next/link"
import { ArrowRightIcon, PlusIcon } from '@heroicons/react/24/outline'
import { ExpandableInputWork } from "../../WorksFormComponents/EpandableInputWork/ExpandableInputWork"
import { useEffect, useState } from "react"
import { useFormikContext } from "formik"
import { AuthorFormValues } from "../interfaces/AuthorForm"
import { DescriptionMultimedia } from "../DescriptionMultimedia/DescriptionMultimedia";


export const AuthorDetailsForm = () => {

    const { id } = useParams();

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = 'authorsPreset';
    const { values, setFieldValue } = useFormikContext<AuthorFormValues>();

    const [descriptionMedia, setDescriptionMedia] = useState('');
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [multimediaField, setMultimediaField] = useState(
        { title: '', link: '', type: '', description: '' }
    );
    const [typeMultimediaField, setTypeMultimediaField] = useState<File | undefined>(undefined)
    // const [mediaFields, setMediaFields] = useState(
    //     [{ title: '', link: '', type: '', description: '' }]
    // );

    // const isMultimediaFieldEmpty = (multimediaField: { title: any; link: any; type: any; description: any }) => {
    //     return !multimediaField.title && !multimediaField.link && !multimediaField.type && !multimediaField.description;
    // };
    
    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setLoading(true);
        const fileType = file.type.startsWith('image') ? 'image' : 'raw';
        const fileTypeForm = file.type.split('/')[0];
        setTypeMultimediaField(file)
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);

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
        setMultimediaField((prev) => ({
            ...prev,
            description: descriptionMedia, // Añade la descripción ingresada por el usuario
        }));
    }

    const handleDeleteMultimedia = (index: number) => {
        const updatedMultimedias = values.multimedia.filter((_, i) => i !== index);
        console.log(updatedMultimedias)
        // setMediaFields(updatedMultimedias);
        setFieldValue("multimedia", updatedMultimedias)
    };

    useEffect(() => {
        // Solo añade a mediaFields cuando tanto el link como la descripción están presentes
        if (multimediaField.link && multimediaField.description) {
            const updatedMediaFields = [...values.multimedia, multimediaField];
            // setMediaFields(updatedMediaFields);
            setFieldValue("multimedia", updatedMediaFields); // Actualiza el valor en Formik
            setDescriptionMedia('');
            setMultimediaField({ title: '', link: '', type: '', description: '' })
            setImageUrl('')
            setTypeMultimediaField(undefined)
        }
    }, [multimediaField.description]);

    return (
        <div className="h-calc(100vh) overflow-y-auto mb-14 px-1">
            <div className="grid grid-cols-1 gap-y-8 md:grid-cols-3 xl:gap-x-14 md:gap-y-7 md:gap-x-7 xl:gap-y-8">

                <SimpleInputWithLabel
                    id="fulltName"
                    name={"fullName"}
                    type={"text"}
                    label={"Nombre completo"}
                    labelTextStyle={"text-gray-900 text-sm"}
                    inputWidth={"w-full "}
                    focusBorderColor={"focus:ring-[#003366]"}
                    globalStyle={"col-span-1 md:col-span-2"}
                />

                <CheckTypeGender
                    name={"gender"}
                    globalStyle={"col-span-1"}
                />

                <SimpleInputWithLabel
                    id="pseudonym"
                    name={"pseudonym"}
                    type={"text"}
                    label={"Seudónimo"}
                    labelTextStyle={"text-gray-900 text-sm"}
                    inputWidth={"w-full"}
                    focusBorderColor={"focus:ring-[#003366]"}
                    globalStyle={"col-span-1"}
                />

                <SelectDate
                    name={"dateOfBirth"}
                    title="Fecha de nacimiento"
                    globalStyle={"col-span-1"}
                />

                <SelectDate
                    name={"dateOfDeath"}
                    title="Fecha de fallecimiento"
                    globalStyle={"col-span-1"}
                />


                <div className="col-span-full grid grid-cols-1 gap-y-8 md:grid-cols-2 md:gap-x-7 xl:gap-x-14">
                    <SimpleInputWithLabel
                        id="placeOfBirth"
                        name={"placeOfBirth"}
                        type={"text"}
                        label={"Lugar de nacimiento"}
                        labelTextStyle={"text-gray-900 text-sm"}
                        inputWidth={"w-full"}
                        focusBorderColor={"focus:ring-[#003366]"}
                        globalStyle={"col-span-1"}
                    />

                    <SimpleInputWithLabel
                        id="placeOfDeath"
                        name={"placeOfDeath"}
                        type={"text"}
                        label={"Lugar de fallecimiento"}
                        labelTextStyle={"text-gray-900 text-sm"}
                        inputWidth={"w-full "}
                        focusBorderColor={"focus:ring-[#003366]"}
                        globalStyle={"col-span-1"}
                    />
                </div>

                <FamilyInput
                    globalStyle={"col-span-1 md:col-span-3"}
                />

                <ExpandableInput
                    id="relevantActivities"
                    name={"relevantActivities"}
                    type={"text"}
                    label={"Actividad relevante"}
                    labelTextStyle={"text-gray-900 text-sm"}
                    inputWidth={"w-full "}
                    focusBorderColor={"focus:ring-[#003366]"}
                    globalStyle={"col-span-1"}
                />

                <div className="col-span-full grid grid-cols-1 gap-y-8 md:grid-cols-2 md:gap-x-7 xl:gap-x-14">

                    <SimpleInputWithLabel
                        id="mainTheme"
                        name={"mainTheme"}
                        type={"text"}
                        label={"Temática principal desarrollada"}
                        labelTextStyle={"text-gray-900 text-sm"}
                        inputWidth={"w-full "}
                        focusBorderColor={"focus:ring-[#003366]"}
                        globalStyle={"col-span-1 md:col-span-2"}
                    />

                    <SimpleInputWithLabel
                        id="mainGenre"
                        name={"mainGenre"}
                        type={"text"}
                        label={"Género principal cultivado"}
                        labelTextStyle={"text-gray-900 text-sm"}
                        inputWidth={"w-full "}
                        focusBorderColor={"focus:ring-[#003366]"}
                        globalStyle={"col-span-1 md:col-span-2"}
                    />
                </div>

                <div className="col-span-full grid grid-cols-1 md:gap-x-7 xl:gap-x-14">

                    <SimpleInputWithLabel
                        id="context"
                        name={"context"}
                        type={"text"}
                        label={"Contexto en que vivió"}
                        labelTextStyle={"text-gray-900 text-sm"}
                        inputWidth={"w-full "}
                        focusBorderColor={"focus:ring-[#003366]"}
                        globalStyle={"col-span-1"}
                    />

                </div>

                <div className="col-span-full grid grid-cols-1 gap-y-8 md:gap-y-5 md:grid-rows-3 md:grid-cols-2 md:gap-x-7 xl:gap-x-14">
                    <MultimediaInput
                        title={"Archivos multimedia"}
                        globalStyle={"col-span-1 md:row-span-3"}
                        handleMultimediaFileChange={handleImageUpload}
                        loading={loading}
                        imageUrl={imageUrl}
                        typeMultimediaField={typeMultimediaField}
                    />

                    <DescriptionMultimedia
                        id="description"
                        value={descriptionMedia}
                        onChange={(e) => setDescriptionMedia(e.target.value)}
                        label={"Descripción"}
                        labelTextStyle={"text-gray-900 text-sm"}
                        globalStyle={"col-span-1 md:row-span-2"}
                        multimediaLink={multimediaField.link}
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

                <MultimediaCharged
                    globalStyle="col-span-full md:col-sapn-3"
                    multimedias={values.multimedia}
                    handleDeleteMultimedia={handleDeleteMultimedia}
                />

                <div className='flex col-span-full max-md:w-full justify-end md:col-span-3 mt-6'>

                    <Link href={`/dashboard/forms/authorForm/${id}/works`}>
                        <button className={`flex max-md:justify-center rounded-full px-5 py-3 text-white bg-d-blue`}>
                            <span className="text-[15px] font-medium mr-4">Siguiente</span>
                            <ArrowRightIcon className="w-6 h-6 text-white" />
                        </button>
                    </Link>

                </div>
            </div>
        </div>
    )
}
