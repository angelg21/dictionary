import { useField } from "formik"

interface CheckProps {
    name: string;
    onTypeChange: (value: string) => void;
}

const NewWorkSheetType = [
    { id: '1', title: 'Autor', value: 'author' },
    { id: '2', title: 'Revista', value: 'magazine' },
    { id: '3', title: 'Agrupación', value: 'grouping' },
    { id: '4', title: 'Antología', value: 'anthology' },
]

export const CheckTypeWorkSheet = ({ name, onTypeChange }: CheckProps) => {
    const [field] = useField(name);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        field.onChange(event);
        onTypeChange(event.target.value);
    };

    return (
        <fieldset className="my-3">
            <legend className="text-sm font-medium text-gray-900 leading-6 mb-4">Tipo de Ficha:</legend>
            <div className="flex flex-wrap items-center sm:justify-start">
                {NewWorkSheetType.map((type) => (
                    <div key={type.id} className="flex items-center mr-5">
                        <input
                            id={type.id}
                            type="radio"
                            className="h-4 w-4 border-gray-400 bg-gray-100 text-d-blue focus:ring-d-blue hover:ring-d-blue"
                            {...field}
                            value={type.value}
                            checked={field.value === type.value} // Asegura que el valor correcto esté seleccionado
                            onChange={handleChange}
                        />
                        <label htmlFor={type.id} className="ml-2 block text-sm font-medium text-gray-900 leading-6">
                            {type.title}
                        </label>
                    </div>
                ))}
            </div>
        </fieldset>
    );
};