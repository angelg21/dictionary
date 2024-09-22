

export interface AnthologyFormValues {
    anthologyTitle: string,
    genre: string,
    author: string,
    originalLanguage: string,
    publicationDate: string,
    text: string;
    publicationPlace: {
        city: string,
        printingHouse: string,
        publisher: string
    },
    description: string,
    multimedia: [
        {
            title: string,
            link: string,
            type: string,
            description: string
        }
    ],
    criticism: [
        {
            text: string;
            title: string,
            type: string,
            author: string,
            publicationDate: string,
            link: string,
            bibliographicReference: string,
            description: string,
            multimedia: [
                {
                    title: string,
                    link: string,
                    type: string,
                    description: string
                }
            ]
        }
    ]
}
