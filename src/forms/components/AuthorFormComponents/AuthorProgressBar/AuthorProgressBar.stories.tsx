import type { Meta, StoryObj } from '@storybook/react';
import { AuthorProgressBar } from './AuthorProgressBar';

const meta: Meta<typeof AuthorProgressBar> = {
    title: 'Form/AuthorProgressBar',
    component: AuthorProgressBar,
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