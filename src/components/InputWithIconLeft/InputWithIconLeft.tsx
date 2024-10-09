import React, { useState } from "react"

interface InputWithIconLeftProps {
    name: string;
    type?: string;
    textColor?: string;
    backgroundColor?: string;
    icon: JSX.Element;
    iconColor: string;
    inputWidth: string;
    hover: string;
    onSearchChange: (searchTerm: string) => void;
}

export const InputWithIconLeft = ({ name, backgroundColor, icon: Icon, iconColor, inputWidth, hover, onSearchChange }: InputWithIconLeftProps) => {
    
    const [searchTerm, setSearchTerm] = useState('');
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearchChange(value);
    };

    return (
        <div className="relative mt-2 rounded-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                {React.cloneElement(Icon, { className: `w-4 h-4 mr-3 ${iconColor}` })}
            </div>
            <input
                name={name}
                value={searchTerm}
                type="text"
                className={`block w-full ${inputWidth} ${backgroundColor} ${hover} rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-d-blue sm:text-sm sm:leading-6 `}
                onChange={handleInputChange}
            />
        </div>
    )
}
