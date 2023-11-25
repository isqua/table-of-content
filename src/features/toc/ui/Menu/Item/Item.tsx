import clsx from 'clsx'
import { useRef, useState, type PropsWithChildren } from 'react'

import { Chevron } from '../../../../../components/Chevron'
import { OptionalLink } from '../../../../../components/OptionalLink'
import { Skeleton } from '../../../../../components/Skeleton'
import { HeightTransition } from '../../../../../components/Transitions'
import type { MenuItem, SectionHighlight } from '../../../types'
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
    children: (isOpen: boolean, highlight?: SectionHighlight) => JSX.Element
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

/**
 * Renders a single page in a menu with animation and highlighting.
 * Some pages doesn’t have an url, so wrapping content in OptionalLink.
 * OptionalLink would wrap a page in an anchor if it has URL,
 * otherwise a whole page would be clickable for toggling nested tree
 */
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

/**
 * Renders a collapsing menu item. Holds its own state to avoid rerendering of the whole tree
 * when toggling a specific item.
 *
 * Takes care about highlighting. Ancestors of the active item should be
 * highlighted in one color and its descendants in another.
 */
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

    /**
     * If the current item is the active one, we should switch the highlight mode
     * and color all its descendants as children. Otherwise, use the same highlight mode ("parent" or none)
     */
    const childrenHighlight = item.highlight === 'active' ? 'child' : item.highlight

    return (
        <>
            <Item item={item} onClick={onLinkClick} isVisible={isVisible}>
                <Chevron className={styles.toggle} open={shouldShowChildren} onClick={onToggle} />
                {item.title}
            </Item>
            {children(shouldShowChildren, childrenHighlight)}
        </>
    )
}
