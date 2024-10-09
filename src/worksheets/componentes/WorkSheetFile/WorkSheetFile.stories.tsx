import type { Meta, StoryObj } from '@storybook/react';
import { WorkSheetFile } from './WorkSheetFile';

const meta: Meta<typeof WorkSheetFile> = {
    title: 'WorkSheets/WorkSheetFile',
    component: WorkSheetFile,
    parameters: {
        layout: 'centered',
        backgrounds: {
            default: 'custom',
            values: [
                {
                    name: 'custom',
                    value: '#F0F0F0'
                },
            ],
        },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        workSheetDate: '21/08/2024',
        workSheetName: 'Teresa Coraspe',
        workSheetType: 'Autor',
        editorImg: '',
        editorName: 'Pedro Herrera',
        reviserImg: '',
        reviserName: 'Angel Guevara',
        buttonBackground: 'bg-d-green-light-button',
        buttonPointStyle: 'bg-d-green',
        buttonTextColor: 'text-d-green',
        buttonTitle: 'Validada',
    },
};