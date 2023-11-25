import { useCallback, type PropsWithChildren } from 'react'
import { useFilter } from '../../../../../hooks/useFilter'
import { filterTreeNodes } from '../../../core/filterTreeNodes'
import { getBreadCrumbs } from '../../../core/getBreadCrumbs'
import type { PageURL, TableOfContent } from '../../../types'
import { FilterContext, TocContext } from './contexts'

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

    const { data: filter, manager: filterContextValue } = useFilter(filterCallback)

    const tocContextValue = {
        url,
        toc,
        breadcrumbs: getBreadCrumbs(toc, url),
        filter,
        isLoading,
    }

    return (
        <TocContext.Provider value={tocContextValue}>
            <FilterContext.Provider value={filterContextValue}>
                {children}
            </FilterContext.Provider>
        </TocContext.Provider>
    )
}
