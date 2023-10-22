import { describe, expect, it } from 'vitest'

import tocFlat from '../../../test/fixtures/toc/flat.json'

import type { TableOfContent } from '../types'
import { getCurrentPage } from './getCurrentPage'

describe('toc/getCurrentPage', () => {
    it('should return current page if it is found by url', () => {
        const toc: TableOfContent = tocFlat
        const currentUrl = 'bar.html'
        const page = getCurrentPage(toc, currentUrl)

        expect(page).toHaveProperty('url', currentUrl)
    })

    it('should return 404 page if page is not found by url', () => {
        const toc: TableOfContent = tocFlat
        const currentUrl = 'quux.html'
        const page = getCurrentPage(toc, currentUrl)

        expect(page).toHaveProperty('url', '/404.html')
    })
})
