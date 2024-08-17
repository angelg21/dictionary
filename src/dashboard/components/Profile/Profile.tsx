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
}

const userNavigation = [
    { name: 'Your profile', href: '#' },
    { name: 'Sign out', href: '#' },
]

export const Profile = ({ sendStatusSidebar }: Props) => {
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
                        <img
                            alt=""
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            className="h-9 w-9 rounded-full bg-gray-50"
                        />
                        <span className=" hidden lg:flex ">
                            <span aria-hidden="true" className="ml-4 text-lg font-medium leading-6 text-d-blue flex-shrink-0">
                                Tom Cook
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

