import { useState } from 'react'
import { type MenuItem, type PageId, type SectionHighlight } from '../../../features/toc'
import { useIsLoading, useMenuItems } from '../Context/hooks'
import { Item } from '../Item/Item'

type SectionProps = {
    parentId: PageId
    level: number
    highlight?: SectionHighlight
}

type SubMenuProps = {
    item: MenuItem
    level: number
    isLoading: boolean
}

export function Section({ parentId, level, highlight }: SectionProps): JSX.Element {
    const isLoading = useIsLoading()
    const items = useMenuItems(parentId, level, highlight)

    return (
        <>
            {items.map((item) => {
                if (!item.hasChildren) {
                    return (<Item isLoading={isLoading} key={item.id} item={item} />)
                }

                return (
                    <SubMenu isLoading={isLoading} key={item.id} item={item} level={level + 1} />
                )
            })}
        </>
    )
}

function SubMenu({ item, level, isLoading }: SubMenuProps): JSX.Element {
    const subMenuHighlight = item.highlight === 'active' ? 'child' : item.highlight
    const [ isOpen, setOpen ]  = useState(isLoading ? true : item.defaultOpenState)

    const onToggle = () => {
        setOpen(value => !value)
    }

    return (
        <>
            <Item
                hasChildren
                isLoading={isLoading}
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
