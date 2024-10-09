/**
 * Interface defining the props for the ButtonComponent.
 * This interface allows for customization of the button, including background color, button text, button width, and font size.
 * 
 * @interface ButtonProps
 * @property {string} bgColor - The background color of the button, defined using Tailwind CSS classes.
 * @property {string} text - The text displayed on the button.
 * @property {string} width - The width of the button, defined using Tailwind CSS width classes.
 * @property {string} fontSize - The font size of the button text, defined using Tailwind CSS font size classes.
 * @property {string} type - The type of the button, which can be "button", "submit", or "reset".
 * @property {boolean} isDisabled - A flag to indicate if the button is disabled.
 * @property {() => void} onClick - The function to be executed when the button is clicked.
 * @property {string} hoverColor - The background color of the button on hover, defined using Tailwind CSS classes.
 */
export interface ButtonProps {
  bgColor: string;
  text: string;
  width: string;
  fontSize: string;
  type?: "button" | "submit" | "reset";
  isDisabled?: boolean;
  hoverColor?: string;
  onClick?: () => void;
}