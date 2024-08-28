import type { Meta, StoryObj } from '@storybook/react';
import { SimpleInputWithLabel } from './SimpleInputWithLabel'; // Importing the InputComponent

const meta: Meta<typeof SimpleInputWithLabel> = {
    title: 'Form/SimpleInputWithLabel',
    component: SimpleInputWithLabel,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        id: 'title',
        name: 'title',
        type: 'text',
        placeholder: '',
        label: 'Titulo',
        labelTextStyle: 'text-gray-900 text-sm',
        inputWidth: 'w-[395px]', 
        focusBorderColor: 'focus:ring-[#003366]',
    },
};