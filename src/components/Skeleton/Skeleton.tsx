import clsx from 'clsx'

import styles from './Skeleton.module.css'

interface SkeletonProps {
    className?: string
}

export function Skeleton({ className }: SkeletonProps) {
    return (
        <span className={clsx(styles.skeleton, className)} />
    )
}
