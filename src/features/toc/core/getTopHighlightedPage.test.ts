import { describe, expect, it } from 'vitest'

import tocCyclic from '../../../test/fixtures/toc/cyclic.json'
import tocFlat from '../../../test/fixtures/toc/flat.json'
import tocThreeLevels from '../../../test/fixtures/toc/three-levels.json'
import type { TableOfContent } from '../types'
import { getTopHighlightedPage } from './getTopHighlightedPage'

describe('toc/getTopHighlightedPage', () => {
    it('should return current page if it is found by url', () => {
        const toc: TableOfContent = tocFlat
        const currentUrl = 'bar.html'
        const pageId = getTopHighlightedPage(toc, currentUrl)

        expect(pageId).toEqual('bar')
    })

    it('should return 404 if page is not found by url', () => {
        const toc: TableOfContent = tocFlat
        const currentUrl = 'quux.html'
        const pageId = getTopHighlightedPage(toc, currentUrl)

        expect(pageId).toEqual('404')
    })

    it('should found a top level page for deep page', () => {
        const toc: TableOfContent = tocThreeLevels
        const currentUrl = 'bar-features-beer.html'
        const pageId = getTopHighlightedPage(toc, currentUrl)

        expect(pageId).toEqual('bar')
    })

    it('should not hang in a loop if the data is cyclic', () => {
        const toc: TableOfContent = tocCyclic
        const currentUrl = 'foo.html'
        const pageId = getTopHighlightedPage(toc, currentUrl)

        expect(pageId).toEqual('foo')
    })
})
