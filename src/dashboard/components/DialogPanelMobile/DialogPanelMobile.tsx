'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    TransitionChild,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
interface Props {
    path: string;
    icon: JSX.Element;
    title: string;
    sendStatusSidebar: (status: boolean) => void;
    statusSidebar: boolean;
}



function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

export const DialogPanelMobile = ({ sendStatusSidebar, statusSidebar, path, icon: Icon, title }: Props) => {

    const pathName = usePathname();
    const iconClasses = `
        ${pathName === path ? 'text-d-yellow' : 'text-indigo-200 group-hover:text-white'} 
        h-6 w-6 shrink-0
    `;

    return (
        <div>
            
        </div>
    )
}
