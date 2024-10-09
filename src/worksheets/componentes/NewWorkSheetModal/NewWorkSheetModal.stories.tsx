import type { Meta, StoryObj } from '@storybook/react';
import { NewWorkSheetModal } from './NewWorkSheetModal';
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline'


const meta: Meta<typeof NewWorkSheetModal> = {
    title: 'WorkSheets/NewWorkSheetModal',
    component: NewWorkSheetModal,
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