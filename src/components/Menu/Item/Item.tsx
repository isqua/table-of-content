import clsx from 'clsx'
import { useState, type PropsWithChildren } from 'react'

import type { MenuItem } from '../../../features/toc'
import { Chevron } from '../../Chevron'
import { OptionalLink } from '../../OptionalLink'
import { Skeleton } from '../../Skeleton'

import styles from './Item.module.css'

type ItemProps = PropsWithChildren<{
    item: MenuItem
    isLoading?: boolean
    onClick?: () => void
}>

type ItemToggleProps = PropsWithChildren<{
    item: MenuItem
    isLoading: boolean
}>

const highlightStyles = {
    active: styles.active,
    parent: styles.parent,
    child: styles.child,
}

function getItemHighlightStyles(item: MenuItem): string | undefined {
    return item.highlight && highlightStyles[item.highlight]
}

const INDENT_LEVEL_LIMIT = 6

export function Item(props: ItemProps): JSX.Element {
    const { item, isLoading, children, onClick } = props

    const linkClassName = clsx(
        styles.link,
        !isLoading && getItemHighlightStyles(item),
    )

    const textClassName = clsx(
        styles.text,
        isLoading && styles.skeleton
    )

    const ariaLevel = Math.min(item.level + 1, INDENT_LEVEL_LIMIT)

    const itemUrl = isLoading ? '' : item.url

    return (
        <li className={styles.item} aria-level={ariaLevel}>
            <OptionalLink to={itemUrl} className={linkClassName} onClick={onClick}>
                <span className={textClassName}>
                    {isLoading ?
                        <Skeleton className={styles.loader} /> :
                        children
                    }
                </span>
            </OptionalLink>
        </li>
    )
}

export function ItemToggle({ item, children, isLoading }: ItemToggleProps): JSX.Element {
    const [ isOpen, setOpen ]  = useState(isLoading ? true : item.defaultOpenState)

    const onToggle = () => {
        setOpen(value => !value)
    }

    const onLinkClick = !isLoading && !isOpen ? onToggle : undefined

    return (
        <>
            <Item isLoading={isLoading} item={item} onClick={onLinkClick}>
                <Chevron className={styles.toggle} open={isOpen} onClick={onToggle} />
                {item.title}
            </Item>
            {isOpen && children}
        </>
    )
}
