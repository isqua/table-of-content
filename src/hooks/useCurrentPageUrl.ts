import { useLocation } from 'react-router-dom'

export function useCurrentPageUrl() {
    const location = useLocation()
    const currentUrl = location.pathname.replace(/^\//, '')

    return currentUrl
}
