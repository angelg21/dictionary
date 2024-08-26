import type { Meta, StoryObj } from '@storybook/react';
import SearchBar from './SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Components/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  args: {
    placeholder: 'Search for something...',
  },
};

export const WithCustomPlaceholder: Story = {
  args: {
    placeholder: 'Buscar',
  },
};