import { act, fireEvent, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import type { TableOfContent } from '../../features/toc'
import tocFlat from '../../test/fixtures/toc/flat.json'
import tocTwoLevels from '../../test/fixtures/toc/two-levels.json'
import { renderInApp } from '../../test'
import { Menu } from './Menu'

describe('components/Menu', () => {
    it('should build a menu and highlight current page', async () => {
        const toc: TableOfContent = tocFlat
        const currentUrl = '/bar.html'

        act(() => {
            renderInApp(<Menu toc={toc} />, { url: currentUrl })
        })

        expect(await screen.findByRole('navigation')).toMatchSnapshot()
    })

    it('should build a two-levels menu', async () => {
        const toc: TableOfContent = tocTwoLevels
        const currentUrl = '/bar-install.html'

        act(() => {
            renderInApp(<Menu toc={toc} />, { url: currentUrl })
        })

        expect(await screen.findByRole('navigation')).toMatchSnapshot()
    })

    it('should open and close a submenu when clicking on a chevron', async () => {
        const toc: TableOfContent = tocTwoLevels
        const currentUrl = '/bar-install.html'

        act(() => {
            renderInApp(<Menu toc={toc} />, { url: currentUrl })
        })

        act(() => {
            fireEvent.click(screen.getByRole('button', { expanded: false }))
        })

        expect(await screen.findByRole('navigation')).toMatchSnapshot()

        act(() => {
            fireEvent.click(screen.getByRole('button', { expanded: true }))
        })

        expect(await screen.findByRole('navigation')).toMatchSnapshot()
    })
})
