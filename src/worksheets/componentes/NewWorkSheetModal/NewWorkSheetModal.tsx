import { InputComponent } from "@/src/forms";
import { SimpleInputWithLabel } from "@/src/forms/components/SimpleInputWithLabel/SimpleInputWithLabel";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { CheckTypeWorkSheet } from "../CheckTypeWorkSheet/CheckTypeWorkSheet";
import { SelectPersonInput } from "../SelectPersonInput/SelectPersonInput";
import { SimpleButton } from "@/src/components/SimpleButton/SimpleButton";

export interface NewWorkSheetModalProps {
    onClose: () => void;
    onSave?: (roles: string[]) => Promise<boolean>;
}

export const NewWorkSheetModal = ({ onClose, onSave }: NewWorkSheetModalProps) => {



    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 max-lg:px-6">
            <div className="bg-d-fondo p-6 rounded-md max-w-[470px]  w-full">
                <div className='flex flex-row justify-between mb-9'>
                    <h2 className="text-xl font-medium self-center text-d-gray">Nueva Ficha</h2>
                    <svg onClick={onClose} className='self-center cursor-pointer' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 13L13 1M1 1L13 13" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
                <div>
                    <Formik
                        initialValues={{
                            title: '',
                            workSheetType: '',
                        }}

                        onSubmit={(values) => {
                            console.log(values)
                        }}
                        validationSchema={Yup.object({
                            title: Yup.string()
                                .max(50, 'El titulo no puede ser tan extenso')
                                .required('El titulo es requerido'),
                            workSheetType: Yup.string()
                        })}
                    >

                        {formik => (
                            <Form>
                                <SimpleInputWithLabel
                                    id='title'
                                    name={"title"}
                                    type={"text"}
                                    label={"Titulo"}
                                    labelTextStyle={"text-gray-900 text-sm"}
                                    inputWidth={"w-full"}
                                    focusBorderColor={"focus:ring-[#003366]"}
                                />
                                <CheckTypeWorkSheet
                                    name={"workSheetType"}
                                />
                                <SelectPersonInput title={"Editores"} />
                                <SelectPersonInput title={"Revisores"} />

                                <div className="flex justify-end mt-10">
                                    <SimpleButton
                                        title="Crear Ficha"
                                        type="submit"
                                        textColor="text-white"
                                        backgroundColor="bg-d-blue"
                                        hover="hover:bg-[#00284D]"
                                    />
                                </div>
                            </Form>
                        )}


                    </Formik>
                </div>
            </div>
        </div>
    )
}
