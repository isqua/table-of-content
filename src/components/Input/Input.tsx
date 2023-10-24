import type { ChangeEvent } from 'react'

import styles from './Input.module.css'

type InputProps = {
    onChange?: (text: string) => void
    placeholder?: string
    isLoading?: boolean
}

function buildOnChangeHandler(onChange: InputProps['onChange']) {
    if (!onChange) {
        return
    }

    return function (event: ChangeEvent<HTMLInputElement>) {
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
            {isLoading && (<span aria-label='Loading' className={styles.spinner} />)}
        </div>
    )
}
