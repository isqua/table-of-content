import { Fragment } from 'react'
import { type PageId } from '../../../features/toc'
import { useMenuItems } from '../Context/hooks'
import { Item } from '../Item/Item'

type SectionProps = {
    parentId: PageId
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
                    <Fragment key={item.id}>
                        <Item item={item} />
                        <Section parentId={item.id} level={level + 1} />
                    </Fragment>
                )
            })}
        </>
    )
}
