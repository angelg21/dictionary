import { useFormikContext } from "formik";
import { AuthorFormValues, WorkFormValues } from "../../AuthorFormComponents/interfaces/AuthorForm";
import { DebugFormikValues } from "../../DebugFormikValues/DebugFormikValues";


interface WorksTableProps{
    works: WorkFormValues[];
    handleEditWork: (index: number) => void;
}

export const WorksTable = ( {works, handleEditWork}:WorksTableProps ) => {

    const { values, setFieldValue } = useFormikContext<AuthorFormValues>();

    const handleDeleteWork = (indexToDelete: number) => {
        const updatedWorks = works.filter((_, index) => index !== indexToDelete);
        setFieldValue("works", updatedWorks);  // Actualiza el estado del arreglo con la obra eliminada
    };


    return (
        <div className="max-lg:flex max-lg:justify-center mt-6 md:mt-10 mb-8 md:mb-16">
            <div className="overflow-x-auto w-full">
                <div className="inline-block min-w-full align-middle">
                    <table className="min-w-full divide-y divide-gray-300 overflow-hidden rounded-lg">
                        <thead>
                            <tr>
                                <th
                                    scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-white bg-d-blue"
                                >
                                    TÍTULO
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-white bg-d-blue"
                                >
                                    TIPO
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-white bg-d-blue"
                                >
                                    IDIOMA
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-white bg-d-blue"
                                >
                                    FECHA DE PUBLICACIÓN
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-white bg-d-blue"
                                >
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y  divide-gray-200 bg-white">
                            {works.map((work, index) => (work.title) && (
                                <tr key={index} className="">
                                    <td className="max-w-[200px] break-words whitespace-normal pl-4 pr-3 text-sm">
                                        <div className="py-4 font-medium text-gray-900">{work.title}</div>
                                    </td>

                                    <td className="max-w-[200px] break-words whitespace-normal  pl-4 pr-3 text-sm">
                                        <div className="py-4 font-medium text-gray-900">{work.genre}</div>
                                    </td>

                                    <td className="max-w-[200px] break-words whitespace-normal  pl-4 pr-3 text-sm">
                                        <div className="py-4 font-medium text-gray-900">{work.originalLanguage}</div>
                                    </td>

                                    <td className="max-w-[100px] break-words whitespace-normal  pl-4 pr-3 text-sm">
                                        <div className="py-4 font-medium text-gray-900">{work.publicationDate}</div>
                                    </td>
                                    <td className="whitespace-nowrap pr-2 py-4 text-sm text-gray-500">
                                        <div className="flex flex-row gap-6 lg:gap-4">
                                            {/* <button
                                                className=" text-d-blue hover:text-blue-700 flex items-center font-medium group transition-transform transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                                                // onClick={() => onEdit(index)}
                                            >
                                                <svg className='mr-4' width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8 3H3C1.89543 3 1 3.89543 1 5V16C1 17.1046 1.89543 18 3 18H14C15.1046 18 16 17.1046 16 16V11M14.5858 1.58579C15.3668 0.804738 16.6332 0.804738 17.4142 1.58579C18.1953 2.36683 18.1953 3.63316 17.4142 4.41421L8.82842 13H6L6 10.1716L14.5858 1.58579Z" stroke="#003366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="group-hover:stroke-blue-700" />
                                                </svg>
                                            </button> */}
                                            <button
                                                className=" text-d-blue hover:text-blue-700 flex items-center font-medium group transition-transform transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                                                onClick={() => handleEditWork(index)}
                                            >
                                                <svg className='mr-4' width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8 3H3C1.89543 3 1 3.89543 1 5V16C1 17.1046 1.89543 18 3 18H14C15.1046 18 16 17.1046 16 16V11M14.5858 1.58579C15.3668 0.804738 16.6332 0.804738 17.4142 1.58579C18.1953 2.36683 18.1953 3.63316 17.4142 4.41421L8.82842 13H6L6 10.1716L14.5858 1.58579Z" stroke="#003366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="group-hover:stroke-blue-700" />
                                                </svg>
                                            </button>

                                            <button
                                                className=" text-d-red hover:text-red-500 flex items-center font-medium group transition-transform transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                                                onClick={() =>handleDeleteWork(index)}
                                            >
                                                <svg className='mr-4' width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M16 5L15.1327 17.1425C15.0579 18.1891 14.187 19 13.1378 19H4.86224C3.81296 19 2.94208 18.1891 2.86732 17.1425L2 5M7 9V15M11 9V15M12 5V2C12 1.44772 11.5523 1 11 1H7C6.44772 1 6 1.44772 6 2V5M1 5H17" stroke="#DC2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="group-hover:stroke-red-500" />
                                                </svg>
                                            </button>
                                                
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
