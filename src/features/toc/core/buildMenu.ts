import type { MenuItem, PageDescriptor, PageHighlight, PageId, PageURL, SectionHighlight, TableOfContent } from '../types'

type BuildMenuBaseOptions = {
    url: PageURL
    breadcrumbs: PageDescriptor[]
}

type BuildMenuTopLevelOptions = BuildMenuBaseOptions

type BuildMenuNestingOptions = BuildMenuBaseOptions & {
    parentId: string
    level: number
    highlight: SectionHighlight
}

type BuildMenuOptions = BuildMenuTopLevelOptions | BuildMenuNestingOptions

type PageProps = {
    highlight: PageHighlight
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

export const buildMenu = (toc: TableOfContent, options: BuildMenuOptions): MenuItem[] => {
    const {
        url,
        parentId,
        breadcrumbs = [],
        level = 0,
        highlight: sectionHighlight,
    } = options as BuildMenuNestingOptions

    const menu: MenuItem[] = []
    const pagesIds = getPagesForParent(toc, parentId)

    for (const pageId of pagesIds) {
        const page = toc.entities.pages[pageId]

        if (page) {
            let highlight: PageHighlight = sectionHighlight

            if (page.url === url) {
                highlight = 'active'
            } else if (breadcrumbs[level] === page) {
                highlight = 'parent'
            }

            menu.push(mapPageToMenuItem(page, {
                highlight,
                level,
            }))
        }
    }

    return menu
}
