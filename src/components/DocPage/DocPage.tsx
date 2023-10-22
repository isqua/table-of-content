import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { getCurrentPage, type TableOfContent } from '../../features/toc'
import { Article } from '../Article'

type DocPageProps = {
    toc: TableOfContent
}

export function DocPage({ toc }: DocPageProps) {
    const location = useLocation()
    const currentUrl = location.pathname.replace(/^\//, '')
    const page = getCurrentPage(toc, currentUrl)

    useEffect(() => {
        window.document.title = page.title
    }, [page.title])

    return (
        <Article page={page} />
    )
}
