export type PageId = string
export type PageURL = string

export type PageDescriptor = {
    id: PageId
    title: string
    parentId: PageId
    url?: PageURL
    pages?: PageId[]
}

export type PagesIndex = Record<PageId, PageDescriptor | undefined>

export type SectionHighlight = 'parent' | 'child' | undefined

export type PageHighlight = 'active' | SectionHighlight

export type TableOfContent = {
    entities: {
        pages: PagesIndex,
    },
    topLevelIds: PageId[]
}

export type MenuItem = {
    id: PageId
    parentId: PageId
    url: PageURL
    title: string
    level: number
    highlight: PageHighlight
    hasChildren: boolean
    defaultOpenState: boolean
}
