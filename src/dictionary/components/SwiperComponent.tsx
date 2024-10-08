'use client'

import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

interface Multimedia {
    images: { link: string; description: string }[];
}

interface SwiperProps {
    multimedia: Multimedia;
}

export const SwiperComponent: React.FC<SwiperProps> = ({ multimedia }) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? multimedia.images.length - 1 : prevIndex - 1));
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === multimedia.images.length - 1 ? 0 : prevIndex + 1));
    };

    // Configuración de swipeable para manejar los gestos
    const handlers = useSwipeable({
        onSwipedLeft: handleNextClick,  // Cambiar a la siguiente imagen al deslizar a la izquierda
        onSwipedRight: handlePrevClick, // Cambiar a la imagen anterior al deslizar a la derecha
        preventScrollOnSwipe: true,     // Evitar el desplazamiento mientras se desliza en el carrusel
        trackMouse: true,               // También habilita el control por mouse
    });

    return (
        <div className="w-full max-w-full mx-auto relative" {...handlers}>
            {/* Contenedor de la imagen */}
            <div className="flex flex-col items-center justify-center">
                <div className="flex items-center justify-center h-64 overflow-hidden">
                    <img
                        src={multimedia.images[currentIndex].link}
                        alt={`Imagen ${currentIndex + 1}`}
                        className="object-contain w-full max-w-[450px] h-full rounded-lg shadow transition-transform duration-500 ease-in-out transform"
                        style={{
                            transform: `translateX(${currentIndex * -100}%)`,
                        }}
                    />
                </div>

                {/* Descripción centrada debajo de la imagen */}
                <p className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300 max-w-[450px]">
                    {multimedia.images[currentIndex].description}
                </p>

                {/* Puntos de paginación */}
                <div className="flex mt-4 space-x-2">
                    {multimedia.images.map((_, index) => (
                        <span
                            key={index}
                            className={`w-[10px] h-[10px] rounded-full ${currentIndex === index ? 'bg-d-blue' : 'bg-gray-400'
                                }`}
                        ></span>
                    ))}
                </div>
            </div>

            {/* Flecha izquierda */}
            <button
                onClick={handlePrevClick}
                className="absolute top-1/2 transform -translate-y-1/2 left-4 text-white bg-black bg-opacity-50 p-2 rounded-full"
            >
                <ChevronLeftIcon className="w-6 h-6" />
            </button>

            {/* Flecha derecha */}
            <button
                onClick={handleNextClick}
                className="absolute top-1/2 transform -translate-y-1/2 right-4 text-white bg-black bg-opacity-50 p-2 rounded-full"
            >
                <ChevronRightIcon className="w-6 h-6" />
            </button>
        </div>
    )
}
