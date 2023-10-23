import clsx from 'clsx'
import { useState, type PropsWithChildren } from 'react'

import { Chevron } from '../../../../../components/Chevron'
import { OptionalLink } from '../../../../../components/OptionalLink'
import { Skeleton } from '../../../../../components/Skeleton'
import type { MenuItem } from '../../../types'
import { useIsLoading } from '../Context/hooks'

import styles from './Item.module.css'

type ItemProps = PropsWithChildren<{
    item: MenuItem
    onClick?: () => void
}>

type ItemToggleProps = PropsWithChildren<{
    item: MenuItem
}>

const INDENT_LEVEL_LIMIT = 6

const highlightStyles = {
    active: styles.active,
    parent: styles.parent,
    child: styles.child,
}

function getItemHighlightStyles(item: MenuItem): string | undefined {
    return item.highlight && highlightStyles[item.highlight]
}

export function Item(props: ItemProps): JSX.Element {
    const { item, children, onClick } = props
    const isLoading = useIsLoading()
    const itemUrl = isLoading ? '' : item.url
    const ariaLevel = Math.min(item.level + 1, INDENT_LEVEL_LIMIT)

    const linkClassName = clsx(
        styles.link,
        !isLoading && getItemHighlightStyles(item),
    )

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