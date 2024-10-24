'use client'

import { Newspaper } from "lucide-react"
import { useEffect, useState } from "react";

// const newsItems = [
//     {
//         title: "Nuevo análisis de IA revela patrones ocultos en 'Cien años de soledad'",
//         excerpt: "Un estudio reciente utilizando inteligencia artificial ha descubierto nuevas conexiones temáticas en la obra maestra de Gabriel García Márquez.",
//         date: "15 de octubre, 2024",
//         image: "/placeholder.svg?height=200&width=300"
//     },
//     {
//         title: "LiteraturAI lanza función de recomendación de libros personalizada",
//         excerpt: "Nuestra plataforma ahora ofrece recomendaciones de lectura basadas en tus preferencias literarias y historial de conversación.",
//         date: "3 de octubre, 2024",
//         image: "/placeholder.svg?height=200&width=300"
//     },
//     {
//         title: "Colaboración entre IA y autores humanos gana premio literario",
//         excerpt: "Por primera vez, una novela co-escrita por un autor humano y un sistema de IA ha sido galardonada con un prestigioso premio de literatura.",
//         date: "28 de septiembre, 2024",
//         image: "/placeholder.svg?height=200&width=300"
//     }
// ]

// const fetchNewsData = async () => {
//     const url = `https://newsapi.org/v2/everything?qInTitle=literatura&language=es&sortBy=relevancy&apiKey=3d1620013366400faa5d7c3ca9b88280`;

//     try {
//         const response = await fetch(url);

//         if (!response.ok) {
//             throw new Error(`Error en la solicitud: ${response.statusText}`);
//         }

//         const data = await response.json();

//         // Verifica si hay noticias
//         if (data.status === "ok" && data.articles.length > 0) {
//             return data.articles; // Retorna los artículos de noticias
//         } else {
//             throw new Error("No se encontraron noticias relevantes");
//         }
//     } catch (error) {
//         console.error("Error al obtener las noticias:", (error as Error).message);
//         return [];
//     }
// };

const News = () => {
    const [newsItems, setNewsItems] = useState<any[]>([]);

    const customNews = {
        title: "LetraScopio: Próximo Lanzamiento con Innovación en Literatura e Inteligencia Artificial",
        description: "LetraScopio se prepara para lanzar su esperada versión de prueba en los próximos días. La plataforma promete revolucionar el acceso a la literatura del estado Bolívar con herramientas innovadoras.",
        urlToImage: "https://res.cloudinary.com/dlhvylz4p/image/upload/v1729143682/Dictionary/Landing/Testimonials/ckqmt7skpz7p864iyk3z.png",
        publishedAt: new Date().toISOString().split('T')[0], // Fecha actual
        source: {
            id: null,
            name: "UCAB extensión Guayana"
        },
    };

    // Función para traer las noticias de la API
    const fetchNewsData = async () => {
        const url = 'https://newsapi.org/v2/everything?qInTitle=literatura&language=es&sortBy=relevancy&apiKey=3d1620013366400faa5d7c3ca9b88280';

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.status === 'ok') {
                // Filtrar por las fuentes "Muyinteresante.com" y "Noticiaslatam.lat"
                const filteredNews = data.articles.filter((article: any) =>
                    article.source.name === "Muyinteresante.com" ||
                    article.source.name === "Noticiaslatam.lat" ||
                    article.title.includes("Venezuela") ||
                    article.description.includes("Venezuela")
                );

                // Agregar la noticia personalizada al conjunto de noticias
                setNewsItems([customNews, ...filteredNews]);
            } else {
                console.error('Error al obtener las noticias');
            }
        } catch (error) {
            console.error('Error al obtener las noticias:', error);
        }
    };

    useEffect(() => {
        fetchNewsData();
    }, []);

    return (
        <div className="max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="lg:text-center mb-10">
                <h2 className="text-base text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase">NOTICIAS</h2>
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                    Últimas novedades en LiteraturAI
                </p>
                <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
                    Mantente al día con las últimas noticias y actualizaciones de nuestra plataforma.
                </p>
            </div>

            <div className="mt-10 grid gap-10 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10">
                {newsItems.map((item, index) => (
                    <div key={index} className="flex flex-col rounded-lg shadow-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl">
                        <a href={item.url || '#'} target="_blank" rel="noopener noreferrer">
                            <div className="flex-shrink-0">
                                <img className="h-48 w-full object-cover" src={item.urlToImage} alt={item.title} />
                            </div>
                            <div className="flex-1 bg-white dark:bg-gray-700 p-6 flex flex-col justify-between">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                        Noticia
                                    </p>
                                    <div className="block mt-2">
                                        <p className="text-xl font-semibold text-gray-900 dark:text-white">{item.title}</p>
                                        <p className="mt-3 text-base text-gray-500 dark:text-gray-300">{item.description}</p>
                                        <p className="mt-2 text-base text-gray-500 dark:text-gray-300">Fuente: <span className="text-sm font-serif text-gray-400 dark:text-gray-300">{item.source.name}</span></p>
                                    </div>
                                </div>
                                <div className="mt-6 flex items-center">
                                    <div className="flex-shrink-0">
                                        <Newspaper className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            Publicado el
                                        </p>
                                        <div className="flex space-x-1 text-sm text-gray-500 dark:text-gray-300">
                                            <time dateTime={item.publishedAt}>{item.publishedAt.split('T')[0]}</time>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default News
