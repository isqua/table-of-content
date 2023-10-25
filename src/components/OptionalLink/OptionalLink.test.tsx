import { fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { renderInApp } from '../../test'
import { OptionalLink } from './OptionalLink'

describe('components/OptionalLink', () => {
    describe('with url', () => {
        it('should render a link if the ‘to’ prop is passed', () => {
            const text = 'Meow'
            const href = '/meow'
            const className = 'stylish'

            renderInApp(<OptionalLink className={className} to={href}>{text}</OptionalLink>)

            expect(screen.getByText(text).tagName).toEqual('A')
            expect(screen.getByText(text)).toHaveAttribute('href')
            expect(screen.getByText(text)).toHaveClass(className)
        })

        it('should call an onClick callback for a link', () => {
            const text = 'Link'
            const href = '/hello'
            const onClick = vi.fn()

            renderInApp(<OptionalLink to={href} onClick={onClick}>{text}</OptionalLink>)

            fireEvent.click(screen.getByText(text))

            expect(onClick).toBeCalledTimes(1)
        })
    })

    describe('with no url', () => {
        it('should render a text if to prop is empty string', () => {
            const text = 'Stub'
            const className = 'textish'

            renderInApp(<OptionalLink className={className} to="">{text}</OptionalLink>)

            expect(screen.getByText(text).tagName).not.toEqual('A')
            expect(screen.getByText(text)).not.toHaveAttribute('href')
            expect(screen.getByText(text)).toHaveClass(className)
        })

        it('should render a text if to prop is undefined', () => {
            const text = 'Stub'

            renderInApp(<OptionalLink>{text}</OptionalLink>)

            expect(screen.getByText(text).tagName).not.toEqual('A')
            expect(screen.getByText(text)).not.toHaveAttribute('href')
        })

        it('should call an onClick callback for text', () => {
            const text = 'Stub'
            const onClick = vi.fn()

            renderInApp(<OptionalLink onClick={onClick}>{text}</OptionalLink>)

            fireEvent.click(screen.getByRole('button', { name: text }))

            expect(onClick).toBeCalledTimes(1)
        })

        it('should call an onClick callback on enter press', async () => {
            const text = 'Stub'
            const onClick = vi.fn()
            const user = userEvent.setup()

            renderInApp(<OptionalLink onClick={onClick}>{text}</OptionalLink>)

            const link = screen.getByRole('button', { name: text })

            await user.tab()

            expect(link).toHaveFocus()

            expect(onClick).not.toBeCalled()

            await user.keyboard('[Enter]')

            expect(onClick).toBeCalledTimes(1)
        })
    })
})
