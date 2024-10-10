import type { Meta, StoryObj } from '@storybook/react';
import { Filters  } from './Filters';

const meta: Meta<typeof Filters> = {
    title: 'WorkSheets/Filters',
    component: Filters,
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