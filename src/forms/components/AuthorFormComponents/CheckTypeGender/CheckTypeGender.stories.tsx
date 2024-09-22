import type { Meta, StoryObj } from '@storybook/react';
import { CheckTypeGender } from './CheckTypeGender'; 

const meta: Meta<typeof CheckTypeGender> = {
    title: 'Form/CheckTypeGender',
    component: CheckTypeGender,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {

    },
};