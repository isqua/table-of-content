import clsx from 'clsx'
import { useRef, useState, type PropsWithChildren } from 'react'

import { Chevron } from '../../../../../components/Chevron'
import { OptionalLink } from '../../../../../components/OptionalLink'
import { Skeleton } from '../../../../../components/Skeleton'
import { HeightTransition } from '../../../../../components/Transitions'
import type { MenuItem } from '../../../types'
import { useIsLoading } from '../Context/hooks'

import styles from './Item.module.css'

type ItemProps = PropsWithChildren<{
    /** The item :) */
    item: MenuItem
    /** OnClick handler, e.g. expand/collapse the section */
    onClick?: () => void
    /** Show the component; triggers the enter or exit states for the animation */
    isVisible?: boolean
}>

type ItemToggleProps = {
    /** The item */
    item: MenuItem
    /** ReactChildren to show when item is opened */
    children: (isOpen: boolean) => JSX.Element
    /** Show the component; triggers the enter or exit states for the animation */
    isVisible: boolean
    /** Is it allowed to change the toggle state */
    isDisabled?: boolean
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

export function ItemToggle({ item, children, isDisabled, isVisible }: ItemToggleProps): JSX.Element {
    const isLoading = useIsLoading()
    const [ isOpen, setOpen ]  = useState(item.defaultOpenState)

    const onToggle = () => {
        setOpen(value => !value)
    }

    const hasUrl = Boolean(item.url)
    /**
     * While the menu is loading, it makes no sense to collapse and expand the items. So forbid them to collapse.
     * Also, when using the search, it is not necessary to collapse the items, because the search result may be
     * a leaf of the tree. So forbid collapsing items in search mode too.
     */
    const shouldBeForciblyOpened = isLoading || isDisabled
    const shouldShowChildren = shouldBeForciblyOpened || isOpen && isVisible
    const shouldPreventClose = shouldBeForciblyOpened || isOpen && hasUrl
    const onLinkClick = shouldPreventClose ? undefined : onToggle

    return (
        <>
            <Item item={item} onClick={onLinkClick} isVisible={isVisible}>
                <Chevron className={styles.toggle} open={shouldShowChildren} onClick={onToggle} />
                {item.title}
            </Item>
            {children(shouldShowChildren)}
        </>
    )
}
