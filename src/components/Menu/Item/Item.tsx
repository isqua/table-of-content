import clsx from 'clsx'
import { MenuItem } from '../../../features/toc'

import styles from './Item.module.css'

type ItemProps = {
    item: MenuItem
}

const INDENT_LEVEL_LIMIT = 6

export function Item({ item }: ItemProps): JSX.Element {
    const linkClassName = clsx(
        styles.link,
        item.isActive && styles.active,
    )

    const ariaLevel = Math.min(item.level + 1, INDENT_LEVEL_LIMIT)

    return (
        <li className={styles.item} aria-level={ariaLevel}>
            <a href={item.url} className={linkClassName}>
                <span className={styles.text}>{item.title}</span>
            </a>
        </li>
    )
}
