import React from 'react';
import styles from './ChatBubble.module.css';

export interface ChatBubbleProps {
    /** The message content */
    message: string;
    /** Sender type */
    variant?: 'user' | 'ai';
    /** Optional timestamp */
    timestamp?: string;
    /** Loading state for AI thinking */
    isLoading?: boolean;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
    message,
    variant = 'ai',
    timestamp,
    isLoading = false,
}) => {
    return (
        <div
            className={`${styles.container} ${variant === 'user' ? styles.user : styles.ai
                }`}
        >
            <div className={styles.bubble}>
                {isLoading ? (
                    <div className={styles.loadingDots}>
                        <span>.</span><span>.</span><span>.</span>
                    </div>
                ) : (
                    <div className={styles.content}>{message}</div>
                )}
            </div>
            {timestamp && <span className={styles.timestamp}>{timestamp}</span>}
        </div>
    );
};
