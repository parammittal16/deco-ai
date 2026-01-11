import type { Meta, StoryObj } from '@storybook/react';
import { VoiceVisualizer } from './VoiceVisualizer';

const meta: Meta<typeof VoiceVisualizer> = {
    title: 'AI/Input/VoiceVisualizer',
    component: VoiceVisualizer,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof VoiceVisualizer>;

export const Default: Story = {
    args: {
        isListening: false,
    },
};

export const Listening: Story = {
    args: {
        isListening: true,
        barColor: '#4f46e5',
    },
};
