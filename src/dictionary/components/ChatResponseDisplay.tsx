'use client'

import { BookText, BookOpen } from 'lucide-react';
import { useState } from "react";

// Importar los estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Keyboard, Pagination, Navigation } from 'swiper/modules';
import './css/swiper-custom.css'; // Importa el archivo con los estilos personalizados
import { RenderBiography } from './reponses/RenderBiography';

interface Multimedia {
    images: { link: '', description: '' }[]; // Array de URLs de imágenes
    videos: { link: '', description: '' }[]; // Array de URLs de videos
    audios: { link: '', description: '' }[];
    documents: string[] // Array de URLs de audios
}

interface Biography {
    title: string;
    text: string;
    multimedia: Multimedia;
}

interface ComparisonItem {
    title: string;
    multimedia: Multimedia;
}

interface Comparison {
    items: ComparisonItem[];
}

interface ListItem {
    title: string;
    text: string;
    multimedia: Multimedia;
}

interface List {
    title: string;
    items: ListItem[];
}

interface Similarity {
    title: string;
    items: ListItem[];
}

interface MultimediaQA {
    title: string;
    multimedia: Multimedia;
}

interface Model {
    text: string
}

// Definición del tipo ChatResponse
interface ChatResponse {
    data: {
        type: 'biography' | 'comparison' | 'list' | 'similarity' | 'multimedia' | 'model'; // Los tipos que puede recibir
        query: string;
        result: Biography | Comparison | List | Similarity | Multimedia | Model; // Definición más específica de result
    }
}

