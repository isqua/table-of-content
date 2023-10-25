import clsx from 'clsx'
import { useEffect, useRef, useState, type PropsWithChildren } from 'react'

import { Chevron } from '../../../../../components/Chevron'
import { OptionalLink } from '../../../../../components/OptionalLink'
import { Skeleton } from '../../../../../components/Skeleton'
import { HeightTransition } from '../../../../../components/Transitions'
import type { MenuItem } from '../../../types'
import { useIsLoading } from '../Context/hooks'

import styles from './Item.module.css'

type ItemProps = PropsWithChildren<{
    item: MenuItem
    onClick?: () => void
    isVisible?: boolean
}>

type ItemToggleProps = {
    item: MenuItem
    children: (isOpen: boolean) => JSX.Element
    isVisible?: boolean
}

const INDENT_LEVEL_LIMIT = 6

// the height of a one-line menu item
const MIN_ITEM_HEIGHT = 38

const highlightStyles = {
    active: styles.active,
    parent: styles.parent,
    child: styles.child,
}

const transitionClassNames = {
    enter: styles['transition-enter'],
    enterActive: styles['transition-enter-active'],
    exit: styles['transition-exit'],
    exitActive: styles['transition-exit-active'],
}

function getItemHighlightStyles(item: MenuItem): string | undefined {
    return item.highlight && highlightStyles[item.highlight]
}

export function Item(props: ItemProps): JSX.Element {
    const { item, children, onClick, isVisible = true } = props
    const isLoading = useIsLoading()
    const itemUrl = isLoading ? '' : item.url
    const ariaLevel = Math.min(item.level + 1, INDENT_LEVEL_LIMIT)
    const itemRef = useRef<HTMLLIElement>(null)

    const linkClassName = clsx(
        styles.link,
        isLoading && styles.disabled,
        !isLoading && getItemHighlightStyles(item),
    )

    return (
        <HeightTransition
            nodeRef={itemRef}
            isVisible={isVisible}
            minHeight={MIN_ITEM_HEIGHT}
            classNames={transitionClassNames}
        >
            <li ref={itemRef} className={styles.item} aria-level={ariaLevel}>
                <OptionalLink to={itemUrl} className={linkClassName} onClick={onClick}>
                    <span className={styles.text}>
                        {isLoading ?
                            <Skeleton className={styles.loader} /> :
                            children
                        }
                    </span>
                </OptionalLink>
            </li>
        </HeightTransition>
    )
}

export function ItemToggle({ item, children, isVisible }: ItemToggleProps): JSX.Element {
    const isLoading = useIsLoading()
    const [ isOpen, setOpen ]  = useState(item.defaultOpenState)

    const onToggle = () => {
        setOpen(value => !value)
    }

    const hasUrl = Boolean(item.url)
    const shouldPreventClose = isLoading || hasUrl && isOpen
    const onLinkClick = shouldPreventClose ? undefined : onToggle

    useEffect(() => {
        setOpen(item.defaultOpenState)
    }, [item.defaultOpenState])

    const shouldShowChildren = isLoading || Boolean(isOpen && isVisible)

    return (
        <>
            <Item item={item} onClick={onLinkClick} isVisible={isVisible}>
                <Chevron className={styles.toggle} open={isOpen} onClick={onToggle} />
                {item.title}
            </Item>
            {children(shouldShowChildren)}
        </>
    )
}
