"use client";
import React, { useTransition } from 'react';
import { FormComponent } from '../../../forms/components/AuthForm/AuthForm';
import { register } from '@/src/forms/actions/auth-actions';

const RegisterPage: React.FC = () => {
  
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (values: any) => {
    startTransition(() => {
      register(values);
    });
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with a dark overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: `url('/assets/tepuis.webp')` }}
      >
        {/* Dark overlay to darken the background image */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Form container */}
      <div className="relative z-10 w-full max-w-sm mx-auto my-auto">
        <FormComponent
          formTitle="Regístrate"
          inputs={[
            { id: 'name', name: 'name', type: 'text', labelText: 'Nombre Completo', placeholder: '' },
            { id: 'email', name: 'email', type: 'email', labelText: 'Correo electrónico', placeholder: '' },
            { id: 'password', name: 'password', type: 'password', labelText: 'Contraseña', placeholder: '' },
          ]}
          buttonText="Registrarse"
          linkQuestion="¿Ya tienes una cuenta?"
          linkText="Iniciar Sesión"
          linkHref="auth/login"
          initialValues={{ name: '', email: '', password: '' }}
          onSubmit={handleSubmit}
          error={null}
          isPending={isPending}
        />
      </div>
    </div>
  );
};

export default RegisterPage;