/**
 * Interface defining the props for the InputComponent.
 * This interface allows for customization of the input field, including placeholder text, label color,
 * input width, label font size, border width, focus border color, and an optional password field indicator.
 * 
 * @interface InputProps
 * @property {string} id - The id for the input element.
 * @property {string} name - The name attribute for the input element.
 * @property {string} type - The type of the input (e.g., 'text', 'email', 'password').
 * @property {string} placeholder - The placeholder text displayed inside the input field.
 * @property {string} label - The label text displayed above the input field.
 * @property {string} labelColor - The color of the label text.
 * @property {string} inputWidth - The width of the input field, defined using Tailwind CSS width classes.
 * @property {string} labelFontSize - The font size of the label, defined using Tailwind CSS font size classes.
 * @property {string} borderWidth - The width of the input border, defined using Tailwind CSS border width classes.
 * @property {string} focusBorderColor - The color of the input border when focused, defined using Tailwind CSS border color classes.
 * @property {boolean} [isPassword] - Optional. Indicates if the input field should be treated as a password field. Default is false.
 * @property {boolean} [disabled] - Optional. Indicates if the input field should be disabled. Default is false.
 */
export interface InputProps {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  label: string;
  labelColor: string;
  inputWidth: string;
  labelFontSize: string;
  focusBorderColor: string;
  isPassword?: boolean;
  disabled?: boolean;
}