import type { PageDescriptor, PageId, PageURL, TableOfContent } from '../types'
import { getCurrentPage } from './getCurrentPage'

export const getTopHighlightedPage = (toc: TableOfContent, url: PageURL) => {
    // We trust the API, but not completely
    const visitedIds = new Set<PageId>()

    let currentPage: PageDescriptor | undefined = getCurrentPage(toc, url)

    while (currentPage && toc.entities.pages[currentPage.parentId] && !visitedIds.has(currentPage.parentId)) {
        visitedIds.add(currentPage.parentId)

        currentPage = toc.entities.pages[currentPage.parentId]
    }

    return currentPage?.id ?? ''
}
