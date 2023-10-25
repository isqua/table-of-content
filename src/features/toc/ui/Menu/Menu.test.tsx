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

const renderMenu = (props: MenuProps) => {
    renderInApp(<Menu {...props} />)
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
            const activeUrl = 'bar.html'
            const entitiesCount = Object.keys(tocTwoLevels.entities.pages).length

            renderMenu({ toc, isLoading: true, activeUrl })

            // Menu should not build links when loading
            expect(screen.queryByRole('link')).not.toBeInTheDocument()

            // And should render all nested items
            expect(screen.getAllByRole('listitem')).toHaveLength(entitiesCount)

            assertMenuSnapshot()
        })
    })

    describe('render', () => {
        it('should build a menu and highlight the current page', () => {
            const toc: TableOfContent = tocFlat
            const activeUrl = tocFlat.entities.pages.bar.url

            renderMenu({ toc, activeUrl })

            assertMenuSnapshot()
        })

        it('should build a two-levels menu and open the current page submenu if it has children', () => {
            const toc: TableOfContent = tocTwoLevels
            const pages = tocTwoLevels.entities.pages
            const activeUrl = pages.bar.url

            renderMenu({ toc, activeUrl })

            expect(screen.getByText(pages.bar_install.title)).toBeInTheDocument()
            expect(screen.getByText(pages.bar_features.title)).toBeInTheDocument()
        })

        it('should build a two-levels menu and open all parents containing the current page', () => {
            const toc: TableOfContent = tocTwoLevels
            const pages = tocTwoLevels.entities.pages
            const activeUrl = pages.bar_install.url

            renderMenu({ toc, activeUrl })

            expect(screen.getByText(pages.bar.title)).toContainElement(
                screen.getByRole('button', { expanded: true })
            )
            expect(screen.getByText(pages.bar_install.title)).toBeInTheDocument()
            expect(screen.getByText(pages.bar_features.title)).toBeInTheDocument()
        })
    })

    describe('toggling', () => {
        it('should close a submenu when clicking on a chevron', () => {
            const toc: TableOfContent = tocTwoLevels
            const pages = tocTwoLevels.entities.pages
            const activeUrl = pages.bar_install.url

            renderMenu({ toc, activeUrl })

            expect(screen.getByText(pages.bar.title)).toContainElement(
                screen.getByRole('button', { expanded: true })
            )

            fireEvent.click(screen.getByRole('button', { expanded: true }))

            expect(screen.getByText(pages.bar.title)).toContainElement(
                screen.getByRole('button', { expanded: false })
            )

            expect(screen.queryByText(pages.bar_install.title)).not.toBeInTheDocument()
        })

        it('should open a submenu when clicking on an item with children', () => {
            const toc: TableOfContent = tocTwoLevels
            const pages = tocTwoLevels.entities.pages
            const activeUrl = pages.foo.url

            renderMenu({ toc, activeUrl })

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
            const activeUrl = ''
            const searchText = 'bar'

            renderMenu({ toc, activeUrl })

            updateFilter(searchText)

            expect(getSpinner()).toBeInTheDocument()

            act(() => {
                vi.runAllTimers()
            })
        })

        it('should filter items by text', () => {
            const toc: TableOfContent = tocTwoLevels
            const activeUrl = ''
            const searchText = 'bar'

            renderMenu({ toc, activeUrl })

            updateFilter(searchText)

            act(() => {
                vi.runAllTimers()
            })

            expect(screen.queryByLabelText(spinnerText)).not.toBeInTheDocument()

            assertMenuSnapshot()
        })
    })
})
