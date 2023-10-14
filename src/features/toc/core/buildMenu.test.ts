import { describe, expect, it } from 'vitest'

import type { TableOfContent } from '../types'
import { buildMenu } from './buildMenu'

import tocFlat from './test/fixtures/flat.json'

describe('toc/buildMenu', () => {
    it('should build a menu and highlight current page', () => {
        const toc: TableOfContent = tocFlat
        const currentUrl = '/bar.html'
        const menu = buildMenu(toc, { url: currentUrl })

        expect(menu).toMatchSnapshot()
    })

    it('should build a menu even if there are no current page', () => {
        const toc: TableOfContent = tocFlat
        const currentUrl = ''
        const menu = buildMenu(toc, { url: currentUrl })

        expect(menu).toMatchSnapshot()
    })

    it('should build an empty menu if there are no top level ids ', () => {
        const toc: TableOfContent = {
            entities: { pages: {} },
            topLevelIds: [],
        }
        const currentUrl = ''
        const menu = buildMenu(toc, { url: currentUrl })

        expect(menu).toMatchSnapshot()
    })
})