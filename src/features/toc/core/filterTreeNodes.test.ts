import { describe, expect, it } from 'vitest'

import tocCyclic from '../../../test/fixtures/toc/cyclic.json'
import tocFlat from '../../../test/fixtures/toc/flat.json'
import tocThreeLevels from '../../../test/fixtures/toc/three-levels.json'
import { filterTreeNodes } from './filterTreeNodes'

import type { TableOfContent } from '../types'

describe('toc/filterTreeNodes', () => {
    it('should return current page if it is found by url', () => {
        const toc: TableOfContent = tocFlat
        const search = 'ar'
        const filteredItems = filterTreeNodes(toc, search)

        expect(filteredItems).toContain(toc.entities.pages.bar)
        expect(filteredItems).not.toContain(toc.entities.pages.foo)
        expect(filteredItems).not.toContain(toc.entities.pages.baz)
    })

    it('should return an empty set if no pages were found', () => {
        const toc: TableOfContent = tocFlat
        const search = 'quux'
        const filteredItems = filterTreeNodes(toc, search)

        expect(filteredItems).toHaveLength(0)
    })

    it('should add the found page and all parent pages to the set', () => {
        const toc: TableOfContent = tocThreeLevels
        const search = 'Beer'
        const filteredItems = filterTreeNodes(toc, search)

        expect(filteredItems).toHaveLength(3)
        expect(filteredItems).toContain(toc.entities.pages.bar_features_beer)
        expect(filteredItems).toContain(toc.entities.pages.bar_features)
        expect(filteredItems).toContain(toc.entities.pages.bar)
    })

    it('should not add children of found page if it does not match filter', () => {
        const toc: TableOfContent = tocThreeLevels
        const search = 'Bar: Install'
        const filteredItems = filterTreeNodes(toc, search)

        expect(filteredItems).toHaveLength(2)
        expect(filteredItems).toContain(toc.entities.pages.bar_install)
        expect(filteredItems).toContain(toc.entities.pages.bar)
    })

    it('should not hang in a loop if the data is cyclic', () => {
        const toc: TableOfContent = tocCyclic
        const search = 'Foo'
        const filteredItems = filterTreeNodes(toc, search)

        expect(filteredItems).toHaveLength(3)
        expect(filteredItems).toContain(toc.entities.pages.foo)
        expect(filteredItems).toContain(toc.entities.pages.bar)
        expect(filteredItems).toContain(toc.entities.pages.baz)
    })
})
