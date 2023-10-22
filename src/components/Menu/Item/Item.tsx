import clsx from 'clsx'
import { Link } from 'react-router-dom'

import { MenuItem } from '../../../features/toc'
import { Chevron } from '../../Chevron'

import styles from './Item.module.css'

type LeafItemProps = {
    item: MenuItem
}

type SubMenuItemProps = {
    item: MenuItem
    hasChildren: true
    open?: boolean
    onToggle?: () => void
}

type ItemProps = LeafItemProps | SubMenuItemProps

function isSubMenuItemProps(props: ItemProps): props is SubMenuItemProps {
    return (props as SubMenuItemProps).hasChildren
}

const INDENT_LEVEL_LIMIT = 6

export function Item(props: ItemProps): JSX.Element {
    const { item } = props

    const linkClassName = clsx(
        styles.link,
        item.isActive && styles.active,
    )

    const ariaLevel = Math.min(item.level + 1, INDENT_LEVEL_LIMIT)

    return (
        <li className={styles.item} aria-level={ariaLevel}>
            <Link to={item.url} className={linkClassName}>
                <span className={styles.text}>
                    {isSubMenuItemProps(props) && (
                        <Chevron className={styles.toggle} open={props.open} onClick={props.onToggle} />
                    )}
                    {item.title}
                </span>
            </Link>
        </li>
    )
}
