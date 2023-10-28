import type { PageId, SectionHighlight } from '../../../types'
import { useSectionItems } from '../Context/hooks'
import { Item, ItemToggle } from '../Item/Item'

type SectionProps = {
    /** ID of the page whose children we want to render */
    parentId: PageId
    /** The level of the current section */
    level: number
    /** The relation of the section to the active page for proper highlighting */
    highlight?: SectionHighlight
    /** Show the component; triggers the enter or exit states for the animation */
    isVisible?: boolean
}

export function Section({ parentId, level, highlight, isVisible = true }: SectionProps): JSX.Element {
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

                const subMenuHighlight = item.highlight === 'active' ? 'child' : item.highlight

                return (
                    <ItemToggle key={item.id} item={item} isVisible={isVisible} isDisabled={isFiltered}>
                        {(isOpen: boolean) => (
                            <Section
                                isVisible={isOpen}
                                highlight={subMenuHighlight}
                                parentId={item.id}
                                level={level + 1}
                            />
                        )}
                    </ItemToggle>
                )
            })}
        </>
    )
}
