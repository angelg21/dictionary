// Tipo común para multimedia
interface Multimedia {
    images: { link: string; description: string }[];
    videos: { link: string; description: string }[];
    audios: { link: string; description: string }[];
    documents: { link: string; description: string }[];
}

// Caso para biography
interface BiographyResponse {
    title: string;
    text: string;
    multimedia: Multimedia;
}

// Caso para list (lista de obras, por ejemplo)
interface ListItem {
    title: string;
    text: string;
    multimedia: Multimedia;
}

interface ListResponse {
    title: string;
    items: ListItem[];
}

// Definimos la interfaz que puede manejar tanto biography como list
interface ApiResponse {
    type: 'biography' | 'list' | 'similarity';
    query: string;
    result: BiographyResponse | ListResponse;
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

            // Verificamos el tipo de respuesta
            if (responseData.type === 'list' || responseData.type === 'similarity') {
                // Procesar tipo "list" o "similarity", que tiene un conjunto de "items"
                return {
                    type: responseData.type,
                    query: responseData.query,
                    result: {
                        title: apiData.title || '',
                        items: apiData.items.map((item: any) => ({
                            title: item.title,
                            text: item.text,
                            multimedia: {
                                images: Array.isArray(item.multimedia?.images) ? item.multimedia.images : [],
                                videos: Array.isArray(item.multimedia?.videos) ? item.multimedia.videos : [],
                                audios: Array.isArray(item.multimedia?.audios) ? item.multimedia.audios : [],
                                documents: Array.isArray(item.multimedia?.documents) ? item.multimedia.documents : [],
                            },
                        })),
                    },
                };
            } else if (responseData.type === 'biography') {
                // Procesar el tipo existente "biography"
                return {
                    type: responseData.type,
                    query: responseData.query,
                    result: {
                        title: apiData.title,
                        text: apiData.text,
                        multimedia: {
                            images: Array.isArray(apiData.multimedia?.images) ? apiData.multimedia.images : [],
                            videos: Array.isArray(apiData.multimedia?.videos) ? apiData.multimedia.videos : [],
                            audios: Array.isArray(apiData.multimedia?.audios) ? apiData.multimedia.audios : [],
                            documents: Array.isArray(apiData.multimedia?.documents) ? apiData.multimedia.documents : [],
                        },
                    },
                };
            } else {
                throw new Error('Tipo de respuesta no soportado');
            }
        } else {
            throw new Error('Formato de respuesta inválido');
        }
    } catch (error) {
        console.error('Error al procesar la respuesta de la API:', error);
        throw new Error('Error al procesar la respuesta de la API');
    }
};

