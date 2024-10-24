'use server'


export async function getNews() {
    const apiKey = process.env.NEWS_API_KEY; // Asegúrate de que la clave API esté en las variables de entorno
    const url = `https://newsapi.org/v2/everything?qInTitle=literatura&language=es&sortBy=relevancy&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al obtener las noticias');
        }

        // Filtrar las noticias por fuentes específicas y palabras clave
        const filteredNews = data.articles.filter((article: any) =>
            article.source.name === "Muyinteresante.com" ||
            article.source.name === "Noticiaslatam.lat" ||
            article.title.includes("Venezuela") ||
            article.description.includes("Venezuela")
        );

        return filteredNews; // Devuelve los artículos filtrados
    } catch (error: any) {
        console.error('Error al obtener las noticias:', error.message);
        return []; // Retorna un array vacío en caso de error
    }
}