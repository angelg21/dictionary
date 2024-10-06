
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
        const response = await fetch(process.env.API_URL + `/cards/author/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question }),
        });

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
const handleApiResponse = (responseString: string): ApiResponse => {
    try {
        const jsonString = responseString.split("json\n")[1].trim();
        const apiData = JSON.parse(jsonString);

        return {
            type: apiData.type,
            query: apiData.query,
            result: {
                title: apiData.title,
                text: apiData.text,
                multimedia: {
                    images: apiData.multimedia.images,
                    videos: apiData.multimedia.videos,
                    audios: apiData.multimedia.audios,
                    documents: apiData.multimedia.documents,
                },
            },
        };
    } catch (error) {
        console.error('Error al procesar la respuesta de la API:', error);
        throw new Error('Error al procesar la respuesta de la API');
    }
};
