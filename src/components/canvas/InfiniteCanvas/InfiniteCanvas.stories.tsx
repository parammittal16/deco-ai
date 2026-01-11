import type { Meta, StoryObj } from '@storybook/react';
import { InfiniteCanvas } from './InfiniteCanvas';

const meta: Meta<typeof InfiniteCanvas> = {
    title: 'AI/Canvas/InfiniteCanvas',
    component: InfiniteCanvas,
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof InfiniteCanvas>;

export const Default: Story = {
    render: () => (
        <div style={{ width: '100vw', height: '100vh' }}>
            <InfiniteCanvas>
                <div style={{
                    position: 'absolute',
                    top: 100,
                    left: 100,
                    width: 200,
                    height: 120,
                    background: 'white',
                    border: '1px solid #ccc',
                    borderRadius: 8,
                    padding: 16,
                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                }}>
                    <strong>Node A</strong>
                    <p>Drag the canvas to move around.</p>
                </div>

                <div style={{
                    position: 'absolute',
                    top: 300,
                    left: 400,
                    width: 200,
                    height: 120,
                    background: 'white',
                    border: '1px solid #ccc',
                    borderRadius: 8,
                    padding: 16,
                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                }}>
                    <strong>Node B</strong>
                    <p>Zoom with Ctrl+Scroll</p>
                </div>
            </InfiniteCanvas>
        </div>
    ),
};
