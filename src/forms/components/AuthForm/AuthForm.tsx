"use client";
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FormProps } from '../../interface/AuthFormProps'; // Importing the FormProps interface
import { InputComponent } from '../InputWithLabel/InputWithLabel'; // Assuming you have the InputComponent already defined
import { ButtonComponent } from '../Button/Button'; // Assuming you have the ButtonComponent already defined
import { Alert } from '../Alert/Alert';
import GoogleSignInButton from '../GoogleSignInButton/GoogleSignInButton';

/**
 * FormComponent is a customizable form component built with React and integrated with Formik and Yup for validation.
 * This component supports various input fields, a submit button, and an additional link (e.g., for registration or password recovery).
 * 
 * @param {FormProps} props - The properties for customizing the form.
 * @returns {JSX.Element} A JSX element representing a customizable form with inputs, a button, a link, and a title.
 */
export const AuthForm: React.FC<FormProps> = ({
  formTitle,
  inputs,
  buttonText,
  linkQuestion,
  linkText,
  linkHref,
  onSubmit,
  initialValues,
  error,
  isPending,
}) => {
  
 
  const validationSchema = Yup.object().shape(
    inputs.reduce((schema, input) => {
      if (input.name === 'name') {
        schema[input.name] = Yup.string()
          .min(2, 'El nombre debe tener al menos 2 caracteres')
          .required('Campo requerido');
      } else if (input.name === 'email') {
        schema[input.name] = Yup.string()
          .email('Correo electrónico inválido')
          .required('Campo requerido');
      } else if (input.name === 'password') {
        schema[input.name] = Yup.string()
          .min(6, 'La contraseña debe tener al menos 6 caracteres')
          .matches(
            /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
            'La contraseña debe tener una letra mayúscula, una letra minúscula y un número'
          )
          .required('Campo requerido');
      }
      return schema;
    }, {} as Record<string, any>)
  );

  return (
    <>
        <h2 className="max-[420px]:text-3xl text-4xl font-bold text-center mb-6 text-white">{formTitle}</h2>
        <div className='max-[420px]:mx-5'>
          <div className="p-6 bg-white bg-opacity-30 rounded-md shadow-lg w-full py-[32px]">

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            > 
            {({ errors, touched }) => (
                <Form className='flex flex-col gap-[30px]'>
                {/* Form title */}

                <div>
                    {/* First child div containing the input fields */}
                    {inputs.map((input) => (
                    <div key={input.id} className="mb-5 flex flex-col gap-3">
                        <Field name={input.name}>
                        {({ field }: any) => (
                            <InputComponent
                            {...field}
                            id={input.id}
                            name={input.name}
                            type={input.type}
                            placeholder=""
                            label={input.labelText}
                            labelColor="text-white"
                            inputWidth="w-full"
                            labelFontSize="text-sm"
                            borderWidth="2"
                            focusBorderColor="focus:ring-d-blue"
                            isPassword={input.type === 'password'}
                            disabled={isPending}
                            />
                        )}
                        </Field>
                        <ErrorMessage name={input.name} render={msg => <Alert text={msg} type='error' fontSize='text-sm' iconSize='h-5 w-5' padding='p-2'/>} />
                    </div>
                    ))}
                </div>
                  {error && <Alert type="error" text={error} fontSize='text-sm' iconSize='h-5 w-5' padding='p-2'  />}
                  
                  <ButtonComponent
                    bgColor="bg-d-blue"
                    text={buttonText}
                    width="w-full"
                    fontSize="text-sm"
                    type='submit'
                    isDisabled={isPending}
                  />
                </Form>
            )}
            </Formik>
            <GoogleSignInButton callbackUrl='' isDisabled={isPending}/>
              <p className="mt-4 text-center text-sm text-white">
              {linkQuestion} <a href={linkHref} className="font-bold text-d-blue hover:text-[#0c2aa6]">
                  {linkText}
              </a>
              </p>
          </div>
        </div>
    </>
  );
};