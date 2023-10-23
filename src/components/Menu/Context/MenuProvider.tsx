import { type PropsWithChildren } from 'react'
import { getBreadCrumbs, type PageURL, type TableOfContent } from '../../../features/toc'
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
