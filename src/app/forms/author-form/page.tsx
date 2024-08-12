'use client';
import { InputWithLabel, Sidebar } from "@/src/forms";
import { TextInput } from "@/src/forms/components/TextInput";
import { Formik, Form } from 'formik'
import * as Yup from 'yup';



export default function AuthorForm() {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex flex-col">
                <text className="font-georgia text-black text-3xl"> Detalles personales del Autor </text>
                <Formik
                    initialValues={{
                        firsName: '',
                        lastName: '',
                        gender: '',
                        nickName: '',
                        birthDate: '',
                        deathDate: '',
                        birthPlace: '',
                        deathPlace: '',
                        prominenFamily: '',
                        relevantActivity: '',
                        mainTheme: '',
                        mainGender: '',
                        contextLived: '',
                        image: null,
                        voice: null,
                    }}
                    onSubmit={(values) => {
                        console.log(values)
                    }}
                    validationSchema={Yup.object({
                        firsName: Yup.string()
                            .max(15, 'El texto ingresado no puede exceder un maximo de 15 caracteres'),
                        lastName: Yup.string()
                            .max(15, 'El texto ingresado no puede exceder un maximo de 20 caracteres'),
                        gender: Yup.string()
                            .required('Este campo es requerido'),
                        nickName: Yup.string()
                            .max(15, 'El texto ingresado no puede exceder un maximo de 15 caracteres'),
                    })}
                >
                    {formik => (
                        <Form>
                            <div className="flex flex-row">

                            <TextInput
                                label="Nombres"
                                name="firsName"
                                classNameLabel=""
                                classNameInput=""
                            />
                            <TextInput
                                label="Nombres"
                                name="firsName"
                                classNameLabel=""
                                classNameInput=""
                            />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
