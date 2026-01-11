import type { Meta, StoryObj } from '@storybook/react';
import { Node } from './Node';

const meta: Meta<typeof Node> = {
    title: 'AI/Canvas/Node',
    component: Node,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Node>;

export const Default: Story = {
    args: {
        title: 'Text Processor',
        inputs: ['Prompt', 'Context'],
        outputs: ['Result'],
        children: (
            <div style={{ fontSize: 13, color: '#555' }}>
                Processes incoming text using LLM.
            </div>
        ),
    },
};
