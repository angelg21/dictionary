import React from "react";
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/react'

interface RoundedButtonProps {
    title: string;
    textColor: string;
    backgroundColor: string;
    icon: JSX.Element;
    iconColor: string;
    hover: string;
}



export const NewWorkSheetButton = ({ title, textColor, backgroundColor, icon: Icon, iconColor, hover }: RoundedButtonProps) => {
    return (
        <div>
            <Menu as="div">
                <MenuButton>
                    <button className={`flex rounded-full px-5 py-3 ${hover} ${textColor} ${backgroundColor}`}>
                        {React.cloneElement(Icon, { className: `w-6 h-6 mr-3 ${iconColor}` })}
                        <span className="text-[15px] font-medium">{title}</span>
                    </button>
                </MenuButton>
            </Menu>

        </div>
    )
}
