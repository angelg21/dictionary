export interface MagazineFormValues {
    magazineTitle: string,
    originalLanguage: string,
    sections: string,
    firstIssueDate: string,
    lastIssueDate: string,
    issuesPublished: string,
    link: string;
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
