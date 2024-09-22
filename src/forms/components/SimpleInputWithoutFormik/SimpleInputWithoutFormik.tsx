
interface SimpleInputProps {
    id: string,
    type: string,
    placeholder?: string,
    label: string,
    labelTextStyle: string,
    inputWidth: string,
    focusBorderColor?: string,
    globalStyle?: string,
    value: string;  // Agregar el prop de value
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SimpleInputWithoutFormik = (
    {
        id,
        type,
        placeholder,
        label,
        labelTextStyle,
        inputWidth,
        focusBorderColor,
        globalStyle,
        value,
        onChange
    }: SimpleInputProps) => {

    return (
        <div className={`flex flex-col  ${globalStyle}`}>
            <label htmlFor={id} className={`${labelTextStyle} font-medium leading-6 mb-2`}>{label}</label>
            <input
                id={id}
                type={type}
                className={`text-input ${inputWidth} rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
                ring-gray-300 hover:ring-gray-400 placeholder:text-gray-400 focus:ring-2 ${focusBorderColor} sm:text-sm sm:leading-6 font-normal disabled:opacity-70 disabled:cursor-not-allowed`}
                value={value}   // Añade el prop value para ser controlado
                onChange={onChange}
            />
        </div>
    )
}