import React from 'react';

export interface EdgeProps {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    color?: string;
    width?: number;
}

export const Edge: React.FC<EdgeProps> = ({
    x1,
    y1,
    x2,
    y2,
    color = '#cbd5e1',
    width = 2,
}) => {
    // Cubic Bezier
    const cX1 = x1 + Math.abs(x2 - x1) / 2;
    const cY1 = y1;
    const cX2 = x2 - Math.abs(x2 - x1) / 2;
    const cY2 = y2;

    const path = `M ${x1} ${y1} C ${cX1} ${cY1}, ${cX2} ${cY2}, ${x2} ${y2}`;

    return (
        <svg style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible', pointerEvents: 'none' }}>
            <path
                d={path}
                stroke={color}
                strokeWidth={width}
                fill="none"
            />
        </svg>
    );
};
