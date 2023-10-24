import { act, fireEvent, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { renderInApp } from '../../test'
import { OptionalLink } from './OptionalLink'

describe('components/OptionalLink', () => {
    it('should render a link if to prop is passed', () => {
        const text = 'Meow'
        const href = '/meow'
        const className = 'stylish'

        act(() => {
            renderInApp(<OptionalLink className={className} to={href}>{text}</OptionalLink>)
        })

        expect(screen.getByText(text).tagName).toEqual('A')
        expect(screen.getByText(text)).toHaveAttribute('href')
        expect(screen.getByText(text)).toHaveClass(className)
    })

    it('should render a text if to prop is empty string', () => {
        const text = 'Stub'
        const className = 'textish'

        act(() => {
            renderInApp(<OptionalLink className={className} to="">{text}</OptionalLink>)
        })

        expect(screen.getByText(text).tagName).not.toEqual('A')
        expect(screen.getByText(text)).not.toHaveAttribute('href')
        expect(screen.getByText(text)).toHaveClass(className)
    })

    it('should render a text if to prop is undefined', () => {
        const text = 'Stub'

        act(() => {
            renderInApp(<OptionalLink>{text}</OptionalLink>)
        })

        expect(screen.getByText(text).tagName).not.toEqual('A')
        expect(screen.getByText(text)).not.toHaveAttribute('href')
    })

    it('should call an onClick callback for text', () => {
        const text = 'Stub'
        const onClick = vi.fn()

        act(() => {
            renderInApp(<OptionalLink onClick={onClick}>{text}</OptionalLink>)
        })

        act(() => {
            fireEvent.click(screen.getByText(text))
        })

        expect(onClick).toBeCalledTimes(1)
    })

    it('should call an onClick callback for a link', () => {
        const text = 'Link'
        const href = '/hello'
        const onClick = vi.fn()

        act(() => {
            renderInApp(<OptionalLink to={href} onClick={onClick}>{text}</OptionalLink>)
        })

        act(() => {
            fireEvent.click(screen.getByText(text))
        })

        expect(onClick).toBeCalledTimes(1)
    })
})
