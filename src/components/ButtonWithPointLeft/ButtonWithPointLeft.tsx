
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
            <div className={`flex rounded-full w-[145px] lg:w-[122px] xl:w-[160px] px-3 py-2 items-center justify-center ${hover} ${textColor} ${backgroundColor}`}>
                <div className={`w-3 h-3 mr-3 rounded-full lg:hidden xl:flex self-center ${pointColor}`}></div>
                <span className="text-center text-sm xl:text-[15px] font-semibold">{title}</span>
            </div>
        </div>
    )
}
