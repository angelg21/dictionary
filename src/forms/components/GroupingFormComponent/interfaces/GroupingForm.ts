



export interface GroupingFormValues {
    name: string,
    meetingPlace: {
        city: string,
        municipality: string
    },
    startDate: string,
    endDate: string,
    generalCharacteristics: string,
    text: string;
    members: string[],
    groupPublications: [
        {
            title: string,
            year: number | '',
            authors: string,
            summary: string
        }
    ],
    groupActivities: string,
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
                    type:string,
                    description: string
                }
            ]
        }
    ]
}