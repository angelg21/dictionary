'use client'

import { useEffect, useState } from 'react'
import { Send, BookOpen, Brain, Star, ArrowRight, Newspaper, Sun, Moon, PenTool, Video, Feather, Search } from 'lucide-react'
import { SwiperHero } from './HeroSection/SwiperHero'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { Testimonials } from './TestimonialsSection/Testimonials'
import { motion } from 'framer-motion'
import { StatsSection } from './StatsSection/StatsSection'
import News from './NewsSection/News'
import { ChatDemonstrationSection } from './ChatDemonstrationSection/ChatDemonstrationSection'
import { Footer } from './FooterSection/Footer'
// import ThemeToggle from './theme-toggle'

export const LandingPage = () => {

    const [demoQuestion, setDemoQuestion] = useState('');
    const [demoAnswer, setDemoAnswer] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isClient, setIsClient] = useState(false);

    // Acceso al tema actual y a la función para cambiarlo
    const { theme, setTheme } = useTheme();

    const handleDemoSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (demoQuestion.trim()) {
            setIsLoading(true)
            // Simular una respuesta del API
            setTimeout(() => {
                setDemoAnswer('Esta es una respuesta de demostración. Para continuar la conversación, por favor ve a la página principal del chat.')
                setIsLoading(false)
            }, 2000)
        }
    }

    // Manejar el cambio de tema
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    const handleScroll = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };


    useEffect(() => {
        setIsClient(true); // Solo se activa en el cliente
    }, []);

    if (!isClient) {
        return null; // No renderizar nada hasta que el componente esté en el cliente
    }
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#2D2D2D]">
            <header className="bg-cover bg-center bg-[url('/assets/bg-blue-header.png')] dark:bg-[url('/assets/header-oscuro.png')] shadow-sm">
                <nav className="max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex-shrink-0 flex items-center">
                            {/* <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" /> */}
                            <div className="relative flex flex-col pl-2 py-[2px]">
                                <div className="flex items-center  text-center space-x-0">
                                    <span className="text-gray-200 dark:text-gray-100 text-2xl font-sans leading-tight align-middle">Letra</span>
                                    <span className="text-gray-200 dark:text-gray-100 text-2xl font-serif leading-tight align-middle pt-1">Scopio</span>
                                </div>
                                <span className="text-gray-200 dark:text-gray-100 text-xs font-normal leading-tight align-middle">Diccionario de Literatura del Estado Bolívar</span>
                            </div>
                        </div>
                        <div className='hidden md:flex justify-between space-x-5'>
                            <button onClick={() => handleScroll('caracteristicas')} className='text-base font-medium hover:font-semibold hover:text-gray-400 text-white'>Carasteristicas</button>
                            <button onClick={() => handleScroll('demostracion')} className='text-base font-medium hover:font-semibold hover:text-d-green-light text-white'>Demostracion</button>
                            <button onClick={() => handleScroll('testimonios')} className='text-base font-medium hover:font-semibold hover:text-d-yellow text-white'>Testimonios</button>
                            <button onClick={() => handleScroll('noticias')} className='text-base font-medium hover:font-semibold hover:text-blue-600 text-white'>Noticias</button>
                        </div>
                        <div className="flex items-center">
                            {/* <ThemeToggle /> */}
                            <div className="flex items-center">
                                <button
                                    onClick={toggleTheme}
                                    className={`relative flex items-center w-[154px] h-[40px] rounded-full p-1 transition-colors duration-300 focus:outline-none ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-800'
                                        }`}
                                >
                                    <span
                                        className={`absolute text-xs font-medium transition-opacity duration-300 ${theme === 'light' ? 'left-12 opacity-100' : 'left-3 opacity-0'
                                            }`}
                                    >
                                        TEMA CLARO
                                    </span>
                                    <span
                                        className={`absolute text-xs font-medium transition-opacity duration-300 ${theme === 'dark' ? 'right-12 opacity-100' : 'right-3 opacity-0'
                                            }`}
                                    >
                                        TEMA OSCURO
                                    </span>
                                    <span
                                        className={`flex items-center justify-center w-[32px] h-[32px] rounded-full bg-white dark:bg-d-fondo shadow-md transform transition-transform duration-300 ${theme === 'dark' ? 'translate-x-[112px]' : ''
                                            }`}
                                    >
                                        {theme === 'light' ? (
                                            <Sun className="w-5 h-5 text-yellow-500" />
                                        ) : (
                                            <Moon className="w-5 h-5 text-blue-500" />
                                        )}
                                    </span>
                                </button>
                            </div>
                            <Link href={'/auth/login'}>
                                <button className="ml-4 text-base font-semibold text-d-yellow hover:text-white hover:font-bold">¿Eres Colaborador?</button>
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>
            <main>
                <SwiperHero />
                <section id="caracteristicas" className="bg-white dark:bg-[#2D2D2D]">
                    <div className="max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
                        <div className="lg:text-center">
                            <h2 className="text-base text-gray-400  font-semibold tracking-wide uppercase">Características</h2>
                            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                                Una nueva forma de explorar la literatura
                            </p>
                            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
                                Descubre todo lo que puedes hacer con nuestro asistente de IA especializado en literatura.
                            </p>
                        </div>
                        <div className="mt-10">
                            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                                {[
                                    {
                                        name: 'Exploración de autores locales',
                                        description: 'Descubre a los autores literarios del Estado Bolívar y sus obras más relevantes.',
                                        icon: PenTool,
                                        color: 'bg-d-blue',
                                    },
                                    {
                                        name: 'Acceso a contenido multimedia',
                                        description: 'Explora imágenes, documentos, audios y videos asociados a obras y autores.',
                                        icon: Video,
                                        color: 'bg-d-green',
                                    },
                                    {
                                        name: 'Análisis de estilo literario',
                                        description: 'Obtén un desglose detallado de los estilos literarios empleados en las obras.',
                                        icon: Feather,
                                        color: 'bg-d-yellow',
                                    },
                                    {
                                        name: 'Reconocimiento de obras por contexto',
                                        description: 'Pregunta sobre temas y recibe información detallada sobre obras literarias relacionadas.',
                                        icon: Search,
                                        color: 'bg-d-gray',
                                    },
                                ].map((feature) => (
                                    <div key={feature.name} className="relative">
                                        <dt>
                                            <div className={`absolute flex items-center justify-center h-12 w-12 rounded-md ${feature.color} text-white dark:text-gray-900`}>
                                                <feature.icon className="h-6 w-6" aria-hidden="true" />
                                            </div>
                                            <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">
                                                {feature.name}
                                            </p>
                                        </dt>
                                        <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">
                                            {feature.description}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </section>

                <section id="demostracion" className="bg-white dark:bg-[#2D2D2D]">
                    <ChatDemonstrationSection />
                </section>

                <section id="testimonios" className="bg-white dark:bg-[#2D2D2D]">
                    <div className="max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
                        <Testimonials />
                    </div>
                </section>

                <section id="estadisticas" className="bg-white dark:bg-[#2D2D2D]">
                    <div className="max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <StatsSection />
                    </div>
                </section>

                <section id="noticias" className="bg-white dark:bg-[#2D2D2D]">
                    {/* News */}
                    <News />
                </section>

            </main>
            <footer className="bg-white dark:bg-[#2D2D2D]">
                <Footer/>
                {/* <footer className="bg-gray-800 text-white py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div>
                                <h3 className="text-lg font-semibold">Contacto</h3>
                                <p>Email: info@letrascopio.com</p>
                                <p>Teléfono: +58 123 456789</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">Enlaces</h3>
                                <ul>
                                    <li><a href="#" className="hover:underline">Sobre nosotros</a></li>
                                    <li><a href="#" className="hover:underline">Términos y condiciones</a></li>
                                    <li><a href="#" className="hover:underline">Política de privacidad</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">Síguenos</h3>
                                <div className="flex space-x-4">
                                    <a href="#"><i className="fab fa-facebook"></i></a>
                                    <a href="#"><i className="fab fa-twitter"></i></a>
                                    <a href="#"><i className="fab fa-instagram"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 text-center">
                            <p>&copy; 2024 LetraScopio. Todos los derechos reservados.</p>
                        </div>
                    </div>
                </footer> */}

            </footer>
        </div>
    )
}
