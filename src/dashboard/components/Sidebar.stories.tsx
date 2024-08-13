import type { Meta, StoryObj } from '@storybook/react';

import { Sidebar } from './Sidebar';

const meta: Meta<typeof Sidebar> = {
    title: 'Component/Sidebar',
    component: Sidebar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        text: 'Sidebar',
    },
};