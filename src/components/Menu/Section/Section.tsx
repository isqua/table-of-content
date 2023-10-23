import { useState } from 'react'
import { type MenuItem, type PageId } from '../../../features/toc'
import { useTopLevelHighlightedPage, useMenuItems } from '../Context/hooks'
import { Item } from '../Item/Item'

type SectionProps = {
    parentId: PageId
    level: number
    relationToActiveItem?: 'parent' | 'child'
}

type SubMenuProps = {
    item: MenuItem
    level: number
    relationToActiveItem: 'parent' | 'child' | undefined
}

export function Section({ parentId, level, relationToActiveItem }: SectionProps): JSX.Element {
    const items = useMenuItems(parentId, level)
    const topLevelHighlightedPage = useTopLevelHighlightedPage()

    return (
        <>
            {items.map((item) => {
                const itemsRelation = topLevelHighlightedPage === item.id ? 'parent' : relationToActiveItem

                if (!item.hasChildren) {
                    return (<Item relationToActiveItem={itemsRelation} key={item.id} item={item} />)
                }

                return (
                    <SubMenu relationToActiveItem={itemsRelation} key={item.id} item={item} level={level + 1} />
                )
            })}
        </>
    )
}

function SubMenu({ item, level, relationToActiveItem }: SubMenuProps): JSX.Element {
    const subItemRelation = item.isActive ? 'child' : relationToActiveItem
    const [ isOpen, setOpen ]  = useState(false)

    const onToggle = () => {
        setOpen(value => !value)
    }

    return (
        <>
            <Item
                hasChildren
                relationToActiveItem={relationToActiveItem}
                item={item}
                open={isOpen}
                onToggle={onToggle}
            />
            {isOpen && (
                <Section relationToActiveItem={subItemRelation} parentId={item.id} level={level} />
            )}
        </>
    )
}
