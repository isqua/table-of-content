import { type PropsWithChildren } from 'react'
import { getBreadCrumbs, type PageURL, type TableOfContent } from '../../../features/toc'
import { LocationContext, TocContext } from './contexts'

type MenuProviderProps = PropsWithChildren<{
    toc: TableOfContent
    url: PageURL
}>

export function MenuProvider({ toc, url, children }: MenuProviderProps): JSX.Element {
    const breadcrumbs = getBreadCrumbs(toc, url)
    const locationContextValue = { url, breadcrumbs }

    return (
        <TocContext.Provider value={toc}>
            <LocationContext.Provider value={locationContextValue}>
                {children}
            </LocationContext.Provider>
        </TocContext.Provider>
    )
}
