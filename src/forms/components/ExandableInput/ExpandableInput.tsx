import { ErrorMessage, useField } from "formik"

interface ExpandableInputProps {
    id: string,
    name: string,
    type: string,
    placeholder?: string,
    label: string,
    labelTextStyle: string,
    inputWidth: string,
    focusBorderColor?: string,
    globalStyle?: string,
}



export const ExpandableInput = ({id, name, type, placeholder, label, labelTextStyle, inputWidth, focusBorderColor, globalStyle}: ExpandableInputProps) => {
    const [ field ] = useField(name)
    return (
        <div className="col-span-full">
            <span className={`${labelTextStyle} flex font-medium leading-6 mb-2`}>
                {label}
            </span>
                <textarea
                    id={name}
                    rows={5}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-d-blue sm:text-sm sm:leading-6"
                    defaultValue={''}
                    { ...field}
                />
        </div>
    )
}
