import { useAlert } from "@/src/users/context/AlertContext";
import { ThumbsUp, ThumbsDown, Volume2, Copy } from 'lucide-react';

interface Summary {
    title: string;
    text: string;
}


export const RenderSummary = ({ title, text }: Summary) => {

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
    const handleCopy = (textToCopy: string) => {
        const currentYear = new Date().getFullYear(); // Obtiene el año actual
        const additionalText = `\n\nTomado de: LetraScopio. Diccionario de literatura del estado Bolívar. Ciudad Guayana: Universidad Católica Andres Bello, ${currentYear}. https://letrascopio.vercel.app/`;

        // El texto final que se copiará, incluyendo el enlace clickeable
        const finalText = `${textToCopy}${additionalText}`;

        navigator.clipboard.writeText(finalText).then(() => {
            showAlert("Texto copiado en el portapapeles", "success");
        });
    };

    const { showAlert } = useAlert();

    return (
        <div className="bg-white dark:bg-[#2D2D2D]">
            <h2 className="text-xl font-bold mb-5">{title}</h2>
            <p className="mt-2 text-gray-700 dark:text-gray-300 mb-8 break-words whitespace-normal">{text}</p>

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
