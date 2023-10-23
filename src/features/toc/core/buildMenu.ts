import type { MenuItem, PageDescriptor, PageId, PageURL, TableOfContent } from '../types'

type BuildMenuBaseOptions = {
    url: PageURL
}

type BuildMenuTopLevelOptions = BuildMenuBaseOptions

type BuildMenuNestingOptions = BuildMenuBaseOptions & {
    parentId: string
    level: number
}

type BuildMenuOptions = BuildMenuTopLevelOptions | BuildMenuNestingOptions

type PageProps = {
    isActive: boolean
    level: number
}

const mapPageToMenuItem = (page: PageDescriptor, props: PageProps): MenuItem => ({
    id: page.id,
    parentId: page.parentId,
    title: page.title,
    url: page.url ?? '',
    isActive: props.isActive,
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
    const { url, parentId, level = 0 } = options as BuildMenuNestingOptions
    const menu: MenuItem[] = []
    const pagesIds = getPagesForParent(toc, parentId)

    for (const pageId of pagesIds) {
        const page = toc.entities.pages[pageId]

        if (page) {
            menu.push(mapPageToMenuItem(page, {
                isActive: page.url === url,
                level,
            }))
        }
    }

    return menu
}
