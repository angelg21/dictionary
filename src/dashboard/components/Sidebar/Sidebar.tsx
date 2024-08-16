import { useState } from 'react'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
} from '@headlessui/react'
import {
    Bars3Icon,
    BellIcon,
    XMarkIcon,
    BookOpenIcon,
    DocumentMagnifyingGlassIcon,
    ClipboardDocumentListIcon,
    UserGroupIcon,
    ArrowDownTrayIcon,
    UserIcon,
    ArrowLeftStartOnRectangleIcon
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { SidebarMenuItems } from '../SidebarMenuItems/SidebarMenuItems' 


interface Props {
    sendStatusSidebar: (status: boolean) => void;
    statusSidebar: boolean;
}

const navigation = [
    { name: 'Fichas', href: '#', icon: BookOpenIcon, current: true },
    { name: 'Buscador', href: '#', icon: DocumentMagnifyingGlassIcon, current: false },
    { name: 'Block de Notas', href: '#', icon: ClipboardDocumentListIcon, current: false },
    { name: 'Usuarios', href: '#', icon: UserGroupIcon, current: false },
    { name: 'Descargas', href: '#', icon: ArrowDownTrayIcon, current: false },
    { name: 'Perfil', href: '#', icon: UserIcon, current: false },
]

const menuItems = [
    {
        path: '/dashboard/files',
        title: 'Fichas',
        icon: <BookOpenIcon/>,
    },
    {
        path: '/dashboard/searcher',
        title: 'Buscador',
        icon: <DocumentMagnifyingGlassIcon/>,
    },
    {
        path: '/dashboard/notes',
        title: 'Block de notas',
        icon: <ClipboardDocumentListIcon/>,
    },
    {
        path: '/dashboard/users',
        title: 'Usuarios',
        icon: <UserGroupIcon/>,
    },
    {
        path: '/dashboard/downloads',
        title: 'Descargas',
        icon: <ArrowDownTrayIcon/>,
    },
    {
        path: '/dashboard/profile',
        title: 'Perfil',
        icon: <UserIcon/>,
    },

]

const teams = [
    { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
    { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
    { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
]
const userNavigation = [
    { name: 'Your profile', href: '#' },
    { name: 'Sign out', href: '#' },
]

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

export const Sidebar = ({sendStatusSidebar, statusSidebar}:Props) => {

    return (
        <>
            <div>
                <Dialog open={statusSidebar} onClose={sendStatusSidebar} className="relative z-50 lg:hidden">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                    />

                    <div className="fixed inset-0 flex">
                        <DialogPanel
                            transition
                            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
                        >
                            <TransitionChild>
                                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                                    <button type="button" onClick={() => sendStatusSidebar(false)} className="-m-2.5 p-2.5">
                                        <span className="sr-only">Close sidebar</span>
                                        <XMarkIcon aria-hidden="true" className="h-6 w-6 text-white" />
                                    </button>
                                </div>
                            </TransitionChild>
                            {/* Sidebar component, swap this element with another sidebar if you like */}
                            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4">
                                <div className="flex h-16 shrink-0 items-center">
                                    <img
                                        alt="Your Company"
                                        src="https://tailwindui.com/img/logos/mark.svg?color=white"
                                        className="h-8 w-auto"
                                    />
                                </div>
                                <nav className="flex flex-1 flex-col">
                                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                        <li>
                                            <ul role="list" className="-mx-2 space-y-1">
                                                {navigation.map((item) => (
                                                    <li key={item.name}>
                                                        <a
                                                            href={item.href}
                                                            className={classNames(
                                                                item.current
                                                                    ? 'bg-indigo-700 text-white'
                                                                    : 'text-indigo-200 hover:bg-indigo-700 hover:text-white',
                                                                'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                                            )}
                                                        >
                                                            <item.icon
                                                                aria-hidden="true"
                                                                className={classNames(
                                                                    item.current ? 'text-white' : 'text-indigo-200 group-hover:text-white',
                                                                    'h-6 w-6 shrink-0',
                                                                )}
                                                            />
                                                            {item.name}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                        <li className=''>
                                            <div className="text-xs font-semibold leading-6 text-indigo-200">Your teams</div>
                                            <ul role="list" className="-mx-2 mt-2 space-y-1">
                                                {teams.map((team) => (
                                                    <li key={team.name}>
                                                        <a
                                                            href={team.href}
                                                            className={classNames(
                                                                team.current
                                                                    ? 'bg-indigo-700 text-white'
                                                                    : 'text-indigo-200 hover:bg-indigo-700 hover:text-white',
                                                                'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                                            )}
                                                        >
                                                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white">
                                                                {team.initial}
                                                            </span>
                                                            <span className="truncate">{team.name}</span>
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>

                {/* Static sidebar for desktop */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
                    {/* Sidebar component */}
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-d-blue  pb-4">
                        <div className="flex h-16 shrink-0 items-center pl-[14px]">
                            <img
                                alt="Your Company"
                                src="https://tailwindui.com/img/logos/mark.svg?color=white"
                                className="h-8 w-auto"
                            />
                            <span className='ml-3 text-white'>Diccionario</span>
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" className=" space-y-5">
                                        {
                                            menuItems.map( item => (

                                                <SidebarMenuItems
                                                    key={ item.path }
                                                    //Como se le puso los mismos nombres se puede hacer asi 
                                                    {...item}
                                                />

                                            ))
                                        }
                                    </ul>
                                </li>
                                <li className="mt-auto pl-[14px]">
                                    <a
                                        href="#"
                                        className="group flex gap-x-3 rounded-md p-2 text-md font-medium leading-6 text-indigo-200 hover:text-red-500"
                                    >
                                        <ArrowLeftStartOnRectangleIcon
                                            aria-hidden="true"
                                            className="h-6 w-6 shrink-0 hover:text-red-500"
                                        />
                                        Cerrar Sesion
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}

