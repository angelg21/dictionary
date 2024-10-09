
import { useField } from "formik";

interface MeetingPlaceProps {
    type: string;
    label: string;
    labelTextStyle: string;
    inputWidth: string;
    focusBorderColor?: string;
    globalStyle?: string;
}





export const MeetingPlaceInput = ({ type, globalStyle, labelTextStyle, label, inputWidth, focusBorderColor }: MeetingPlaceProps) => {
    const [fieldCity] = useField("meetingPlace.city");
    const [fieldMunicipality] = useField("meetingPlace.municipality");
    return (
        <div className={`flex flex-col  ${globalStyle}`}>
            <span className={`${labelTextStyle} font-medium leading-6 mb-2`}>{label}</span>
            <div className="flex flex-col max-md:space-y-4  md:flex-row md:justify-between md:space-x-5">

                <input
                    type={type}
                    className={`text-input ${inputWidth} rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
                ring-gray-300 hover:ring-gray-400 h-9 placeholder:text-gray-400 focus:ring-2 ${focusBorderColor} sm:text-sm sm:leading-6 font-normal disabled:opacity-70 disabled:cursor-not-allowed`}
                    placeholder="Ciudad"
                    { ...fieldCity}
                />

                <input
                    type={type}
                    className={`text-input ${inputWidth} rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
                ring-gray-300 hover:ring-gray-400 h-9 placeholder:text-gray-400 focus:ring-2 ${focusBorderColor} sm:text-sm sm:leading-6 font-normal disabled:opacity-70 disabled:cursor-not-allowed`}
                    placeholder="Municipio"
                    { ...fieldMunicipality}
                />

            </div>
        </div>
    )
}
