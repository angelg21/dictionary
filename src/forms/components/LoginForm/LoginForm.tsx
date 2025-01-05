"use client";

import { AuthForm } from '../../../forms/components/AuthForm/AuthForm';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { useSession } from "next-auth/react";

const  LoginForm: React.FC = () => {

  const { data: session, status } = useSession();
  const userRoles = session?.user?.roles || [];
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

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
      }
    });
  };

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.roles) {
      const userRoles = session.user.roles;

      // Lógica de redirección basada en roles
      if (userRoles.includes('admin')) {
        router.push("/dashboard/worksheets/validatedSheets");
      } else if (userRoles.includes('editor') && !userRoles.includes('reviewer')) {
        router.push("/dashboard/worksheets/sheetsToComplete");
      } else if (userRoles.includes('reviewer') && !userRoles.includes('editor')) {
        router.push("/dashboard/worksheets/sheetsToReview");
      } else if (userRoles.includes('editor') && userRoles.includes('reviewer')) {
        router.push("/dashboard/worksheets/sheetsToComplete");
      }
    }
  }, [status, session, router]);
  
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