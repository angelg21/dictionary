import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Menu,MenuItems, MenuButton } from '@headlessui/react'

interface Props {
    userRol: string | undefined;
    userName: string | undefined;
    userImg: string | undefined;
}

export const WorkSheetProfile = ({ userRol, userName, userImg }: Props) => {
    return (
        <Menu as="div" className="py-2">
            <MenuButton className="flex items-center">
                <span className="sr-only">Open user menu</span>
                {
                    userImg ? (<img
                        alt=""
                        src={userImg}
                        className={`h-11 w-11 bg-gray-50 rounded-full lg:hidden xl:flex`}
                    />) :
                        <span className={`lg:hidden xl:flex inline-block h-11 w-11 overflow-hidden bg-gray-100 rounded-full`}>
                            <svg fill="currentColor" viewBox="0 0 24 24" className="h-full w-full text-gray-300">
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </span>
                }
                <span className="flex w-[120px] xl:w-[150px]">
                    <div className='flex flex-col items-start'>
                        <span aria-hidden="true" className="text-left ml-4 xl:text-[16px] text-sm font-medium leading-6 text-black flex-shrink-0">
                            {userName ? userName : 'Usuario'}
                        </span>
                        <span aria-hidden="true" className="text-left ml-4 xl:text-[16px] text-sm font-medium leading-6 text-d-gray-text flex-shrink-0">
                            {userRol ? userRol : 'Rol'}
                        </span>
                    </div>
                </span>
            </MenuButton>
            {/* <MenuItems
                        transition
                        className="absolute right-0 z-10  w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                    </MenuItems> */}
        </Menu>
    )
}
