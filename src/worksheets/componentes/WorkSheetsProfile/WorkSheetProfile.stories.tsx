import type { Meta, StoryObj } from '@storybook/react';
import {WorkSheetProfile } from './WorkSheetProfile';

const meta: Meta<typeof WorkSheetProfile> = {
    title: 'WorkSheets/WorkSheetProfile',
    component: WorkSheetProfile,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        userName: 'Angel Guevara',
        userRol: 'Editor',
        userImg: '',
    },
};