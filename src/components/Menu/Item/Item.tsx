import clsx from 'clsx'
import { useState, type PropsWithChildren } from 'react'

import type { MenuItem } from '../../../features/toc'
import { Chevron } from '../../Chevron'
import { OptionalLink } from '../../OptionalLink'
import { Skeleton } from '../../Skeleton'
import { useIsLoading } from '../Context/hooks'

import styles from './Item.module.css'

type ItemProps = PropsWithChildren<{
    item: MenuItem
    onClick?: () => void
}>

type ItemToggleProps = PropsWithChildren<{
    item: MenuItem
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
    const isLoading = useIsLoading()
    const { item, children, onClick } = props

    const linkClassName = clsx(
        styles.link,
        !isLoading && getItemHighlightStyles(item),
    )

    const ariaLevel = Math.min(item.level + 1, INDENT_LEVEL_LIMIT)

    const itemUrl = isLoading ? '' : item.url

    return (
        <li className={styles.item} aria-level={ariaLevel}>
            <OptionalLink to={itemUrl} className={linkClassName} onClick={onClick}>
                <span className={styles.text}>
                    {isLoading ?
                        <Skeleton className={styles.loader} /> :
                        children
                    }
                </span>
            </OptionalLink>
        </li>
    )
}

export function ItemToggle({ item, children }: ItemToggleProps): JSX.Element {
    const isLoading = useIsLoading()
    const [ isOpen, setOpen ]  = useState(isLoading ? true : item.defaultOpenState)

    const onToggle = () => {
        setOpen(value => !value)
    }

    const onLinkClick = !isLoading && !isOpen ? onToggle : undefined

    return (
        <>
            <Item item={item} onClick={onLinkClick}>
                <Chevron className={styles.toggle} open={isOpen} onClick={onToggle} />
                {item.title}
            </Item>
            {isOpen && children}
        </>
    )
}
