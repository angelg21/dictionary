export interface MagazineTextValues {
    text: string;
    criticism: Criticism[];      
}

// Interfaz para una crítica (Criticism)
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
export interface Magazine {
    title: string;
    text: string;
}

// Interfaz para el objeto completo que será pasado al componente
export interface MagazineCardData {
    magazine: Magazine;
    criticism: Criticism[];
    observation: string;
}