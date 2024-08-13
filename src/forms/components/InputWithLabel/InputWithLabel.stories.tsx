import type { Meta, StoryObj } from '@storybook/react';
import {InputComponent} from './InputWithLabel'; // Importing the InputComponent

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
        placeholder: 'you@example.com',
        label: 'Email',
        labelColor: 'text-gray-900',
    },
};