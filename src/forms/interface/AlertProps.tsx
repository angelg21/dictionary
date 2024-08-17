// ErrorAlertProps.ts
/**
 * Interface defining the props for the ErrorAlert component.
 * This interface allows for customization of the alert type and text.
 * 
 * @interface AlertProps
 * @property {"error" | "success" | "info"} type - The type of alert, which determines the color and icon of the alert.
 * @property {string} text - The text displayed in the alert.
 */
export interface AlertProps {
    type: "error" | "success" | "info";
    text: string;
  }