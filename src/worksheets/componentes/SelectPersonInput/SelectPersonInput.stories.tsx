import type { Meta, StoryObj } from '@storybook/react';
import { SelectPersonInput  } from './SelectPersonInput';

const meta: Meta<typeof SelectPersonInput> = {
    title: 'WorkSheets/SelectPersonInput',
    component: SelectPersonInput,
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