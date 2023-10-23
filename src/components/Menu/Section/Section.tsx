import { type PageId, type SectionHighlight } from '../../../features/toc'
import { useIsLoading, useMenuItems } from '../Context/hooks'
import { Item, ItemToggle } from '../Item/Item'

type SectionProps = {
    parentId: PageId
    level: number
    highlight?: SectionHighlight
}

export function Section({ parentId, level, highlight }: SectionProps): JSX.Element {
    const isLoading = useIsLoading()
    const items = useMenuItems(parentId, level, highlight)

    return (
        <>
            {items.map((item) => {
                if (!item.hasChildren) {
                    return (
                        <Item isLoading={isLoading} key={item.id} item={item}>
                            {item.title}
                        </Item>
                    )
                }

                const subMenuHighlight = item.highlight === 'active' ? 'child' : item.highlight

                return (
                    <ItemToggle isLoading={isLoading} key={item.id} item={item}>
                        <Section highlight={subMenuHighlight} parentId={item.id} level={level + 1} />
                    </ItemToggle>
                )
            })}
        </>
    )
}
