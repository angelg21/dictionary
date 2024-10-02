export interface MagazineFormValues {
    magazineTitle: string,
    originalLanguage: string,
    sections: string,
    firstIssueDate: string,
    lastIssueDate: string,
    issuesPublished: string,
    publicationPlace: { city: string; printingHouse: string; publisher: string };
    link: string;
    publicationPlace: { city: string; printingHouse: string; publisher: string };
    bibliographicReference: string;
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
    text: string,
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
