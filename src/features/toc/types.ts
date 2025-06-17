export type PageId = string
export type PageURL = string

/**
 * Page descriptor from the API data
 */
export interface PageDescriptor {
    id: PageId
    title: string
    parentId: PageId
    url?: PageURL
    pages?: PageId[]
}

/**
 * An index of pages by its id
 */
export type PagesIndex = Record<PageId, PageDescriptor | undefined>

export type SectionHighlight = 'parent' | 'child' | undefined

export type PageHighlight = 'active' | SectionHighlight

/**
 * The root object we take from the API
 */
export interface TableOfContent {
    entities: {
        pages: PagesIndex,
    },
    topLevelIds: PageId[]
}

/**
 * The model of an item for the menu, containing all the data to render it
 */
export interface MenuItem {
    id: PageId
    parentId: PageId
    url: PageURL
    title: string
    level: number
    highlight: PageHighlight
    hasChildren: boolean
    defaultOpenState: boolean
}
