
import { PaperClipIcon } from '@heroicons/react/20/solid'
import { Multimedia } from '../AuthorFormComponents/interfaces/AuthorForm';


interface MultimediaChargedProps {
    globalStyle?: string;
    multimedias: Multimedia[];
    handleDeleteMultimedia: (index: number) => void;
}


export const MultimediaCharged = ({ globalStyle, multimedias, handleDeleteMultimedia }: MultimediaChargedProps) => {
    return (

        <div className={`flex ${globalStyle}`}>
            { 
                <ul role="list" className=" w-full divide-y mt-[30px] divide-gray-300 rounded-md border border-gray-300">
                    {multimedias.map((multimedia, index) =>
                    multimedia.link &&
                        <li key={index} className="flex items-center justify-between py-3 pl-4 pr-5 text-sm leading-6 bg-white">
                            <div className="flex w-0 flex-1 items-center">
                                <PaperClipIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-400" />
                                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                    <span className="truncate font-medium">{multimedia.title}</span>
                                </div>
                            </div>
                            <button key={index} onClick={() =>handleDeleteMultimedia(index)} className="ml-4 flex-shrink-0">
                                <span className="font-medium text-red-600 hover:text-red-700">
                                    Eliminar
                                </span>
                            </button>
                        </li>
                    )}
                </ul>
            }
        </div>
    )
}
