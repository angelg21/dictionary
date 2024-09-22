'use client'

import { usePathname } from "next/navigation";
import Link from "next/link";

const steps =
    [
        { id: '01', name: 'Detalles de la Antología', href: '/dashboard/forms/anthologyForm/anthologyDetails' },
        { id: '02', name: 'Críticas', href: '/dashboard/forms/anthologyForm/anthologyCriticism' },
        { id: '03', name: 'Revisión', href: '/dashboard/forms/anthologyForm/anthologyFormReview' },
    ]

export const AnthologyProgressBar = () => {

    const pathName = usePathname();
    const AnthologyDetails = pathName === '/dashboard/forms/anthologyForm/anthologyDetails';
    const AnthologyCriticisms = pathName === '/dashboard/forms/anthologyForm/anthologyCriticism';
    const AnthologyFormReview = pathName === '/dashboard/forms/anthologyForm/anthologyFormReview';

    
    const Status = (id:string) => {

        if ((AnthologyDetails && id === '01') || (AnthologyCriticisms && id === '02') || (AnthologyFormReview && id === '03') ) {
            return 'current';
        } else if ((AnthologyCriticisms && id === '01') || (AnthologyFormReview && (id === '01' || id ==='02'))  ){
            return 'complete';
        }
    }

    return (
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
    )
}
