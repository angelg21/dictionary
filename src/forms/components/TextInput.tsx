import { ErrorMessage, useField } from "formik"

interface Props {
    label: string;
    name: string;
    type?: 'text';
    classNameLabel?: string;
    classNameInput?: string;
    classNameError?: string;
    placeholder?: string;
    [x : string]: any;
}

export const TextInput = ( {label, ...props}: Props) => {

    const [ field ] = useField(props)

    return (
        <div className="flex flex-col">
            <label htmlFor={props.id || props.name} className={props.classNameLabel}>{label}</label>
            <input className={props.classNameInput} { ...field} {...props} />
            <ErrorMessage name={props.name} component="span" className={props.classNameError} />
        </div>
    )
}