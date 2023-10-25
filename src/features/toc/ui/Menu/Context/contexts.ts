import { createContext } from 'react'

import { FilterActions, noopFilterActions } from '../../../../../hooks/useFilter'
import type { PageDescriptor, PageURL, TableOfContent } from '../../../types'

type TocContextValue = {
    toc: TableOfContent
    filter: Set<PageDescriptor> | null
    isLoading: boolean
}

type LocationContextValue = {
    url: PageURL
    breadcrumbs: PageDescriptor[]
}

type FilterContextValue = FilterActions & {
    isFiltering: boolean
}

const defaultToc: TableOfContent = {
    topLevelIds: [],
    entities: { pages: {} },
}

const defaultUrl = '/'
const defaultBreadCrumbs: PageDescriptor[] = []

export const TocContext = createContext<TocContextValue>({
    toc: defaultToc,
    filter: null,
    isLoading: true,
})

TocContext.displayName = 'TocContext'

export const LocationContext = createContext<LocationContextValue>({
    url: defaultUrl,
    breadcrumbs: defaultBreadCrumbs,
})

LocationContext.displayName = 'LocationContext'

export const FilterContext = createContext<FilterContextValue>({
    isFiltering: false,
    ...noopFilterActions
})

FilterContext.displayName = 'FilterContext'
