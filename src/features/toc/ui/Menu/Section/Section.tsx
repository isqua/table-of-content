import type { PageId, SectionHighlight } from '../../../types'
import { useSectionItems } from '../Context/hooks'
import { Item, ItemToggle } from '../Item/Item'

type SectionProps = {
    parentId: PageId
    level: number
    highlight?: SectionHighlight
    isVisible?: boolean
}

export function Section({ parentId, level, highlight, isVisible = true }: SectionProps): JSX.Element {
    const items = useSectionItems(parentId, level, highlight)

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
                    <ItemToggle key={item.id} item={item} isVisible={isVisible}>
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
