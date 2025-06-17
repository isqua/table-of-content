import { useCallback, type PropsWithChildren, type ReactNode } from 'react'
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

/**
 * Takes the data needed to render the menu and creates two contexts:
 *
 * * `TocContext` contains data for the menu tree, and changing it causes the menu to rerender.
 * This is only needed when filtering or switching a page.
 *
 * * `FilterContext` contains methods and data for the filter input.
 * Changing the context only causes the input to rerender.
 */
export function MenuProvider({ toc, url, children, isLoading = false }: MenuProviderProps): ReactNode {
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
