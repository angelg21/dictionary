



export interface AnthologyTextValues {
    text: string;               // Texto principal de la revista
    criticism: Criticism[];        // Arreglo de textos de las críticas
}

export interface Criticism {
    title?: string;
    type?: string;
    author?: string;
    publicationDate?: string;
    link?: string;
    bibliographicReference?: string;
    description?: string;
    multimedia?: Multimedia[];
    text?: string;
}

export interface Multimedia {
    link?: string;
    title?: string;
    type?: string;
    description?: string;
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
    observation: string;
}