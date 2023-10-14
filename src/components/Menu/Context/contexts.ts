import { createContext } from 'react'
import { type PageURL, type TableOfContent } from '../../../features/toc'

const defaultToc: TableOfContent = {
    topLevelIds: [],
    entities: { pages: {} },
}

const defaultUrl = '/'

export const TocContext = createContext<TableOfContent>(defaultToc)
export const LocationContext = createContext<PageURL>(defaultUrl)
