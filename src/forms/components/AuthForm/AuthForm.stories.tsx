import type { Meta, StoryObj } from '@storybook/react';
import { AuthForm } from '../AuthForm/AuthForm'; // Importing the FormComponent

const meta: Meta<typeof AuthForm> = {
    title: 'Form/FormComponent',
    component: AuthForm,
    parameters: {
        layout: 'centered',
        backgrounds: {
            default: 'dark',
            values: [
              { name: 'light', value: '#ffffff' },
              { name: 'dark', value: '#333333' }, // Definiendo el fondo oscuro
            ],
        },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LoginForm: Story = {
    args: {
        formTitle: 'Iniciar Sesión',
        inputs: [
            { id: 'email', name: 'email', type: 'email', labelText: 'Correo electrónico' },
            { id: 'password', name: 'password', type: 'password', labelText: 'Contraseña' }
        ],
        buttonText: 'Ingresar',
        linkQuestion: '¿No tienes una cuenta?',
        linkText: 'Regístrate',
        linkHref: '/register',
        initialValues: { email: '', password: '' },
        onSubmit: (values: any) => {
            console.log('Form values:', values);
        },
    },
};

export const RegisterForm: Story = {
    args: {
        formTitle: 'Registrarse',
        inputs: [
            { id: 'fullName', name: 'fullName', type: 'text', labelText: 'Nombre Completo' },
            { id: 'email', name: 'email', type: 'email', labelText: 'Correo electrónico' },
            { id: 'password', name: 'password', type: 'password', labelText: 'Contraseña' },
        ],
        buttonText: 'Registrarse',
        linkQuestion: '¿Ya tienes una cuenta?',
        linkText: 'Iniciar sesión',
        linkHref: '/login',
        initialValues: { email: '', password: '', fullName: '' },
        onSubmit: (values: any) => {
            console.log('Form values:', values);
        },
    },
};