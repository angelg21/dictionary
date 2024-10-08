// Definimos la interfaz ApiResponse
interface ApiResponse {
    type: 'biography' | 'comparison' | 'list' | 'similarity' | 'multimedia' | 'model';
    query: string;
    result: {
        title: string;
        text: string;
        multimedia: {
            images: { link: string; description: string }[];
            videos: { link: string; description: string }[];
            audios: { link: string; description: string }[];
            documents: { link: string; description: string }[];
        };
    };
}

export const SendMessage = async (question: string | string[]) => {
    try {
        const response = await fetch(`https://modelai-dictionary.onrender.com/ask`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question }),
        });

        // Convertimos la respuesta a JSON
        const responseData = await response.json();

        if (!response.ok) {
            console.error('Error al obtener los datos del agrupamiento:', responseData);
            return;
        }

        // Procesamos la respuesta antes de devolverla
        const parsedResponse = handleApiResponse(responseData);

        return {
            parsedResponse,
        };
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        return;
    }
};

// Lógica para manejar la respuesta de la API
const handleApiResponse = (responseData: any): ApiResponse => {
    try {
        // Verificamos si el resultado contiene un bloque de código con el JSON
        if (responseData.result && responseData.result.includes('```json')) {
            // Extraemos el bloque de JSON dentro de la cadena
            const jsonString = responseData.result.split('```json')[1].split('```')[0].trim();

            // Parseamos el JSON contenido en esa cadena
            const apiData = JSON.parse(jsonString);

            return {
                type: responseData.type,
                query: responseData.query,
                result: {
                    title: apiData.title,
                    text: apiData.text,
                    multimedia: {
                        images: apiData.multimedia.images || [],
                        videos: apiData.multimedia.videos || [],
                        audios: apiData.multimedia.audios || [],
                        documents: apiData.multimedia.documents || [],
                    },
                },
            };
        } else {
            throw new Error('Formato de respuesta inválido');
        }
    } catch (error) {
        console.error('Error al procesar la respuesta de la API:', error);
        throw new Error('Error al procesar la respuesta de la API');
    }
};
