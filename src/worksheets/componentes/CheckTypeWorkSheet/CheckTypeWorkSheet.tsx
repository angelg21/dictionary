import { ErrorMessage, useField } from "formik"

interface CheckProps {
    name: string,
}

const NewWorkSheetType = [
    { id: '1', title: 'Autor'},
    { id: '2', title: 'Revista' },
    { id: '3', title: 'Agrupación'},
    { id: '3', title: 'Antología'},
]

export const CheckTypeWorkSheet = ({ name }: CheckProps) => {

    const [field] = useField(name)

    return (
        <fieldset className="my-3">
            <legend className="text-sm font-medium text-gray-900 leading-6 mb-4">Filtrar por:</legend>
            <div className="  flex flex-wrap items-center   sm:justify-start ">
                {NewWorkSheetType.map((type) => (
                    <div key={type.id} className="flex items-center mr-5">
                        <input
                            id={type.id}
                            type="radio"
                            className="h-4 w-4 border-gray-400 bg-gray-100 text-d-blue focus:ring-d-blue hover:ring-d-blue"
                            { ...field}
                        />
                        <label htmlFor={type.id} className="ml-2 block text-sm font-medium text-gray-900 leading-6 ">
                            {type.title}
                        </label>
                    </div>
                ))}
            </div>
        </fieldset>
    )
}
