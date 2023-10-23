import { useContext } from 'react'
import { buildMenu, type PageId, type SectionHighlight } from '../../../features/toc'
import { LocationContext, TocContext } from './contexts'

export const useMenuItems = (parentId: PageId = '', level: number = 0, highlight: SectionHighlight) => {
    const { toc } = useContext(TocContext)
    const currentLocation = useContext(LocationContext)

    const items = buildMenu(toc, {
        url: currentLocation.url,
        breadcrumbs: currentLocation.breadcrumbs,
        parentId,
        level,
        highlight,
    })

    return items
}

export const useIsLoading = () => {
    const { isLoading } = useContext(TocContext)

    return isLoading
}
