import { useCallback } from 'react'
import { useRequestWithPlaceholder } from '../../../hooks/useRequestWithPlaceholder'
import type { PageDescriptor, PageId, TableOfContent } from '../types'

function getPagePlaceholder(id: PageId, parentId: PageId, pages: PageId[] = []): PageDescriptor {
    return {
        id,
        parentId,
        title: '',
        pages,
    }
}

const PLACEHOLDER: TableOfContent = {
    entities: {
        pages: {
            p0: getPagePlaceholder('p0', '', ['p01', 'p02', 'p03']),
            p01: getPagePlaceholder('p01', 'p0'),
            p02: getPagePlaceholder('p02', 'p0', ['p021', 'p022']),
            p021: getPagePlaceholder('p021', 'p02'),
            p022: getPagePlaceholder('p022', 'p02'),
            p03: getPagePlaceholder('p03', 'p0'),
            p1: getPagePlaceholder('p1', ''),
            p2: getPagePlaceholder('p2', ''),
        }
    },
    topLevelIds: [
        'p0',
        'p1',
        'p2'
    ]
}

async function fetchToc(url: string): Promise<TableOfContent> {
    const res = await fetch(url)

    return res.json() as Promise<TableOfContent>
}

export function useGetTocQuery(url: string) {
    const callback = useCallback(() => fetchToc(url), [url])

    return useRequestWithPlaceholder<TableOfContent>(callback, PLACEHOLDER)
}
