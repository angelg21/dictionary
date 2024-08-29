import { ErrorMessage, useField } from "formik"
import { Alert } from "../Alert/Alert"

interface SimpleInputProps {
    id: string,
    name: string,
    type: string,
    placeholder?: string,
    label: string,
    labelTextStyle: string,
    inputWidth: string,
    focusBorderColor?: string,
}

export const SimpleInputWithLabel = ({id, name, type, placeholder, label, labelTextStyle, inputWidth, focusBorderColor}: SimpleInputProps) => {
    const [ field ] = useField(name)

    return (
        <div className="flex flex-col my-3">
            <label htmlFor={id || name} className={`${labelTextStyle} font-medium leading-6 mb-2`}>{label}</label>
            <input 
                type={type} 
                className={`text-input ${inputWidth} rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
                ring-gray-300 hover:ring-gray-400 h-9 placeholder:text-gray-400 focus:ring-2 ${focusBorderColor} sm:text-sm sm:leading-6 font-normal disabled:opacity-70 disabled:cursor-not-allowed mb-2`}  
                { ...field}  
            />
            <ErrorMessage name={name} render={msg => <Alert text={msg} type='error' fontSize='text-sm' iconSize='h-5 w-5' padding='p-2'/>} />
        </div>
    )
}
