import type { Meta, StoryObj } from '@storybook/react';
import { AuthorDetailsForm } from './AuthorDetailsForm';

const meta: Meta<typeof AuthorDetailsForm> = {
    title: 'Form/AuthorDetailsForm',
    component: AuthorDetailsForm,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {

    },
};