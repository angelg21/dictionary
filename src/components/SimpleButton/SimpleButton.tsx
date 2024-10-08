interface RoundedButtonProps {
    title: string;
    textColor: string;
    backgroundColor: string;
    hover: string;
    type?: "submit" | "reset" | "button" | undefined;
    globalProps?: string;
    disabled?: boolean; // Nuevo prop para manejar el estado deshabilitado
}

export const SimpleButton = ({ 
    title, 
    textColor, 
    backgroundColor, 
    hover, 
    type = "button", 
    globalProps = "", 
    disabled = false  // Valor por defecto es false
}: RoundedButtonProps) => {
    return (
        <div className={`${globalProps}`}>
            <button 
                type={type} 
                className={`flex rounded-full px-5 py-3 ${hover} ${textColor} ${backgroundColor} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`} 
                disabled={disabled} // Maneja el estado deshabilitado
            >
                <span className="text-[15px] font-medium">{title}</span>
            </button>
        </div>
    )
}