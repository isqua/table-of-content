import type { PropsWithChildren } from 'react'
import { useFilter } from '../../../../../hooks/useFilter'
import { filterTreeNodes } from '../../../core/filterTreeNodes'
import { getBreadCrumbs } from '../../../core/getBreadCrumbs'
import type { PageURL, TableOfContent } from '../../../types'
import { FilterContext, LocationContext, TocContext } from './contexts'

type MenuProviderProps = PropsWithChildren<{
    toc: TableOfContent
    url: PageURL
    isLoading?: boolean
}>

export function MenuProvider({ toc, url, children, isLoading = false }: MenuProviderProps): JSX.Element {
    const breadcrumbs = getBreadCrumbs(toc, url)
    const tocContextValue = { toc, isLoading }
    const locationContextValue = { url, breadcrumbs }
    const filterContextValue = useFilter((text) => filterTreeNodes(toc, text))

    return (
        <TocContext.Provider value={tocContextValue}>
            <LocationContext.Provider value={locationContextValue}>
                <FilterContext.Provider value={filterContextValue}>
                    {children}
                </FilterContext.Provider>
            </LocationContext.Provider>
        </TocContext.Provider>
    )
}
