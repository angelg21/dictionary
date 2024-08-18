import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    TransitionChild,
} from '@headlessui/react'
import {
    XMarkIcon,
    BookOpenIcon,
    DocumentMagnifyingGlassIcon,
    ClipboardDocumentListIcon,
    UserGroupIcon,
    ArrowDownTrayIcon,
    UserIcon,
    ArrowLeftStartOnRectangleIcon
} from '@heroicons/react/24/outline'
import { SidebarMenuItems } from '../SidebarMenuItems/SidebarMenuItems'
import { signOut } from 'next-auth/react';


interface Props {
    sendStatusSidebar: (status: boolean) => void;
    statusSidebar: boolean;
}


const menuItems = [
    {
        path: '/dashboard/worksheets',
        title: 'Fichas',
        icon: <BookOpenIcon />,
    },
    {
        path: '/dashboard/searcher',
        title: 'Buscador',
        icon: <DocumentMagnifyingGlassIcon />,
    },
    {
        path: '/dashboard/notes',
        title: 'Block de notas',
        icon: <ClipboardDocumentListIcon />,
    },
    {
        path: '/dashboard/users',
        title: 'Usuarios',
        icon: <UserGroupIcon />,
    },
    {
        path: '/dashboard/downloads',
        title: 'Descargas',
        icon: <ArrowDownTrayIcon />,
    },
    {
        path: '/dashboard/profile',
        title: 'Perfil',
        icon: <UserIcon />,
    },

]


const userNavigation = [
    { name: 'Your profile', href: '#' },
    { name: 'Sign out', href: '#' },
]

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

export const Sidebar = ({ sendStatusSidebar, statusSidebar }: Props) => {

    return (
        <>
            <div>
                <Dialog open={statusSidebar} onClose={sendStatusSidebar} className="relative z-50 lg:hidden">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-d-fondo transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                    />

                    <div className="fixed inset-0 flex">
                        <DialogPanel
                            transition
                            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-700 ease-in-out data-[closed]:-translate-x-full"
                        >
                            <TransitionChild>
                                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-700 ease-in-out data-[closed]:opacity-0">
                                    <button type="button" onClick={() => sendStatusSidebar(false)} className="-m-2.5 p-2.5">
                                        <span className="sr-only">Close sidebar</span>
                                        <XMarkIcon aria-hidden="true" className="h-6 w-6 text-d-blue" />
                                    </button>
                                </div>
                            </TransitionChild>

                            {/* Sidebar component */}
                            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-d-blue pb-4">
                                <div className="flex h-16 shrink-0 items-center px-5">
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
                                            <ul role="list" className=" space-y-5" >
                                                {
                                                    menuItems.map(item => (

                                                        <SidebarMenuItems
                                                            key={item.path}
                                                            onClick={() => sendStatusSidebar(false)} 
                                                            {...item}
                                                        />
                                                        
                                                    ))
                                                }
                                            </ul>
                                        </li>
                                        <li className='mt-auto mb-3 px-5'>
                                            <ul
                                                className=""
                                            >
                                                <button 
                                                    className='group flex gap-x-3 rounded-md text-md font-medium leading-6 text-indigo-200 hover:text-red-500'
                                                    onClick={() => signOut()}
                                                >    
                                                    <ArrowLeftStartOnRectangleIcon
                                                        aria-hidden="true"
                                                        className="h-6 w-6 shrink-0 hover:text-red-500"
                                                    />
                                                    Cerrar Sesion
                                                </button>
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
                                            menuItems.map(item => (

                                                <SidebarMenuItems
                                                    key={item.path}
                                                    {...item}
                                                />

                                            ))
                                        }
                                    </ul>
                                </li>
                                <li className="mt-auto pl-[14px]">
                                    <ul
                                        className=""
                                    >
                                        <button 
                                            className='group flex gap-x-3 rounded-md p-2 text-md font-medium leading-6 text-indigo-200 hover:text-red-500'
                                            onClick={() => signOut()}
                                        >
                                            <ArrowLeftStartOnRectangleIcon
                                                aria-hidden="true"
                                                className="h-6 w-6 shrink-0 hover:text-red-500"
                                            />
                                            Cerrar Sesion
                                        </button>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}

