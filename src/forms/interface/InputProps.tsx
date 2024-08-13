/**
 * Interface defining the props for the InputComponent.
 * This interface allows for customization of the input field, including placeholder text, label color, 
 * input width, and an optional password field indicator.
 * 
 * @interface InputProps
 * @property {string} id - The id for the input element.
 * @property {string} name - The name attribute for the input element.
 * @property {string} type - The type of the input (e.g., 'text', 'email', 'password').
 * @property {string} placeholder - The placeholder text displayed inside the input field.
 * @property {string} label - The label text displayed above the input field.
 * @property {string} labelColor - The color of the label text.
 */
export interface InputProps {
    id: string;
    name: string;
    type: string;
    placeholder: string;
    label: string;
    labelColor: string;
  }