// Componente de Video
const VideoGallery = ({ videos }: { videos: { link: string, description: string }[] }) => {
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null); // Para manejar el modo cine
    const [showDescription, setShowDescription] = useState(false); // Mostrar descripción del video

    const handleVideoClick = (videoLink: string) => {
        setSelectedVideo(videoLink);
        setShowDescription(true); // Mostrar la descripción cuando se selecciona un video
    };

    const closeCineMode = () => {
        setSelectedVideo(null);
        setShowDescription(false);
    };

    return (
        <div>
            {selectedVideo ? (
                <div className="cine-mode">
                    <button onClick={closeCineMode}>Cerrar modo cine</button>
                    <video controls className="w-full">
                        <source src={selectedVideo} type="video/mp4" />
                        Tu navegador no soporta el elemento de video.
                    </video>
                </div>
            ) : (
                <div className="video-gallery">
                    {videos.map((video, index) => (
                        <div key={index} className="video-item" onClick={() => handleVideoClick(video.link)}>
                            <video controls className="w-full">
                                <source src={video.link} type="video/mp4" />
                                Tu navegador no soporta el elemento de video.
                            </video>
                            {showDescription && <p>{video.description}</p>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// Componente principal
const ChatResponseDisplay: React.FC<ChatResponse> = ({ data }) => {

    const { type, result } = data;
    const [showMultimedia, setShowMultimedia] = useState(false); // Estado para mostrar/ocultar multimedia
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null); // Para manejar el modo cine
    const [showDescription, setShowDescription] = useState(false); // Mostrar descripción del video

    const handleVideoClick = (videoLink: string) => {
        setSelectedVideo(videoLink);
        setShowDescription(true); // Mostrar la descripción cuando se selecciona un video
    };

    const closeCineMode = () => {
        setSelectedVideo(null);
        setShowDescription(false);
    };

    // const renderBiography = (bio: Biography) => {
    //     const toggleMultimedia = () => {
    //         setShowMultimedia((prev) => !prev); // Alternar el estado
    //     };
    //     return (
    //         <div className="bg-white dark:bg-[#2D2D2D]">
    //             <h2 className="text-xl font-bold mb-5">{bio.title}</h2>
    //             <p className="mt-2 text-gray-700 dark:text-gray-300 mb-5">{bio.text}</p>
    //             {/* Botón para mostrar/ocultar multimedia */}
    //             <button
    //                 onClick={toggleMultimedia}
    //                 className="text-sm font-semibold text-d-blue dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900 transition-all flex items-center gap-2"
    //             >
    //                 {showMultimedia ? (
    //                     <>
    //                         <BookOpen className="h-4 w-4" />
    //                         Cerrar contenido multimedia
    //                     </>
    //                 ) : (
    //                     <>
    //                         <BookText className="h-4 w-4" />
    //                         Explorar contenido multimedia
    //                     </>
    //                 )}
    //             </button>
    //             {/* Renderizar multimedia si está activa */}
    //             {showMultimedia && (
    //                 <div className="mt-2">
    //                     {bio.multimedia.images.length > 0 && (
    //                         <div className="my-7">
    //                             <Swiper
    //                                 slidesPerView={1}
    //                                 spaceBetween={30}
    //                                 keyboard={{
    //                                     enabled: true,
    //                                 }}
    //                                 pagination={{
    //                                     clickable: true,
    //                                 }}
    //                                 navigation={true}
    //                                 modules={[Keyboard, Pagination, Navigation]}
    //                                 className="mySwiper"
    //                                 style={{ paddingBottom: '15px' }}
    //                             >
    //                                 {bio.multimedia.images.map((img, index) => (
    //                                     <SwiperSlide key={index}>
    //                                         <div className="flex flex-col items-center">
    //                                             <img
    //                                                 src={img.link}
    //                                                 alt={`Imagen ${index + 1}`}
    //                                                 className="max-w-full max-h-[300px] rounded-lg shadow"
    //                                             />
    //                                             <span className="mt-2 text-sm text-gray-600 dark:text-gray-300">
    //                                                 {img.description}
    //                                             </span>
    //                                         </div>
    //                                     </SwiperSlide>
    //                                 ))}
    //                             </Swiper>
    //                         </div>
    //                     )}
    //                     {bio.multimedia.videos.length > 0 && (
    //                         <div className="mb-4">
    //                             <h3 className="text-lg font-semibold">Videos:</h3>
    //                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    //                                 {bio.multimedia.videos.map((video, index) => (
    //                                     <div key={index} className="relative">
    //                                         {/* Miniatura del video */}
    //                                         <video
    //                                             src={video.link}
    //                                             className="w-full h-[120px] object-cover rounded-lg shadow-lg"
    //                                             autoPlay
    //                                             muted
    //                                             loop
    //                                             onClick={() => handleVideoClick(video.link)} // Al hacer clic se activa el modo cine
    //                                         />
    //                                         {/* Descripción del video */}
    //                                         <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{video.description}</p>
    //                                     </div>
    //                                 ))}
    //                             </div>
    //                             {/* Modal en Modo Cine */}
    //                             {selectedVideo && (
    //                                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
    //                                     <div className="relative w-full max-w-4xl">
    //                                         <video
    //                                             src={selectedVideo}
    //                                             className="w-full h-auto rounded-lg"
    //                                             controls
    //                                             autoPlay
    //                                         />

    //                                         {/* Botón para cerrar el modo cine */}
    //                                         <button
    //                                             className="absolute top-2 right-2 text-white text-lg"
    //                                             onClick={closeCineMode}
    //                                         >
    //                                             &times;
    //                                         </button>

    //                                         {/* Descripción del video en modo cine */}
    //                                         {showDescription && (
    //                                             <div className="p-4 text-white">
    //                                                 <p>
    //                                                     {bio.multimedia.videos.find(video => video.link === selectedVideo)?.description}
    //                                                 </p>
    //                                             </div>
    //                                         )}
    //                                     </div>
    //                                 </div>
    //                             )}
    //                         </div>
    //                     )}
    //                     {bio.multimedia.audios.length > 0 && (
    //                         <div className="mb-4">
    //                             <h3 className="text-lg font-semibold">Audios:</h3>
    //                             {bio.multimedia.audios.map((audio, index) => (
    //                                 <audio key={index} controls className="w-full">
    //                                     <source src={audio} type="audio/mpeg" />
    //                                     Tu navegador no soporta el elemento de audio.
    //                                 </audio>
    //                             ))}
    //                         </div>
    //                     )}
    //                     {bio.multimedia.documents.length > 0 && (
    //                         <div className="mb-4">
    //                             <h3 className="text-lg font-semibold">Documentos:</h3>
    //                             {bio.multimedia.documents.map((doc, index) => (
    //                                 <a key={index} href={doc} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
    //                                     Documento {index + 1}
    //                                 </a>
    //                             ))}
    //                         </div>
    //                     )}
    //                 </div>
    //             )}

    //         </div>
    //     );
    // };

    // const renderComparison = (comp: Comparison) => (
    //     <div>
    //         {comp.items.map((item, index) => (
    //             <div key={index}>
    //                 <h2 className="text-lg font-semibold">{item.title}</h2>
    //                 <p>{item.title}</p>
    //                 {/* Renderizar multimedia */}
    //                 {item.multimedia.images.length > 0 && (
    //                     <div>
    //                         {item.multimedia.images.map((img, imgIndex) => (
    //                             <img key={imgIndex} src={img} alt={`Imagen ${imgIndex + 1}`} />
    //                         ))}
    //                     </div>
    //                 )}
    //                 {/* Similar para videos y audios */}
    //             </div>
    //         ))}
    //     </div>
    // );

    // const renderList = (list: List) => (
    //     <div>
    //         <h2 className="text-xl font-bold">{list.title}</h2>
    //         {list.items.map((item, index) => (
    //             <div key={index}>
    //                 <h3 className="text-lg font-semibold">{item.title}</h3>
    //                 <p>{item.text}</p>
    //                 {/* Renderizar multimedia */}
    //                 {item.multimedia.images.length > 0 && (
    //                     <div>
    //                         {item.multimedia.images.map((img, imgIndex) => (
    //                             <img key={imgIndex} src={img} alt={`Imagen ${imgIndex + 1}`} />
    //                         ))}
    //                     </div>
    //                 )}
    //                 {/* Similar para videos y audios */}
    //             </div>
    //         ))}
    //     </div>
    // );

    // const renderSimilarity = (similarity: Similarity) => (
    //     <div>
    //         <h2 className="text-xl font-bold">{similarity.title}</h2>
    //         {similarity.items.map((item, index) => (
    //             <div key={index}>
    //                 <h3 className="text-lg font-semibold">{item.title}</h3>
    //                 {/* Renderizar multimedia */}
    //                 {item.multimedia.images.length > 0 && (
    //                     <div>
    //                         {item.multimedia.images.map((img, imgIndex) => (
    //                             <img key={imgIndex} src={img} alt={`Imagen ${imgIndex + 1}`} />
    //                         ))}
    //                     </div>
    //                 )}
    //                 {/* Similar para videos y audios */}
    //             </div>
    //         ))}
    //     </div>
    // );

    // const renderMultimedia = (media: MultimediaQA) => (
    //     <div className="p-4">
    //         <h2 className="text-lg font-bold">{media.title}</h2>
    //         {/* Renderizar multimedia */}
    //         {media.multimedia.images.length > 0 && (
    //             <div>
    //                 {media.multimedia.images.map((img, imgIndex) => (
    //                     <img key={imgIndex} src={img} alt={`Imagen ${imgIndex + 1}`} />
    //                 ))}
    //             </div>
    //         )}
    //         {/* Similar para videos y audios */}
    //     </div>
    // );

    return (
        <div>
            {type === 'biography' && RenderBiography(result as Biography)}
            {/* {type === 'comparison' && renderComparison(result as Comparison)}
            {type === 'list' && renderList(result as List)}
            {type === 'similarity' && renderSimilarity(result as Similarity)}
            {type === 'multimedia' && renderMultimedia(result as MultimediaQA)} */}
            {/* Puedes agregar más tipos si es necesario */}
        </div>
    );
};

export default ChatResponseDisplay;
