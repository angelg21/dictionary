'use client'

import { AnthologyFormValues } from "@/src/forms/components/AnthologyFormComponents/interfaces/AnthologyForm";
import { Form, Formik, useFormikContext } from "formik";
import { AlertProvider } from "@/src/users/context/AlertContext";
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import { useParams, usePathname } from "next/navigation";
import { getAnthologyForm } from "./actions/get-anthology-form";

export default function MagazineFormLayout({ children }: { children: React.ReactNode; }) {

    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [anthologyInitialValue, setAnthologyInitialValue] = useState<AnthologyFormValues>();

    const SaveFormValues = () => {
        const { values } = useFormikContext<AnthologyFormValues>();

        useEffect(() => {
            localStorage.setItem(`anthologyFormData-${id}`, JSON.stringify(values));
        }, [values]);

        return null; // Este componente solo se utiliza para ejecutar el useEffect
    };

    useEffect(() => {
        const fetchAnthologyData = async () => {
            setIsLoading(true);
            try {
                const response = await getAnthologyForm(id);
                const { _id, ...initialValues } = response?.responseData;
                setAnthologyInitialValue(initialValues);
                console.log(initialValues)
            } catch (error) {
                console.error('Error fetching author data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAnthologyData();
    }, [id]);

    const initialValues = JSON.parse(JSON.stringify({
        anthologyTitle: '',
        genre: '',
        author: '',
        originalLanguage: '',
        publicationDate: '',
        publicationPlace: {
            city: '',
            printingHouse: '',
            publisher: ''
        },
        description: '',
        multimedia: [],
        criticism: [],
        text: '',
    }));

    const validationSchema = Yup.object({
        anthologyTitle: Yup.string()
            .max(100, 'El título de la antología no puede superar los 100 caracteres')
            .nullable(),

        genre: Yup.string()
            .max(50, 'El género no puede superar los 50 caracteres')
            .nullable(),

        author: Yup.string()
            .max(100, 'El nombre del autor no puede superar los 100 caracteres')
            .nullable(),

        originalLanguage: Yup.string()
            .max(50, 'El idioma original no puede superar los 50 caracteres')
            .nullable(),

        publicationDate: Yup.string()
            .nullable(),

        publicationPlace: Yup.object({
            city: Yup.string()
                .max(100, 'La ciudad no puede superar los 100 caracteres')
                .nullable(),
            printingHouse: Yup.string()
                .max(100, 'La imprenta no puede superar los 100 caracteres')
                .nullable(),
            publisher: Yup.string()
                .max(100, 'El nombre del editor no puede superar los 100 caracteres')
                .nullable(),
        }).nullable(),

        description: Yup.string()
            .max(500, 'La descripción no puede superar los 500 caracteres')
            .nullable(),

        multimedia: Yup.array().of(
            Yup.object({
                title: Yup.string()
                    .max(100, 'El título no puede superar los 100 caracteres')
                    .nullable(),
                link: Yup.string()
                    .url('Debe ser una URL válida')
                    .nullable(),
                type: Yup.string()
                    .oneOf(['image', 'video', 'audio', 'document'], 'Tipo de multimedia inválido')
                    .nullable(),
                description: Yup.string()
                    .max(300, 'La descripción no puede superar los 300 caracteres')
                    .nullable(),
            })
        ).nullable(),

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
                        title: Yup.string()
                            .max(100, 'El título no puede superar los 100 caracteres')
                            .nullable(),
                        link: Yup.string()
                            .url('Debe ser una URL válida')
                            .nullable(),
                        type: Yup.string()
                            .oneOf(['image', 'video', 'audio', 'document'], 'Tipo de multimedia inválido')
                            .nullable(),
                        description: Yup.string()
                            .max(300, 'La descripción no puede superar los 300 caracteres')
                            .nullable(),
                    })
                ).nullable(),
            })
        ).nullable(),
    });

    const handleSubmitAnthologyForm = (values: any) => {
        console.log('Formulario enviado:', values);
    };

    if (isLoading) {
        return <div>Loading...</div>; // Puedes reemplazar esto con un componente de carga más elaborado
    }

    return (
        <Formik<AnthologyFormValues>
            initialValues={anthologyInitialValue || initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmitAnthologyForm(values)}
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