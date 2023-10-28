import { useCallback, useMemo, type PropsWithChildren } from 'react'
import { useFilter } from '../../../../../hooks/useFilter'
import { filterTreeNodes } from '../../../core/filterTreeNodes'
import { getBreadCrumbs } from '../../../core/getBreadCrumbs'
import type { PageURL, TableOfContent } from '../../../types'
import { FilterContext, LocationContext, TocContext } from './contexts'

type MenuProviderProps = PropsWithChildren<{
    /** The whole TOC tree */
    toc: TableOfContent
    /** Current URL */
    url: PageURL
    /** Is the TOC loading */
    isLoading?: boolean
}>

export function MenuProvider({ toc, url, children, isLoading = false }: MenuProviderProps): JSX.Element {
    const filterCallback = useCallback(
        (text: string) => filterTreeNodes(toc, text),
        [toc]
    )

    const { data, manager: filterContextValue } = useFilter(filterCallback)

    const tocContextValue = useMemo(
        () => ({ toc, filter: data, isLoading }),
        [toc, data, isLoading],
    )

    const locationContextValue = useMemo(
        () => ({ url, breadcrumbs: getBreadCrumbs(toc, url) }),
        [toc, url]
    )

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
