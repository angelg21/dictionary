
import { PhotoIcon } from '@heroicons/react/24/solid'

interface MultimediaInputInterface {
    globalStyle?: string;
    title: string;
    handleMultimediaFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    loading: boolean;
    imageUrl: string | null;
    typeMultimediaField: File|undefined;
}


export const MultimediaInput = ({ globalStyle, title, handleMultimediaFileChange, loading, imageUrl, typeMultimediaField }: MultimediaInputInterface) => {
    return (
        <div className={`${globalStyle}`}>
            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                {title}
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-12">
                <div className="text-center">
                    <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                            htmlFor="file-upload"
                            className="px-1 mr-1 relative cursor-pointer rounded-md bg-d-fondo font-semibold text-d-green focus-within:outline-none focus-within:ring-2 focus-within:ring-d-green focus-within:ring-offset-2 hover:text-d-green-dark"
                        >
                            <span>Carga un archivo</span>
                            <input id="file-upload" onChange={handleMultimediaFileChange} type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">o arrastra y suelta</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, PDF, MP4 hasta 10MB</p>
                </div>
            </div>
            {loading ? (
                <div className="flex items-center justify-center">
                    {/* Componente de carga */}
                    <div className="spinner-border animate-pulse inline-block w-8 h-8 border-4 rounded-full" role="status">
                        <span className="visually-hidden text-sm font-semibold">Cargando...</span>
                    </div>
                </div>
            ) : (
                <>
                    {imageUrl && (typeMultimediaField?.type.startsWith('image')) ?
                        <img src={imageUrl} alt="Uploaded file" className="mt-4  w-12 h-12" /> 
                        : 
                        <span className='text-sm font-normal'>{typeMultimediaField?.name}</span>
                    }
                </>
            )
            }
        </div>
    )
}
