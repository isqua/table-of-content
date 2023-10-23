import clsx from 'clsx'
import { type PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

import { MenuItem } from '../../../features/toc'
import { Chevron } from '../../Chevron'

import styles from './Item.module.css'

type BaseItemProps = {
    item: MenuItem
}

type LeafItemProps = BaseItemProps

type SubMenuItemProps = BaseItemProps & {
    hasChildren: true
    open?: boolean
    onToggle?: () => void
}

type ItemProps = LeafItemProps | SubMenuItemProps

type OptionalLinkProps = PropsWithChildren<{
    to: string
    className: string
}>

const highlightStyles = {
    active: styles.active,
    parent: styles.parent,
    child: styles.child,
}

function isSubMenuItemProps(props: ItemProps): props is SubMenuItemProps {
    return (props as SubMenuItemProps).hasChildren
}

function getItemHighlightStyles(item: MenuItem): string | undefined {
    return item.highlight && highlightStyles[item.highlight]
}

const INDENT_LEVEL_LIMIT = 6

function OptionalLink({ to, className, children }: OptionalLinkProps) {
    if (to) {
        return (<Link to={to} className={className}>{children}</Link>)
    }

    return (<span className={className}>{children}</span>)
}

export function Item(props: ItemProps): JSX.Element {
    const { item } = props

    const linkClassName = clsx(
        styles.link,
        getItemHighlightStyles(item),
    )

    const ariaLevel = Math.min(item.level + 1, INDENT_LEVEL_LIMIT)

    return (
        <li className={styles.item} aria-level={ariaLevel}>
            <OptionalLink to={item.url} className={linkClassName}>
                <span className={styles.text}>
                    {isSubMenuItemProps(props) && (
                        <Chevron className={styles.toggle} open={props.open} onClick={props.onToggle} />
                    )}
                    {item.title}
                </span>
            </OptionalLink>
        </li>
    )
}
