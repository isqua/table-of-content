import { useLocation } from 'react-router-dom'

/**
 * Extract current page url from the router, and correct it to the TOC format
 * The TOC links has no leading slash, so remove it
 */
export function useCurrentPageUrl() {
    const location = useLocation()
    const currentUrl = location.pathname.replace(/^\//, '')

    return currentUrl
}
