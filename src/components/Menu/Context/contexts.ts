import { createContext } from 'react'
import { PageId, type PageURL, type TableOfContent } from '../../../features/toc'

type LocationContextValue = {
    url: PageURL
    topLevelHighlightedPage: PageId
}

const defaultToc: TableOfContent = {
    topLevelIds: [],
    entities: { pages: {} },
}

const defaultUrl = '/'
const defaultTopLevelHighlightedPage = ''

export const TocContext = createContext<TableOfContent>(defaultToc)
export const LocationContext = createContext<LocationContextValue>({
    url: defaultUrl,
    topLevelHighlightedPage: defaultTopLevelHighlightedPage,
})
