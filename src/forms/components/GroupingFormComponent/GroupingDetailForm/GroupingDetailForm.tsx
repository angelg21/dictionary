'use client'

import { useFormikContext } from "formik"
import { DebugFormikValues } from "../../DebugFormikValues/DebugFormikValues"
import { SelectDate } from "../../SelectDate/SelectDate"
import { SimpleInputWithLabel } from "../../SimpleInputWithLabel/SimpleInputWithLabel"
import { GroupingFormValues } from "../interfaces/GroupingForm"
import { GroupPublicationsInput } from "./GroupPublicationsInput"
import { MeetingPlaceInput } from "./MeetingPlaceInput"
import { MembersInput } from "./MembersInput"
import { useEffect, useState } from "react"
import { MultimediaInput } from "../../MultimediaInput/MultimediaInput"
import { ExpandableInputWork } from "../../WorksFormComponents/EpandableInputWork/ExpandableInputWork"
import { PlusIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { MultimediaCharged } from "../../MultimediaCharged/MultimediaCharged"
import { ExpandableInput } from "../../ExandableInput/ExpandableInput"
import Link from "next/link"


export const GroupingDetailForm = () => {
    const { values, setFieldValue } = useFormikContext<GroupingFormValues>();
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = 'groupingsPreset';

    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [multimediaField, setMultimediaField] = useState(
        { title: '', link: '', type: '', description: '' }
    );
    const [typeMultimediaField, setTypeMultimediaField] = useState<File | undefined>(undefined)
    const [descriptionMedia, setDescriptionMedia] = useState('');

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setTypeMultimediaField(file)
        setLoading(true);
        const fileType = file.type.startsWith('image') ? 'image' : 'raw';
        const fileTypeForm = file.type.split('/')[0];

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
        const updatedMultimedias = values.multimedia.filter((_, i) => i !== index);
        setFieldValue("multimedia", updatedMultimedias);
    };

    useEffect(() => {
        if (multimediaField.description) {
            setFieldValue("multimedia", [...values.multimedia, multimediaField]);
            setDescriptionMedia(''); // Resetea la descripción
        }
    }, [multimediaField.description]);

    return (
        <div className="h-calc(100vh) overflow-y-auto mb-14 px-1">
            <div className="grid grid-cols-1 gap-y-8 md:grid-cols-3 xl:gap-x-14 md:gap-y-7 md:gap-x-7 xl:gap-y-8">

                <SimpleInputWithLabel
                    id="name"
                    name={"name"}
                    type={"text"}
                    label={"Nombre de la agrupación"}
                    labelTextStyle={"text-gray-900 text-sm"}
                    inputWidth={"w-full "}
                    focusBorderColor={"focus:ring-[#003366]"}
                    globalStyle={"col-span-1 md:col-span-1"}
                />

                <MeetingPlaceInput
                    type="text"
                    label="Lugar de encuentro"
                    labelTextStyle="text-gray-900 text-sm"
                    inputWidth="w-full"
                    focusBorderColor="focus:ring-[#003366]"
                    globalStyle="col-span-1 md:col-span-2"
                />

                <SelectDate
                    name={"startDate"}
                    title="Fecha inicio"
                    globalStyle={"col-span-1"}
                />

                <SelectDate
                    name={"endDate"}
                    title="Fecha culminación"
                    globalStyle={"col-span-1"}
                />

                <SimpleInputWithLabel
                    id="generalCharacteristics"
                    name={"generalCharacteristics"}
                    type={"text"}
                    label={"Característica general"}
                    labelTextStyle={"text-gray-900 text-sm"}
                    inputWidth={"w-full "}
                    focusBorderColor={"focus:ring-[#003366]"}
                    globalStyle={"col-span-1 "}
                />

                <MembersInput
                    globalStyle={"col-span-1 md:col-span-3"}
                />

                <GroupPublicationsInput
                    globalStyle={"col-span-1 md:col-span-3"}
                />

                <ExpandableInput
                    id="descriptionGrouping"
                    name={"groupActivities"}
                    type={"text"}
                    label={"Actividades"}
                    labelTextStyle={"text-gray-900 text-sm"}
                    inputWidth={"w-full "}
                    focusBorderColor={"focus:ring-[#003366]"}
                    globalStyle={"col-span-1 md:col-span-3"}
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
                        id="description"
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

                <MultimediaCharged
                    globalStyle="col-span-full md:col-sapn-3"
                    multimedias={values.multimedia}
                    handleDeleteMultimedia={handleDeleteMultimedia}
                />

                <div className='flex col-span-full max-md:w-full justify-end md:col-span-3 mt-6'>

                    <Link href={'/dashboard/forms/groupingForm/groupingCriticism'}>
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
