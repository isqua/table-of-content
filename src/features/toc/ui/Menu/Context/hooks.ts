import { useCallback, useContext, useEffect, useRef } from 'react'

import { buildMenuSection } from '../../../core/buildMenuSection'
import type { PageId, SectionHighlight } from '../../../types'
import { FilterContext, LocationContext, TocContext } from './contexts'

const FILTER_DELAY_IN_MS = 1000

export const useSectionItems = (parentId: PageId = '', level: number = 0, highlight: SectionHighlight) => {
    const { toc, filter } = useContext(TocContext)
    const currentLocation = useContext(LocationContext)

    const items = buildMenuSection(toc, {
        url: currentLocation.url,
        breadcrumbs: currentLocation.breadcrumbs,
        parentId,
        level,
        highlight,
        filter,
    })

    return { items, isFiltered: filter !== null }
}

export const useListRenderModes = () => {
    const { filter } = useContext(TocContext)
    const isFiltered = filter !== null
    const isEmpty = isFiltered && filter.size === 0

    return { isFiltered, isEmpty }
}

export const useIsFiltered = () => {
    const { filter } = useContext(TocContext)

    return filter !== null
}

export const useIsLoading = () => {
    const { isLoading } = useContext(TocContext)

    return isLoading
}

export const useFilterInput = () => {
    const { isFiltering, onChange, onFilterStart, onReset } = useContext(FilterContext)
    const timeout = useRef<number>(0)

    const onChangeHandler = useCallback((value: string) => {
        const text = value.trim()

        if (text === '') {
            onReset()
            return
        }

        if (!isFiltering) {
            onFilterStart()
        }

        if (timeout.current) {
            clearTimeout(timeout.current)
        }

        timeout.current = window.setTimeout(() => {
            onChange(text)
        }, FILTER_DELAY_IN_MS)
    }, [isFiltering, onChange, onFilterStart, onReset])

    useEffect(() => () => {
        clearTimeout(timeout.current)
    }, [])

    return { onChange: onChangeHandler, isFiltering }
}
