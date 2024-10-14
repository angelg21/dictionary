
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
interface MultimediaQA {
    title: string;
    multimedia: Multimedia;
}

export const RenderMultimedia = ({title, multimedia}: MultimediaQA) => {

    const [copySuccess, setCopySuccess] = useState(false);

    const [showMultimedia, setShowMultimedia] = useState(false); // Estado para mostrar/ocultar multimedia
    //Video
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null); // Para manejar el modo cine
    const [showDescription, setShowDescription] = useState(false); // Mostrar descripción del video

    //Audio
    const audioRefs = useRef<HTMLAudioElement[]>([]); // Refs para múltiples reproductores de audio
    const [audioStates, setAudioStates] = useState<boolean[]>([]);

    const { showAlert } = useAlert();

    const handleVideoClick = (videoLink: string) => {
        setSelectedVideo(videoLink);
        setShowDescription(true); // Mostrar la descripción cuando se selecciona un video
    };

    const closeCineMode = () => {
        setSelectedVideo(null);
        setShowDescription(false);
    };

    const toggleMultimedia = () => {
        if (showMultimedia) {
            // Pausar todos los audios al cerrar multimedia
            audioRefs.current.forEach((audio) => {
                if (audio) {
                    audio.pause();
                    audio.currentTime = 0;
                }
            });
            setAudioStates(audioStates.map(() => false)); // Reiniciar los estados de reproducción
        }
        setShowMultimedia((prev) => !prev);
    };

    const handlePlayPause = (index: number) => {
        const selectedAudio = audioRefs.current[index];

        if (!selectedAudio) return; // Si no hay audio seleccionado, salimos

        // Si hay un audio actual reproduciéndose, lo pausamos antes de reproducir otro
        audioRefs.current.forEach((audio, i) => {
            if (i !== index && audio) {
                audio.pause();
                audio.currentTime = 0; // Reiniciar el tiempo del audio anterior
            }
        });

        // Pausar el audio si ya está reproduciéndose, de lo contrario, reproducirlo
        if (selectedAudio.paused) {
            selectedAudio.play();
            setAudioStates(audioStates.map((_, i) => i === index)); // Actualizar el estado, solo el seleccionado está en "play"
        } else {
            selectedAudio.pause();
            setAudioStates(audioStates.map(() => false)); // Ningún audio en reproducción
        }
    };

    useEffect(() => {
        if (showMultimedia) {
            // Inicializamos el estado de cada audio en "false" cuando se abre multimedia
            setAudioStates(new Array(multimedia.audios.length).fill(false));
        }
    }, [showMultimedia, multimedia.audios.length]);

    const [showNavigation, setShowNavigation] = useState(true);

    // Hook para manejar el tamaño de la ventana
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setShowNavigation(false);
            } else {
                setShowNavigation(true);
            }
        };

        // Ejecutar al cargar por primera vez
        handleResize();

        // Listener para cambios en el tamaño de la ventana
        window.addEventListener('resize', handleResize);

        // Cleanup del listener cuando el componente se desmonta
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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
        const currentYear = new Date().getFullYear(); // Obtiene el año actual
        const additionalText = `\n\nTomado de: LetraScopio. Diccionario de literatura del estado Bolívar. Ciudad Guayana: Universidad Católica Andres Bello, ${currentYear}. https://letrascopio.vercel.app/`;
    
        // El texto final que se copiará, incluyendo el enlace clickeable
        const finalText = `${textToCopy}${additionalText}`;
    
        navigator.clipboard.writeText(finalText).then(() => {
            showAlert("Texto copiado en el portapapeles", "success");
        });
    };

    return (
        <div className="bg-white dark:bg-[#2D2D2D]">
            <h2 className="text-xl font-bold mb-5">{title}</h2>

            <button
                onClick={toggleMultimedia}
                className="text-sm font-semibold text-d-blue dark:text-blue-400 hover:underline dark:hover:hover:underline transition-all flex items-center gap-2"
            >
                {showMultimedia ? (
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
            {showMultimedia && (
                <div className="flex flex-col w-auto mt-7">

                    {multimedia.images && (
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
                            {multimedia.images.map((img, index) => (
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

                    {multimedia.videos && (
                        <div className="my-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {multimedia.videos.map((video, index) => (
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
                                                        {multimedia.videos.find(video => video.link === selectedVideo)?.description}
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

                    {multimedia.audios && (
                        <div className="mb-8">
                            {multimedia.audios.map((audio, index) => (
                                <div key={index} className=" my-6 p-4 rounded-lg shadow-lg bg-white dark:bg-gray-800 relative">
                                    <div className="flex items-center justify-center mb-4 relative">
                                        <audio
                                            ref={(el) => { audioRefs.current[index] = el!; }} // Asegura que el elemento ref no es null
                                            src={audio.link}
                                            className="hidden"
                                            onEnded={() => {
                                                setAudioStates((prevStates) => {
                                                    const newStates = [...prevStates];
                                                    newStates[index] = false; // Restablecer el estado cuando el audio termina
                                                    return newStates;
                                                });
                                            }}
                                        />
                                        <div
                                            className={`w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-r from-[#003366] via-blue-600 to-purple-700 cursor-pointer
                                                    ${audioStates[index] ? 'animate-pulse' : ''}`}
                                            onClick={() => handlePlayPause(index)}
                                        >
                                            {audioStates[index] ? (
                                                <Pause className="h-5 w-5 text-white" />
                                            ) : (
                                                <Play className="h-5 w-5 text-white" />
                                            )}
                                        </div>
                                    </div>
                                    <div className="mt-4 text-center">
                                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">{audio.description}</h4>
                                    </div>

                                    {/* Onda sonora animada */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300 dark:bg-gray-600">
                                        {audioStates[index] && (
                                            <div className="h-full bg-[#0059b3] dark:bg-blue-400 animate-wave"></div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {multimedia.documents && (
                        <div className="mb-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {multimedia.documents.map((doc, index) => (
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

            <div className="flex items-center mt-3 space-x-1">
                <button
                    onClick={() => handleSpeech(title)}
                    className="p-1 text-gray-400 dark:text-gray-500"
                >
                    <Volume2 className="w-4 h-4" />
                </button>
                <button
                    onClick={() => handleCopy(title)}
                    //className={`p-1 ${message.rating === 'up' ? 'text-green-500' : 'text-gray-500'}`}
                    className='p-1 text-gray-400 dark:text-gray-500'
                >
                    <Copy className="h-4 w-4" />
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
            </div>
        </div>
    )
}
