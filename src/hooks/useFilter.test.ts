import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useFilter } from './useFilter'

describe('hooks/useFilter', () => {
    it('should implement the filtration flow', () => {
        const filter = (text: string) => `text: ${text}`

        const { result } = renderHook(() => useFilter(filter))

        expect(result.current.state).toEqual({
            isLoading: false,
            text: '',
            data: null,
        })

        act(() => {
            result.current.actions.onFilterStart()
        })

        expect(result.current.state).toEqual({
            isLoading: true,
            text: '',
            data: null,
        })

        act(() => {
            result.current.actions.onChange('hello')
        })

        expect(result.current.state).toEqual({
            isLoading: false,
            text: 'hello',
            data: 'text: hello',
        })

        act(() => {
            result.current.actions.onReset()
        })

        expect(result.current.state).toEqual({
            isLoading: false,
            text: '',
            data: null,
        })
    })
})
