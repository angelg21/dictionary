'use client'

import { useFormikContext } from "formik";
import { PreviewModalImage } from "../../AuthorFormComponents/PreviewModalImage/PreviewModalImage";
import { AnthologyFormValues } from "../interfaces/AnthologyForm";
import { useState } from "react";
import { ChevronUpDownIcon, PaperClipIcon, EyeIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline'
import { useAlert } from "@/src/users/context/AlertContext";
import { useRouter } from 'next/navigation';
import { loadAnthologyForm } from "@/src/app/dashboard/forms/anthologyForm/actions/load-anthology-form";
import { useParams } from "next/navigation";


export const AnthologyFormsReview = () => {

    const { values } = useFormikContext<AnthologyFormValues>();
    const [isAnthologyDetailsVisible, setAnthologyDetailsVisible] = useState(false);;
    const [isAnthologyCriticismsVisible, setIsAnthologyCriticismsVisible] = useState(false);
    const [isPreviewImageOpen, setIsPreviewImageOpen] = useState(false)
    const [fileUrl, setFileUrl] = useState('');
    const [fileType, setFileType] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { showAlert } = useAlert();
    const { id } = useParams();
    const router = useRouter();

    const handleAnthologyDetailsVisible = () => {
        isAnthologyDetailsVisible ?
            setAnthologyDetailsVisible(false)
            :
            setAnthologyDetailsVisible(true)
        // Al presionar el botón, mostrar el formulario
    };
    const handleAnthologyCriticismsVisible = () => {
        isAnthologyCriticismsVisible ?
            setIsAnthologyCriticismsVisible(false)
            :
            setIsAnthologyCriticismsVisible(true)
        // Al presionar el botón, mostrar el formulario
    };

    const handleClosePreviewImage = () => {
        setIsPreviewImageOpen(false)
    };

    const handleLoadForm = async () => {
        setIsLoading(true)
        const response = await loadAnthologyForm(values, id);
        if (response.ok) {
            showAlert("Ficha agregada", "success");
            setIsLoading(false);
            localStorage.removeItem(`anthologyFormData-${id}`);
            router.push('/dashboard/worksheets/sheetsToComplete')
        } else {
            showAlert("Error al cargar la ficha", "error");
            setIsLoading(false)
        }
    }

    return (
        <div>

            <div>
                <div className='my-5'>
                    <div className="flex px-5 py-3 bg-d-blue rounded-tl-lg rounded-tr-lg justify-between" onClick={handleAnthologyDetailsVisible}>
                        <h3 className="text-base font-semibold leading-7 text-white">Antología</h3>
                        <ChevronUpDownIcon className='w-5 y-5 text-white' />
                    </div>
                    {
                        isAnthologyDetailsVisible && (
                            <div className="px-5 border-t rounded-bl-lg rounded-br-lg bg-white border-gray-100">
                                <dl className="divide-y divide-gray-100">
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Título</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{values.anthologyTitle}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Género</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{values.genre}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Autor</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{values.author}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Idioma original</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{values.originalLanguage}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Fecha de publicación</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{values.publicationDate}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Lugar de publicación</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            <span>
                                                <span className="text-sm font-semibold">Ciudad: </span>{values.publicationPlace.city}<br />
                                            </span>
                                            <span>
                                                <span className="text-sm font-semibold">Imprenta: </span>{values.publicationPlace.printingHouse}<br />
                                            </span>
                                            <span>
                                                <span className="text-sm font-semibold">Editorial: </span>{values.publicationPlace.publisher}<br />
                                            </span>
                                        </dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Descripción</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{values.description}</dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Archivos Multimedia Cargados</dt>
                                        <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                            <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">

                                                {values.multimedia.map((mediafield, index) =>
                                                    (mediafield.link != '') &&
                                                    <li key={index} className="flex items-center justify-between py-3 pl-4 pr-5 text-sm leading-6 bg-white">
                                                        <div className="flex w-0 flex-1 items-center">
                                                            <PaperClipIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-400" />
                                                            <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                                <span className="truncate font-medium">{mediafield.title}</span>
                                                            </div>
                                                        </div>
                                                        <button key={index} className="ml-4 flex-shrink-0" onClick={() => { setIsPreviewImageOpen(true); setFileUrl(mediafield.link); setFileType(mediafield.type) }}>
                                                            <EyeIcon className='w-5 h-5 text-d-blue' />
                                                        </button>
                                                    </li>
                                                )}

                                            </ul>
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        )
                    }
                </div>

                <div className='my-5'>
                    <div className="flex px-5 py-3 bg-d-green rounded-tl-lg rounded-tr-lg justify-between" onClick={handleAnthologyCriticismsVisible}>
                        <h3 className="text-base font-semibold leading-7 text-white">Críticas</h3>
                        <ChevronUpDownIcon className='w-5 y-5 text-white' />
                    </div>
                    {
                        isAnthologyCriticismsVisible && (
                            <div className="px-5 py-3 border-t rounded-bl-lg rounded-br-lg bg-white border-gray-100">
                                {
                                    values.criticism.map((criticis, index) =>
                                        (criticis.title != '') &&
                                        <div key={index} className="border border-d-green rounded-lg bg-white shadow-sm p-6 my-3">
                                            <dl className="divide-y divide-gray-100">
                                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                    <dt className="text-sm font-medium leading-6 text-gray-900">Titulo</dt>
                                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{criticis.title}</dd>
                                                </div>
                                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                    <dt className="text-sm font-medium leading-6 text-gray-900">Tipo</dt>
                                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{criticis.type}</dd>
                                                </div>
                                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                    <dt className="text-sm font-medium leading-6 text-gray-900">Fecha de publicación</dt>
                                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{criticis.publicationDate}</dd>
                                                </div>
                                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                    <dt className="text-sm font-medium leading-6 text-gray-900">Autor</dt>
                                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{criticis.author}</dd>
                                                </div>
                                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                    <dt className="text-sm font-medium leading-6 text-gray-900">Referencia Bibliográfrica</dt>
                                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{criticis.link}</dd>
                                                </div>
                                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                    <dt className="text-sm font-medium leading-6 text-gray-900">Enlace</dt>
                                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{criticis.link}</dd>
                                                </div>
                                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                    <dt className="text-sm font-medium leading-6 text-gray-900">Descripción o resumen</dt>
                                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{criticis.description}</dd>
                                                </div>
                                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                    <dt className="text-sm font-medium leading-6 text-gray-900">Archivos Multimedia Cargados</dt>
                                                    <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                        <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">

                                                            {criticis.multimedia.map((mediafield, index) =>
                                                                (mediafield.link != '') &&
                                                                <li key={index} className="flex items-center justify-between py-3 pl-4 pr-5 text-sm leading-6 bg-white">
                                                                    <div className="flex w-0 flex-1 items-center">
                                                                        <PaperClipIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-400" />
                                                                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                                            <span className="truncate font-medium">{mediafield.title}</span>
                                                                        </div>
                                                                    </div>
                                                                    <button key={index} className="ml-4 flex-shrink-0" onClick={() => { setIsPreviewImageOpen(true); setFileUrl(mediafield.link); setFileType(mediafield.type) }}>
                                                                        <EyeIcon className='w-5 h-5 text-d-blue' />
                                                                    </button>
                                                                </li>
                                                            )}

                                                        </ul>
                                                    </dd>
                                                </div>
                                            </dl>
                                        </div>

                                    )
                                }
                            </div>
                        )
                    }
                </div>

                <div className='flex justify-end w-full'>

                    <button
                        type="button"
                        className="flex justify-center items-center bg-d-green-light hover:bg-d-green-dark h-[45px] w-full sm:max-w-40 text-white px-4 py-2 rounded-full mt-8 md:mt-14 mb-8"
                        onClick={() => handleLoadForm()}
                    >
                        <span className="text-sm font-medium text-white">Subir ficha</span>
                        {isLoading ?
                            <img src="/assets/loading (1).png" alt="show-password-icon" className='animate-spin ml-4' />
                            :
                            <ArrowUpTrayIcon aria-hidden="true" className="h-6 w-6  text-white ml-4" />
                        }
                    </button>

                </div>
            </div>

            {
                isPreviewImageOpen &&

                <PreviewModalImage
                    fileUrl={fileUrl}
                    fileType={fileType}
                    onClose={handleClosePreviewImage}
                />
            }
        </div>
    )
}
