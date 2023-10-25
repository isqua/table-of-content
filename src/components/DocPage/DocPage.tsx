import { useEffect } from 'react'

import { getBreadCrumbs, getCurrentPage, type TableOfContent } from '../../features/toc'
import { useCurrentPageUrl } from '../../hooks/useCurrentPageUrl'
import { Article } from '../Article'

type DocPageProps = {
    toc: TableOfContent
}

export function DocPage({ toc }: DocPageProps) {
    const currentUrl = useCurrentPageUrl()
    const page = getCurrentPage(toc, currentUrl)
    const breadcrumbs = getBreadCrumbs(toc, currentUrl)

    useEffect(() => {
        window.document.title = page.title
    }, [page.title])

    return (
        <Article breadcrumbs={breadcrumbs} page={page} />
    )
}
