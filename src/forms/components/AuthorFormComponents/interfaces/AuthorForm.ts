export interface AuthorFormValues {
    fullName: string;
    pseudonym: string;
    dateOfBirth: string;
    dateOfDeath: string;
    placeOfBirth: string;
    placeOfDeath: string;
    gender: string;
    text: string;
    relatives: { name: string; relationship: string }[];
    relevantActivities: string;
    mainTheme: string;
    mainGenre: string;
    context: string;
    publicationPlace: { city: string; printingHouse: string; publisher: string }[];
    multimedia: {
        title: '',
        link: string;
        type: string;
        description: string;
    }[];
    works: {
        text: string;
        title: string;
        originalLanguage: string;
        genre: string;
        publicationDate: string;
        description: string;
        multimedia: {
            title: string,
            link: string;
            type: string;
            description: string;
        }[];
    }[];
    criticism: {
        text: string;
        title: string;
        type: string;
        author: string;
        publicationDate: string;
        link: string;
        bibliographicReference: string;
        description: string;
        multimedia: {
            title: '',
            link: string;
            type: string;
            description: string;
        }[];
    }[];
}

export interface Work {
    text: string;
    title: string;
    originalLanguage: string;
    genre: string;
    publicationDate: string;
    description: string;
    publicationPlace?: {
        city: string;
        printing: string;
        publisher: string;
    };
    multimedia: {
        title: string;
        link: string;
        type: string;
        description: string;
    }[];
}

export interface Multimedia {
    title: string;
    link: string;
    type: string;
    description: string;
}

export interface MultimediaFieldsProps {
    multimediasWork: Multimedia[]; // Esto debe coincidir con lo que estás pasando
}

export interface Criticism {
    text: string;
    title: string;  
    type: string;
    author: string;
    publicationDate: string;
    link: string;
    bibliographicReference: string;
    description: string;
    multimedia: { title: string; link: string; type: string; description: string }[];
}