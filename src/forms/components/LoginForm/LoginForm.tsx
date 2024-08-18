"use client";
import { AuthForm } from '../../../forms/components/AuthForm/AuthForm';
import { signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState, useTransition } from 'react';

const LoginForm: React.FC = () => {

  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (values: any) => {
    setError(null);
    startTransition(async () => {
      const res = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false
      });
      console.log(res);

      if (res?.error) {
        setError(res.error);
      } else {
        redirect('/dashboard/worksheets');
      }
    });
  };

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
        <AuthForm
          formTitle="Iniciar Sesión"
          inputs={[
            { id: 'email', name: 'email', type: 'email', labelText: 'Correo electrónico', placeholder: '' },
            { id: 'password', name: 'password', type: 'password', labelText: 'Contraseña', placeholder: '' },
          ]}
          buttonText="Ingresar"
          linkQuestion="¿No tienes una cuenta?"
          linkText="Regístrate"
          linkHref="/auth/register"
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSubmit}
          error={error}
          isPending={isPending}
        />
      </div>
    </div>
  );
};

export default LoginForm;