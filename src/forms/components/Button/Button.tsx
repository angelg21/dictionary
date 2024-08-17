import React from 'react';
import { ButtonProps } from '../../interface/ButtonProps'; // Importing the updated ButtonProps interface

/**
 * ButtonComponent is a customizable button component built with React.
 * This component supports various styles and allows for custom background color, text, width, and font size.
 * 
 * @param {ButtonProps} props - The properties for customizing the button.
 * @returns {JSX.Element} A JSX element representing a customizable button.
 */
export const ButtonComponent: React.FC<ButtonProps> = ({ 
  bgColor, 
  text,
  width,
  fontSize,
  type = "button" // Adding the type prop with a default value of "button"
}) => {
  return (
    <button
      type={type} // Setting the button type here
      className={`rounded-md ${bgColor} ${width} ${fontSize} px-3.5 py-2.5 font-normal text-white shadow-sm hover:bg-[#0c2aa6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 transition-transform transform active:scale-95`}
    >
      {text}
    </button>
  );
};