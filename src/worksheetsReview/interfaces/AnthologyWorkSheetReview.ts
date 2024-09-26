



export interface AnthologyTextValues {
    text: string;               // Texto principal de la revista
    criticism: string[];        // Arreglo de textos de las críticas
}

// Interfaz para una crítica (Criticism)
export interface Criticism {
    title: string;
    text: string;
}

// Interfaz para el autor
export interface Anthology {
    title: string;
    text: string;
}

// Interfaz para el objeto completo que será pasado al componente
export interface AnthologyCardData {
    anthology: Anthology;
    criticism: Criticism[];
}