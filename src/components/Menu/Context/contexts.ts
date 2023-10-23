import { createContext } from 'react'
import { type PageDescriptor, type PageURL, type TableOfContent } from '../../../features/toc'

type LocationContextValue = {
    url: PageURL
    breadcrumbs: PageDescriptor[]
}

const defaultToc: TableOfContent = {
    topLevelIds: [],
    entities: { pages: {} },
}

const defaultUrl = '/'
const defaultBreadCrumbs: PageDescriptor[] = []

export const TocContext = createContext<TableOfContent>(defaultToc)
export const LocationContext = createContext<LocationContextValue>({
    url: defaultUrl,
    breadcrumbs: defaultBreadCrumbs,
})
