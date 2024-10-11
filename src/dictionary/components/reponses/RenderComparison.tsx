
'use client'

import Image from 'next/image'
import { useState, useRef, useEffect } from "react";
import { BookText, BookOpen, Play, Pause, ThumbsUp, ThumbsDown, Volume2, Copy } from 'lucide-react';

// Importar los estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import '../css/swiper-custom.css'; // Importa el archivo con los estilos personalizados
import { useAlert } from '@/src/users/context/AlertContext';

interface Multimedia {
    images: { link: '', description: '' }[]; // Array de URLs de imágenes
    videos: { link: '', description: '' }[]; // Array de URLs de videos
    audios: { link: '', description: '' }[];
    documents: { link: '', description: '' }[]; // Array de URLs de audios
}
interface Item {
    title: string;
    multimedia: Multimedia;
}

interface Comparison {
    items: Item[];
    text: string;
}

export const RenderComparison = ({ text, items }: Comparison) => {

    const { showAlert } = useAlert();
    const [showMultimedia, setShowMultimedia] = useState<{ [key: number]: boolean }>({}); // Estado para mostrar/ocultar multimedia
    //Video
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null); // Para manejar el modo cine
    const [showDescription, setShowDescription] = useState(false); // Mostrar descripción del video

    //Audio
    const audioRefs = useRef<HTMLAudioElement[][]>([]);
    const [audioStates, setAudioStates] = useState<boolean[][]>([]);

    const handleVideoClick = (videoLink: string) => {
        setSelectedVideo(videoLink);
        setShowDescription(true); // Mostrar la descripción cuando se selecciona un video
    };

    const closeCineMode = () => {
        setSelectedVideo(null);
        setShowDescription(false);
    };

    const toggleMultimedia = (index: number) => {
        // Si ya está abierto, pausar todos los audios
        if (showMultimedia[index]) {
            audioRefs.current.forEach((audioArray) => {
                audioArray.forEach((audio) => {
                    if (audio) {
                        audio.pause();
                        audio.currentTime = 0;
                    }
                });
            });
            setAudioStates(audioStates.map(audioArray => audioArray.map(() => false))); // Reiniciar los estados de reproducción
        }

        // Alternar solo el estado del elemento específico
        setShowMultimedia((prev) => {
            const newShowMultimedia = { ...prev };
            newShowMultimedia[index] = !newShowMultimedia[index]; // Cambia el estado solo para el índice específico
            return newShowMultimedia;
        });
    };

    const handlePlayPause = (itemIndex: number, audioIndex: number) => {
        const selectedAudio = audioRefs.current[itemIndex][audioIndex];

        if (!selectedAudio) return;

        // Si hay un audio actual reproduciéndose, lo pausamos antes de reproducir otro
        audioRefs.current[itemIndex].forEach((audio, i) => {
            if (i !== audioIndex && audio) {
                audio.pause();
                audio.currentTime = 0;
            }
        });

        // Pausar o reproducir el audio seleccionado
        if (selectedAudio.paused) {
            selectedAudio.play();
            setAudioStates((prev) => {
                const newStates = [...prev];
                newStates[itemIndex] = newStates[itemIndex].map((_, i) => i === audioIndex);
                return newStates;
            });
        } else {
            selectedAudio.pause();
            setAudioStates((prev) => {
                const newStates = [...prev];
                newStates[itemIndex] = newStates[itemIndex].map(() => false);
                return newStates;
            });
        }
    }

    useEffect(() => {
        if (showMultimedia) {
            items && setAudioStates(items.map(item => new Array(item.multimedia.audios.length).fill(false))); // Inicializar el estado de cada audio para cada item
        }
    }, [showMultimedia, items]);

    const handleSpeech = (text: string) => {
        // Dividir el texto en fragmentos por múltiples delimitadores
        const sentences = text.split(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?|!|\n|,|;)/).filter(sentence => sentence.trim() !== '');

        let currentIndex = 0;

        const speakSentence = () => {
            if (currentIndex < sentences.length) {
                const utterance = new SpeechSynthesisUtterance(sentences[currentIndex].trim());
                utterance.lang = 'es-ES'; // Cambia el idioma si es necesario

                // Cuando termina una oración, pasar a la siguiente
                utterance.onend = () => {
                    currentIndex++;
                    speakSentence(); // Reproducir la siguiente oración
                };

                window.speechSynthesis.speak(utterance);
            }
        };

        // Asegurarse de que no haya otra narración en curso
        window.speechSynthesis.cancel();
        speakSentence(); // Comenzar la narración
    };

    useEffect(() => {
        // Detener cualquier voz en curso cuando se desmonte el componente
        return () => {
            window.speechSynthesis.cancel();
        };
    }, []);

    const handleCopy = (textToCopy: string) => {
        navigator.clipboard.writeText(textToCopy).then(() => {
            showAlert("Texto copiado en el portapapeles", "success");
        });
    };

    return (
        <div className="bg-white dark:bg-[#2D2D2D]">
            {items &&
                items.map((item, index) => (
                    <div key={index} className='flex mb-9'>
                        <div className="bg-white dark:bg-[#2D2D2D]">
                            <h2 className="text-xl font-bold mb-5">{item.title}</h2>
                            <button
                                onClick={() => toggleMultimedia(index)}
                                className="text-sm font-semibold text-d-blue dark:text-blue-400 hover:underline dark:hover:hover:underline transition-all flex items-center gap-2"
                            >
                                {showMultimedia[index] ? (
                                    <>
                                        <BookOpen className="h-5 w-5" />
                                        Cerrar contenido multimedia
                                    </>
                                ) : (
                                    <>
                                        <BookText className="h-5 w-5" />
                                        Explorar contenido multimedia
                                    </>
                                )}
                            </button>

                            {/* Renderizar multimedia si está activa */}
                            {showMultimedia[index] && (
                                <div className="flex flex-col w-auto mt-7">

                                    {item.multimedia.images && (
                                        // <SwiperComponent multimedia = {multimedia} />
                                        <Swiper
                                            spaceBetween={10} // Espacio entre imágenes por defecto
                                            pagination={{
                                                clickable: true,
                                            }}
                                            navigation={{
                                                nextEl: '.swiper-button-next',
                                                prevEl: '.swiper-button-prev',
                                            }}
                                            breakpoints={{
                                                1024: { // Pantallas grandes
                                                    slidesPerView: 1,
                                                    spaceBetween: 20,
                                                },
                                                768: { // Pantallas medianas
                                                    slidesPerView: 1,
                                                    spaceBetween: 8,
                                                },
                                                640: { // Pantallas más pequeñas
                                                    slidesPerView: 1,
                                                    spaceBetween: 5,
                                                },
                                                320: { // Pantallas muy pequeñas
                                                    slidesPerView: 1,
                                                    spaceBetween: 5,
                                                },
                                            }}
                                            modules={[Pagination, Navigation]}
                                            className="mySwiper max-w-[300px] xs:max-w-[340px] sm:max-w-[415px] md:max-w-[450px] lg:max-w-[500px]"
                                        >
                                            {item.multimedia.images.map((img, index) => (
                                                <SwiperSlide key={index}>
                                                    <div className="flex flex-col items-center">
                                                        <img
                                                            src={img.link}
                                                            alt={`Imagen ${index + 1}`}
                                                            className="object-contain w-full max-w-[290px] md:max-w-[320px] lg:max-w-[370px] max-h-[300px] rounded-lg shadow transition-all duration-300 ease-in-out"
                                                        />
                                                        <p className="my-6 text-center text-sm text-gray-700 dark:text-gray-300">
                                                            {img.description}
                                                        </p>
                                                    </div>
                                                </SwiperSlide>
                                            ))}
                                            {/* Botones personalizados de navegación */}
                                            <div className="swiper-button-next absolute top-1/2 right-2 transform -translate-y-1/2 text-blue-600 dark:text-blue-400" />
                                            <div className="swiper-button-prev absolute top-1/2 left-2 transform -translate-y-1/2 text-blue-600 dark:text-blue-400" />

                                            <style jsx>{`
                                .swiper-button-next {
                                    top: 50%;
                                    right: 0.5rem; /* Espaciado a la derecha */
                                    transform: translateY(-100%);
                                    display: flex; /* Asegúrate de que se muestre correctamente */
                                }
                                .swiper-button-prev {
                                    top: 50%;
                                    left: 0.5rem; /* Espaciado a la izquierda */
                                    transform: translateY(-100%);
                                    display: flex; /* Asegúrate de que se muestre correctamente */
                                    }
                                @media (max-width: 640px) {
                                    .swiper-button-next,
                                    .swiper-button-prev {
                                    display: none !important; /* Oculta en pantallas pequeñas */
                                    }
                                }
                                `}
                                            </style>
                                        </Swiper>
                                    )}

                                    {item.multimedia.videos && (
                                        <div className="my-8">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {item.multimedia.videos.map((video, index) => (
                                                    <div key={index} className="relative">
                                                        {/* Miniatura del video */}
                                                        <video
                                                            src={video.link}
                                                            className="w-full h-[120px] object-cover rounded-lg shadow-lg"
                                                            autoPlay
                                                            muted
                                                            loop
                                                            onClick={() => handleVideoClick(video.link)} // Al hacer clic se activa el modo cine
                                                        />
                                                        {/* Descripción del video */}
                                                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{video.description}</p>
                                                    </div>
                                                ))}
                                            </div>
                                            {/* Modal en Modo Cine */}
                                            {selectedVideo && (
                                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 overflow-y-auto">
                                                    <div className="relative w-full max-w-4xl p-4">
                                                        {/* Contenedor que asegura que el video no ocupe toda la pantalla */}
                                                        <div className="relative w-full max-h-[80vh] overflow-hidden flex flex-col items-center">
                                                            <video
                                                                src={selectedVideo}
                                                                className="w-full max-h-[70vh] rounded-lg" // Limita la altura máxima del video
                                                                controls
                                                                autoPlay
                                                            />

                                                            {/* Descripción del video en modo cine */}
                                                            {showDescription && (
                                                                <div className="p-4 text-white mt-2">
                                                                    <p>
                                                                        {item.multimedia.videos.find(video => video.link === selectedVideo)?.description}
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Botón para cerrar el modo cine */}
                                                        <button
                                                            className="absolute top-2 right-2 text-white text-3xl"
                                                            onClick={closeCineMode}
                                                        >
                                                            &times;
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {item.multimedia.audios && (
                                        <div className="mb-8">
                                            {item.multimedia.audios.map((audio, audioIndex) => (
                                                <div key={audioIndex} className="my-6 p-4 rounded-lg shadow-lg bg-white dark:bg-gray-800 relative">
                                                    <div className="flex items-center justify-center mb-4 relative">
                                                        <audio
                                                            ref={(el) => {
                                                                if (!audioRefs.current[index]) {
                                                                    audioRefs.current[index] = [];
                                                                }
                                                                audioRefs.current[index][audioIndex] = el!;
                                                            }}
                                                            src={audio.link}
                                                            className="hidden"
                                                            onEnded={() => {
                                                                setAudioStates((prevStates) => {
                                                                    const newStates = [...prevStates];
                                                                    newStates[index][audioIndex] = false;
                                                                    return newStates;
                                                                });
                                                            }}
                                                        />
                                                        <div
                                                            className={`w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-r from-[#003366] via-blue-600 to-purple-700 cursor-pointer
                                                            ${audioStates[index]?.[audioIndex] ? 'animate-pulse' : ''}`}
                                                            onClick={() => handlePlayPause(index, audioIndex)}
                                                        >
                                                            {audioStates[index]?.[audioIndex] ? (
                                                                <Pause className="h-5 w-5 text-white" />
                                                            ) : (
                                                                <Play className="h-5 w-5 text-white" />
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="mt-4 text-center">
                                                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                            {audio.description}
                                                        </h4>
                                                    </div>

                                                    {/* Onda sonora animada */}
                                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300 dark:bg-gray-600">
                                                        {audioStates[index]?.[audioIndex] && (
                                                            <div className="h-full bg-[#0059b3] dark:bg-blue-400 animate-wave"></div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {item.multimedia.documents && (
                                        <div className="mb-4">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {item.multimedia.documents.map((doc, index) => (
                                                    <div
                                                        key={index}
                                                        className="relative p-4 bg-white dark:bg-[#2D2D2D] shadow-md rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
                                                        onClick={() => window.open(doc.link, '_blank')}
                                                    >
                                                        {/* Ícono del documento */}
                                                        <div className="flex items-center justify-center mb-4">
                                                            {doc.link.endsWith('.pdf') ? (
                                                                <Image
                                                                    src="/assets/logo-pdf.png"
                                                                    width={50}
                                                                    height={50}
                                                                    alt="Picture of the author"
                                                                />
                                                            ) : (
                                                                <Image
                                                                    src="/assets/logo-word.png"
                                                                    width={60}
                                                                    height={60}
                                                                    alt="Picture of the author"
                                                                />
                                                            )}
                                                        </div>
                                                        {/* Descripción del documento */}
                                                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 text-center">
                                                            {doc.description}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                </div>
                            )}

                            {/* <div className="flex items-center mt-3 space-x-1">
                                <button
                                    onClick={() => handleSpeech(text)}
                                    className="p-1 text-gray-400 dark:text-gray-500"
                                >
                                    <Volume2 className="w-5 h-5" />
                                </button>
                                <button
                                    //onClick={() => handleRating(index, 'up')}
                                    //className={`p-1 ${message.rating === 'up' ? 'text-green-500' : 'text-gray-500'}`}
                                    className='p-1 text-gray-400 dark:text-gray-500'
                                >
                                    <ThumbsUp className="h-4 w-4" />
                                </button>
                                <button
                                    //onClick={() => handleRating(index, 'down')}
                                    //className={`p-1 ${message.rating === 'down' ? 'text-red-500' : 'text-gray-500'}`}
                                    className='p-1  text-gray-400 dark:text-gray-500'
                                >
                                    <ThumbsDown className="h-4 w-4" />
                                </button>
                            </div> */}
                        </div>
                    </div>
                ))
            }
            <p className="mt-2 text-gray-700 dark:text-gray-300 mb-4 break-words whitespace-normal">{text}</p>
            <button
                onClick={() => handleSpeech(text)}
                className="p-1 text-gray-400 dark:text-gray-500"
            >
                <Volume2 className="w-4 h-4" />
            </button>
            <button
                onClick={() => handleCopy(text)}
                //className={`p-1 ${message.rating === 'up' ? 'text-green-500' : 'text-gray-500'}`}
                className='p-1 text-gray-400 dark:text-gray-500 mb-8'
            >
                <Copy className="h-4 w-4" />
            </button>
        </div>
    )
}
