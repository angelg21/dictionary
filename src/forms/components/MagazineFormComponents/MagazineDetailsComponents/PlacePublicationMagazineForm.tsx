'use client'

interface PlacePublicationProps {
    publicationPlace: {
        city: string;
        printingHouse: string;
        publisher: string;
    };
    setPublicationPlace: React.Dispatch<React.SetStateAction<{
        city: string;
        printingHouse: string;
        publisher: string;
    }>>;
    type: string;
    label: string;
    labelTextStyle: string;
    inputWidth: string;
    focusBorderColor?: string;
    globalStyle?: string;
}



export const PlacePublicationMagazineForm = ({ type, globalStyle, labelTextStyle, label, inputWidth, focusBorderColor, setPublicationPlace, publicationPlace }: PlacePublicationProps) => {


    return (
        <div className={`flex flex-col  ${globalStyle}`}>
            <span className={`${labelTextStyle} font-medium leading-6 mb-2`}>{label}</span>
            <div className="flex flex-col md:flex-row md:space-x-4 max-md:space-y-4 ">

                <input
                    value={publicationPlace.city}
                    type={type}
                    className={`text-input ${inputWidth} rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
                ring-gray-300 hover:ring-gray-400 h-9 placeholder:text-gray-400 focus:ring-2 ${focusBorderColor} sm:text-sm sm:leading-6 font-normal disabled:opacity-70 disabled:cursor-not-allowed`}
                    placeholder="Ciudad"
                    onChange={(e) => setPublicationPlace((prev) => ({
                        ...prev,
                        city: e.target.value // Actualiza solo el campo `city`
                    }))}
                />

                <input
                    value={publicationPlace.printingHouse}
                    onChange={(e) => setPublicationPlace((prev) => ({
                        ...prev,
                        printingHouse: e.target.value // Actualiza solo el campo `printingHouse`
                    }))}
                    type={type}
                    className={`text-input ${inputWidth} rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
                ring-gray-300 hover:ring-gray-400 h-9 placeholder:text-gray-400 focus:ring-2 ${focusBorderColor} sm:text-sm sm:leading-6 font-normal disabled:opacity-70 disabled:cursor-not-allowed`}
                    placeholder="Imprenta"

                />

                <input
                    value={publicationPlace.publisher}
                    onChange={(e) => setPublicationPlace((prev) => ({
                        ...prev,
                        publisher: e.target.value // Actualiza solo el campo `publisher`
                    }))}
                    type={type}
                    className={`text-input ${inputWidth} rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
                ring-gray-300 hover:ring-gray-400 h-9 placeholder:text-gray-400 focus:ring-2 ${focusBorderColor} sm:text-sm sm:leading-6 font-normal disabled:opacity-70 disabled:cursor-not-allowed`}
                    placeholder="Editorial"

                />
            </div>
        </div>
    )
}
