'use client'

import { useState, useRef, useEffect } from 'react';
import { Send, PenSquare, Leaf, Brain, Lightbulb, Moon, Sun } from 'lucide-react';
import { useTheme } from "next-themes";
import Loader from './Loader';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import ChatResponseDisplay from './ChatResponseDisplay';
import { SendMessage } from '@/src/app/dictionary/actions/send-message';

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
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [loading, setLoading] = useState(false);

    const prueba = "json\n{\n  \"title\": \"Teresa Coraspe\",\n  \"text\": \"Teresa Coraspe vivió en Ciudad Bolívar durante la segunda mitad del siglo XX y la primera del siglo XXI.\",\n  \"multimedia\": {\n    \"images\": [\n      {\n        \"link\": \"https://res.cloudinary.com/dlhvylz4p/image/upload/v1727805937/Teresa_Coraspe_ciwt8q.jpg\",\n        \"description\": \"Foto de Teresa en su casa\"\n      },\n      {\n        \"link\": \"https://res.cloudinary.com/dlhvylz4p/image/upload/v1727805937/Teresa_Coraspe_ciwt8q.jpg\",\n        \"description\": \"Foto de Teresa en su casa\"\n      },\n      {\n        \"link\": \"https://res.cloudinary.com/dlhvylz4p/image/upload/v1727805937/Teresa_Coraspe_ciwt8q.jpg\",\n        \"description\": \"Foto de Teresa en su casa\"\n      },\n      {\n        \"link\": \"https://res.cloudinary.com/dlhvylz4p/image/upload/v1727805937/Teresa_Coraspe_ciwt8q.jpg\",\n        \"description\": \"Foto de Tereszxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxz xxxxxxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxx xxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxx xxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxx xa en su casa\"\n      }\n    ],\n    \"videos\": [\n      {\n        \"link\": \"https://res.cloudinary.com/dlhvylz4p/video/upload/v1728086505/Dictionary/Authors/l7x5gzqarvfsq1llhee2.mp4\",\n        \"description\": \"Entrevista a Teresa Coraspe sobre su obra literaria\"\n      },\n      {\n        \"link\": \"https://res.cloudinary.com/dlhvylz4p/raw/upload/v1728052102/WhatsApp_Video_2024-07-29_at_09.07.13_iwwdjo.mp4\",\n        \"description\": \"Documental sobre la vida de Teresa Coraspe\"\n      },\n      {\n        \"link\": \"https://res.cloudinary.com/dlhvylz4p/video/upload/v1728086505/Dictionary/Authors/l7x5gzqarvfsq1llhee2.mp4\",\n        \"description\": \"Conferencia de Teresa sobre poesía en Ciudad Bolívar\"\n      },\n      {\n        \"link\": \"https://res.cloudinary.com/dlhvylz4p/raw/upload/v1728052102/WhatsApp_Video_2024-07-29_at_09.07.13_iwwdjo.mp4\",\n        \"description\": \"Evento en el cual Teresa discute sus escritos\"\n      },\n      {\n        \"link\": \"https://res.cloudinary.com/dlhvylz4p/video/upload/v1728086505/Dictionary/Authors/l7x5gzqarvfsq1llhee2.mp4\",\n        \"description\": \"Teresa hablando sobre los desafíos de ser una autora en su tiempo\"\n      },\n      {\n        \"link\": \"https://res.cloudinary.com/dlhvylz4p/raw/upload/v1728052102/WhatsApp_Video_2024-07-29_at_09.07.13_iwwdjo.mp4\",\n        \"description\": \"Video homenaje a Teresa y su legado literario\"\n      }\n    ],\n    \"audios\": [\n      {\n        \"link\": \"https://res.cloudinary.com/dlhvylz4p/video/upload/v1728092963/Dictionary/Authors/ysuegjov5yxq8nik2yh1.ogg\",\n        \"description\": \"Entrevista sobre la vida personal de Teresa Coraspe\"\n      },\n      {\n        \"link\": \"https://res.cloudinary.com/dlhvylz4p/video/upload/v1728092963/Dictionary/Authors/dmhvuwri2p9fhzlhs1kr.ogg\",\n        \"description\": \"Teresa leyendo un poema de su autoría\"\n      },\n      {\n        \"link\": \"https://res.cloudinary.com/dlhvylz4p/video/upload/v1728092963/Dictionary/Authors/e0cfvuttkknxcqitp2js.ogg\",\n        \"description\": \"Discurso de Teresa sobre la importancia de la poesía en la sociedad\"\n      },\n      {\n        \"link\": \"https://res.cloudinary.com/dlhvylz4p/video/upload/v1728092963/Dictionary/Authors/bq9lme77hwablsngrief.ogg\",\n        \"description\": \"Reflexión sobre la vida de los escritores de su época\"\n      }\n    ],\n    \"documents\": [\n      {\n        \"link\": \"https://res.cloudinary.com/dlhvylz4p/image/upload/v1728150241/Dictionary/Authors/fi7lh5jkdgjvwo6vjutu.pdf\",\n        \"description\": \"Biografía de Teresa Coraspe en formato PDF\"\n      },\n      {\n        \"link\": \"https://res.cloudinary.com/dlhvylz4p/raw/upload/v1728150348/Dictionary/Authors/eyrddmcg9ynjawnzt3qi.docx\",\n        \"description\": \"Manuscrito de Teresa Coraspe en formato Word\"\n      }\n    ]\n  }\n}\n";

    // Acceso al tema actual y a la función para cambiarlo
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, loading])

    const handleSend = async (content: string) => {
        if (content.trim()) {
            const newMessage: Message = { role: 'user', content };
            setMessages(prev => [...prev, newMessage]);
            setInput('');
            setLoading(true); // Inicia el estado de carga

            // Simulación de respuesta del servidor
            const response = await SendMessage(content)
            if (response) {
                const formattedResponse = response.parsedResponse;
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
            } else {
                console.error("Response is undefined");
            }
    

            
            setLoading(false);
        }
    };



    interface ApiResponse {
        type: 'biography' | 'comparison' | 'list' | 'similarity' | 'multimedia' | 'model';
        query: string;
        result: any
    }


    const suggestions = [
        { text: "Consejos para una carta de presentación", icon: PenSquare },
        { text: "Consejos para el cuidado de plantas", icon: Leaf },
        { text: "Poner a prueba mis conocimientos", icon: Brain },
        { text: "Cómo funciona algo", icon: Lightbulb },
    ];

    const handleApiResponse = (responseString: string): ApiResponse => {
        // Primero, separamos la cadena "json\n" del JSON real
        const jsonString = responseString.split("json\n")[1].trim();

        // Parseamos la cadena JSON
        const apiData = JSON.parse(jsonString);

        // Creamos el objeto de respuesta con el formato deseado
        return {
            type: 'biography', // Asigna el tipo según sea necesario
            query: "¿Quién es Teresa Coraspe?", // Puedes ajustar esto según la consulta original
            result: {
                title: apiData.title,
                text: apiData.text,
                multimedia: {
                    images: apiData.multimedia.images,
                    videos: apiData.multimedia.videos,
                    audios: apiData.multimedia.audios,
                    documents: apiData.multimedia.documents
                }
            }
        };
    };

    if (!mounted) return null;

    return (
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

                        <>
                            {messages.map((message, index) => (
                                <div key={index} className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'items-start'}`}>
                                    {message.role === 'assistant' && (
                                        <div className="w-8 h-8 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center">
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
                                            message.data && <ChatResponseDisplay data={message.data}/> // Para la respuesta del asistente
                                        )}
                                    </div>
                                </div>
                            ))}

                            {loading && (
                                <Loader />
                            )}
                        </>
                    )}
                </div>
                <div ref={messagesEndRef} />
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
    );
}
