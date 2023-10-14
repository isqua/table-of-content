import { useContext } from 'react'
import { buildMenu } from '../../../features/toc'
import { LocationContext, TocContext } from './contexts'

export const useMenuItems = (parentId: string = '', level: number = 0) => {
    const toc = useContext(TocContext)
    const currentUrl = useContext(LocationContext)

    const items = buildMenu(toc, {
        url: currentUrl,
        parentId,
        level,
    })

    return items
}
