


export interface AuthorTextValues {
    text: string;               // Texto principal del autor
    works: string[];            // Arreglo de textos de las obras
    criticism: string[];        // Arreglo de textos de las críticas
}

// Interfaz para una obra (Work)
export interface Work {
    title: string;
    text: string;
}

// Interfaz para una crítica (Criticism)
export interface Criticism {
    title: string;
    text: string;
}

// Interfaz para el autor
export interface Author {
    title: string;
    text: string;
}

// Interfaz para el objeto completo que será pasado al componente
export interface AuthorCardData {
    author: Author;
    works: Work[];
    criticism: Criticism[];
}