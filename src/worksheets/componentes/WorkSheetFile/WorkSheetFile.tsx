'use client'

import { useRouter } from 'next/navigation';
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { WorkSheetCreator } from "../WorkSheetCreator/WorkSheetCreator"
import { WorkSheetProfile } from "../WorkSheetsProfile/WorkSheetProfile"
import { DocumentTextIcon, EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid"
import { ButtonWithPointLeft } from "@/src/components/ButtonWithPointLeft/ButtonWithPointLeft";
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/react'

interface User {
    _id: string,
    fullName: string,
    email: string,
    imageUrl: string,
}

interface Props {
    workSheetId: string,
    workSheetDate: string;
    workSheetName: string;
    workSheetType: string;
    editors: User[];
    reviewers: User[];
    buttonBackground: string;
    buttonPointStyle: string;
    buttonTextColor: string;
    buttonTitle: string;
}
interface WorkSheetAction {
    id: string;
    name: string;
    Icon: React.ElementType;
    role: string;
}

const workSheetsActions: WorkSheetAction[] = [
    { id: '01', name: 'Visualizar', Icon: EyeIcon, role: 'reviewer' },
    { id: '02',  name: 'Formulario', Icon: DocumentTextIcon, role: 'editor' },
    { id: '03', name: 'Editar', Icon: PencilSquareIcon, role: 'admin' },
    { id: '04', name: 'Eliminar', Icon: TrashIcon, role: 'admin' },
];

export const WorkSheetFile = ({
    workSheetId,
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

    const { data: session } = useSession();
    const pathName = usePathname();
    const router = useRouter();
    const isAdmin = session?.user?.roles.includes('admin');

    let filteredActions: WorkSheetAction[];

    // Si es admin, mostrar todas las acciones
    if (isAdmin) {
        filteredActions = workSheetsActions;
    } else {
        // Si el usuario no es admin, filtramos las opciones según el pathname
        if (pathName === '/dashboard/worksheets/sheetsToComplete') {
            filteredActions = workSheetsActions.filter(action => action.role === 'editor');
        } else if (pathName === '/dashboard/worksheets/sheetsToReview') {
            filteredActions = workSheetsActions.filter(action => action.role === 'reviewer');
        } else {
            // Si el path es otro, podrías manejarlo de otra forma o dejar las opciones vacías
            filteredActions = [];
        }
    }

    const handleClickActions = (workSheetType: string, action: string, id: string) => {
        // Manejando acciones de tipo 'formulario'
        if (action === '02') {
            switch (workSheetType) {
                case 'AuthorCard':
                    router.push(`/dashboard/forms/authorForm/${id}/authorDetails`);
                    break;
                case 'AnthologyCard':
                    router.push(`/dashboard/forms/anthologyForm/${id}/anthologyDetails`);
                    break;
                case 'GroupingCard':
                    router.push(`/dashboard/forms/groupingForm/${id}/groupingDetails`);
                    break;
                case 'MagazineCard':
                    router.push(`/dashboard/forms/magazineForm/${id}/magazineDetails`);
                    break;
                default:
                    console.error('Tipo de ficha no soportado para formularios');
            }
        }   else if (action === '01') {
            switch (workSheetType) {
                case 'AuthorCard':
                    router.push(`/dashboard/workSheetReview/${id}/authorReview`);
                    break;
                case 'AnthologyCard':
                    router.push(`/dashboard/workSheetReview/${id}/anthologyReview`);
                    break;
                case 'GroupingCard':
                    router.push(`/dashboard/workSheetReview/${id}/groupingReview`);
                    break;
                case 'MagazineCard':
                    router.push(`/dashboard/workSheetReview/${id}/magazineReview`);
                    break;
                default:
                    console.error('Tipo de ficha no soportado para formularios');
            }
        }

        // Manejando acciones de tipo 'reviewer'
        if (action === '01') {
            switch (workSheetType) {
                case 'AuthorCard':
                    router.push(`/dashboard/workSheetReview/${id}/authorReview`);
                    break;
                case 'AnthologyCard':
                    router.push(`/dashboard/workSheetReview/${id}/anthologyReview`);
                    break;
                case 'GroupingCard':
                    router.push(`/dashboard/workSheetReview/${id}/groupingReview`);
                    break;
                case 'MagazineCard':
                    router.push(`/dashboard/workSheetReview/${id}/magazineReview`);
                    break;
                default:
                    console.error('Tipo de ficha no soportado para revisión');
            }
        }
    };

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
                        {filteredActions && filteredActions.map((item) => (
                            <MenuItem key={item.name}>
                                <div
                                    className="flex space-x-3 px-3 py-1 text-sm leading-6 "
                                >
                                    {item.Icon && <item.Icon className={`h-5 w-5 ${item.name === 'Eliminar' ? 'text-red-500' : 'text-d-gray-text'}`} />}
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
                        {filteredActions && filteredActions.map((item) => (
                            <MenuItem key={item.name}>
                                <div
                                    role="button"
                                    className="flex hover:bg-gray-200 space-x-3 px-3 py-1 text-sm leading-6"
                                    onClick={() => handleClickActions(workSheetType, item.id, workSheetId)}
                                >
                                    {item.Icon && <item.Icon className={`h-5 w-5 ${item.name === 'Eliminar' ? 'text-red-500' : 'text-d-gray-text'}`} />}
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
