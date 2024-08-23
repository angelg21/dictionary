import type { Meta, StoryObj } from '@storybook/react';
import { WorkSheetCreator } from './WorkSheetCreator';

const meta: Meta<typeof WorkSheetCreator> = {
    title: 'WorkSheets/WorkSheetCreator',
    component: WorkSheetCreator,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        workSheeetName: 'Pedro Gutierrez',
        workSheeetDate: '22/08/2024',
        workSheeetType: 'Autor',
    },
};