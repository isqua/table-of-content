import type { MenuItem, PageDescriptor, PageURL, TableOfContent } from '../types'

type BuildMenuOptions = {
    url: PageURL
}

type PageProps = {
    isActive: boolean
}

const mapPageToMenuItem = (page: PageDescriptor, props: PageProps) => ({
    id: page.id,
    parentId: page.parentId,
    title: page.title,
    url: page.url,
    isActive: props.isActive,
})

export const buildMenu = (toc: TableOfContent, options: BuildMenuOptions): MenuItem[] => {
    const { url } = options

    const menu: MenuItem[] = []

    for (const pageId of toc.topLevelIds) {
        const page = toc.entities.pages[pageId]

        menu.push(mapPageToMenuItem(page, {
            isActive: page.url === url,
        }))

        if (page.pages?.length) {
            for (const subPageId of page.pages) {
                const subPage = toc.entities.pages[subPageId]

                menu.push(mapPageToMenuItem(subPage, {
                    isActive: subPage.url === url,
                }))
            }
        }
    }

    return menu
}
