"use client"
import React, { useState } from 'react';
import { InputProps } from '../../interface/InputProps'; // Importing the updated interface
import { useField } from 'formik';

/**
 * InputComponent is a customizable input field component built with React.
 * This component supports various input types and allows for custom placeholder, label text, styles, and more.
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
  labelColor, 
  inputWidth, 
  labelFontSize,
  focusBorderColor,
  disabled = false,
}) => {

  // State to manage the visibility of the password
  const [showPassword, setShowPassword] = useState(false);

  const [field] = useField(name);

  /**
   * Toggles the password visibility.
   */
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  /**
   * Renders the input field with a label.
   */
  return (
    <div>
      {/* Label for the input field */}
      <label htmlFor={id} className={`block ${labelFontSize} font-medium leading-6 ${labelColor}`}>
        {label}
      </label>
      
      {/* Input field */}
      <div className="mt-2 relative">
        <input
          id={id}
          {...field}
          disabled={disabled}
          name={name}
          type={type === 'password' && showPassword ? 'text' : type}
          placeholder={placeholder}
          className={`block ${inputWidth} rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 ${focusBorderColor} sm:text-sm sm:leading-6 font-normal disabled:opacity-70 disabled:cursor-not-allowed`}
        />
        {/* Password visibility toggle icon */}
        {type === 'password' && (
          <span 
            onClick={togglePasswordVisibility} 
            className={`absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 ${disabled}`}
          >
            {showPassword ? (
              <img src="/assets/eye-on.svg" alt="show-password-icon" />
            ) : (
              <img src="/assets/eye-off.svg" alt="hide-password-icon" />
            )}
          </span>
        )}
      </div>
    </div>
  );
};