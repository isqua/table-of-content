import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useFilter } from './useFilter'

describe('hooks/useFilter', () => {
    it('should implement the filtration flow', () => {
        const filter = (text: string) => `text: ${text}`

        const { result } = renderHook(() => useFilter(filter))

        expect(result.current.data).toEqual(null)
        expect(result.current.manager.isFiltering).toEqual(false)

        act(() => {
            result.current.manager.onFilterStart()
        })

        expect(result.current.data).toEqual(null)
        expect(result.current.manager.isFiltering).toEqual(true)

        act(() => {
            result.current.manager.onChange('hello')
        })

        expect(result.current.data).toEqual('text: hello')
        expect(result.current.manager.isFiltering).toEqual(false)

        act(() => {
            result.current.manager.onReset()
        })

        expect(result.current.data).toEqual(null)
        expect(result.current.manager.isFiltering).toEqual(false)
    })
})
