import React from 'react';
import { InputProps } from '../../interface/InputProps';

/**
 * InputComponent is a customizable input field component built with React.
 * This component supports various input types and allows for custom placeholder, label text, and styles.
 * 
 * @param {InputProps} props - The properties for customizing the input field.
 * @returns {JSX.Element} A JSX element representing an input field with a label.
 */
export const InputComponent: React.FC<InputProps> = ({ 
  id, 
  name, 
  type, 
  placeholder, 
  label, 
  labelColor
}) => {

  /**
   * Renders the input field with a label.
   */
  return (
    <div>
      {/* Label for the input field */}
      <label htmlFor={id} className={`block text-sm font-medium leading-6 ${labelColor}`}>
        {label}
      </label>
      
      {/* Input field */}
      <div className="mt-2">
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};