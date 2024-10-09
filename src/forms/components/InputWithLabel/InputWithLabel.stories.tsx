import type { Meta, StoryObj } from '@storybook/react';
import { InputComponent } from './InputWithLabel'; // Importing the InputComponent

const meta: Meta<typeof InputComponent> = {
    title: 'Form/InputComponent',
    component: InputComponent,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        id: 'email',
        name: 'email',
        type: 'email',
        placeholder: '',
        label: 'Correo electrónico',
        labelColor: 'text-gray-900',
        inputWidth: 'w-[395px]', 
        labelFontSize: 'text-sm',
        focusBorderColor: 'focus:ring-[#003366]',
    },
};

export const Password: Story = {
    args: {
        id: 'password',
        name: 'password',
        type: 'password',
        placeholder: '',
        label: 'Contraseña',
        labelColor: 'text-gray-900',
        inputWidth: 'w-[395px]',
        labelFontSize: 'text-sm',
        focusBorderColor: 'focus:ring-[#003366]',
        isPassword: true,
    },
};