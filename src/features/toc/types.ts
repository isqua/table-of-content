export type PageId = string
export type PageURL = string

export type PageDescriptor = {
    id: PageId
    title: string
    parentId: PageId
    url?: PageURL
    pages?: PageId[]
}

export type PagesIndex = Record<PageId, PageDescriptor>

export type TableOfContent = {
    entities: {
        pages: PagesIndex,
    },
    topLevelIds: PageId[]
}

export type MenuItem = {
    id: PageId
    parentId: PageId
    url?: PageURL
    title: string
    isActive?: boolean
}
