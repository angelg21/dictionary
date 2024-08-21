import type { Meta, StoryObj } from '@storybook/react';
import { InputWithIconLeft } from './InputWithIconLeft';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const meta: Meta<typeof InputWithIconLeft> = {
    title: 'Components/InputWithIconLeft',
    component: InputWithIconLeft,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        textColor: 'text-white',
        backgroundColor: 'bg-white',
        icon: <MagnifyingGlassIcon/>,
        iconColor: 'text-d-gray-light',
        inputWidth: 'w-full lg:w-[280px]'
    },
};