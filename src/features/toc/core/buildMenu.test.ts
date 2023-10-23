import { describe, expect, it } from 'vitest'

import type { TableOfContent } from '../types'
import { buildMenu } from './buildMenu'
import { getBreadCrumbs } from './getBreadCrumbs'

import tocFlat from '../../../test/fixtures/toc/flat.json'
import tocTwoLevels from '../../../test/fixtures/toc/two-levels.json'

describe('toc/buildMenu', () => {
    it('should build a menu and highlight current page', () => {
        const toc: TableOfContent = tocFlat
        const currentUrl = 'bar.html'
        const breadcrumbs = getBreadCrumbs(toc, currentUrl)
        const menu = buildMenu(toc, { url: currentUrl, breadcrumbs })

        expect(menu).toMatchSnapshot()
    })

    it('should build a menu even if there are no current page', () => {
        const toc: TableOfContent = tocFlat
        const currentUrl = ''
        const breadcrumbs = getBreadCrumbs(toc, currentUrl)
        const menu = buildMenu(toc, { url: currentUrl, breadcrumbs })

        expect(menu).toMatchSnapshot()
    })

    it('should build an empty menu if there are no top level ids ', () => {
        const toc: TableOfContent = {
            entities: { pages: {} },
            topLevelIds: [],
        }
        const currentUrl = ''
        const breadcrumbs = getBreadCrumbs(toc, currentUrl)
        const menu = buildMenu(toc, { url: currentUrl, breadcrumbs })

        expect(menu).toMatchSnapshot()
    })

    it('should show page children', () => {
        const toc: TableOfContent = tocTwoLevels
        const currentUrl = 'bar.html'
        const breadcrumbs = getBreadCrumbs(toc, currentUrl)
        const menu = buildMenu(toc, { url: currentUrl, breadcrumbs })

        expect(menu).toMatchSnapshot()
    })

    it('should build a nested menu', () => {
        const toc: TableOfContent = tocTwoLevels
        const currentUrl = 'bar-features.html'
        const breadcrumbs = getBreadCrumbs(toc, currentUrl)
        const menu = buildMenu(toc, { url: currentUrl, parentId: 'bar', breadcrumbs })

        expect(menu).toMatchSnapshot()
    })
})
