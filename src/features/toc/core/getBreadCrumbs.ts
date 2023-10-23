import type { PageDescriptor, PageURL, PageId, TableOfContent } from '../types'
import { getCurrentPage } from './getCurrentPage'

export const getBreadCrumbs = (toc: TableOfContent, url?: PageURL): PageDescriptor[] => {
    const breadcrumbs: PageDescriptor[] = []

    // We trust the API, but not completely
    const visitedIds = new Set<PageId>()

    if (!url) {
        return breadcrumbs
    }

    let currentPage: PageDescriptor | undefined = getCurrentPage(toc, url)

    while (currentPage && toc.entities.pages[currentPage.id] && !visitedIds.has(currentPage.id)) {
        breadcrumbs.push(currentPage)
        visitedIds.add(currentPage.id)

        currentPage = toc.entities.pages[currentPage.parentId]
    }

    return breadcrumbs.reverse()
}