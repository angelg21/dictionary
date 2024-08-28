

interface RoundedButtonProps {
    title: string;
    textColor: string;
    backgroundColor: string;
    hover:string;
    type?: "submit" | "reset" | "button" | undefined;
    globalProps?: string;
}

export const SimpleButton = ({ title, textColor, backgroundColor, hover, type, globalProps }: RoundedButtonProps) => {
    return (
        <div className={`${globalProps}`}>
            <button type={type} className={`flex rounded-full px-5 py-3 ${hover} ${textColor} ${backgroundColor}`}>
                <span className="text-[15px] font-medium">{title}</span>
            </button>
        </div>
    )
}
