import { act, fireEvent, screen, waitFor } from '@testing-library/react'
import type { PropsWithChildren } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { renderInApp } from '../../../../test'
import tocFlat from '../../../../test/fixtures/toc/flat.json'
import tocTwoLevels from '../../../../test/fixtures/toc/two-levels.json'
import type { TableOfContent } from '../../types'
import { Menu } from './Menu'

vi.mock('react-transition-group', () => {
    const FakeTransitionGroup = vi.fn(
        ({ children }: PropsWithChildren) => children
    )

    const FakeTransition = vi.fn(
        ({ children }: PropsWithChildren) => children
    )

    const FakeCSSTransition = vi.fn(
        (props: PropsWithChildren<{ in: boolean }>) => props.in ?
            <FakeTransition>{props.children}</FakeTransition> :
            null,
    )

    return {
        TransitionGroup: FakeTransitionGroup,
        CSSTransition: FakeCSSTransition,
        Transition: FakeTransition,
    }
})

describe('features/toc/ui/Menu', () => {
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

        act(() => {
            renderInApp(<Menu toc={toc} />, { url: currentUrl })
        })

        expect(await screen.findByRole('navigation')).toMatchSnapshot()
    })

    it('should build a two-levels menu and open all parents that contains current page', async () => {
        const toc: TableOfContent = tocTwoLevels
        const currentUrl = '/bar-install.html'

        act(() => {
            renderInApp(<Menu toc={toc} />, { url: currentUrl })
        })

        expect(await screen.findByRole('navigation')).toMatchSnapshot()
    })

    it('should close a submenu when clicking on a chevron', async () => {
        const toc: TableOfContent = tocTwoLevels
        const currentUrl = '/bar-install.html'

        act(() => {
            renderInApp(<Menu toc={toc} />, { url: currentUrl })
        })

        expect(await screen.findByRole('navigation')).toMatchSnapshot()

        act(() => {
            fireEvent.click(screen.getByRole('button', { expanded: true }))
        })

        expect(await screen.findByRole('navigation')).toMatchSnapshot()
    })

    it('should open a submenu when clicking on an item with children', async () => {
        const toc: TableOfContent = tocTwoLevels
        const currentUrl = '/foo.html'

        act(() => {
            renderInApp(<Menu toc={toc} />, { url: currentUrl })
        })

        act(() => {
            fireEvent.click(screen.getByRole('link', { name: 'Bar' }))
        })

        await waitFor(() => {
            expect(screen.getByRole('button', { expanded: true })).not.toBeNull()
        })

        expect(screen.getByText('Bar: Install')).not.toBeNull()
    })
})
