import type { Meta, StoryObj } from '@storybook/react';
import { TabsMenu } from './TabsMenu';

const meta: Meta<typeof TabsMenu> = {
    title: 'WorkSheets/TabsMenu',
    component: TabsMenu,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        path: '',
        
        title: '',
    },
};