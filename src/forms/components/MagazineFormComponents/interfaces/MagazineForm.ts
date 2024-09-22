export interface MagazineFormValues {
    magazineTitle: string,
    originalLanguage: string,
    sections: string,
    text: string;
    numbers: [
        {
            number: string,
            issueDate: string,
            publicationPlace: {
                city: string,
                printingHouse: string,
                publisher: string,
            },
            lenguage: string;
            translator: string;
        }
    ],
    description: string,
    multimedia: [
        {
            title: string,
            link: string,
            type: string,
            description: string
        },
    ],
    creators: [
        {
            name: string,
            role: string
        },
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
        },
    ]
}
