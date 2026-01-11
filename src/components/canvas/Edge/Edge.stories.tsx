import type { Meta, StoryObj } from '@storybook/react';
import { Edge } from './Edge';

const meta: Meta<typeof Edge> = {
    title: 'AI/Canvas/Edge',
    component: Edge,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ position: 'relative', height: 300, width: '100%' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Edge>;

export const Default: Story = {
    args: {
        x1: 50,
        y1: 50,
        x2: 300,
        y2: 250,
    },
};
