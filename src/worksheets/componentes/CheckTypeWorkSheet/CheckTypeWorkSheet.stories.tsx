import type { Meta, StoryObj } from '@storybook/react';
import { CheckTypeWorkSheet  } from './CheckTypeWorkSheet';

const meta: Meta<typeof CheckTypeWorkSheet> = {
    title: 'WorkSheets/CheckTypeWorkSheet',
    component: CheckTypeWorkSheet,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        name: 'workSheetType',

    },
};