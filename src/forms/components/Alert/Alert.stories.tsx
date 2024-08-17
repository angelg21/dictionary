import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Feedback/ErrorAlert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Error: Story = {
  args: {
    type: 'error',
    text: 'There were some errors with your submission.',
  },
};

export const Success: Story = {
  args: {
    type: 'success',
    text: 'Your submission was successful!',
  },
};

export const Info: Story = {
  args: {
    type: 'info',
    text: 'Here is some information you might find useful.',
  },
};