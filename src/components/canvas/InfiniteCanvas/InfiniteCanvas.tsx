import React, { useRef, useState, useEffect } from 'react';
import styles from './InfiniteCanvas.module.css';

interface Position {
    x: number;
    y: number;
}

export interface InfiniteCanvasProps {
    children?: React.ReactNode;
    initialScale?: number;
}

export const InfiniteCanvas: React.FC<InfiniteCanvasProps> = ({
    children,
    initialScale = 1,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(initialScale);
    const [offset, setOffset] = useState<Position>({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [lastPosition, setLastPosition] = useState<Position>({ x: 0, y: 0 });

    const handleWheel = (e: React.WheelEvent) => {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            const zoomSensitivity = 0.001;
            const newScale = Math.min(Math.max(0.1, scale - e.deltaY * zoomSensitivity), 5);
            setScale(newScale);
        } else {
            setOffset(prev => ({
                x: prev.x - e.deltaX,
                y: prev.y - e.deltaY
            }));
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        // Only drag if clicking transparent area or explicitly background
        if (e.target === containerRef.current || (e.target as HTMLElement).classList.contains(styles.transformLayer)) {
            setIsDragging(true);
            setLastPosition({ x: e.clientX, y: e.clientY });
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging) {
            const deltaX = e.clientX - lastPosition.x;
            const deltaY = e.clientY - lastPosition.y;
            setOffset(prev => ({
                x: prev.x + deltaX,
                y: prev.y + deltaY
            }));
            setLastPosition({ x: e.clientX, y: e.clientY });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Prevent default browser zoom on ctrl+scroll
    useEffect(() => {
        const preventDefaultZoom = (e: WheelEvent) => {
            if (e.ctrlKey) {
                e.preventDefault();
            }
        };
        const node = containerRef.current;
        if (node) {
            node.addEventListener('wheel', preventDefaultZoom, { passive: false });
        }
        return () => {
            if (node) {
                node.removeEventListener('wheel', preventDefaultZoom);
            }
        }
    }, []);

    return (
        <div
            ref={containerRef}
            className={styles.container}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
            style={{
                cursor: isDragging ? 'grabbing' : 'grab',
            }}
        >
            <div
                className={styles.transformLayer}
                style={{
                    transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                }}
            >
                <div className={styles.gridBackground} />
                {children}
            </div>

            <div className={styles.controls}>
                <button onClick={() => setScale(s => s + 0.1)}>+</button>
                <button onClick={() => setScale(1)}>Reset</button>
                <button onClick={() => setScale(s => s - 0.1)}>-</button>
            </div>
        </div>
    );
};
