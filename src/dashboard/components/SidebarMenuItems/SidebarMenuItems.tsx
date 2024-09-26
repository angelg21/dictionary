'use client'
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

interface Props {
    path: string;
    icon: JSX.Element;
    title: string;
    onClick?: () => void
}

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

export const SidebarMenuItems = ({ path, icon: Icon, title, onClick }: Props) => {

    const { id } = useParams();
    const pathName = usePathname();

    const worksheetsPaths = [
        '/dashboard/worksheets/validatedSheets',
        '/dashboard/worksheets/sheetsToComplete',
        '/dashboard/worksheets/sheetsToReview',
        '/dashboard/worksheets/validatedSheets'
    ];

    const authorFormPaths = [
        `/dashboard/forms/authorForm/${id}/authorDetails`,
        `/dashboard/forms/authorForm/${id}/authorFormReview`,
        `/dashboard/forms/authorForm/${id}/criticisms`,
        `/dashboard/forms/authorForm/${id}/works`
    ];

    const magazineFormPaths = [
        `/dashboard/forms/magazineForm/${id}/magazineDetails`,
        `/dashboard/forms/magazineForm/${id}/magazineCriticisms`,
        `/dashboard/forms/magazineForm/${id}/magazineFormReview`
    ];

    const anthologyFormPaths = [
        `/dashboard/forms/anthologyForm/${id}/anthologyDetails`,
        `/dashboard/forms/anthologyForm/${id}/anthologyCriticism`,
        `/dashboard/forms/anthologyForm/${id}/anthologyFormReview`
    ];

    const groupingFormPaths = [
        `/dashboard/forms/groupingForm/${id}/groupingDetails`,
        `/dashboard/forms/groupingForm/${id}/groupingCriticism`,
        `/dashboard/forms/groupingForm/${id}/groupingFormReview`
    ];

    const worksheetsReviewPaths = [
        `/dashboard/workSheetReview/${id}/authorReview`,
        `/dashboard/workSheetReview/${id}/anthologyReview`,
        `/dashboard/workSheetReview/${id}/groupingReview`,
        `/dashboard/workSheetReview/${id}/magazineReview`
    ];

    // Función para verificar si el path pertenece a alguna lista
    const isActive = (currentPath: string, paths: string[]) => paths.includes(currentPath);

    // Verificación para el menú "Fichas"
    const isFichasActive = isActive(pathName, worksheetsPaths) ||
        isActive(pathName, authorFormPaths) ||
        isActive(pathName, magazineFormPaths) ||
        isActive(pathName, anthologyFormPaths) ||
        isActive(pathName, groupingFormPaths) ||
        isActive(pathName, worksheetsReviewPaths);

    const iconClasses = `
        ${pathName === path || ( isFichasActive && title === 'Fichas')
            ? 'text-d-yellow' : 'text-indigo-200 group-hover:text-white'} 
        h-6 w-6 shrink-0
    `;
    return (
        <li>
            <Link href={path} className='relative'>
                <div
                    onClick={onClick}
                    className={classNames(
                        pathName === path || (isFichasActive && title === 'Fichas')
                            ? 'bg-d-blue text-d-yellow before:content-[""] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[7px] before:rounded-full before:bg-d-yellow'
                            : 'text-indigo-200 hover:text-white',
                        'group flex gap-x-3 rounded-md p-2 text-lg font-medium leading-6  pl-5 transition-colors duration-300 ease-in-out',
                    )}
                >
                    {React.cloneElement(Icon, { className: `${iconClasses}` })}
                    {title}
                </div>
            </Link>
        </li>
    )
}