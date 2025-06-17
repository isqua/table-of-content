import type { ReactNode } from 'react'
import type { PageId, SectionHighlight } from '../../../types'
import { useSectionItems } from '../Context/hooks'
import { Item, ItemToggle } from '../Item/Item'

interface SectionProps {
    /** ID of the page whose children we want to render */
    parentId: PageId
    /** The level of the current section */
    level: number
    /** The relation of the section to the active page for proper highlighting */
    highlight?: SectionHighlight
    /** Show the component; triggers the enter or exit states for the animation */
    isVisible?: boolean
}

/**
 * Displays a list of menu items at one level. If the element has children,
 * will display it with a chevron (ItemToggle) and pass the child items to it,
 * rendering a nested Section recursively.
 */
export function Section({ parentId, level, highlight, isVisible = true }: SectionProps): ReactNode {
    const { items, isFiltered } = useSectionItems(parentId, level, highlight)

    return (
        <>
            {items.map((item) => {
                if (!item.hasChildren) {
                    return (
                        <Item key={item.id} item={item} isVisible={isVisible}>
                            {item.title}
                        </Item>
                    )
                }

                return (
                    <ItemToggle key={item.id} item={item} isVisible={isVisible} isDisabled={isFiltered}>
                        {
                            /**
                             * The HeightTransition component manage element mount/unmount itself,
                             * based on the isVisible flag. So we do not need to conditionally rerender component,
                             * instead we have to just pass the isVisible flag
                             */
                            (isOpen: boolean, highlight: SectionHighlight) => (
                                <Section
                                    isVisible={isOpen}
                                    highlight={highlight}
                                    parentId={item.id}
                                    level={level + 1}
                                />
                            )
                        }
                    </ItemToggle>
                )
            })}
        </>
    )
}
