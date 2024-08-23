
import React from 'react'

interface ButtonWithPointProps {
    title: string;
    textColor: string;
    backgroundColor: string;
    pointColor: string;
    hover?:string;
}

export const ButtonWithPointLeft = ({ 
    title, 
    textColor, 
    backgroundColor, 
    pointColor, 
    hover 
}: ButtonWithPointProps) => {
    return (
        <div>
            <button className={`flex rounded-full px-7 py-2 items-center ${hover} ${textColor} ${backgroundColor}`}>
                <div className={`w-3 h-3 mr-3 rounded-full ${pointColor}`}></div>
                <span className="text-[16px] font-semibold">{title}</span>
            </button>
        </div>
    )
}
