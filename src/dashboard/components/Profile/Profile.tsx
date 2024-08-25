import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/react'
import { BellIcon, Bars3Icon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

interface Props {
    sendStatusSidebar: (status: boolean) => void;
    userName: string | undefined;
    userImg: string | undefined;
}

const userNavigation = [
    { name: 'Your profile', href: '#' },
    { name: 'Sign out', href: '#' },
]

export const Profile = ({ sendStatusSidebar, userName, userImg }: Props) => {
    return (
        <div className="bg-d-blue lg:bg-d-fondo flex justify-between items-center p-2">
            {/* Menú Hamburguesa en el lado izquierdo */}
            <button type="button" onClick={() => sendStatusSidebar(true)} className="p-2">
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon aria-hidden="true" className="h-7 w-7 text-d-fondo" />
            </button>

            {/* Icono en el lado derecho */}
            <div className='flex px-3 lg:px-16'>

                <button type="button" className="text-d-fondo lg:text-d-blue hover:text-gray-500">
                    <span className="sr-only">View notifications</span>
                    <BellIcon aria-hidden="true" className="mr-4 lg:mr-7 h-7 w-7" />
                </button>

                <Menu as="div" className="py-2">
                    <MenuButton className="flex lg:items-center">
                        <span className="sr-only">Open user menu</span>
                        {
                            userImg ? (<img
                                alt=""
                                src={userImg}
                                className="h-9 w-9 rounded-full bg-gray-50"
                            />) : 
                            <span className="inline-block h-9 w-9 overflow-hidden rounded-full bg-gray-100">
                                <svg fill="currentColor" viewBox="0 0 24 24" className="h-full w-full text-gray-300">
                                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </span>
                        }
                        <span className=" hidden lg:flex ">
                            <span aria-hidden="true" className="ml-4 text-lg font-medium leading-6 text-d-blue flex-shrink-0">
                                { userName? userName : 'Usuario' }
                            </span>
                            <ChevronDownIcon aria-hidden="true" className="ml-2 h-5 w-5 text-d-blue" />
                        </span>
                    </MenuButton>
                    <MenuItems
                        transition
                        className="absolute right-0 z-10  w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                        {userNavigation.map((item) => (
                            <MenuItem key={item.name}>
                                <a
                                    href={item.href}
                                    className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"
                                >
                                    {item.name}
                                </a>
                            </MenuItem>
                        ))}
                    </MenuItems>
                </Menu>
            </div>
        </div>
    )
}

