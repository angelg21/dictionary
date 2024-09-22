import type { Meta, StoryObj } from '@storybook/react';
import { SelectDate } from './SelectDate';

const meta: Meta<typeof SelectDate> = {
    title: 'Form/SelectDate',
    component: SelectDate,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: 'Fecha de Nacimiento'
    },
};