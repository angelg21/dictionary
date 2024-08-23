import type { Meta, StoryObj } from '@storybook/react';
import { ButtonWithPointLeft } from './ButtonWithPointLeft';

const meta: Meta<typeof ButtonWithPointLeft> = {
    title: 'Components/ButtonWithPointLeft',
    component: ButtonWithPointLeft,
    parameters: {
        layout: 'centered',
        backgrounds: {
            default: 'custom',
            values: [
                {
                    name: 'custom',
                    value: '#F0F0F0'
                },
            ],
        },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: 'Validada',
        textColor: 'text-d-green',
        backgroundColor: 'bg-d-green-light-button',
        pointColor: 'bg-d-green',
        hover: ''
    },
};