import { FormikHelpers } from "formik";

/**
 * Interface defining the props for the FormComponent.
 * This interface allows for customization of the form, including input fields, button text, additional links,
 * form title, a question accompanying the link, and an optional error message.
 * 
 * @interface FormProps
 * @property {string} formTitle - The title displayed at the top of the form.
 * @property {Array<{ id: string, name: string, type: string, placeholder: string }>} inputs - An array of input field configurations.
 * @property {string} buttonText - The text displayed on the form's submit button.
 * @property {string} linkQuestion - The question text that accompanies the link.
 * @property {string} linkText - The text for the link displayed below the button (e.g., for registration or password recovery).
 * @property {string} linkHref - The href for the link.
 * @property {Function} onSubmit - The function to handle form submission, typically provided by Formik.
 * @property {Object} initialValues - The initial values for the form fields, managed by Formik.
 * @property {string} [error] - Optional. An error message to display if the form submission fails.
 * @property {boolean} isPending - A boolean indicating whether the form submission is pending.
 */
export interface FormProps {
  formTitle: string;
  inputs: Array<{
    labelText: string;
    id: string;
    name: string;
    type: string;
    placeholder: string;
  }>;
  buttonText: string;
  linkQuestion: string;
  linkText: string;
  linkHref: string;
  onSubmit: (values: any, formikHelpers: FormikHelpers<any>) => void | Promise<any>;
  initialValues: { [key: string]: any };
  error: string | null;
  isPending: boolean;
}