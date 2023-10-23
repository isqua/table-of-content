import { createContext } from 'react'
import { type PageDescriptor, type PageURL, type TableOfContent } from '../../../features/toc'

type TocContextValue = {
    toc: TableOfContent
    isLoading: boolean
}

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

export const TocContext = createContext<TocContextValue>({
    toc: defaultToc,
    isLoading: true,
})

export const LocationContext = createContext<LocationContextValue>({
    url: defaultUrl,
    breadcrumbs: defaultBreadCrumbs,
})
