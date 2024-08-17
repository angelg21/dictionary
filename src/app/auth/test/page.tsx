"use client";
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export const FormComponent: React.FC = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Correo electrónico inválido").required('Requerido'),
    password: Yup.string().required('Requerido'),
  });

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log('Form values:', values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div>
            <Field name="email" type="email" />
            <ErrorMessage name="email" component="div" />
          </div>
          <div>
            <Field name="password" type="password" />
            <ErrorMessage name="password" component="div" />
          </div>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;