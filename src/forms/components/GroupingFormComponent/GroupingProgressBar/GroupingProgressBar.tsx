'use client'

import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { useFormikContext } from "formik";
import { useAlert } from "@/src/users/context/AlertContext";
import { GroupingFormValues } from "../interfaces/GroupingForm";
import { saveGroupingForm } from "@/src/app/dashboard/forms/groupingForm/actions/save-grouping-form";

const steps =
    [
        { id: '01', title: 'Agrupación', name: 'Detalles de la Agrupación', href: '/dashboard/forms/groupingForm/groupingDetails' },
        { id: '02', title: 'Críticas', name: 'Críticas', href: '/dashboard/forms/groupingForm/groupingCriticism' },
        { id: '03', title: 'Confirmar datos', name: 'Revisión', href: '/dashboard/forms/groupingForm/groupingFormReview' },
    ];


export const GroupingProgressBar = () => {

    const pathName = usePathname();
    const { id } = useParams();
    const GroupingDetails = pathName === `/dashboard/forms/groupingForm/${id}/groupingDetails`;
    const GroupingCriticisms = pathName === `/dashboard/forms/groupingForm/${id}/groupingCriticism`;
    const GroupingFormReview = pathName === `/dashboard/forms/groupingForm/${id}/groupingFormReview`;
    const { values } = useFormikContext<GroupingFormValues>();
    const { showAlert } = useAlert();

    const steps =
    [
        { id: '01', title: 'Agrupación', name: 'Detalles de la Agrupación', href: `/dashboard/forms/groupingForm/${id}/groupingDetails` },
        { id: '02', title: 'Críticas', name: 'Críticas', href: `/dashboard/forms/groupingForm/${id}/groupingCriticism` },
        { id: '03', title: 'Confirmar datos', name: 'Revisión', href: `/dashboard/forms/groupingForm/${id}/groupingFormReview` },
    ];


    const Status = (id: string) => {

        if ((GroupingDetails && id === '01') || (GroupingCriticisms && id === '02') || (GroupingFormReview && id === '03')) {
            return 'current';
        } else if ((GroupingCriticisms && id === '01') || (GroupingFormReview && (id === '01' || id === '02'))) {
            return 'complete';
        }
    }  

    const getPageTitle = () => {

        const currentRoute = steps.find(step => step.href === pathName);

        return currentRoute?.title
    };

    const handleSafeForm = async () => {

        const response = await saveGroupingForm(values, id);

        if (response.ok) {
            showAlert("Informacion guardada", "success");
        } else {
            showAlert("Error", "error");
        }
    }

    return (
        <div className='felx -flex-col'>
            <div className="flex justify-between mt-6">
                <span className="text-4xl text-d-blue font-bold ">{getPageTitle()}</span>
                {pathName != `/dashboard/forms/groupingForm/${id}/groupingFormReview` &&
                    <button
                        type="button"
                        onClick={() => handleSafeForm()}
                        className="flex justify-center items-center bg-d-blue h-[45px] w-full max-w-16 sm:max-w-32 text-white px-4 py-2 rounded-full col-span-1 md:row-span-1"
                    >
                        <span className="max-sm:hidden text-sm font-medium">Guardar</span>
                        <CloudArrowUpIcon aria-hidden="true" className="h-6 w-6 text-white sm:ml-4" />
                    </button>
                }
            </div>
            <nav aria-label="Progress">
                <ol role="list" className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0 my-7">
                    {steps.map((step, stepIdx) => (
                        <li key={step.name} className="relative md:flex md:flex-1">
                            {Status(step.id) === 'complete' ? (
                                <Link href={step.href} className="group flex w-full items-center">
                                    <span className="flex items-center px-6 py-3 text-sm font-medium">
                                        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-d-green group-hover:bg-d-green-dark">
                                            <span className="text-white group-hover:text-gray-50">{step.id}</span>
                                        </span>
                                        <span className="ml-4 text-sm font-medium text-gray-600">{step.name}</span>
                                    </span>
                                </Link>
                            ) : Status(step.id) === 'current' ? (
                                <Link href={step.href} aria-current="step" className="flex items-center px-6 py-3 text-sm font-medium">
                                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-d-green">
                                        <span className="text-d-green">{step.id}</span>
                                    </span>
                                    <span className="ml-4 text-sm font-medium text-d-green-dark">{step.name}</span>
                                </Link>
                            ) : (
                                <Link href={step.href} className="group flex items-center">
                                    <span className="flex items-center px-6 py-3 text-sm font-medium">
                                        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300 group-hover:border-gray-400">
                                            <span className="text-gray-500 group-hover:text-gray-900">{step.id}</span>
                                        </span>
                                        <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">{step.name}</span>
                                    </span>
                                </Link>
                            )}
                            {stepIdx !== steps.length - 1 ? (
                                <>
                                    {/* Arrow separator for lg screens and up */}
                                    <div aria-hidden="true" className="absolute right-0 top-0 hidden h-full w-5 md:block">
                                        <svg
                                            fill="none"
                                            viewBox="0 0 22 80"
                                            preserveAspectRatio="none"
                                            className="h-full w-full text-gray-300"
                                        >
                                            <path
                                                d="M0 -2L20 40L0 82"
                                                stroke="currentcolor"
                                                vectorEffect="non-scaling-stroke"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                </>
                            ) : null}
                        </li>
                    ))}
                </ol>
            </nav>
        </div>
    )
}
