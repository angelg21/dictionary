'use client'

import { GroupingFormValues } from "@/src/forms/components/GroupingFormComponent/interfaces/GroupingForm";
import { AlertProvider } from "@/src/users/context/AlertContext";
import { Form, Formik, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import { useParams, usePathname } from "next/navigation";
import { getGroupingForm } from "./actions/get-grouping-form";

export default function GroupingFormLayout({ children }: { children: React.ReactNode; }) {

    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [groupingInitialValue, setGroupingInitialValue] = useState<GroupingFormValues>()

    const SaveFormValues = () => {
        const { values } = useFormikContext<GroupingFormValues>();

        useEffect(() => {
            localStorage.setItem(`groupingFormData-${id}`, JSON.stringify(values));
        }, [values]);

        return null; // Este componente solo se utiliza para ejecutar el useEffect
    };

    useEffect(() => {
        const fetchGroupingData = async () => {
            setIsLoading(true);
            try {
                const response = await getGroupingForm(id);
                const { _id, ...initialValues } = response?.responseData;
                setGroupingInitialValue(initialValues);
                console.log(initialValues)
            } catch (error) {
                console.error('Error fetching author data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGroupingData();
    }, [id]);

    const initialValues = JSON.parse(JSON.stringify({
        name: '',
        meetingPlace: {
            city: '',
            municipality: ''
        },
        startDate: '',
        endDate: '',
        generalCharacteristics: '',
        members: [],
        groupPublications: [],
        groupActivities: '',
        multimedia: [],
        criticism: [],
        text: ''
    }));

    const validationSchema = Yup.object({
        name: Yup.string()
            .max(100, 'El nombre no puede superar los 100 caracteres')
            .nullable(),

        meetingPlace: Yup.object({
            city: Yup.string()
                .max(100, 'La ciudad no puede superar los 100 caracteres')
                .nullable(),
            municipality: Yup.string()
                .max(100, 'El municipio no puede superar los 100 caracteres')
                .nullable(),
        }).nullable(),

        startDate: Yup.string()
            .nullable(),

        endDate: Yup.string()
            .nullable(),

        generalCharacteristics: Yup.string()
            .max(500, 'Las características generales no pueden superar los 500 caracteres')
            .nullable(),

        members: Yup.array()
            .of(Yup.string().max(100, 'El nombre del miembro no puede superar los 100 caracteres'))
            .nullable(),

        groupPublications: Yup.array().of(
            Yup.object({
                title: Yup.string()
                    .max(100, 'El título no puede superar los 100 caracteres')
                    .nullable(),
                year: Yup.number()
                    .nullable(),
                authors: Yup.string()
                    .max(200, 'Los autores no pueden superar los 200 caracteres')
                    .nullable(),
                summary: Yup.string()
                    .max(500, 'El resumen no puede superar los 500 caracteres')
                    .nullable(),
            })
        ).nullable(),

        groupActivities: Yup.string()
            .max(500, 'Las actividades del grupo no pueden superar los 500 caracteres')
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
                            .nullable(),
                    })
                ).nullable(),
            })
        ).nullable(),
    });

    const handleSubmitGroupingForm = (values: any) => {
        console.log('Formulario enviado:', values);
    };

    if (isLoading) {
        return <div>Loading...</div>; // Puedes reemplazar esto con un componente de carga más elaborado
    }

    return (
        <Formik<GroupingFormValues>
            initialValues={groupingInitialValue || initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmitGroupingForm(values)}
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