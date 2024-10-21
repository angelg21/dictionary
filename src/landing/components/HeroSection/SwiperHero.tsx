'use client'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import Link from 'next/link';

const handleScroll = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
};

export const SwiperHero = () => {
    return (
        <section className="relative w-full max-h-[400px]">
            {/* Swiper de fondo */}
            <Swiper
                spaceBetween={30}
                effect={'fade'}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                navigation={false}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, EffectFade, Navigation, Pagination]}
                className="absolute inset-0 z-0 w-full max-h-[400px]"
            >
                <SwiperSlide>
                <img className="w-full object-cover" src="https://res.cloudinary.com/dlhvylz4p/image/upload/v1728960587/Dictionary/Landing/SwiperHero/dawg8viw0hmvjvrnvlok.jpg" alt="Nature 1" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className="w-full object-cover" src="https://res.cloudinary.com/dlhvylz4p/image/upload/v1728960587/Dictionary/Landing/SwiperHero/dawg8viw0hmvjvrnvlok.jpg" alt="Nature 2" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className="w-full h-full object-cover" src="https://swiperjs.com/demos/images/nature-3.jpg" alt="Nature 3" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className="w-full h-full object-cover" src="https://swiperjs.com/demos/images/nature-4.jpg" alt="Nature 4" />
                </SwiperSlide>
            </Swiper>

            {/* Contenido de texto superpuesto */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white">
                <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
                    Explora la literatura con IA
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                    Descubre nuevas perspectivas, analiza obras maestras y profundiza en el mundo de las letras con nuestro asistente de IA especializado en literatura.
                </p>
                <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                    <div className="rounded-md shadow">
                        <Link href={'/dictionary/chat'}>

                            <button className="w-full text-white flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md bg-d-blue transition-all hover:scale-105 hover:shadow-2xl md:py-4 md:text-lg md:px-10">
                                Comenzar ahora
                            </button>
                        </Link>
                    </div>
                    <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                        <button
                            onClick={() => handleScroll('caracteristicas')}
                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-d-blue bg-white hover:bg-gray-50 transition-all hover:scale-105 hover:shadow-2xl md:py-4 md:text-lg md:px-10">
                            Saber más
                        </button>
                    </div>
                </div>
            </div>

            {/* Overlay para oscurecer las imágenes de fondo */}
            {/* <div className="absolute inset-0 bg-black opacity-40 z-0"></div> */}
        </section>


    );
}
