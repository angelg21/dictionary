import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import RoleModal, { RoleModalProps } from './RoleModal';

export default {
  title: 'Components/RoleModal',
  component: RoleModal,
  argTypes: {
    onClose: { action: 'closed' },
    onSave: { action: 'saved' },
  },
} as Meta<RoleModalProps>;

export const Default: StoryObj<RoleModalProps> = {
  args: {
    user: {
      name: 'Cody Fisher',
      email: 'cody.fisher@example.com',
      image: 'https://randomuser.me/api/portraits/men/75.jpg',
      roles: ['editor', 'reviewer'], // Roles iniciales seleccionados
    },
  },
};

export const NoRolesSelected: StoryObj<RoleModalProps> = {
  args: {
    user: {
      name: 'Jane Cooper',
      email: 'jane.cooper@example.com',
      image: 'https://randomuser.me/api/portraits/women/75.jpg',
      roles: [], // Sin roles seleccionados inicialmente
    },
  },
};

export const AllRolesSelected: StoryObj<RoleModalProps> = {
  args: {
    user: {
      name: 'Leslie Alexander',
      email: 'leslie.alexander@example.com',
      image: 'https://randomuser.me/api/portraits/women/76.jpg',
      roles: ['editor', 'reviewer', 'admin'], // Todos los roles seleccionados inicialmente
    },
  },
};