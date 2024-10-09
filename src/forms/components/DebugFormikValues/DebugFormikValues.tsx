



import { useFormikContext } from 'formik';

export const DebugFormikValues = () => {
    const { values } = useFormikContext();

    return (
        <pre>
            {JSON.stringify(values, null, 2)}
        </pre>
    );
};