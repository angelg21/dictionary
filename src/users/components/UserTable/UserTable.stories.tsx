import type { Meta, StoryObj } from '@storybook/react';
import UserTable from './UserTable';

const meta: Meta<typeof UserTable> = {
  title: 'Components/UserTable',
  component: UserTable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof UserTable>;

export const Default: Story = {
  args: {
    users: [
      {
        name: 'Jane Cooper',
        email: 'jane.cooper@example.com',
        roles: ['Investigador'],
        image: '/assets/jurica.jpg',
      },
      {
        name: 'Cody Fisher',
        email: 'cody.fisher@example.com',
        roles: ['Investigador', 'Editor'],
        image: '/assets/jurica.jpg',
      },
      {
        name: 'Esther Howard',
        email: 'esther.howard@example.com',
        roles: ['Administrador'],
        image: '/assets/jurica.jpg',
      },
      {
        name: 'Jenny Wilson',
        email: 'jenny.wilson@example.com',
        roles: ['Investigador'],
        image: '/assets/jurica.jpg',
      },
      {
        name: 'Kristin Watson',
        email: 'kristin.watson@example.com',
        roles: ['Investigador', 'Revisor'],
        image: '/assets/jurica.jpg',
      },
      {
        name: 'Cameron Williamson',
        email: 'cameron.williamson@example.com',
        roles: ['Investigador', 'Editor'],
        image: '/assets/jurica.jpg',
      },
    ],
  },
};