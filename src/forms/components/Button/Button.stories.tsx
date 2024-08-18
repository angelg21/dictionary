import type { Meta, StoryObj } from '@storybook/react';
import { ButtonComponent } from './Button'; // Importing the ButtonComponent

const meta: Meta<typeof ButtonComponent> = {
    title: 'Form/ButtonComponent',
    component: ButtonComponent,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        bgColor: 'bg-[#003366]',
        text: 'Ingresar',
        width: 'w-[395px]',
        fontSize: 'text-md',  // Control the width of the button using Tailwind CSS width classes
        type: 'button' // Adding the type property to the story args
    },
};