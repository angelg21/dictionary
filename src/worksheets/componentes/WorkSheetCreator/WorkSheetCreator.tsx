import { Menu, MenuButton } from '@headlessui/react'
import { BookOpenIcon, UsersIcon } from '@heroicons/react/24/outline'

interface Props {
    workSheeetType: string;
    workSheeetName: string;
    workSheeetDate: string;
}




export const WorkSheetCreator = ({ workSheeetType, workSheeetName, workSheeetDate }: Props) => {
    return (
        <Menu as="div" className="py-2">
            <MenuButton className="flex items-center">
                <span className="sr-only">Open user menu</span>
                {
                    workSheeetType === 'AuthorCard' ?
                        <div className='p-[7px] bg-d-green rounded-lg'>
                            <UsersIcon
                                className={`h-7 w-7 text-white`}
                            />
                        </div>

                        :
                        <div className='p-[7px] bg-d-blue rounded-lg'>
                            <BookOpenIcon
                                className={`h-7 w-7 text-white`}
                            />
                        </div>
                }
                <span className="flex ">
                    <div className='flex flex-col items-start'>
                        <span aria-hidden="true" className="ml-4 text-[16px] font-medium leading-6 text-black flex-shrink-0">
                            {workSheeetName}
                        </span>
                        <span aria-hidden="true" className="ml-4 text-[16px] font-medium leading-6 text-d-gray-text flex-shrink-0">
                            {workSheeetDate}
                        </span>
                    </div>
                </span>
            </MenuButton>
        </Menu>
    )
}
