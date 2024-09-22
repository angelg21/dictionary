interface SimpleInputProps {
    idPlace: string;
    idPrinting: string;
    idPublisher: string;
    type: string,
    placeholder?: string,
    label: string,
    labelTextStyle: string,
    inputWidth: string,
    focusBorderColor?: string,
    globalStyle?: string,
    valuePlace: string;
    onChangePlace: (e: React.ChangeEvent<HTMLInputElement>) => void;
    valuePrinting: string;
    onChangePrinting: (e: React.ChangeEvent<HTMLInputElement>) => void;
    valuePublisher: string;
    onChangePublisher: (e: React.ChangeEvent<HTMLInputElement>) => void;
}




export const PlacePublicationWorkForm = (
    {
        idPlace,
        idPrinting,
        idPublisher,
        valuePlace,
        onChangePlace,
        valuePrinting,
        onChangePrinting,
        valuePublisher,
        onChangePublisher,
        type,
        placeholder,
        label,
        labelTextStyle,
        inputWidth,
        focusBorderColor,
        globalStyle,
    }: SimpleInputProps) => {
    return (
        <div className={`flex flex-col  ${globalStyle}`}>
            <span className={`${labelTextStyle} font-medium leading-6 mb-2`}>{label}</span>
            <div className="flex flex-col max-md:space-y-4  md:flex-row md:justify-between md:space-x-5">

                <input
                    id={idPlace}
                    type={type}
                    className={`text-input ${inputWidth} rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
                ring-gray-300 hover:ring-gray-400 h-9 placeholder:text-gray-400 focus:ring-2 ${focusBorderColor} sm:text-sm sm:leading-6 font-normal disabled:opacity-70 disabled:cursor-not-allowed`}
                    value={valuePlace}   // Añade el prop value para ser controlado
                    onChange={onChangePlace}
                    placeholder="Ciudad"
                />

                <input
                    id={idPrinting}
                    type={type}
                    className={`text-input ${inputWidth} rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
                ring-gray-300 hover:ring-gray-400 h-9 placeholder:text-gray-400 focus:ring-2 ${focusBorderColor} sm:text-sm sm:leading-6 font-normal disabled:opacity-70 disabled:cursor-not-allowed`}
                    value={valuePrinting}   // Añade el prop value para ser controlado
                    onChange={onChangePrinting}
                    placeholder="Imprenta"
                />

                <input
                    id={idPublisher}
                    type={type}
                    className={`text-input ${inputWidth} rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
                ring-gray-300 hover:ring-gray-400 h-9 placeholder:text-gray-400 focus:ring-2 ${focusBorderColor} sm:text-sm sm:leading-6 font-normal disabled:opacity-70 disabled:cursor-not-allowed`}
                    value={valuePublisher}   // Añade el prop value para ser controlado
                    onChange={onChangePublisher}
                    placeholder="Editorial"
                />
            </div>
        </div>
    )
}
