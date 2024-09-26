'use client'

import { ValidateAuthorWorkSheet } from '@/src/app/dashboard/workSheetReview/actions/validate-author-worksheet';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useParams, useRouter } from "next/navigation";
import { useAlert } from '@/src/users/context/AlertContext';
import { AuthorCardData } from '../../interfaces/AuthorWorkSheetReview';
import { RejectWorksheet } from '@/src/app/dashboard/workSheetReview/actions/reject-worksheet';


export const AuthorReviewComponent: React.FC<{ data: AuthorCardData }> = ({ data }) => {

    const [isLoadingValidate, setIsLoadingValidate] = useState(false);
    const [isLoadingRejected, setIsLoadingRejected] = useState(false);
    const [observation, setObservation] = useState('');
    const [authorText, setAuthorText] = useState(data.author.text);
    const [worksText, setWorksText] = useState(data.works.map(work => work.text));
    const [criticismText, setCriticismText] = useState(data.criticism.map(criticism => criticism.text));
    const { showAlert } = useAlert();
    const { id } = useParams();
    const router = useRouter();

    const [showObservation, setShowObservation] = useState(false); // Controla la visibilidad del campo de observación
    const [showRejectButton, setShowRejectButton] = useState(false); // Controla la visibilidad del botón de rechazar

    const handleValidateAuthor = async () => {
        setIsLoadingValidate(true)
        const validatedData = {
            text: authorText,
            works: worksText,
            criticism: criticismText
        };

        const response = await ValidateAuthorWorkSheet(validatedData, id);
        if (response.ok) {
            showAlert("Ficha validada", "success");
            setIsLoadingValidate(false);
            router.push('/dashboard/worksheets/allSheets')
        } else {
            showAlert("Error al validar la ficha", "error");
            setIsLoadingValidate(false)
        }
    }

    const handleRejectToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowObservation(e.target.checked); // Muestra o esconde el campo de observación
        setShowRejectButton(e.target.checked); // Muestra o esconde el botón de rechazar
    };

    const handleRejectWorksheet = async () => {
        setIsLoadingRejected(true)
        const response = await RejectWorksheet(observation, id);
        if (response.ok) {
            showAlert("Ficha Rechazada", "success");
            setIsLoadingRejected(false);
            router.push('/dashboard/worksheets/allSheets')
        } else {
            showAlert("Error al rechazar la ficha", "error");
            setIsLoadingRejected(false)
        }
    }
    return (
        <div className='flex flex-col space-y-9 mb-12'>
            <div>
                <span className='flex text-d-blue text-2xl font-bold mb-6'>{data.author.title}</span>
                <form action="#">
                    <TabGroup defaultIndex={1}>
                        <TabList className="group flex items-center">
                            <Tab className="rounded-md outline-none bg-d-blue px-3 py-1.5 text-sm font-medium text-white data-[selected]:hover:bg-gray-50 data-[selected]:hover:text-gray-900 data-[selected]:bg-white data-[selected]:text-gray-500">
                                Editar
                            </Tab>
                            <Tab className="ml-2 rounded-md outline-none bg-d-blue px-3 py-1.5 text-sm font-medium text-white data-[selected]:hover:bg-gray-50 data-[selected]:hover:text-gray-900 data-[selected]:bg-white data-[selected]:text-gray-500">
                                Vista previa
                            </Tab>
                        </TabList>
                        <TabPanels className="mt-2">
                            <TabPanel className="-m-0.5 rounded-lg p-0.5">
                                <label htmlFor="comment" className="sr-only">
                                    Comment
                                </label>
                                <div>
                                    <textarea
                                        id="comment"
                                        value={authorText}
                                        onChange={(e) => setAuthorText(e.target.value)}
                                        rows={18}
                                        placeholder="Add your comment..."
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-d-blue sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </TabPanel>
                            <TabPanel className="-m-0.5 rounded-lg p-0.5">
                                <div className="border-b">
                                    <div className="mx-px mt-px px-3 pb-12 pt-2 text-sm leading-5 text-gray-800">
                                        {authorText.split('\n').map((line, index) => (
                                            <span key={index}>
                                                {line}
                                                <br />
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </TabPanel>
                        </TabPanels>
                    </TabGroup>
                </form>
            </div>

            <div className=''>
                <span className='flex text-d-blue text-2xl font-bold mb-6'>Obras</span>
                {
                    data.works.map((work, index) => (
                        <div key={index} className='my-4'>
                            <span className='flex text-d-blue text-2xl font-bold mb-6'>{work.title}</span>
                            <form action="#">
                                <TabGroup defaultIndex={1}>
                                    <TabList className="group flex items-center">
                                        <Tab className="rounded-md outline-none bg-d-green px-3 py-1.5 text-sm font-medium text-white data-[selected]:hover:bg-gray-50 data-[selected]:hover:text-gray-900 data-[selected]:bg-white data-[selected]:text-gray-500">
                                            Editar
                                        </Tab>
                                        <Tab className="ml-2 rounded-md outline-none bg-d-green px-3 py-1.5 text-sm font-medium text-white data-[selected]:hover:bg-gray-50 data-[selected]:hover:text-gray-900 data-[selected]:bg-white data-[selected]:text-gray-500">
                                            Vista previa
                                        </Tab>
                                    </TabList>
                                    <TabPanels className="mt-2">
                                        <TabPanel className="-m-0.5 rounded-lg p-0.5">
                                            <label htmlFor="comment" className="sr-only">
                                                Comment
                                            </label>
                                            <div>
                                                <textarea
                                                    id="comment"
                                                    value={worksText[index]}
                                                    onChange={(e) => {
                                                        const newWorks = [...worksText];
                                                        newWorks[index] = e.target.value;
                                                        setWorksText(newWorks);
                                                    }}
                                                    rows={15}
                                                    placeholder="Add your comment..."
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-d-green sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </TabPanel>
                                        <TabPanel className="-m-0.5 rounded-lg p-0.5">
                                            <div className="border-b">
                                                <div className="mx-px mt-px px-3 pb-12 pt-2 text-sm leading-5 text-gray-800">
                                                    {worksText[index].split('\n').map((line, index) => (
                                                        <span key={index}>
                                                            {line}
                                                            <br />
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </TabPanel>
                                    </TabPanels>
                                </TabGroup>
                            </form>
                        </div>
                    ))
                }
            </div>

            <div className=''>
                <span className='flex text-d-blue text-2xl font-bold mb-6'>Críticas</span>
                {
                    data.criticism.map((criticism, index) => (
                        <div key={index} className='my-4'>
                            <span className='flex text-d-blue text-2xl font-bold mb-6'>{criticism.title}</span>
                            <form action="#">
                                <TabGroup defaultIndex={1}>
                                    <TabList className="group flex items-center">
                                        <Tab className="rounded-md outline-none bg-d-yellow px-3 py-1.5 text-sm font-medium text-white data-[selected]:hover:bg-gray-50 data-[selected]:hover:text-gray-900 data-[selected]:bg-white data-[selected]:text-gray-500">
                                            Editar
                                        </Tab>
                                        <Tab className="ml-2 rounded-md outline-none bg-d-yellow px-3 py-1.5 text-sm font-medium text-white data-[selected]:hover:bg-gray-50 data-[selected]:hover:text-gray-900 data-[selected]:bg-white data-[selected]:text-gray-500">
                                            Vista previa
                                        </Tab>
                                    </TabList>
                                    <TabPanels className="mt-2">
                                        <TabPanel className="-m-0.5 rounded-lg p-0.5">
                                            <label htmlFor="comment" className="sr-only">
                                                Comment
                                            </label>
                                            <div>
                                                <textarea
                                                    id="comment"
                                                    value={criticismText[index]}
                                                    onChange={(e) => {
                                                        const newCriticism = [...criticismText];
                                                        newCriticism[index] = e.target.value;
                                                        setCriticismText(newCriticism);
                                                    }}
                                                    rows={15}
                                                    placeholder="Add your comment..."
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-d-yellow sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </TabPanel>
                                        <TabPanel className="-m-0.5 rounded-lg p-0.5">
                                            <div className="border-b">
                                                <div className="mx-px mt-px px-3 pb-12 pt-2 text-sm leading-5 text-gray-800">
                                                    {criticismText[index].split('\n').map((line, index) => (
                                                        <span key={index}>
                                                            {line}
                                                            <br />
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </TabPanel>
                                    </TabPanels>
                                </TabGroup>
                            </form>
                        </div>
                    ))
                }
            </div>

            {/* Checkbox para agregar observación */}
            <div className='mt-4'>
                <label className='flex items-center'>
                    <input
                        type="checkbox"
                        name="observationCheckbox"
                        className='text-d-blue focus:ring-d-blue hover:ring-d-blue mr-2'
                        checked={showObservation}
                        onChange={handleRejectToggle}
                    />
                    <span className='text-sm font-medium'>¿Desea agregar una observación para rechazar la ficha?</span>
                </label>
            </div>

            {/* Campo de observación, visible solo si el radio está marcado */}
            {showObservation && (
                <div className='mt-4'>
                    <span className='flex text-d-blue text-2xl font-bold mb-6'>Observaciones</span>
                    <textarea
                        id="observation"
                        value={observation}
                        onChange={(e) => setObservation(e.target.value)}
                        rows={5}
                        placeholder="Agregue su observación..."
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-700 sm:text-sm sm:leading-6"
                    />
                </div>
            )}


            <div className='flex justify-end w-full'>
                <div className='flex flex-col max-sm:space-y-4 sm:flex-row sm:space-x-5 w-full justify-end'>

                    {showRejectButton && (
                        <button
                            type="button"
                            className="flex justify-center items-center bg-red-600 hover:bg-red-700 h-[45px] w-full sm:max-w-40 text-white px-4 py-2 rounded-full mt-8 md:mt-14 mb-8"
                            onClick={() => handleRejectWorksheet()}
                        >
                            <span className="text-sm font-medium text-white">Rechazar</span>
                            {isLoadingRejected ?
                                <img src="/assets/loading (1).png" alt="show-password-icon" className='animate-spin ml-4' />
                                :
                                <XMarkIcon aria-hidden="true" className="h-6 w-6  text-white ml-4" />
                            }
                        </button>
                    )}

                    <button
                        type="button"
                        className="flex justify-center items-center bg-d-green-light hover:bg-d-green-dark h-[45px] w-full sm:max-w-40 text-white px-4 py-2 rounded-full mt-8 md:mt-14 mb-8"
                        onClick={() => handleValidateAuthor()}
                    >
                        <span className="text-sm font-medium text-white">Validar ficha</span>
                        {isLoadingValidate ?
                            <img src="/assets/loading (1).png" alt="show-password-icon" className='animate-spin ml-4' />
                            :
                            <ArrowUpTrayIcon aria-hidden="true" className="h-6 w-6  text-white ml-4" />
                        }
                    </button>

                </div>

            </div>
        </div>
    )
}

