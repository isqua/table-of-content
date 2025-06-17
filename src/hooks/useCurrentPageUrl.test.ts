import { describe, expect, it } from 'vitest'

import { renderHookInApp } from '../test/render'
import { useCurrentPageUrl } from './useCurrentPageUrl'

describe('hooks/useCurrentPageUrl', () => {
    it('should return current page URL without leading slash', () => {
        const currentUrl = '/hello/its/me.html'

        const { result } = renderHookInApp(useCurrentPageUrl, { url: currentUrl })

        expect(result.current).toEqual('/hello/its/me.html')
    })

    it('should return current page path if current url contains some search parameters', () => {
        const currentUrl = '/search.html?text=hello'

        const { result } = renderHookInApp(useCurrentPageUrl, { url: currentUrl })

        expect(result.current).toEqual('/search.html')
    })

    it('should return an empty string for the site root', () => {
        const currentUrl = '/'

        const { result } = renderHookInApp(useCurrentPageUrl, { url: currentUrl })

        expect(result.current).toEqual('/')
    })
})
