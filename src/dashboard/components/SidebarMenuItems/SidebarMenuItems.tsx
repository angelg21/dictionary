'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
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

    const pathName = usePathname();
    const AuthorDetails = pathName === '/dashboard/forms/authorForm/authorDetails'
    const AuthorFormReview = pathName === '/dashboard/forms/authorForm/authorFormReview'
    const Criticisms = pathName === '/dashboard/forms/authorForm/criticisms'
    const Works = pathName === '/dashboard/forms/authorForm/works'
    const MagazineDetails = pathName === '/dashboard/forms/magazineForm/magazineDetails';
    const MagazineCriticisms = pathName === '/dashboard/forms/magazineForm/magazineCriticisms';
    const MagazineFormReview = pathName === '/dashboard/forms/magazineForm/magazineFormReview';
    const AnthologyDetails = pathName === '/dashboard/forms/anthologyForm/anthologyDetails';
    const AnthologyCriticisms = pathName === '/dashboard/forms/anthologyForm/anthologyCriticism';
    const AnthologyFormReview = pathName === '/dashboard/forms/anthologyForm/anthologyFormReview';
    const GroupingDetails = pathName === '/dashboard/forms/groupingForm/groupingDetails';
    const GroupingCriticisms = pathName === '/dashboard/forms/groupingForm/groupingCriticism';
    const GroupingFormReview = pathName === '/dashboard/forms/groupingForm/groupingFormReview';
    const iconClasses = `
        ${ pathName === path || (
            (
                pathName === '/dashboard/worksheets/allSheets' || 
                pathName === '/dashboard/worksheets/sheetsToComplete' || 
                pathName === '/dashboard/worksheets/sheetsToReview' || 
                pathName === '/dashboard/worksheets/validatedSheets' || 
                AuthorDetails || 
                AuthorFormReview || 
                Criticisms || 
                Works ||
                MagazineDetails ||
                MagazineCriticisms ||
                MagazineFormReview ||
                AnthologyDetails ||
                AnthologyCriticisms ||
                AnthologyFormReview ||
                GroupingDetails ||
                GroupingCriticisms ||
                GroupingFormReview
            ) && title === 'Fichas')
            ?'text-d-yellow' : 'text-indigo-200 group-hover:text-white'} 
        h-6 w-6 shrink-0
    `;
    return (
        <li>
            <Link href={path} className='relative'>
                <div
                    onClick={onClick}
                    className={classNames(
                        pathName === path || (
                            (
                                pathName === '/dashboard/worksheets/allSheets' || 
                                pathName === '/dashboard/worksheets/sheetsToComplete' || 
                                pathName === '/dashboard/worksheets/sheetsToReview' || 
                                pathName === '/dashboard/worksheets/validatedSheets' || 
                                AuthorDetails || 
                                AuthorFormReview || 
                                Criticisms || 
                                Works ||
                                MagazineDetails ||
                                MagazineCriticisms ||
                                MagazineFormReview ||
                                AnthologyDetails ||
                                AnthologyCriticisms ||
                                AnthologyFormReview ||
                                GroupingDetails ||
                                GroupingCriticisms ||
                                GroupingFormReview
                            )  && title === 'Fichas')
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