import type { Meta, StoryObj } from '@storybook/react';
import FilterRoles from './CheckFilter';

const meta: Meta<typeof FilterRoles> = {
  title: 'Components/FilterRoles',
  component: FilterRoles,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FilterRoles>;

export const Default: Story = {};