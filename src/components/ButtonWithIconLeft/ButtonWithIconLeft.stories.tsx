import type { Meta, StoryObj } from '@storybook/react';
import { ButtonWithIconLeft } from './ButtonWithIconLeft';
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline'

const meta: Meta<typeof ButtonWithIconLeft> = {
    title: 'Components/ButtonWithIconLeft',
    component: ButtonWithIconLeft,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: 'Nueva Ficha',
        textColor: 'text-white',
        backgroundColor: 'bg-green-600',
        icon: <ArrowLeftStartOnRectangleIcon/>,
    },
};