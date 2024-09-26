


export interface GroupingTextValues {
    text: string;               // Texto principal de la revista
    criticism: string[];        // Arreglo de textos de las críticas
}

// Interfaz para una crítica (Criticism)
export interface Criticism {
    title: string;
    text: string;
}

// Interfaz para el autor
export interface Grouping {
    title: string;
    text: string;
}

// Interfaz para el objeto completo que será pasado al componente
export interface GroupingCardData {
    grouping: Grouping;
    criticism: Criticism[];
}