import type { Meta, StoryObj } from '@storybook/react';
import { NewWorkSheetButton } from './NewWorkSheetButton';
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline'

const meta: Meta<typeof NewWorkSheetButton> = {
    title: 'WorkSheets/NewWorkSheetButton',
    component: NewWorkSheetButton,
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