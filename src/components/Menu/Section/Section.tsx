import { useState } from 'react'
import { type MenuItem, type PageId, type SectionHighlight } from '../../../features/toc'
import { useMenuItems } from '../Context/hooks'
import { Item } from '../Item/Item'

type SectionProps = {
    parentId: PageId
    level: number
    highlight?: SectionHighlight
}

type SubMenuProps = {
    item: MenuItem
    level: number
}

export function Section({ parentId, level, highlight }: SectionProps): JSX.Element {
    const items = useMenuItems(parentId, level, highlight)

    return (
        <>
            {items.map((item) => {
                if (!item.hasChildren) {
                    return (<Item key={item.id} item={item} />)
                }

                return (
                    <SubMenu key={item.id} item={item} level={level + 1} />
                )
            })}
        </>
    )
}

function SubMenu({ item, level }: SubMenuProps): JSX.Element {
    const subMenuHighlight = item.highlight === 'active' ? 'child' : item.highlight
    const [ isOpen, setOpen ]  = useState(item.defaultOpenState)

    const onToggle = () => {
        setOpen(value => !value)
    }

    return (
        <>
            <Item
                hasChildren
                item={item}
                open={isOpen}
                onToggle={onToggle}
            />
            {isOpen && (
                <Section highlight={subMenuHighlight} parentId={item.id} level={level} />
            )}
        </>
    )
}
