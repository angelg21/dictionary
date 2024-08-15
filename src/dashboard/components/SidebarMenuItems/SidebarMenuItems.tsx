'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface Props {
    path: string;
    icon: JSX.Element;
    title: string;
}

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

export const SidebarMenuItems = ({ path, icon: Icon, title }: Props) => {

    const pathName = usePathname();

    const iconClasses = `
        ${pathName === path ? 'text-d-yellow' : 'text-indigo-200 group-hover:text-white'} 
        h-6 w-6 shrink-0
    `;
    return (
        <li>
            <Link href={path} className='relative'>
                <div
                    className={classNames(
                        pathName === path
                            ? 'bg-d-blue text-d-yellow before:content-[""] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[7px] before:rounded-full before:bg-d-yellow'
                            : 'text-indigo-200 hover:text-white',
                        'group flex gap-x-3 rounded-md p-2 text-lg font-medium leading-6  pl-4',
                    )}
                >
                    {React.cloneElement(Icon, { className: `${iconClasses}` })}
                    {title}
                </div>
            </Link>
        </li>
    )
}