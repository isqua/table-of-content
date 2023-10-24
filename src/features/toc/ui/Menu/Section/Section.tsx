import type { PageId, SectionHighlight } from '../../../types'
import { useSectionItems } from '../Context/hooks'
import { Item, ItemToggle } from '../Item/Item'

type SectionProps = {
    parentId: PageId
    level: number
    highlight?: SectionHighlight
}

export function Section({ parentId, level, highlight }: SectionProps): JSX.Element {
    const items = useSectionItems(parentId, level, highlight)

    return (
        <>
            {items.map((item) => {
                if (!item.hasChildren) {
                    return (
                        <Item key={item.id} item={item}>
                            {item.title}
                        </Item>
                    )
                }

                const subMenuHighlight = item.highlight === 'active' ? 'child' : item.highlight

                return (
                    <ItemToggle key={item.id} item={item}>
                        <Section highlight={subMenuHighlight} parentId={item.id} level={level + 1} />
                    </ItemToggle>
                )
            })}
        </>
    )
}
