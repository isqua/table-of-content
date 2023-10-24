import { fireEvent, screen } from '@testing-library/react'
import type { PropsWithChildren } from 'react'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'

import { renderInApp } from '../../../../test'
import tocFlat from '../../../../test/fixtures/toc/flat.json'
import tocTwoLevels from '../../../../test/fixtures/toc/two-levels.json'
import type { TableOfContent } from '../../types'
import { Menu } from './Menu'

const spinnerText = 'Loading'

const getSpinner = () => screen.getByLabelText(spinnerText)

const updateFilter = (value: string) => {
    fireEvent.change(screen.getByRole('textbox'), {
        target: { value },
    })
}

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

        renderInApp(<Menu isLoading toc={toc} />, { url: currentUrl })

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

    describe('filtering', () => {
        beforeAll(() => {
            vi.useFakeTimers()
        })

        afterAll(() => {
            vi.useRealTimers()
        })

        it('should show loader when filtering', () => {
            const toc: TableOfContent = tocTwoLevels
            const currentUrl = ''
            const searchText = 'bar'

            act(() => {
                renderInApp(<Menu toc={toc} />, { url: currentUrl })
            })

            act(() => {
                updateFilter(searchText)
            })

            expect(getSpinner()).toBeInTheDocument()

            act(() => {
                vi.runAllTimers()
            })
        })

        it('should filter items by text', () => {
            const toc: TableOfContent = tocTwoLevels
            const currentUrl = ''
            const searchText = 'bar'

            act(() => {
                renderInApp(<Menu toc={toc} />, { url: currentUrl })
            })

            act(() => {
                updateFilter(searchText)
                vi.runAllTimers()
            })

            expect(screen.queryByLabelText(spinnerText)).not.toBeInTheDocument()
            expect(screen.getByRole('navigation')).toMatchSnapshot()
        })
    })
})
