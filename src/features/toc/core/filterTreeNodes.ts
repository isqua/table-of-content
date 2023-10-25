import type { PageDescriptor, TableOfContent } from '../types'

import { isTextMatch } from './isTextMatch'

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
