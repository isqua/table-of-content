import { describe, expect, it } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'

import { useRequestWithPlaceholder } from './useRequestWithPlaceholder'

describe('hooks/useRequestWithPlaceholder', () => {
    it('should return a placeholder while the promise is pending', () => {
        const fetchData = () => new Promise<number>((res) => {
            setTimeout(() => {
                res(42)
            }, 200)
        })

        const placeholder: number = 1

        const useTestHook = () => {
            return useRequestWithPlaceholder(fetchData, placeholder)
        }

        const { result } = renderHook(useTestHook)

        expect(result.current).toEqual({
            data: 1,
            isLoading: true,
            isError: false,
            isSuccess: false,
        })
    })

    it('should return a callback result after resolving', async () => {
        const fetchData = () => Promise.resolve(42)

        const placeholder: number = 1

        const useTestHook = () => {
            return useRequestWithPlaceholder(fetchData, placeholder)
        }

        const { result } = renderHook(useTestHook)

        await waitFor(() => !result.current.isLoading)

        expect(result.current).toEqual({
            data: 42,
            isLoading: false,
            isError: false,
            isSuccess: true,
        })
    })

    it('should set isError flag if the promise was rejected', async () => {
        const fetchData = () => Promise.reject()

        const placeholder: number = 1

        const useTestHook = () => {
            return useRequestWithPlaceholder(fetchData, placeholder)
        }

        const { result } = renderHook(useTestHook)

        await waitFor(() => !result.current.isLoading)

        expect(result.current).toEqual({
            data: 1,
            isLoading: false,
            isError: true,
            isSuccess: false,
        })
    })
})
