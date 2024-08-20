'use client'
import React from "react";

interface RoundedButtonProps {
    title: string;
    textColor: string;
    backgroundColor: string;
    icon: JSX.Element;
    iconColor: string;
}



export const ButtonWithIconLeft = ({title, textColor, backgroundColor, icon:Icon, iconColor}: RoundedButtonProps) => {
    return (
        <div>
            <button className={`flex rounded-full px-5 py-3 ${textColor} ${backgroundColor}`}>
            {React.cloneElement(Icon, { className: `w-6 h-6 mr-3 ${iconColor}` })}
            <span className="text-[15px] font-medium">{title}</span>
            </button>
        </div>
    )
}
