"use client";
import { FormComponent } from '../../../forms/components/AuthForm/AuthForm';
import { login } from '@/src/forms/actions/auth-actions';
import { useTransition } from 'react';

const LoginPage: React.FC = () => {

  const [isPending, startTransition] = useTransition();

  const handleSubmit = (values: any) => {
    startTransition(() => {
      login(values);
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
          formTitle="Iniciar Sesión"
          inputs={[
            { id: 'email', name: 'email', type: 'email', labelText: 'Correo electrónico', placeholder: '' },
            { id: 'password', name: 'password', type: 'password', labelText: 'Contraseña', placeholder: '' },
          ]}
          buttonText="Ingresar"
          linkQuestion="¿No tienes una cuenta?"
          linkText="Regístrate"
          linkHref="auth/register"
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSubmit}
          error={null}
          isPending={isPending}
        />
      </div>
    </div>
  );
};

export default LoginPage;