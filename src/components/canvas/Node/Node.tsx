import React from 'react';
import styles from './Node.module.css';

export interface NodeProps {
    title: string;
    selected?: boolean;
    children?: React.ReactNode;
    inputs?: string[];
    outputs?: string[];
    x?: number;
    y?: number;
}

export const Node: React.FC<NodeProps> = ({
    title,
    selected = false,
    children,
    inputs = [],
    outputs = [],
    x = 0,
    y = 0,
}) => {
    return (
        <div
            className={`${styles.node} ${selected ? styles.selected : ''}`}
            style={{ transform: `translate(${x}px, ${y}px)` }}
        >
            <div className={styles.header}>
                <span className={styles.title}>{title}</span>
            </div>

            <div className={styles.body}>
                {inputs.length > 0 && (
                    <div className={styles.inputs}>
                        {inputs.map((label) => (
                            <div key={label} className={styles.portRow}>
                                <div className={`${styles.port} ${styles.portInput}`} />
                                <span>{label}</span>
                            </div>
                        ))}
                    </div>
                )}

                <div className={styles.content}>{children}</div>

                {outputs.length > 0 && (
                    <div className={styles.outputs}>
                        {outputs.map((label) => (
                            <div key={label} className={styles.portRowEnd}>
                                <span>{label}</span>
                                <div className={`${styles.port} ${styles.portOutput}`} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
