import { describe, expect, it } from 'vitest'

import tocCyclic from '../../../test/fixtures/toc/cyclic.json'
import tocFlat from '../../../test/fixtures/toc/flat.json'
import tocThreeLevels from '../../../test/fixtures/toc/three-levels.json'
import { getBreadCrumbs } from './getBreadCrumbs'

import type { TableOfContent } from '../types'

describe('toc/getBreadCrumbs', () => {
    it('should return current page if it is found by url', () => {
        const toc: TableOfContent = tocFlat
        const currentUrl = '/bar.html'
        const breadCrumbs = getBreadCrumbs(toc, currentUrl)

        expect(breadCrumbs).toEqual([
            toc.entities.pages.bar
        ])
    })

    it('should return 404 if page is not found by url', () => {
        const toc: TableOfContent = tocFlat
        const currentUrl = '/quux.html'
        const breadCrumbs = getBreadCrumbs(toc, currentUrl)

        expect(breadCrumbs).toEqual([])
    })

    it('should found a top level page for deep page', () => {
        const toc: TableOfContent = tocThreeLevels
        const currentUrl = '/bar-features-beer.html'
        const breadCrumbs = getBreadCrumbs(toc, currentUrl)

        expect(breadCrumbs).toEqual([
            toc.entities.pages.bar,
            toc.entities.pages.bar_features,
            toc.entities.pages.bar_features_beer,
        ])
    })

    it('should not hang in a loop if the data is cyclic', () => {
        const toc: TableOfContent = tocCyclic
        const currentUrl = '/foo.html'
        const breadCrumbs = getBreadCrumbs(toc, currentUrl)

        expect(breadCrumbs).toEqual([
            toc.entities.pages.bar,
            toc.entities.pages.baz,
            toc.entities.pages.foo,
        ])
    })
})
