import { createContext } from 'react'

import { FilterActions, noopFilterActions } from '../../../../../hooks/useFilter'
import type { PageDescriptor, PageURL, TableOfContent } from '../../../types'

type TocContextValue = {
    url: PageURL
    toc: TableOfContent
    breadcrumbs: PageDescriptor[]
    filter: Set<PageDescriptor> | null
    isLoading: boolean
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
    url: defaultUrl,
    toc: defaultToc,
    breadcrumbs: defaultBreadCrumbs,
    filter: null,
    isLoading: true,
})

TocContext.displayName = 'TocContext'

export const FilterContext = createContext<FilterContextValue>({
    isFiltering: false,
    ...noopFilterActions
})

FilterContext.displayName = 'FilterContext'
