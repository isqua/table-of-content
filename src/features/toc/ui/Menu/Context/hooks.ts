import { useCallback, useContext, useEffect, useRef } from 'react'

import { buildMenuSection } from '../../../core/buildMenuSection'
import type { PageId, SectionHighlight } from '../../../types'
import { FilterContext, LocationContext, TocContext } from './contexts'

const useFilterData = () => {
    const { state: { data } } = useContext(FilterContext)

    return data
}

const FILTER_DELAY_IN_MS = 1000

export const useSectionItems = (parentId: PageId = '', level: number = 0, highlight: SectionHighlight) => {
    const { toc } = useContext(TocContext)
    const currentLocation = useContext(LocationContext)
    const filter = useFilterData()

    const items = buildMenuSection(toc, {
        url: currentLocation.url,
        breadcrumbs: currentLocation.breadcrumbs,
        parentId,
        level,
        highlight,
        filter,
    })

    return items
}

export const useIsLoading = () => {
    const { isLoading } = useContext(TocContext)

    return isLoading
}

export const useFilterInput = () => {
    const { actions, state: { isLoading } } = useContext(FilterContext)
    const { onChange, onFilterStart, onReset } = actions
    const timeout = useRef<number>(0)

    const onChangeHandler = useCallback((value: string) => {
        const text = value.trim()

        if (text === '') {
            onReset()
            return
        }

        if (!isLoading) {
            onFilterStart()
        }

        if (timeout.current) {
            clearTimeout(timeout.current)
        }

        timeout.current = window.setTimeout(() => {
            onChange(text)
        }, FILTER_DELAY_IN_MS)
    }, [isLoading, onChange, onFilterStart, onReset])

    useEffect(() => () => {
        clearTimeout(timeout.current)
    }, [])

    return { onChange: onChangeHandler, isLoading }
}
