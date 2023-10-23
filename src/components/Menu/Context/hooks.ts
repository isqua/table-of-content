import { useContext } from 'react'
import { buildMenu, type PageId } from '../../../features/toc'
import { LocationContext, TocContext } from './contexts'

export const useMenuItems = (parentId: PageId = '', level: number = 0) => {
    const toc = useContext(TocContext)
    const currentLocation = useContext(LocationContext)

    const items = buildMenu(toc, {
        url: currentLocation.url,
        parentId,
        level,
    })

    return items
}

export const useTopLevelHighlightedPage = (): string => {
    const currentLocation = useContext(LocationContext)

    return currentLocation.breadcrumbs[0]?.id ?? ''
}
