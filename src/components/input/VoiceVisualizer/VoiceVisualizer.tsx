import React, { useEffect, useRef } from 'react';
import styles from './VoiceVisualizer.module.css';

export interface VoiceVisualizerProps {
    /** Whether the visualizer is active (listening) */
    isListening: boolean;
    /** Array of audio levels (0-1) to visualize. If not provided, will simulate animation when listening. */
    audioLevels?: number[];
    /** Color of the bars */
    barColor?: string;
}

export const VoiceVisualizer: React.FC<VoiceVisualizerProps> = ({
    isListening,
    audioLevels,
    barColor = 'currentColor',
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const draw = () => {
            const width = canvas.width;
            const height = canvas.height;
            ctx.clearRect(0, 0, width, height);

            if (!isListening) {
                // Draw flat line
                ctx.fillStyle = barColor;
                ctx.fillRect(0, height / 2 - 1, width, 2);
                return;
            }

            const barCount = 20;
            const barWidth = 4;
            const gap = (width - barCount * barWidth) / (barCount - 1);

            ctx.fillStyle = barColor;

            for (let i = 0; i < barCount; i++) {
                // Use provided levels or simulate random
                let level = 0.2;
                if (audioLevels && audioLevels.length > i) {
                    level = audioLevels[i];
                } else {
                    // Simulation
                    const time = Date.now() / 200;
                    const noise = Math.sin(time + i * 0.5) * 0.5 + 0.5;
                    level = 0.1 + noise * 0.8;
                }

                const barHeight = level * height;
                const x = i * (barWidth + gap);
                const y = (height - barHeight) / 2;

                // Rounded caps (simulated by rect for now, or use roundRect if supported)
                ctx.fillRect(x, y, barWidth, barHeight);
            }

            animationRef.current = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [isListening, audioLevels, barColor]);

    return (
        <div className={styles.container}>
            <canvas
                ref={canvasRef}
                width={160}
                height={40}
                className={styles.canvas}
            />
        </div>
    );
};
