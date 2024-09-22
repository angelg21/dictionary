"use client";
import { WorkSheetCreator } from "../WorkSheetCreator/WorkSheetCreator"
import { WorkSheetProfile } from "../WorkSheetsProfile/WorkSheetProfile"
import { DocumentTextIcon, EyeIcon, PencilSquareIcon, TrashIcon  } from '@heroicons/react/24/outline'
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid"
import { ButtonWithPointLeft } from "@/src/components/ButtonWithPointLeft/ButtonWithPointLeft";
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/react'
import { useWorksheetsContext } from "../../context/WorkSheetsContext";

interface User {
    _id: string,
    fullName: string,
    email: string,
    imageUrl: string,
}

interface Props {
    workSheetDate: string,
    workSheetName: string,
    workSheetType: string,
    editors: User[],
    reviewers: User[],
    buttonBackground: string,
    buttonPointStyle: string,
    buttonTextColor: string,
    buttonTitle: string,
}

const workSheetsOptions = [
    { name: 'Visualizar', Icon: EyeIcon },
    { name: 'Formulario', Icon: DocumentTextIcon },
    { name: 'Editar', Icon:  PencilSquareIcon },
    { name: 'Eliminar', Icon: TrashIcon },
]

export const WorkSheetFile = ({
    workSheetName,
    workSheetDate,
    workSheetType,
    editors,
    reviewers,
    buttonBackground,
    buttonPointStyle,
    buttonTextColor,
    buttonTitle,
}: Props) => {
    return (
        <div className="flex-col min-w-[308px] max-w-[360px] lg:w-full my-3 lg:flex lg:flex-row lg:max-w-none lg:justify-between lg:my-4 bg-white py-4 xl:py-5 px-5 xl:px-6 items-center rounded-md">
            <div className="flex mb-2 justify-between lg:hidden">
                <ButtonWithPointLeft title={buttonTitle} textColor={buttonTextColor} backgroundColor={buttonBackground} pointColor={buttonPointStyle} />
                <Menu as="div" className='relative'>
                    <MenuButton>
                        <EllipsisHorizontalIcon className="w-7 h-7 text-d-gray-text" />
                    </MenuButton>
                    <MenuItems
                        transition
                        className="absolute right-0 z-10  w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                        {workSheetsOptions.map((item) => (
                            <MenuItem key={item.name}>
                                <div
                                    className="flex space-x-3 px-3 py-1 text-sm leading-6 "
                                >
                                    <item.Icon className={`h-5 w-5  ${item.name === 'Eliminar' ? 'text-red-500' : 'text-d-gray-text'}` }/>
                                    <span className="text-gray-700 data-[focus]:bg-gray-50"> {item.name} </span>
                                </div>
                            </MenuItem>
                        ))}
                    </MenuItems>
                </Menu>
            </div>
            <div className="flex flex-col lg:contents">
                <WorkSheetCreator workSheeetName={workSheetName} workSheeetDate={workSheetDate} workSheeetType={workSheetType} />
                <div className="flex flex-col">
                    {
                        editors.map((editor) => (
                            <WorkSheetProfile key={editor._id} userImg={editor.imageUrl} userName={editor.fullName} userRol="Editor" />
                        ))
                    }
                </div>

                <div className="flex flex-col">
                {
                    reviewers.map((reviewer) => (
                        <WorkSheetProfile key={reviewer._id} userImg={reviewer.imageUrl} userName={reviewer.fullName} userRol="Revisor" />
                    ))
                }
                </div>

            </div>
            <div className="hidden lg:contents">

                <ButtonWithPointLeft title={buttonTitle} textColor={buttonTextColor} backgroundColor={buttonBackground} pointColor={buttonPointStyle} />
                <Menu as="div" className='relative'>
                    <MenuButton>
                        <EllipsisHorizontalIcon className="w-7 h-7 text-d-gray-text" />
                    </MenuButton>
                    <MenuItems
                        transition
                        className="absolute right-0 z-10  w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                        {workSheetsOptions.map((item) => (
                            <MenuItem key={item.name}>
                                <div
                                    className="flex space-x-3 px-3 py-1 text-sm leading-6 "
                                >
                                    <item.Icon className={`h-5 w-5  ${item.name === 'Eliminar' ? 'text-red-500' : 'text-d-gray-text'}` }/>
                                    <span className="text-gray-700 data-[focus]:bg-gray-50"> {item.name} </span>
                                </div>
                            </MenuItem>
                        ))}
                    </MenuItems>
                </Menu>

            </div>
        </div>
    )
}
