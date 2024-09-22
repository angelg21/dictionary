'use client'

import { PaperClipIcon } from '@heroicons/react/20/solid'
import { ChevronUpDownIcon, EyeIcon } from '@heroicons/react/24/outline'
import { useFormikContext } from 'formik';
import { useState } from 'react';
import { AuthorFormValues, Criticism } from '../interfaces/AuthorForm';
import { div } from 'framer-motion/client';
import { PreviewModalImage } from '../PreviewModalImage/PreviewModalImage';

export const AuthorFormReviews = () => {

    const { values } = useFormikContext<AuthorFormValues>();
    const [isAuthorDetailsVisible, setIsAuthorDetailsVisible] = useState(false);
    const [isWorksVisible, setIsWorksVisible] = useState(false);
    const [isCriticismsVisible, setIsCriticismsVisible] = useState(false);
    const [isPreviewImageOpen, setIsPreviewImageOpen] = useState(false)
    const [fileUrl, setFileUrl] = useState('');
    const [fileType, setFileType] = useState('');

    const handleAuthorDetailsVisible = () => {
        isAuthorDetailsVisible ?
            setIsAuthorDetailsVisible(false)
            :
            setIsAuthorDetailsVisible(true)
        // Al presionar el botón, mostrar el formulario
    };

    const handleWorksVisible = () => {
        isWorksVisible ?
            setIsWorksVisible(false)
            :
            setIsWorksVisible(true)
        // Al presionar el botón, mostrar el formulario
    };

    const handleCriticismsVisible = () => {
        isCriticismsVisible ?
            setIsCriticismsVisible(false)
            :
            setIsCriticismsVisible(true)
        // Al presionar el botón, mostrar el formulario
    };

    const handleClosePreviewImage = () => {
        setIsPreviewImageOpen(false)
    };

    return (
        <div>

            <div>
                <div className='my-5'>
                    <div className="flex px-5 py-3 bg-d-blue rounded-tl-lg rounded-tr-lg justify-between" onClick={handleAuthorDetailsVisible}>
                        <h3 className="text-base font-semibold leading-7 text-white">Autor</h3>
                        <ChevronUpDownIcon className='w-5 y-5 text-white' />
                    </div>
                    {
                        isAuthorDetailsVisible && (
                            <div className="px-5 border-t rounded-bl-lg rounded-br-lg bg-white border-gray-100">
                                <dl className="divide-y divide-gray-100">
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Nombres</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{values.fullName}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Fecha de nacimiento</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{values.dateOfBirth}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Fecha de fallecimiento</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{values.dateOfDeath}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Sexo</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{values.gender}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Seudónimo</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{values.pseudonym}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Lugar de nacimiento</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{values.placeOfBirth}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Lugar de fallecimiento</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{values.placeOfDeath}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Familiares destacados</dt>
                                        <div className='sm:col-span-2'>

                                            {values.relatives.map((relative, index) =>
                                                <div key={index} className='sm:col-span-2 sm:grid sm:grid-cols-2'>
                                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-3">{relative.name}</dd>
                                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-3">{relative.relationship}</dd>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Temática pricipal desarrollada</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{values.mainTheme}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Género principal cultivado</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{values.mainGenre}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Contexto en que vivió</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{values.context}</dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Actividad relevante</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {values.relevantActivities}
                                        </dd>
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
                    <div className="flex px-5 py-3 bg-d-blue rounded-tl-lg rounded-tr-lg justify-between" onClick={handleWorksVisible}>
                        <h3 className="text-base font-semibold leading-7 text-white">Obras</h3>
                        <ChevronUpDownIcon className='w-5 y-5 text-white' />
                    </div>
                    {
                        isWorksVisible && (
                            <div className="px-5 border-t rounded-bl-lg rounded-br-lg bg-white border-gray-100">
                                {
                                    values.works.map((work, index) =>
                                        (work.title != '') &&
                                        <dl key={index} className="divide-y divide-gray-100">
                                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                <dt className="text-sm font-medium leading-6 text-gray-900">Titulo</dt>
                                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{work.title}</dd>
                                            </div>
                                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                <dt className="text-sm font-medium leading-6 text-gray-900">Género</dt>
                                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{work.genre}</dd>
                                            </div>
                                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                <dt className="text-sm font-medium leading-6 text-gray-900">Fecha de publicación</dt>
                                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{work.publicationDate}</dd>
                                            </div>
                                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                <dt className="text-sm font-medium leading-6 text-gray-900">Idioma original</dt>
                                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{work.originalLanguage}</dd>
                                            </div>
                                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                <dt className="text-sm font-medium leading-6 text-gray-900">Descripción o resumen</dt>
                                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{work.description}</dd>
                                            </div>
                                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                <dt className="text-sm font-medium leading-6 text-gray-900">Archivos Multimedia Cargados</dt>
                                                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                    <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">

                                                        {work.multimedia.map((mediafield, index) =>
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

                <div className='my-5'>
                    <div className="flex px-5 py-3 bg-d-blue rounded-tl-lg rounded-tr-lg justify-between" onClick={handleCriticismsVisible}>
                        <h3 className="text-base font-semibold leading-7 text-white">Críticas</h3>
                        <ChevronUpDownIcon className='w-5 y-5 text-white' />
                    </div>
                    {
                        isCriticismsVisible && (
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
