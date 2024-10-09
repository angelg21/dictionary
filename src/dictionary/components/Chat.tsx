'use client'

import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Send, PenSquare, Leaf, Brain, Lightbulb, Moon, Sun } from 'lucide-react';
import { useTheme } from "next-themes";
import Loader from './Loader';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import ChatResponseDisplay from './ChatResponseDisplay';
import { SendMessage } from '@/src/app/dictionary/actions/send-message';
import { AlertProvider } from '@/src/users/context/AlertContext';

// Define el tipo para cada mensaje
interface Message {
    role: 'user' | 'assistant';
    content?: string; // Para mensajes simples
    query?: string;   // Para incluir la consulta del usuario
    data?: { // Almacena la respuesta estructurada
        type: 'biography' | 'comparison' | 'list' | 'similarity' | 'multimedia' | 'model';
        query: string;
        result: any; // Este será un tipo más específico según el contenido
    }
}

export default function Chat() {

    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const messagesContainerRef = useRef<HTMLDivElement | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [loading, setLoading] = useState(false);

    const prueba = "json\n{\n  \"title\": \"Teresa Coraspe\",\n  \"text\": \"Teresa Coraspe vivió en Ciudad Bolívar durante la segunda mitad del siglo XX y la primera del siglo XXI.\",\n  \"multimedia\": {\n    \"images\": [\n      {\n        \"link\": \"https://res.cloudinary.com/dlhvylz4p/image/upload/v1727805937/Teresa_Coraspe_ciwt8q.jpg\",\n        \"description\": \"Foto de Teresa en su casa Foto de Teresa en su casa Foto de Teresa en su casa Foto de Teresa en su casa Foto de Teresa en su casa Foto de Teresa en su casa Foto de Teresa en su casa \"\n      },\n      {\n        \"link\": \"https://res.cloudinary.com/dlhvylz4p/image/upload/v1727805937/Teresa_Coraspe_ciwt8q.jpg\",\n        \"description\": \"Foto de Teresa en su casa\"\n      },\n      {\n        \"link\": \"https://res.cloudinary.com/dlhvylz4p/image/upload/v1727805937/Teresa_Coraspe_ciwt8q.jpg\",\n        \"description\": \"Foto de Teresa en su casa\"\n      },\n      {\n        \"link\": \"https://res.cloudinary.com/dlhvylz4p/image/upload/v1727805937/Teresa_Coraspe_ciwt8q.jpg\",\n        \"description\": \"Foto de Tereszxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxz xxxxxxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxx xxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxx xxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxx xa en su casa\"\n      }\n    ],\n    \"videos\": [\n      {\n        \"link\": \"https://res.cloudinary.com/dlhvylz4p/video/upload/v1728086505/Dictionary/Authors/l7x5gzqarvfsq1llhee2.mp4\",\n        \"description\": \"Entrevista a Teresa Coraspe sobre su obra literaria\"\n      },\n      {\n        \"link\": \"https://res.cloudinary.com/dlhvylz4p/raw/upload/v1728052102/WhatsApp_Video_2024-07-29_at_09.07.13_iwwdjo.mp4\",\n        \"description\": \"Documental sobre la vida de Teresa Coraspe\"\n      },\n      {\n        \"link\": \"https://res.cloudinary.com/dlhvylz4p/video/upload/v1728086505/Dictionary/Authors/l7x5gzqarvfsq1llhee2.mp4\",\n        \"description\": \"Conferencia de Teresa sobre poesía en Ciudad Bolívar\"\n      },\n      {\n        \"link\": \"https://res.cloudinary.com/dlhvylz4p/raw/upload/v1728052102/WhatsApp_Video_2024-07-29_at_09.07.13_iwwdjo.mp4\",\n        \"description\": \"Evento en el cual Teresa discute sus escritos\"\n      },\n      {\n        \"link\": \"https://res.cloudinary.com/dlhvylz4p/video/upload/v1728086505/Dictionary/Authors/l7x5gzqarvfsq1llhee2.mp4\",\n        \"description\": \"Teresa hablando sobre los desafíos de ser una autora en su tiempo\"\n      },\n      {\n        \"link\": \"https://res.cloudinary.com/dlhvylz4p/raw/upload/v1728052102/WhatsApp_Video_2024-07-29_at_09.07.13_iwwdjo.mp4\",\n        \"description\": \"Video homenaje a Teresa y su legado literario\"\n      }\n    ],\n    \"audios\": [\n      {\n        \"link\": \"https://res.cloudinary.com/dlhvylz4p/video/upload/v1728092963/Dictionary/Authors/ysuegjov5yxq8nik2yh1.ogg\",\n        \"description\": \"Entrevista sobre la vida personal de Teresa Coraspe\"\n      },\n      {\n        \"link\": \"https://res.cloudinary.com/dlhvylz4p/video/upload/v1728092963/Dictionary/Authors/dmhvuwri2p9fhzlhs1kr.ogg\",\n        \"description\": \"Teresa leyendo un poema de su autoría\"\n      },\n      {\n        \"link\": \"https://res.cloudinary.com/dlhvylz4p/video/upload/v1728092963/Dictionary/Authors/e0cfvuttkknxcqitp2js.ogg\",\n        \"description\": \"Discurso de Teresa sobre la importancia de la poesía en la sociedad\"\n      },\n      {\n        \"link\": \"https://res.cloudinary.com/dlhvylz4p/video/upload/v1728092963/Dictionary/Authors/bq9lme77hwablsngrief.ogg\",\n        \"description\": \"Reflexión sobre la vida de los escritores de su época\"\n      }\n    ],\n    \"documents\": [\n      {\n        \"link\": \"https://res.cloudinary.com/dlhvylz4p/image/upload/v1728150241/Dictionary/Authors/fi7lh5jkdgjvwo6vjutu.pdf\",\n        \"description\": \"Biografía de Teresa Coraspe en formato PDF\"\n      },\n      {\n        \"link\": \"https://res.cloudinary.com/dlhvylz4p/raw/upload/v1728150348/Dictionary/Authors/eyrddmcg9ynjawnzt3qi.docx\",\n        \"description\": \"Manuscrito de Teresa Coraspe en formato Word\"\n      }\n    ]\n  }\n}\n";

    type ResponseType = "biography" | "comparison" | "list" | "similarity" | "multimedia" | "model";

    const prueba2: { type: ResponseType; query: string; result: any } = {
        type: 'biography', // Tipo de respuesta, puedes ajustarlo según sea necesario
        query: 'Información de Teresa Coraspe', // La consulta que generó esta respuesta, ajustable según el caso
        result: {
            title: "Teresa Coraspe",
            text: "Teresa Coraspe vivió en Ciudad Bolívar durante la segunda mitad del siglo XX y la primera del siglo XXI.",
            multimedia: {
                images: [
                    {
                        link: "https://res.cloudinary.com/dlhvylz4p/image/upload/v1727805937/Teresa_Coraspe_ciwt8q.jpg",
                        description: "Foto de Teresa en su casa Foto de Teresa en su casa "
                    },
                    {
                        link: "https://res.cloudinary.com/dlhvylz4p/image/upload/v1727805937/Teresa_Coraspe_ciwt8q.jpg",
                        description: "Foto de Teresa en su casa Foto de Teresa en su casa Foto de Teresa en su casa Foto de Teresa en su casa"
                    },
                    {
                        link: "https://res.cloudinary.com/dlhvylz4p/image/upload/v1728337394/Dictionary/Authors/xvdv5zknnnlou477qpbl.jpg",
                        description: "Foto de Teresa en su casa Foto de Teresa en su casa Foto de Teresa en su casa Foto de Teresa en su casa Foto de Teresa en su casa Foto de Teresa en su casa"
                    },
                    {
                        link: "https://res.cloudinary.com/dlhvylz4p/image/upload/v1727805937/Teresa_Coraspe_ciwt8q.jpg",
                        description: "Foto de Teresa en su casa"
                    }
                ],
                videos: [
                    {
                        link: "https://res.cloudinary.com/dlhvylz4p/video/upload/v1728086505/Dictionary/Authors/l7x5gzqarvfsq1llhee2.mp4",
                        description: "Entrevista a Teresa Coraspe sobre su obra literaria"
                    },
                    {
                        link: "https://res.cloudinary.com/dlhvylz4p/raw/upload/v1728052102/WhatsApp_Video_2024-07-29_at_09.07.13_iwwdjo.mp4",
                        description: "Documental sobre la vida de Teresa Coraspe"
                    },
                    {
                        link: "https://res.cloudinary.com/dlhvylz4p/video/upload/v1728086505/Dictionary/Authors/l7x5gzqarvfsq1llhee2.mp4",
                        description: "Conferencia de Teresa sobre poesía en Ciudad Bolívar"
                    },
                    {
                        link: "https://res.cloudinary.com/dlhvylz4p/raw/upload/v1728052102/WhatsApp_Video_2024-07-29_at_09.07.13_iwwdjo.mp4",
                        description: "Evento en el cual Teresa discute sus escritos"
                    },
                    {
                        link: "https://res.cloudinary.com/dlhvylz4p/video/upload/v1728086505/Dictionary/Authors/l7x5gzqarvfsq1llhee2.mp4",
                        description: "Teresa hablando sobre los desafíos de ser una autora en su tiempo"
                    },
                    {
                        link: "https://res.cloudinary.com/dlhvylz4p/raw/upload/v1728052102/WhatsApp_Video_2024-07-29_at_09.07.13_iwwdjo.mp4",
                        description: "Video homenaje a Teresa y su legado literario"
                    }
                ],
                audios: [
                    {
                        link: "https://res.cloudinary.com/dlhvylz4p/video/upload/v1728092963/Dictionary/Authors/ysuegjov5yxq8nik2yh1.ogg",
                        description: "Entrevista sobre la vida personal de Teresa Coraspe"
                    },
                    {
                        link: "https://res.cloudinary.com/dlhvylz4p/video/upload/v1728092963/Dictionary/Authors/dmhvuwri2p9fhzlhs1kr.ogg",
                        description: "Teresa leyendo un poema de su autoría"
                    },
                    {
                        link: "https://res.cloudinary.com/dlhvylz4p/video/upload/v1728092963/Dictionary/Authors/e0cfvuttkknxcqitp2js.ogg",
                        description: "Discurso de Teresa sobre la importancia de la poesía en la sociedad"
                    },
                    {
                        link: "https://res.cloudinary.com/dlhvylz4p/video/upload/v1728092963/Dictionary/Authors/bq9lme77hwablsngrief.ogg",
                        description: "Reflexión sobre la vida de los escritores de su época"
                    }
                ],
                documents: [
                    {
                        link: "https://res.cloudinary.com/dlhvylz4p/image/upload/v1728150241/Dictionary/Authors/fi7lh5jkdgjvwo6vjutu.pdf",
                        description: "Biografía de Teresa Coraspe en formato PDF"
                    },
                    {
                        link: "https://res.cloudinary.com/dlhvylz4p/raw/upload/v1728150348/Dictionary/Authors/eyrddmcg9ynjawnzt3qi.docx",
                        description: "Manuscrito de Teresa Coraspe en formato Word"
                    }
                ]
            }
        }
    };

    const prueba3: { type: ResponseType; query: string; result: any } = {
        type: 'list', // Tipo de respuesta, puedes ajustarlo según sea necesario
        query: 'Información de Teresa Coraspe',
        result: {
            "title": "Obras de Teresa Coraspe",
            "items": [
                {
                    "title": "Las fieras se dan golpes de pecho",
                    "text": "La obra \"Las fieras se dan golpes de pecho\" es un poemario escrito en español, publicado en el año 1975 por la Editorial Talavera en Ciudad Bolívar. Pertenece al género de la poesía y se caracteriza por retratar la cotidianidad con sus aspectos más oscuros y secundarios, como las soledades tumultuosas, los desamores y amores marcados por horarios, y las batallas silenciosas contra las vibraciones ordinarias de la vida diaria. Hasta el momento, no se han registrado ediciones adicionales de la obra.",
                    "multimedia": {
                        "images": [
                            {
                                link: "https://res.cloudinary.com/dlhvylz4p/image/upload/v1727805937/Teresa_Coraspe_ciwt8q.jpg",
                                description: "Foto de Teresa en su casa Foto de Teresa en su casa "
                            },
                            {
                                link: "https://res.cloudinary.com/dlhvylz4p/image/upload/v1727805937/Teresa_Coraspe_ciwt8q.jpg",
                                description: "Foto de Teresa en su casa Foto de Teresa en su casa Foto de Teresa en su casa Foto de Teresa en su casa"
                            },
                            {
                                link: "https://res.cloudinary.com/dlhvylz4p/image/upload/v1728337394/Dictionary/Authors/xvdv5zknnnlou477qpbl.jpg",
                                description: "Foto de Teresa en su casa Foto de Teresa en su casa Foto de Teresa en su casa Foto de Teresa en su casa Foto de Teresa en su casa Foto de Teresa en su casa"
                            },
                            {
                                link: "https://res.cloudinary.com/dlhvylz4p/image/upload/v1727805937/Teresa_Coraspe_ciwt8q.jpg",
                                description: "Foto de Teresa en su casa"
                            }
                        ],
                        "videos": [],
                        "audios": [],
                        "documents": [
                            {
                                "link": "https://res.cloudinary.com/dlhvylz4p/raw/upload/v1728051986/2_Un_diccionario_de_lo_nuestro_30-51_1_yfhyw8.pdf",
                                "description": "Diccionario de lo nuestro: una mirada a la literatura hispanoamericana."
                            }
                        ]
                    }
                },
                {
                    "title": "Vuelvo con mis huesos",
                    "text": "La obra \"Vuelvo con mis huesos\" es un poemario escrito en español, publicado en el año 1978 en Ciudad Bolívar por la Tipografía del Diario El Luchador. Pertenece al género de la poesía y se caracteriza por reflejar el dolor de abandonar algo propio y confrontar un destino inevitable. La voz poética se percibe despojada y sacrificada, especialmente en el atardecer, momento en el cual la tristeza la embarga. Hasta el momento, no se han registrado ediciones adicionales de esta obra.",
                    "multimedia": {
                        "images": [
                            {
                                "link": "https://res.cloudinary.com/dlhvylz4p/image/upload/v1727808932/Coraspe_Vuelvo_con_mis_huesos_portada_srtgl4.jpg",
                                "description": "Portada de 'Vuelvo con mis huesos': un viaje introspectivo."
                            }
                        ],
                        "videos": [
                            {
                                link: "https://res.cloudinary.com/dlhvylz4p/video/upload/v1728086505/Dictionary/Authors/l7x5gzqarvfsq1llhee2.mp4",
                                description: "Entrevista a Teresa Coraspe sobre su obra literaria"
                            },
                            {
                                link: "https://res.cloudinary.com/dlhvylz4p/raw/upload/v1728052102/WhatsApp_Video_2024-07-29_at_09.07.13_iwwdjo.mp4",
                                description: "Documental sobre la vida de Teresa Coraspe"
                            },
                            {
                                link: "https://res.cloudinary.com/dlhvylz4p/video/upload/v1728086505/Dictionary/Authors/l7x5gzqarvfsq1llhee2.mp4",
                                description: "Conferencia de Teresa sobre poesía en Ciudad Bolívar"
                            },
                            {
                                link: "https://res.cloudinary.com/dlhvylz4p/raw/upload/v1728052102/WhatsApp_Video_2024-07-29_at_09.07.13_iwwdjo.mp4",
                                description: "Evento en el cual Teresa discute sus escritos"
                            },
                        ],
                        "audios": [
                            {
                                link: "https://res.cloudinary.com/dlhvylz4p/video/upload/v1728092963/Dictionary/Authors/ysuegjov5yxq8nik2yh1.ogg",
                                description: "Entrevista sobre la vida personal de Teresa Coraspe"
                            },
                            {
                                link: "https://res.cloudinary.com/dlhvylz4p/video/upload/v1728092963/Dictionary/Authors/dmhvuwri2p9fhzlhs1kr.ogg",
                                description: "Teresa leyendo un poema de su autoría"
                            },
                            {
                                link: "https://res.cloudinary.com/dlhvylz4p/video/upload/v1728092963/Dictionary/Authors/e0cfvuttkknxcqitp2js.ogg",
                                description: "Discurso de Teresa sobre la importancia de la poesía en la sociedad"
                            },
                        ],
                        "documents": []
                    }
                },
                {
                    "title": "Vértice del círculo",
                    "text": "\"Vértice del círculo\" es una obra de poesía escrita en español y publicada en el año 1987 en Ciudad Bolívar por la Gobernación del Estado Bolívar. La obra pertenece al género de la poesía y se caracteriza por expresar la sensación de estar atrapado en una ciudad desconocida pero familiar, generando angustia y tristeza en la hablante. La ciudad se presenta como un entorno sin escapatoria, estrechamente vinculada al cuerpo y la mente de la protagonista, convirtiéndose en una presencia opresiva y constante en su vida. A pesar de la incomodidad que provoca, la voz poética logra convivir con la ciudad, percibiéndola como una entidad viva dentro de sí misma. Hasta el momento, no se han registrado ediciones adicionales de la obra.",
                    "multimedia": {
                        "images": [
                            {
                                "link": "https://res.cloudinary.com/dlhvylz4p/image/upload/v1727809103/V%C3%A9rtice_del_c%C3%ADrculo_Coraspe_portada_qeuvhd.jpg",
                                "description": "Portada de 'Vértice del círculo': explorando lo desconocido."
                            }
                        ],
                        "videos": [],
                        "audios": [
                            {
                                link: "https://res.cloudinary.com/dlhvylz4p/video/upload/v1728092963/Dictionary/Authors/ysuegjov5yxq8nik2yh1.ogg",
                                description: "Entrevista sobre la vida personal de Teresa Coraspe"
                            },
                            {
                                link: "https://res.cloudinary.com/dlhvylz4p/video/upload/v1728092963/Dictionary/Authors/dmhvuwri2p9fhzlhs1kr.ogg",
                                description: "Teresa leyendo un poema de su autoría"
                            },
                            {
                                link: "https://res.cloudinary.com/dlhvylz4p/video/upload/v1728092963/Dictionary/Authors/e0cfvuttkknxcqitp2js.ogg",
                                description: "Discurso de Teresa sobre la importancia de la poesía en la sociedad"
                            },
                        ],
                        "documents": [
                            {
                                link: "https://res.cloudinary.com/dlhvylz4p/image/upload/v1728150241/Dictionary/Authors/fi7lh5jkdgjvwo6vjutu.pdf",
                                description: "Biografía de Teresa Coraspe en formato PDF"
                            },
                            {
                                link: "https://res.cloudinary.com/dlhvylz4p/raw/upload/v1728150348/Dictionary/Authors/eyrddmcg9ynjawnzt3qi.docx",
                                description: "Manuscrito de Teresa Coraspe en formato Word"
                            }
                        ]
                    }
                }
            ]
        }
    }

    // Acceso al tema actual y a la función para cambiarlo
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Función para hacer scroll hasta el final
    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Forzar el scroll al final cuando cambian los mensajes o el estado de carga
    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    const handleSend = async (content: string) => {
        if (content.trim()) {
            const newMessage: Message = { role: 'user', content };
            setMessages(prev => [...prev, newMessage]);
            setInput('');
            setLoading(true); // Inicia el estado de carga
            // Respuesta del servidor
            try {
                const response = await SendMessage(content);
                if (response) {
                    const formattedResponse = response.parsedResponse;
                    const assistantMessage: Message = {
                        role: 'assistant',
                        query: formattedResponse.query,
                        data: {
                            type: formattedResponse.type,
                            query: formattedResponse.query,
                            result: formattedResponse.result,
                        },
                    };
                    setMessages((prev) => [...prev, assistantMessage]);
                } else {
                    console.error("Response is undefined");
                }
            } catch (error) {
                console.error("Error fetching response:", error);
            } finally {
                setLoading(false);
            }
        }
    };


    const handleSendPrueba = async (content: string) => {
        if (content.trim()) {
            const newMessage: Message = { role: 'user', content };
            setMessages(prev => [...prev, newMessage]);
            setInput('');
            setLoading(true); // Inicia el estado de carga

            // Simulación de respuesta del servidor
            //const response = await SendMessage(content)
            if (prueba2) {
                setTimeout(() => {
                    const formattedResponse = prueba2;
                    const assistantMessage: Message = {
                        role: 'assistant',
                        query: formattedResponse.query,
                        data: {
                            type: formattedResponse.type,
                            query: formattedResponse.query,
                            result: formattedResponse.result // Aquí estamos almacenando el resultado completo
                        }
                    };
                    setMessages(prev => [
                        ...prev,
                        assistantMessage // Agrega el mensaje del asistente
                    ]);
                }, 2000);
            } else {
                console.error("Response is undefined");
            }
            setLoading(false);
        }
    };

    const suggestions = [
        { text: "Consejos para una carta de presentación", icon: PenSquare },
        { text: "Consejos para el cuidado de plantas", icon: Leaf },
        { text: "Poner a prueba mis conocimientos", icon: Brain },
        { text: "Cómo funciona algo", icon: Lightbulb },
    ];

    if (!mounted) return null;

    return (
        <AlertProvider>
            <div className="flex flex-col h-screen w-full mx-auto bg-white dark:bg-[#2D2D2D] text-gray-900 dark:text-gray-100">
                <div className="flex justify-between items-center p-3">
                    <h1 className="text-2xl font-mono">Chronicle</h1>
                    <button
                        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                        className="text-gray-500 dark:text-gray-400"
                    >
                        {theme === 'light' ? (
                            <Moon className="h-[1.2rem] w-[1.2rem] text-d-blue" />
                        ) : (
                            <Sun className="h-[1.2rem] w-[1.2rem] text-d-yellow" />
                        )}
                        <span className="sr-only">Cambiar tema</span>
                    </button>
                </div>
                <div className='w-full h-7 bg-d-blue flex items-center justify-center'>
                    <ShieldCheckIcon className='h-4 w-4 text-white mr-1' />
                    <p className='font-mono text-xs text-gray-100'>
                        Chronicle-preview
                    </p>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                    <div className="max-w-[800px] mx-auto w-full h-full">
                        {messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full">
                                <h1 className="text-4xl font-bold mb-4">
                                    <h1 className="text-6xl font-bold py-3 mb-2 text-center bg-gradient-to-r from-d-blue via-d-blue-light-button to-pink-500 text-transparent bg-clip-text" style={{ fontFamily: 'Arial, sans-serif' }}>
                                        Hola, Angel
                                    </h1>
                                    <p className="text-6xl text-gray-400 dark:text-gray-500 mb-8 text-center font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>
                                        ¿En qué puedo ayudarte?
                                    </p>
                                </h1>

                                <div className="grid grid-cols-2 gap-4">
                                    {suggestions.map((suggestion, index) => (
                                        <button
                                            key={index}
                                            className="h-24 flex flex-col items-center justify-center text-center border-gray-300 dark:border-gray-700"
                                            onClick={() => handleSend(suggestion.text)}
                                        >
                                            <suggestion.icon className="h-6 w-6 mb-2" />
                                            {suggestion.text}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (

                            <div ref={messagesContainerRef}>
                                {messages.map((message, index) => (
                                    <div key={index} className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'items-start'}`}>
                                        {message.role === 'assistant' && (
                                            <div className="hidden sm:flex  w-8 h-8 rounded-full bg-blue-500 flex-shrink-0 items-center justify-center">
                                                <span className="text-white text-sm font-bold">AI</span>
                                            </div>
                                        )}
                                        <div className={`my-4 max-w-[800px] inline-block px-4 ${message.role === 'user'
                                            ? 'rounded-tl-2xl rounded-bl-2xl rounded-br-2xl py-3 bg-[#f4f4f4] text-gray-900 dark:bg-[#4A4A4A] dark:text-gray-100'
                                            : 'mt-1 bg-white dark:bg-[#2D2D2D] text-gray-900 dark:text-gray-100'
                                            }`}>
                                            {message.role === 'user' ? (
                                                <span className='break-words'>{message.content}</span> // Muestra el contenido del mensaje del usuario
                                            ) : (
                                                message.data && <ChatResponseDisplay data={message.data} /> // Para la respuesta del asistente
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {loading && (
                                    <Loader />
                                )}
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
                <div className="p-4 mb-3 dark:border-gray-700 bg-white dark:bg-[#2D2D2D]">
                    <div className="mb-5 max-w-[800px] mx-auto w-full ">
                        <form onSubmit={(e) => { e.preventDefault(); handleSend(input); }} className="relative">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Escribe tu mensaje aquí..."
                                className="w-full h-14 pl-6 pr-12 rounded-full bg-white dark:bg-[#333333]  dark:placeholder:text-[#B3B3B3] text-gray-900 dark:text-[#EAEAEA] border-0 dark:ring-[#4A4A4A] ring-1 ring-inset ring-gray-300"
                            />
                            <button
                                type="submit"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent hover:bg-transparent p-2"
                            >
                                <Send className="h-5 w-5 text-gray-600 hover:text-gray-800 dark:text-[#B3B3B3] dark:hover:text-[#EAEAEA]" />
                                <span className="sr-only">Enviar</span>
                            </button>
                        </form>
                    </div>
                    <p className='flex items-center justify-center text-xs text-gray-500 dark:text-gray-400'>
                        Powered by&nbsp;<span className="font-semibold"> UCAB Guayana</span>
                    </p>
                </div>
            </div>
        </AlertProvider>
    );
}
