import clsx from 'clsx'

import styles from './Skeleton.module.css'

type SkeletonProps = {
    className?: string
}

export function Skeleton({ className }: SkeletonProps) {
    return (
        <span className={clsx(styles.skeleton, className)} />
    )
}
