import React, { useRef, useEffect, useState } from 'react';
import styles from './PromptInput.module.css';

export interface PromptInputProps {
    /** Placeholder text */
    placeholder?: string;
    /** Value of the input */
    value?: string;
    /** Callback on change */
    onChange?: (value: string) => void;
    /** Callback on submit (Enter key) */
    onSubmit?: (value: string) => void;
    /** Disable interaction */
    disabled?: boolean;
    /** Optional start slot (e.g. for attachments) */
    startActions?: React.ReactNode;
    /** Optional end slot (e.g. for send button) */
    endActions?: React.ReactNode;
}

export const PromptInput: React.FC<PromptInputProps> = ({
    placeholder = 'Ask anything...',
    value,
    onChange,
    onSubmit,
    disabled = false,
    startActions,
    endActions,
}) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [internalValue, setInternalValue] = useState(value || '');

    const currentValue = value !== undefined ? value : internalValue;

    const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto'; // Reset height
            textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`; // Set new height, max 200px
        }
    };

    useEffect(() => {
        adjustHeight();
    }, [currentValue]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        if (value === undefined) setInternalValue(newValue);
        onChange?.(newValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSubmit?.(currentValue);
            if (value === undefined) setInternalValue('');
        }
    };

    return (
        <div className={`${styles.container} ${disabled ? styles.disabled : ''}`}>
            {startActions && <div className={styles.actions}>{startActions}</div>}

            <textarea
                ref={textareaRef}
                className={styles.textarea}
                placeholder={placeholder}
                value={currentValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                rows={1}
            />

            {endActions && <div className={styles.actions}>{endActions}</div>}
        </div>
    );
};
