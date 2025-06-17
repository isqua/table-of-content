import clsx from 'clsx'
import type { MouseEvent } from 'react'

import styles from './Chevron.module.css'
import ChevronIcon from './Chevron.svg?react'

interface ChevronProps {
    className?: string
    open?: boolean
    onClick?: () => void
}

export function Chevron({ open, className, onClick }: ChevronProps) {
    const classNames = clsx(
        styles.chevron,
        className,
        open && styles.open
    )

    const onClickHandler = (event: MouseEvent) => {
        event.stopPropagation()
        event.preventDefault()

        onClick?.()
    }

    return (
        <ChevronIcon
            role="button"
            aria-expanded={open}
            onClick={onClickHandler}
            className={classNames}
        />
    )
}
