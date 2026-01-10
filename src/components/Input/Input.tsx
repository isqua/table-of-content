import type { ChangeEvent } from 'react'

import styles from './Input.module.css'

interface InputProps {
    onChange?: (text: string) => void
    placeholder?: string
    /** Should show spinner */
    isLoading?: boolean
}

function buildOnChangeHandler(onChange: InputProps['onChange']) {
    if (!onChange) {
        return
    }

    return (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value)
    }
}

export function Input({ placeholder, isLoading, onChange }: InputProps) {
    return (
        <div className={styles.input}>
            <input
                className={styles.control}
                placeholder={placeholder}
                type="text"
                onChange={buildOnChangeHandler(onChange)}
            />
            {isLoading && <span title="Loading" className={styles.spinner} />}
        </div>
    )
}
