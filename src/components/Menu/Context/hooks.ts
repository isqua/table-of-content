import { useContext } from 'react'
import { PageId, buildMenu } from '../../../features/toc'
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

export const useTopLevelHighlightedPage = () => {
    const currentLocation = useContext(LocationContext)

    return currentLocation.topLevelHighlightedPage
}
