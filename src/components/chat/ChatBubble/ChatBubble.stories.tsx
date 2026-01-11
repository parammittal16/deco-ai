import type { Meta, StoryObj } from '@storybook/react';
import { ChatBubble } from './ChatBubble';

const meta: Meta<typeof ChatBubble> = {
    title: 'AI/ChatBubble',
    component: ChatBubble,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['user', 'ai'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof ChatBubble>;

export const AIMessage: Story = {
    args: {
        variant: 'ai',
        message: 'Hello! I am your AI assistant. How can I help you today?',
        timestamp: '10:00 AM',
    },
};

export const UserMessage: Story = {
    args: {
        variant: 'user',
        message: 'I need help designing a UI component.',
        timestamp: '10:01 AM',
    },
};

export const Loading: Story = {
    args: {
        variant: 'ai',
        message: '',
        isLoading: true,
    },
};
