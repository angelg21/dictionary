"use client"
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { SimpleInputWithLabel } from "@/src/forms/components/SimpleInputWithLabel/SimpleInputWithLabel";
import { CheckTypeWorkSheet } from "../CheckTypeWorkSheet/CheckTypeWorkSheet";
import { SelectPersonInput } from "../SelectPersonInput/SelectPersonInput";
import { SimpleButton } from "@/src/components/SimpleButton/SimpleButton";
import { useState } from 'react';
import { Alert } from '@/src/forms/components/Alert/Alert';
import { addNewWorksheet } from '@/src/worksheets/actions/add-new-worksheet';
import { useSession } from 'next-auth/react';

export interface NewWorkSheetModalProps {
    onClose: () => void;
    onSave?: (roles: string[]) => Promise<boolean>;
}

export const NewWorkSheetModal = ({ onClose }: NewWorkSheetModalProps) => {
    const [selectedEditors, setSelectedEditors] = useState<string[]>([]);
    const [selectedReviewers, setSelectedReviewers] = useState<string[]>([]);
    const [editorSelection, setEditorSelection] = useState<string | null>(null);
    const [reviewerSelection, setReviewerSelection] = useState<string | null>(null);
    const [workSheetType, setWorkSheetType] = useState<string>('author');
    const [loading, setLoading] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const { data: session } = useSession();

    const handleAddEditor = (id: string, setFieldValue: any) => {
        if (reviewerSelection === id) {
            setReviewerSelection(null);
        }
        const updatedEditors = [...selectedEditors, id];
        setSelectedEditors(updatedEditors);
        setFieldValue('editors', updatedEditors);
    };

    const handleRemoveEditor = (id: string, setFieldValue: any) => {
        const updatedEditors = selectedEditors.filter(editorId => editorId !== id);
        setSelectedEditors(updatedEditors);
        setFieldValue('editors', updatedEditors);
    };

    const handleAddReviewer = (id: string, setFieldValue: any) => {
        if (editorSelection === id) {
            setEditorSelection(null);
        }
        const updatedReviewers = [...selectedReviewers, id];
        setSelectedReviewers(updatedReviewers);
        setFieldValue('reviewers', updatedReviewers);
    };

    const handleRemoveReviewer = (id: string, setFieldValue: any) => {
        const updatedReviewers = selectedReviewers.filter(reviewerId => reviewerId !== id);
        setSelectedReviewers(updatedReviewers);
        setFieldValue('reviewers', updatedReviewers);
    };

    const handleTypeChange = (value: string) => {
        setWorkSheetType(value);
    };

    const handleSubmit = async (values: any) => {
        setLoading(true);
        setSubmitError(null);
        console.log(values);

        const payload = {
            type: values.workSheetType,
            title: values.title,
            createdBy: session?.user._id ?? '',
            assignedEditors: values.editors,
            assignedReviewers: values.reviewers,
        };

        const response = await addNewWorksheet(payload);

        setLoading(false);

        if (response.ok) {
            onClose();
        } else {
            setSubmitError(response.message);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 max-lg:px-6">
            <div className="bg-d-fondo p-6 rounded-md max-w-[470px]  w-full">
                <div className='flex flex-row justify-between mb-9'>
                    <h2 className="text-xl font-medium self-center text-d-gray">Nueva Ficha</h2>
                    <svg onClick={onClose} className='self-center cursor-pointer' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 13L13 1M1 1L13 13" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <div>
                    <Formik
                        initialValues={{
                            title: '',
                            workSheetType: workSheetType,
                            editors: [],
                            reviewers: [],
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={Yup.object({
                            title: Yup.string()
                                .max(50, 'El título no puede ser tan extenso')
                                .required('El título es requerido'),
                            workSheetType: Yup.string().required('El tipo de ficha es requerido'),
                            editors: Yup.array().min(1, 'Debe haber al menos un editor seleccionado'),
                            reviewers: Yup.array().min(1, 'Debe haber al menos un revisor seleccionado'),
                        })}
                    >
                        {formik => (
                            <Form>
                                <SimpleInputWithLabel
                                    id='title'
                                    name={"title"}
                                    type={"text"}
                                    label={"Título"}
                                    labelTextStyle={"text-gray-900 text-sm"}
                                    inputWidth={"w-full"}
                                    focusBorderColor={"focus:ring-[#003366]"}
                                />
                                <CheckTypeWorkSheet
                                    name={"workSheetType"}
                                    onTypeChange={handleTypeChange}
                                />

                                <SelectPersonInput
                                    title={"Editores"}
                                    type={"editor"}
                                    excludeIds={selectedReviewers}
                                    onAdd={(id) => handleAddEditor(id, formik.setFieldValue)}
                                    onRemove={(id) => handleRemoveEditor(id, formik.setFieldValue)}
                                    currentSelection={editorSelection}
                                    onSelectionChange={setEditorSelection}
                                />
                                <ErrorMessage name="editors" render={msg => <Alert text={msg} type='error' fontSize='text-sm' iconSize='h-5 w-5' padding='p-2' />} />

                                <SelectPersonInput
                                    title={"Revisores"}
                                    type={"reviewer"}
                                    excludeIds={selectedEditors}
                                    onAdd={(id) => handleAddReviewer(id, formik.setFieldValue)}
                                    onRemove={(id) => handleRemoveReviewer(id, formik.setFieldValue)}
                                    currentSelection={reviewerSelection}
                                    onSelectionChange={setReviewerSelection}
                                />
                                <ErrorMessage name="reviewers" render={msg => <Alert text={msg} type='error' fontSize='text-sm' iconSize='h-5 w-5' padding='p-2' />} />

                                {submitError && (
                                    <Alert
                                        text={submitError}
                                        type="error"
                                        fontSize="text-sm"
                                        iconSize="h-5 w-5"
                                        padding="p-2 mt-4"
                                    />
                                )}

                                <div className="flex justify-end mt-10">
                                    <SimpleButton
                                        title={loading ? "Creando..." : "Crear Ficha"}
                                        type="submit"
                                        textColor="text-white"
                                        backgroundColor="bg-d-blue"
                                        hover="hover:bg-[#00284D]"
                                        disabled={loading}
                                    />
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};