'use client'

import { useState } from "react";
import { MagazineFormValues } from "../interfaces/MagazineForm";
import { useFormikContext } from "formik";
import { ChevronUpDownIcon, PaperClipIcon, EyeIcon } from '@heroicons/react/24/outline'
import { PreviewModalImage } from "../../AuthorFormComponents/PreviewModalImage/PreviewModalImage";




export const MagazineReview = () => {

    const { values } = useFormikContext<MagazineFormValues>();
    const [isMagazineDetailsVisible, setMagazineDetailsVisible] = useState(false);;
    const [isMagazineCriticismsVisible, setIsMagazineCriticismsVisible] = useState(false);
    const [isPreviewImageOpen, setIsPreviewImageOpen] = useState(false)
    const [fileUrl, setFileUrl] = useState('');
    const [fileType, setFileType] = useState('');

    const handleMagazineDetailsVisible = () => {
        isMagazineDetailsVisible ?
            setMagazineDetailsVisible(false)
            :
            setMagazineDetailsVisible(true)
        // Al presionar el botón, mostrar el formulario
    };
    const handleMagazineCriticismsVisible = () => {
        isMagazineCriticismsVisible ?
            setIsMagazineCriticismsVisible(false)
            :
            setIsMagazineCriticismsVisible(true)
        // Al presionar el botón, mostrar el formulario
    };

    const handleClosePreviewImage = () => {
        setIsPreviewImageOpen(false)
    };

    return (
        <div>

            <div>
                <div className='my-5'>
                    <div className="flex px-5 py-3 bg-d-blue rounded-tl-lg rounded-tr-lg justify-between" onClick={handleMagazineDetailsVisible}>
                        <h3 className="text-base font-semibold leading-7 text-white">Revista</h3>
                        <ChevronUpDownIcon className='w-5 y-5 text-white' />
                    </div>
                    {
                        isMagazineDetailsVisible && (
                            <div className="px-5 border-t rounded-bl-lg rounded-br-lg bg-white border-gray-100">
                                <dl className="divide-y divide-gray-100">
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Título</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{values.magazineTitle}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Idioma original</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{values.originalLanguage}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Números</dt>
                                        <div className='sm:col-span-4'>

                                            {values.numbers.map((number, index) =>
                                                <div key={index} className='sm:col-span-4 sm:grid space-y-4 sm:gap-y-4 sm:items-center sm:grid-cols-4'>
                                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">
                                                        <div className="flex flex-col max-sm:space-y-4 sm:flex-row sm:items-center sm:space-x-8">
                                                            <span className="text-sm font-semibold"> </span>{number.number}<br />
                                                            <div>

                                                                <span>
                                                                    <span className="text-sm font-semibold"> </span>{number.publicationPlace.city}<br />
                                                                </span>
                                                                <span>
                                                                    <span className="text-sm font-semibold"></span>{number.publicationPlace.printingHouse}<br />
                                                                </span>
                                                                <span>
                                                                    <span className="text-sm font-semibold"></span>{number.publicationPlace.publisher}<br />
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </dd>
                                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-3">{number.issueDate}</dd>
                                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-3">{number.lenguage}</dd>
                                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-3">{number.translator}</dd>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Lugar de publicación</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            <span>
                                                <span className="text-sm font-semibold">Ciudad: </span>{values.publicationPlace.city}<br />
                                            </span>
                                            <span>
                                                <span className="text-sm font-semibold">Imprenta: </span>{values.publicationPlace.printing}<br />
                                            </span>
                                            <span>
                                                <span className="text-sm font-semibold">Editorial: </span>{values.publicationPlace.publisher}<br />
                                            </span>
                                        </dd>
                                    </div> */}

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Creadores</dt>
                                        <div className='sm:col-span-2'>

                                            {values.creators.map((creator, index) =>
                                                <div key={index} className='sm:col-span-2 sm:grid sm:grid-cols-2'>
                                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-3">{creator.name}</dd>
                                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-3">{creator.role}</dd>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Secciones de la revista</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{values.sections}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Descripcion</dt>
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
                    <div className="flex px-5 py-3 bg-d-blue rounded-tl-lg rounded-tr-lg justify-between" onClick={handleMagazineCriticismsVisible}>
                        <h3 className="text-base font-semibold leading-7 text-white">Críticas</h3>
                        <ChevronUpDownIcon className='w-5 y-5 text-white' />
                    </div>
                    {
                        isMagazineCriticismsVisible && (
                            <div className="px-5 border-t rounded-bl-lg rounded-br-lg bg-white border-gray-100">
                                {
                                    values.criticism.map((criticis, index) =>
                                        (criticis.title != '') &&
                                        <dl key={index} className="divide-y divide-gray-100">
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

                                    )
                                }
                            </div>
                        )
                    }
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
