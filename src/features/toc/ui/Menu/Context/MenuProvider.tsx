import type { PropsWithChildren } from 'react'
import { getBreadCrumbs } from '../../../core/getBreadCrumbs'
import type { PageURL, TableOfContent } from '../../../types'
import { LocationContext, TocContext } from './contexts'

type MenuProviderProps = PropsWithChildren<{
    toc: TableOfContent
    url: PageURL
    isLoading?: boolean
}>

export function MenuProvider({ toc, url, children, isLoading = false }: MenuProviderProps): JSX.Element {
    const breadcrumbs = getBreadCrumbs(toc, url)
    const tocContextValue = { toc, isLoading }
    const locationContextValue = { url, breadcrumbs }

    return (
        <TocContext.Provider value={tocContextValue}>
            <LocationContext.Provider value={locationContextValue}>
                {children}
            </LocationContext.Provider>
        </TocContext.Provider>
    )
}
