/**
 * Interface defining the props for the ErrorAlert component.
 * This interface allows for customization of the alert type, text, padding, font size, and icon size.
 * 
 * @interface AlertProps
 * @property {"error" | "success" | "info"} type - The type of alert, which determines the color and icon of the alert.
 * @property {string} text - The text displayed in the alert.
 * @property {string} [padding] - The padding for the alert (e.g., "p-4", "px-6 py-3").
 * @property {string} [fontSize] - The font size for the text in the alert (e.g., "text-sm", "text-lg").
 * @property {string} [iconSize] - The size of the icon displayed in the alert (e.g., "h-5 w-5").
 */
export interface AlertProps {
  type: "error" | "success" | "info";
  text: string;
  padding?: string;
  fontSize?: string;
  iconSize?: string;
}