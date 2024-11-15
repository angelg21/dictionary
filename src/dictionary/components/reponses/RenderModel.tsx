'use client'

import Image from 'next/image'
import { useState, useRef, useEffect } from "react";
import { BookText, BookOpen, Play, Pause, ThumbsUp, ThumbsDown, Volume2, Copy } from 'lucide-react';

// Importar los estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import '../css/swiper-custom.css'; // Importa el archivo con los estilos personalizados
import { useAlert } from '@/src/users/context/AlertContext';

interface Multimedia {
    images: { link: '', description: '' }[]; // Array de URLs de imágenes
    videos: { link: '', description: '' }[]; // Array de URLs de videos
    audios: { link: '', description: '' }[];
    documents: { link: '', description: '' }[]; // Array de URLs de audios
}
interface Model {
    text: string;
}

export const RenderModel = ({text}:Model) => {

    const [copySuccess, setCopySuccess] = useState(false);

    const [showMultimedia, setShowMultimedia] = useState(false); // Estado para mostrar/ocultar multimedia
    //Video
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null); // Para manejar el modo cine
    const [showDescription, setShowDescription] = useState(false); // Mostrar descripción del video

    //Audio
    const audioRefs = useRef<HTMLAudioElement[]>([]); // Refs para múltiples reproductores de audio
    const [audioStates, setAudioStates] = useState<boolean[]>([]);

    const { showAlert } = useAlert();


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
            <p className="mt-2 text-gray-700 dark:text-gray-300 mb-4 break-words whitespace-normal">{text}</p>

            <div className="flex items-center mt-3 space-x-1">
                <button
                    onClick={() => handleSpeech(text)}
                    className="p-1 text-gray-400 dark:text-gray-500"
                >
                    <Volume2 className="w-4 h-4" />
                </button>
                <button
                    onClick={() => handleCopy(text)}
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
