'use client'

import Image from 'next/image'
import { useState, useRef, useEffect } from "react";
import { BookText, BookOpen, Play, Pause } from 'lucide-react';

// Importar los estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Keyboard, Pagination, Navigation } from 'swiper/modules';
import '../css/swiper-custom.css'; // Importa el archivo con los estilos personalizados


interface Multimedia {
    images: { link: '', description: '' }[]; // Array de URLs de imágenes
    videos: { link: '', description: '' }[]; // Array de URLs de videos
    audios: { link: '', description: '' }[];
    documents: { link: '', description: '' }[]; // Array de URLs de audios
}

interface Biography {
    title: string;
    text: string;
    multimedia: Multimedia;
}

export const RenderBiography = ({ title, text, multimedia }: Biography) => {

    const [showMultimedia, setShowMultimedia] = useState(false); // Estado para mostrar/ocultar multimedia
    //Video
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null); // Para manejar el modo cine
    const [showDescription, setShowDescription] = useState(false); // Mostrar descripción del video

    //Audio
    const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null); // El audio actualmente en reproducción
    const audioRefs = useRef<HTMLAudioElement[]>([]); // Refs para múltiples reproductores de audio
    const [audioStates, setAudioStates] = useState<boolean[]>([]);

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

    return (
        <div className="bg-white dark:bg-[#2D2D2D]">
            <h2 className="text-xl font-bold mb-5">{title}</h2>
            <p className="mt-2 text-gray-700 dark:text-gray-300 mb-8">{text}</p>
            {/* Botón para mostrar/ocultar multimedia */}
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
                <div className="mt-2">
                    {multimedia.images.length > 0 && (
                        <div className="my-8">
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={30}
                            keyboard={{
                                enabled: true,
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={{
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            }}
                            modules={[Keyboard, Pagination, Navigation]}
                            className="mySwiper"
                            style={{ paddingBottom: '15px' }}
                        >
                            {multimedia.images.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <div className="flex flex-col items-center">
                                        <img
                                            src={img.link}
                                            alt={`Imagen ${index + 1}`}
                                            className="max-w-full max-h-[300px] rounded-lg shadow transition-all duration-300 ease-in-out"
                                        />
                                        <span className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                            {img.description}
                                        </span>
                                    </div>
                                </SwiperSlide>
                            ))}
                    
                            {/* Custom navigation buttons */}
                            <div className="swiper-button-next hidden sm:flex text-blue-600 dark:text-blue-400" />
                            <div className="swiper-button-prev hidden sm:flex text-blue-600 dark:text-blue-400" />
                        </Swiper>
                    
                        <style jsx>{`
                            @media (max-width: 640px) {
                                .swiper-button-next, .swiper-button-prev {
                                    display: none !important;
                                }
                            }
                        `}</style>
                    </div>
                    
                    )}

                    {multimedia.videos.length > 0 && (
                        <div className="mb-8">
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

                    {multimedia.audios.length > 0 && (
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

                    {multimedia.documents.length > 0 && (
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
        </div>
    )
}
