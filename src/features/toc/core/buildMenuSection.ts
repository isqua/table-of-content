import type { MenuItem, PageDescriptor, PageHighlight, PageId, PageURL, SectionHighlight, TableOfContent } from '../types'

type BuildMenuBaseOptions = {
    /**
     * Current page URL to highlight in the menu
     * If it is necessary to pass ID instead of URL, then we will need to replace this field with ID
     */
    url: PageURL
    /** Current page ancestors */
    breadcrumbs: PageDescriptor[]
    /** Items that match the search filter and its ancestors */
    filter?: Set<PageDescriptor> | null
}

type BuildMenuTopLevelOptions = BuildMenuBaseOptions

type BuildMenuNestingOptions = BuildMenuBaseOptions & {
    /** ID of the page whose children we want to render */
    parentId: string
    /** The level of current menu items */
    level: number
    /** The relation of pages to the active page for proper highlighting */
    highlight: SectionHighlight
}

type BuildMenuOptions = BuildMenuTopLevelOptions | BuildMenuNestingOptions

type PageProps = {
    /** The relation of the page to the active page for proper highlighting */
    highlight: PageHighlight
    /** Should the page be opened by default */
    defaultOpenState: boolean
    /** The level of the current page */
    level: number
}

const mapPageToMenuItem = (page: PageDescriptor, props: PageProps): MenuItem => ({
    id: page.id,
    parentId: page.parentId,
    title: page.title,
    url: page.url ?? '',
    highlight: props.highlight,
    level: props.level,
    hasChildren: Boolean(page.pages?.length),
    defaultOpenState: props.defaultOpenState
})

const getPagesForParent = (toc: TableOfContent, parentId?: PageId): PageId[] => {
    if (!parentId) {
        return toc.topLevelIds
    }

    if (!(parentId in toc.entities.pages)) {
        return []
    }

    return toc.entities.pages[parentId]?.pages ?? []
}

const getPageFilter = (filter?: Set<PageDescriptor> | null) => {
    if (!filter) {
        return function(page: PageDescriptor | undefined): page is PageDescriptor {
            return page !== undefined
        }
    }

    return function(page: PageDescriptor | undefined): page is PageDescriptor {
        return page !== undefined && filter.has(page)
    }
}

export const buildMenuSection = (toc: TableOfContent, options: BuildMenuOptions): MenuItem[] => {
    const {
        url,
        parentId,
        breadcrumbs = [],
        level = 0,
        highlight: sectionHighlight,
        filter,
    } = options as BuildMenuNestingOptions

    const menu: MenuItem[] = []
    const pagesIds = getPagesForParent(toc, parentId)
    const shouldAddPage = getPageFilter(filter)
    const hasFilter = Boolean(filter)

    for (const pageId of pagesIds) {
        const page = toc.entities.pages[pageId]

        if (shouldAddPage(page)) {
            let highlight: PageHighlight = sectionHighlight
            let defaultOpenState = false

            /**
             * If it is necessary to pass ID instead of URL, then we will need to replace this check with
             * page.id === options.id
             */
            if (page.url === url) {
                highlight = 'active'
                defaultOpenState = Boolean(page.pages?.length)
            } else if (breadcrumbs[level] === page) {
                highlight = 'parent'
                defaultOpenState = true
            }

            if (hasFilter && page.pages?.length) {
                defaultOpenState = true
            }

            menu.push(mapPageToMenuItem(page, {
                highlight,
                level,
                defaultOpenState,
            }))
        }
    }

    return menu
}
