import { describe, expect, it } from 'vitest'

import type { TableOfContent } from '../types'
import { buildMenuSection } from './buildMenuSection'
import { filterTreeNodes } from './filterTreeNodes'
import { getBreadCrumbs } from './getBreadCrumbs'

import tocFlat from '../../../test/fixtures/toc/flat.json'
import tocTwoLevels from '../../../test/fixtures/toc/two-levels.json'
import tocThreeLevels from '../../../test/fixtures/toc/three-levels.json'

describe('toc/buildMenuSection', () => {
    it('should build a menu and highlight current page', () => {
        const toc: TableOfContent = tocFlat
        const currentUrl = '/bar.html'
        const breadcrumbs = getBreadCrumbs(toc, currentUrl)
        const menu = buildMenuSection(toc, { url: currentUrl, breadcrumbs })

        expect(menu).toMatchSnapshot()
    })

    it('should build a menu even if there are no current page', () => {
        const toc: TableOfContent = tocFlat
        const currentUrl = '/'
        const breadcrumbs = getBreadCrumbs(toc, currentUrl)
        const menu = buildMenuSection(toc, { url: currentUrl, breadcrumbs })

        expect(menu).toMatchSnapshot()
    })

    it('should build an empty menu if page with parent id does not exists', () => {
        const toc: TableOfContent = tocFlat
        const currentUrl = '/'
        const parentId = 'this-id-does-not-exist'
        const breadcrumbs = getBreadCrumbs(toc, currentUrl)
        const menu = buildMenuSection(toc, { url: currentUrl, breadcrumbs, parentId })

        expect(menu).toEqual([])
    })

    it('should build an empty menu if there are no top level ids ', () => {
        const toc: TableOfContent = {
            entities: { pages: {} },
            topLevelIds: [],
        }
        const currentUrl = '/'
        const breadcrumbs = getBreadCrumbs(toc, currentUrl)
        const menu = buildMenuSection(toc, { url: currentUrl, breadcrumbs })

        expect(menu).toMatchSnapshot()
    })

    it('should show page children', () => {
        const toc: TableOfContent = tocTwoLevels
        const currentUrl = '/bar.html'
        const breadcrumbs = getBreadCrumbs(toc, currentUrl)
        const menu = buildMenuSection(toc, { url: currentUrl, breadcrumbs })

        expect(menu).toMatchSnapshot()
    })

    it('should build a nested menu', () => {
        const toc: TableOfContent = tocTwoLevels
        const currentUrl = '/bar-features.html'
        const breadcrumbs = getBreadCrumbs(toc, currentUrl)
        const menu = buildMenuSection(toc, { url: currentUrl, parentId: 'bar', breadcrumbs })

        expect(menu).toMatchSnapshot()
    })

    it('should filter pages', () => {
        const toc: TableOfContent = tocFlat
        const currentUrl = '/bar.html'
        const breadcrumbs = getBreadCrumbs(toc, currentUrl)
        const filter = filterTreeNodes(toc, 'ba')
        const menu = buildMenuSection(toc, { url: currentUrl, breadcrumbs, filter })

        expect(menu).toMatchSnapshot()
    })

    it('should expand all sections while filtering', () => {
        const toc: TableOfContent = tocThreeLevels
        const currentUrl = '/'
        const breadcrumbs = getBreadCrumbs(toc, currentUrl)
        const filter = filterTreeNodes(toc, 'features')

        const menu = [
            ...buildMenuSection(toc, { url: currentUrl, breadcrumbs, filter }),
            ...buildMenuSection(toc, { parentId: 'bar', url: currentUrl, breadcrumbs, filter }),
            ...buildMenuSection(toc, { parentId: 'bar_features', url: currentUrl, breadcrumbs, filter }),
        ]

        expect(menu).toMatchSnapshot()
    })
})
