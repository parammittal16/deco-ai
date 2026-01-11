import type { Meta, StoryObj } from '@storybook/react';
import { PromptInput } from './PromptInput';


const meta: Meta<typeof PromptInput> = {
    title: 'AI/Input/PromptInput',
    component: PromptInput,
    tags: ['autodocs'],
    argTypes: {
        onSubmit: { action: 'submitted' },
        onChange: { action: 'changed' },
    },
};

export default meta;
type Story = StoryObj<typeof PromptInput>;

export const Default: Story = {};

export const WithIcons: Story = {
    args: {
        placeholder: 'Send a message...',
        startActions: (
            <button style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 4 }}>
                📎
            </button>
        ),
        endActions: (
            <button style={{
                border: 'none',
                background: '#4f46e5',
                color: 'white',
                borderRadius: '50%',
                width: 32,
                height: 32,
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                ➤
            </button>
        ),
    },
};
