import clsx from 'clsx'
import { type PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

import { MenuItem } from '../../../features/toc'
import { Chevron } from '../../Chevron'
import { Skeleton } from '../../Skeleton'

import styles from './Item.module.css'

type BaseItemProps = {
    item: MenuItem
    isLoading?: boolean
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
    onClick?: () => void
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

function OptionalLink({ to, className, children, onClick }: OptionalLinkProps) {
    if (to) {
        return (<Link to={to} className={className} onClick={onClick}>{children}</Link>)
    }

    return (<span className={className} onClick={onClick}>{children}</span>)
}

export function Item(props: ItemProps): JSX.Element {
    const { item, isLoading } = props

    const linkClassName = clsx(
        styles.link,
        !isLoading && getItemHighlightStyles(item),
    )

    const textClassName = clsx(
        styles.text,
        isLoading && styles.skeleton
    )

    const ariaLevel = Math.min(item.level + 1, INDENT_LEVEL_LIMIT)

    const onLinkClick = isSubMenuItemProps(props) && !isLoading && !props.open ?
        props.onToggle : undefined

    const itemUrl = isLoading ? '' : item.url

    return (
        <li className={styles.item} aria-level={ariaLevel}>
            <OptionalLink to={itemUrl} className={linkClassName} onClick={onLinkClick}>
                <span className={textClassName}>
                    {isSubMenuItemProps(props) && !isLoading && (
                        <Chevron className={styles.toggle} open={props.open} onClick={props.onToggle} />
                    )}
                    {isLoading ?
                        <Skeleton className={styles.loader} /> :
                        item.title
                    }
                </span>
            </OptionalLink>
        </li>
    )
}
