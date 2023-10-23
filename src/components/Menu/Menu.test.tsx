import { fireEvent, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import type { TableOfContent } from '../../features/toc'
import tocFlat from '../../test/fixtures/toc/flat.json'
import tocTwoLevels from '../../test/fixtures/toc/two-levels.json'
import { renderInApp } from '../../test'
import { Menu } from './Menu'

describe('components/Menu', () => {
    it('should render skeletons while TOC is loading', async () => {
        const toc: TableOfContent = tocTwoLevels
        const currentUrl = '/bar.html'

        act(() => {
            renderInApp(<Menu isLoading toc={toc} />, { url: currentUrl })
        })

        expect(await screen.findByRole('navigation')).toMatchSnapshot()
    })

    it('should build a menu and highlight current page', async () => {
        const toc: TableOfContent = tocFlat
        const currentUrl = '/bar.html'

        renderInApp(<Menu toc={toc} />, { url: currentUrl })

        expect(await screen.findByRole('navigation')).toMatchSnapshot()
    })

    it('should build a two-levels menu and open all parents that contains current page', async () => {
        const toc: TableOfContent = tocTwoLevels
        const currentUrl = '/bar-install.html'

        renderInApp(<Menu toc={toc} />, { url: currentUrl })

        expect(await screen.findByRole('navigation')).toMatchSnapshot()
    })

    it('should close a submenu when clicking on a chevron', async () => {
        const toc: TableOfContent = tocTwoLevels
        const currentUrl = '/bar-install.html'

        renderInApp(<Menu toc={toc} />, { url: currentUrl })

        expect(await screen.findByRole('navigation')).toMatchSnapshot()

        fireEvent.click(screen.getByRole('button', { expanded: true }))

        expect(await screen.findByRole('navigation')).toMatchSnapshot()
    })

    it('should open a submenu when clicking on an item with children', async () => {
        const toc: TableOfContent = tocTwoLevels
        const currentUrl = '/foo.html'

        renderInApp(<Menu toc={toc} />, { url: currentUrl })

        fireEvent.click(screen.getByRole('link', { name: 'Bar' }))

        expect(await screen.findByRole('button', { expanded: true })).not.toBeNull()

        expect(screen.getByText('Bar: Install')).not.toBeNull()
    })
})
