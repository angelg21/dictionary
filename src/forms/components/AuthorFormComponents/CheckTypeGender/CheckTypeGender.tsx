import { useField, useFormikContext } from "formik"
import React from 'react'
import { AuthorFormValues } from "../interfaces/AuthorForm";

interface GenderProps {
    name: string;
    globalStyle?: string,
}

const AuthorGender = [
    { id: '1', title: 'Masculino', value: 'Masculino' },
    { id: '2', title: 'Femenino', value: 'Femenino' },
]

export const CheckTypeGender = ({globalStyle, name}: GenderProps) => {

    const [field] = useField(name);
    const { values } = useFormikContext<AuthorFormValues>();
    const gender = values[name as keyof AuthorFormValues];

    return (
        <fieldset className={`${globalStyle}`}>
            <legend className="text-sm font-medium text-gray-900 leading-6 mb-4">Sexo</legend>
            <div className="flex flex-wrap items-center sm:justify-start">
                {AuthorGender.map((gender) => (
                    <div key={gender.id} className="flex items-center mr-5 lg:mr-3 xl:mr-5">
                        <input
                            id={gender.id}
                            type="radio"
                            className="h-4 w-4 border-gray-400 bg-gray-100 text-d-blue focus:ring-d-blue hover:ring-d-blue"
                            {...field}
                            value={gender.value}
                            checked={field.value === gender.value}
                            // checked={field.value === gender.value} // Asegura que el valor correcto esté seleccionado
                        />
                        <label htmlFor={gender.id} className="ml-2 block text-sm font-medium text-gray-900 leading-6">
                            {gender.title}
                        </label>
                    </div>
                ))}
            </div>
        </fieldset>
    )
}
