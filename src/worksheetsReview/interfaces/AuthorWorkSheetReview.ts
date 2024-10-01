export interface AuthorTextValues {
    text: string;             
    works: Work[];            
    criticism: Criticism[];      
}

// Interfaz para una obra (Work)
export interface Work {
    title?: string;
    originalLanguage?: string;
    genre?: string;
    publicationDate?: string;
    publicationPlace?: Publication;
    description?: string;
    multimedia?: Multimedia[];
    text?: string;
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
  
export interface Publication {
    city?: string;
    printingHouse?: string;
    publisher?: string;
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
    observation: string;
}