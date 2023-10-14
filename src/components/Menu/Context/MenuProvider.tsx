import { type PropsWithChildren } from 'react'
import { type PageURL, type TableOfContent } from '../../../features/toc'
import { TocContext, LocationContext } from './contexts'

type MenuProviderProps = PropsWithChildren<{
    toc: TableOfContent
    url: PageURL
}>

export function MenuProvider({ toc, url, children }: MenuProviderProps): JSX.Element {
    return (
        <TocContext.Provider value={toc}>
            <LocationContext.Provider value={url}>
                {children}
            </LocationContext.Provider>
        </TocContext.Provider>
    )
}
