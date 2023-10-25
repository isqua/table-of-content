import type { PageDescriptor, PageURL, TableOfContent } from '../types'

const NotFoundPage: PageDescriptor = {
    id: '404',
    url: '/404.html',
    title: 'Page Not Found',
    parentId: 'root',
}

const MainPage: PageDescriptor = {
    id: '',
    url: '/',
    title: 'Table of Content Demo',
    parentId: '',
}

export const getCurrentPage = (toc: TableOfContent, url: PageURL) => {
    if (url === '/' || url === '') {
        return MainPage
    }

    for (const page of Object.values(toc.entities.pages)) {
        if (page?.url === url) {
            return page
        }
    }

    return NotFoundPage
}
