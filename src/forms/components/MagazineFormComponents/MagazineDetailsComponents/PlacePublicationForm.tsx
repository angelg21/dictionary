'use client'

import { useFormikContext } from "formik";
import { MagazineFormValues } from "../interfaces/MagazineForm";


interface PlacePublicationProps {
    type: string;
    label: string;
    labelTextStyle: string;
    inputWidth: string;
    focusBorderColor?: string;
    globalStyle?: string;
}


export const PlacePublicationForm = ({ type, globalStyle, labelTextStyle, label, inputWidth, focusBorderColor }: PlacePublicationProps) => {
    const { values, setFieldValue } = useFormikContext<MagazineFormValues>();
    return (
        <div className={`flex flex-col  ${globalStyle}`}>
            <span className={`${labelTextStyle} font-medium leading-6 mb-2`}>{label}</span>
            <div className="flex flex-col md:flex-row md:space-x-4 max-md:space-y-4 ">

                <input
                    value={values.publicationPlace.city}
                    type={type}
                    className={`text-input ${inputWidth} rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
                ring-gray-300 hover:ring-gray-400 h-9 placeholder:text-gray-400 focus:ring-2 ${focusBorderColor} sm:text-sm sm:leading-6 font-normal disabled:opacity-70 disabled:cursor-not-allowed`}
                    placeholder="Ciudad"
                    onChange={(e) => setFieldValue("publicationPlace", {
                        ...values.publicationPlace, // Mantén las otras propiedades de publicationPlace
                        city: e.target.value        // Cambia solo el campo city
                    })}
                />

                <input
                    value={values.publicationPlace.printingHouse}
                    onChange={(e) => setFieldValue("publicationPlace", {
                        ...values.publicationPlace, // Mantén las otras propiedades de publicationPlace
                        printingHouse: e.target.value        // Cambia solo el campo city
                    })}
                    type={type}
                    className={`text-input ${inputWidth} rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
                ring-gray-300 hover:ring-gray-400 h-9 placeholder:text-gray-400 focus:ring-2 ${focusBorderColor} sm:text-sm sm:leading-6 font-normal disabled:opacity-70 disabled:cursor-not-allowed`}
                    placeholder="Imprenta"

                />

                <input
                    value={values.publicationPlace.publisher}
                    onChange={(e) => setFieldValue("publicationPlace", {
                        ...values.publicationPlace, // Mantén las otras propiedades de publicationPlace
                        publisher: e.target.value        // Cambia solo el campo city
                    })}
                    type={type}
                    className={`text-input ${inputWidth} rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
                ring-gray-300 hover:ring-gray-400 h-9 placeholder:text-gray-400 focus:ring-2 ${focusBorderColor} sm:text-sm sm:leading-6 font-normal disabled:opacity-70 disabled:cursor-not-allowed`}
                    placeholder="Editorial"

                />
            </div>
        </div>
    )
}
