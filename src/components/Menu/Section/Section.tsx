import { useState } from 'react'
import { type MenuItem, type PageId } from '../../../features/toc'
import { useMenuItems } from '../Context/hooks'
import { Item } from '../Item/Item'

type SectionProps = {
    parentId: PageId
    level: number
}

type SubMenuProps = {
    item: MenuItem
    level: number
}

export function Section({ parentId, level }: SectionProps): JSX.Element {
    const items = useMenuItems(parentId, level)

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
    const [ isOpen, setOpen ]  = useState(false)

    const onToggle = () => {
        setOpen(value => !value)
    }

    return (
        <>
            <Item hasChildren item={item} open={isOpen} onToggle={onToggle} />
            {isOpen && (<Section parentId={item.id} level={level} />)}
        </>
    )
}
