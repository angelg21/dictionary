import { ButtonComponent } from "../../Button/Button"
import Image from 'next/image'

export interface PreviewImageModalProps {
    onClose: () => void;
    fileUrl: string;
    fileType: string;
}




export const PreviewModalImage = ({ onClose, fileUrl, fileType }: PreviewImageModalProps) => {

    const FilePreview = () => {
        // Detectar el tipo de archivo y renderizar el componente correspondiente
        switch (true) {
            case fileType.startsWith('image'):
                return (

                    <Image
                        src={fileUrl}
                        
                        alt="Picture of the author"
                        layout="intrinsic"
                        width={400}  // Establece un valor base para el ancho
                        height={500} // Establece un valor base para la altura
                        objectFit="contain"
                    />
                );

            case fileType.startsWith('video'):
                return (

                    <video width="400" height="300" controls>
                        <source src={fileUrl} type={fileType} />
                        Tu navegador no soporta la etiqueta de video.
                    </video>

                );

            case fileType.startsWith('audio'):
                return (

                    <audio controls>
                        <source src={fileUrl} type={fileType} />
                        Tu navegador no soporta la etiqueta de audio.
                    </audio>

                );

            case fileType === 'application/pdf':
                return (


                    <iframe src={fileUrl} width="400" height="600" title="PDF preview"></iframe>

                );

            default:
                return <p>Formato de archivo no compatible para vista previa.</p>;
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 max-lg:px-6">
            <div className="bg-white p-6 rounded-md  max-w-full max-h-[calc(100vh-40px)] overflow-auto">
                <div className='flex flex-row justify-between mb-9'>
                    <h2 className="text-xl font-medium self-center text-d-gray mr-5"></h2>
                    <svg onClick={onClose} className='self-center cursor-pointer' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 13L13 1M1 1L13 13" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>

                <div className="mb-4">

                    <FilePreview />

                </div>
            </div>
        </div>
    )
}
