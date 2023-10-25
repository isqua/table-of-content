import { act, fireEvent, screen } from '@testing-library/react'
import type { PropsWithChildren } from 'react'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'

import { renderInApp } from '../../../../test'
import tocFlat from '../../../../test/fixtures/toc/flat.json'
import tocTwoLevels from '../../../../test/fixtures/toc/two-levels.json'
import type { TableOfContent } from '../../types'
import { Menu, MenuProps } from './Menu'

const spinnerText = 'Loading'

const getSpinner = () => screen.getByLabelText(spinnerText)

const updateFilter = (value: string) => {
    fireEvent.change(screen.getByRole('textbox'), {
        target: { value },
    })
}

const renderMenu = (props: MenuProps, currentUrl?: string) => {
    renderInApp(<Menu {...props} />, { url: currentUrl })
}

const assertMenuSnapshot = () => {
    expect(screen.getByRole('navigation')).toMatchSnapshot()
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
    describe('loading', () => {
        it('should render skeletons while the TOC is loading', () => {
            const toc: TableOfContent = tocTwoLevels
            const currentUrl = '/bar.html'

            renderMenu({ toc, isLoading: true }, currentUrl)

            assertMenuSnapshot()
        })
    })

    describe('render', () => {
        it('should build a menu and highlight the current page', () => {
            const toc: TableOfContent = tocFlat
            const currentUrl = '/bar.html'

            renderMenu({ toc }, currentUrl)

            assertMenuSnapshot()
        })

        it('should build a two-levels menu and open all parents containing the current page', () => {
            const toc: TableOfContent = tocTwoLevels
            const currentUrl = '/bar-install.html'

            renderMenu({ toc }, currentUrl)

            assertMenuSnapshot()
        })
    })

    describe('toggling', () => {
        it('should close a submenu when clicking on a chevron', () => {
            const toc: TableOfContent = tocTwoLevels
            const currentUrl = '/bar-install.html'

            renderMenu({ toc }, currentUrl)

            expect(screen.getByRole('navigation')).toMatchSnapshot()

            fireEvent.click(screen.getByRole('button', { expanded: true }))

            assertMenuSnapshot()
        })

        it('should open a submenu when clicking on an item with children', () => {
            const toc: TableOfContent = tocTwoLevels
            const currentUrl = '/foo.html'

            renderMenu({ toc }, currentUrl)

            fireEvent.click(screen.getByRole('link', { name: 'Bar' }))

            expect(screen.getByRole('button', { expanded: true })).toBeInTheDocument()

            expect(screen.getByText('Bar: Install')).toBeInTheDocument()
        })
    })

    describe('filtering', () => {
        beforeAll(() => {
            vi.useFakeTimers()
        })

        afterAll(() => {
            vi.useRealTimers()
        })

        it('should show a loader when filtering', () => {
            const toc: TableOfContent = tocTwoLevels
            const currentUrl = ''
            const searchText = 'bar'

            renderMenu({ toc }, currentUrl)

            updateFilter(searchText)

            expect(getSpinner()).toBeInTheDocument()

            act(() => {
                vi.runAllTimers()
            })
        })

        it('should filter items by text', () => {
            const toc: TableOfContent = tocTwoLevels
            const currentUrl = ''
            const searchText = 'bar'

            renderMenu({ toc }, currentUrl)

            updateFilter(searchText)

            act(() => {
                vi.runAllTimers()
            })

            expect(screen.queryByLabelText(spinnerText)).not.toBeInTheDocument()

            assertMenuSnapshot()
        })
    })
})
