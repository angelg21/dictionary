'use client'

import { Formik, Form, useFormikContext } from 'formik'
import * as Yup from 'yup';
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { AuthorFormValues } from '@/src/forms/components/AuthorFormComponents/interfaces/AuthorForm';
import { AlertProvider } from '@/src/users/context/AlertContext';
import { getAuthorForm } from './actions/get-author-form';


export default function AuthorFormLayout({ children }: { children: React.ReactNode; }) {

    const { id } = useParams();
    const [authorInitialValue, setAuthorInitialValue] = useState<AuthorFormValues>()
    const SaveFormValues = () => {
        const { values } = useFormikContext<AuthorFormValues>();

        useEffect(() => {
            localStorage.setItem(`authorFormData-${id}`, JSON.stringify(values));
        }, [values]);

        return null; // Este componente solo se utiliza para ejecutar el useEffect
    };


    // useEffect(() => {
    //     const fetchAuthorData = async () => {
    //         const response = await getAuthorForm(id);
    //         const { _id, ...initialValues } = response?.responseData;
    //         setAuthorInitialValue(initialValues)
    //         console.log(initialValues)
    //     };
    //     fetchAuthorData()
    // }, []);

    
    
    const initialValues = JSON.parse( localStorage.getItem(`authorFormData-${id}`) || JSON.stringify({
        fullName: '',
        pseudonym: '',
        dateOfBirth: '',
        dateOfDeath: '',
        placeOfBirth: '',
        placeOfDeath: '',
        gender: '',
        relatives: [],
        relevantActivities: '',
        mainTheme: '',
        mainGenre: '',
        context: '',
        multimedia: [],
        works: [],
        criticism: [],
        text: ''
    }));

    const validationSchema = Yup.object({
        fullName: Yup.string()
            .max(50, 'El nombre no puede ser mayor a 200 caracteres')
            .nullable(),

        pseudonym: Yup.string()
            .max(30, 'El seudónimo no puede ser mayor a 30 caracteres')
            .nullable(),

        dateOfBirth: Yup.string()
            .nullable(),

        dateOfDeath: Yup.string()
            .nullable(),

        placeOfBirth: Yup.string()
            .max(100, 'El lugar de nacimiento no puede ser mayor a 100 caracteres')
            .nullable(),

        placeOfDeath: Yup.string()
            .max(100, 'El lugar de fallecimiento no puede ser mayor a 100 caracteres')
            .nullable(),

        gender: Yup.string()
            .oneOf(['Masculino', 'Femenino'], 'Género inválido')
            .nullable(),

        relatives: Yup.array().of(
            Yup.object({
                name: Yup.string()
                    .max(300, 'La descripción no puede superar los 300 caracteres')
                    .nullable(),
                    relationship: Yup.string()
                    .max(300, 'La descripción no puede superar los 300 caracteres')
                    .nullable()
            })
        )
            .nullable(),

        relevantActivities: Yup.string()
            .nullable(),

        mainTheme: Yup.string()
            .max(300, 'El tema principal no puede superar los 300 caracteres')
            .nullable(),

        mainGenre: Yup.string()
            .max(100, 'El género principal no puede superar los 100 caracteres')
            .nullable(),

        context: Yup.string()
            .max(500, 'El contexto no puede superar los 500 caracteres')
            .nullable(),

        multimedia: Yup.array().of(
            Yup.object({
                link: Yup.string()
                    .url('Debe ser una URL válida')
                    .nullable(),
                type: Yup.string()
                    .oneOf(['image', 'video', 'audio', 'document'], 'Tipo de multimedia inválido')
                    .nullable(),
                description: Yup.string()
                    .max(300, 'La descripción no puede superar los 300 caracteres')
                    .nullable()
            })
        )
            .nullable(),

        works: Yup.array().of(
            Yup.object({
                title: Yup.string()
                    .max(100, 'El título no puede superar los 100 caracteres')
                    .nullable(),
                originalLanguage: Yup.string()
                    .max(50, 'El idioma original no puede superar los 50 caracteres')
                    .nullable(),
                genre: Yup.string()
                    .max(50, 'El género no puede superar los 50 caracteres')
                    .nullable(),
                publicationDate: Yup.string()
                    .nullable(),
                description: Yup.string()
                    .max(500, 'La descripción no puede superar los 500 caracteres')
                    .nullable(),
                publicationPlace: Yup.object({
                    city: Yup.string()
                        .max(100, 'La ciudad no puede superar los 100 caracteres')
                        .nullable(),
                        printingHouse: Yup.string()
                        .max(100, 'La impresión no puede superar los 100 caracteres')
                        .nullable(),
                    publisher: Yup.string()
                        .max(100, 'El nombre del editor no puede superar los 100 caracteres')
                        .nullable()
                }),
                multimedia: Yup.array().of(
                    Yup.object({
                        link: Yup.string()
                            .url('Debe ser una URL válida')
                            .nullable(),
                        type: Yup.string()
                            .oneOf(['image', 'video', 'audio', 'document'], 'Tipo de multimedia inválido')
                            .nullable(),
                        description: Yup.string()
                            .max(300, 'La descripción no puede superar los 300 caracteres')
                            .nullable()
                    })
                )
                    .nullable()
            })
        )
            .nullable(),

        criticism: Yup.array().of(
            Yup.object({
                title: Yup.string()
                    .max(100, 'El título no puede superar los 100 caracteres')
                    .nullable(),
                type: Yup.string()
                    .max(50, 'El tipo no puede superar los 50 caracteres')
                    .nullable(),
                author: Yup.string()
                    .max(100, 'El nombre del autor no puede superar los 100 caracteres')
                    .nullable(),
                publicationDate: Yup.string()
                    .nullable(),
                link: Yup.string()
                    .url('Debe ser una URL válida')
                    .nullable(),
                bibliographicReference: Yup.string()
                    .max(500, 'La referencia bibliográfica no puede superar los 500 caracteres')
                    .nullable(),
                description: Yup.string()
                    .max(500, 'La descripción no puede superar los 500 caracteres')
                    .nullable(),
                multimedia: Yup.array().of(
                    Yup.object({
                        link: Yup.string()
                            .url('Debe ser una URL válida')
                            .nullable(),
                        type: Yup.string()
                            .oneOf(['image', 'video', 'audio', 'document'], 'Tipo de multimedia inválido')
                            .nullable(),
                        description: Yup.string()
                            .max(300, 'La descripción no puede superar los 300 caracteres')
                            .nullable()
                    })
                )
                    .nullable()
            })
        )
            .nullable()
    });

    const handleSubmitAuthorForm = (values: any) => {
        console.log('Formulario enviado:', values);
    };

    return (
        <Formik<AuthorFormValues>
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmitAuthorForm(values)}
        >
            {formik => {               

                return (
                    <Form>
                        <SaveFormValues />
                        <div className=''>
                            <div className='flex flex-col mx-5 lg:mx-9 xl:mx-20'>
                            <AlertProvider>
                                {children}
                            </AlertProvider>
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
}