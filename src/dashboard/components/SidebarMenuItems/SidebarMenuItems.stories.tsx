import type { Meta, StoryObj } from '@storybook/react';
import { SidebarMenuItems } from './SidebarMenuItems';

const meta: Meta<typeof SidebarMenuItems> = {
    title: 'Dashboard/SidebarMenuItems',
    component: SidebarMenuItems,
    parameters: {
        layout: 'none',
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