import type { PageDescriptor, TableOfContent } from '../types'

import { isTextMatch } from './isTextMatch'

/**
 * Filter TOC by the search string.
 * The page is considering suitable, if it or one of its descendants matches the text
 *
 * @param toc The TOC to be filtered
 * @param search The string to find in pages titles
 * @returns Set of pages that should be presented in the search results
 */
export const filterTreeNodes = (toc: TableOfContent, search: string): Set<PageDescriptor> => {
    const filterResult = new Set<PageDescriptor>()
    const normalizedSearch = search.toLocaleLowerCase()

    for (const page of Object.values(toc.entities.pages)) {
        if (page && isTextMatch(page.title, normalizedSearch)) {

            let currentPage: PageDescriptor | undefined = page

            while (currentPage && toc.entities.pages[currentPage.id] && !filterResult.has(currentPage)) {
                filterResult.add(currentPage)

                currentPage = toc.entities.pages[currentPage.parentId]
            }
        }
    }

    return filterResult
}
