

interface ExpandableInputProps {
    id: string,
    value: string;  // Agregar el prop de value
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    work?: any;
    placeholder?: string,
    label: string,
    labelTextStyle: string,
    focusBorderColor?: string,
    globalStyle?: string,
}



export const ExpandableInputWork = ({id, placeholder, label, labelTextStyle, globalStyle, value, onChange}: ExpandableInputProps) => {

    return (
        <div className={`${globalStyle}`}>
            <span className={`${labelTextStyle} flex font-medium leading-6 mb-2`}>
                {label}
            </span>
                <textarea
                    id={id}
                    value={value}
                    onChange={onChange}
                    rows={5}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-d-blue sm:text-sm sm:leading-6"
                />
        </div>
    )
}