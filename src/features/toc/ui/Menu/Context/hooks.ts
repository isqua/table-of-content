import { useCallback, useContext, useEffect, useRef } from 'react'

import { buildMenuSection } from '../../../core/buildMenuSection'
import type { PageId, SectionHighlight } from '../../../types'
import { FilterContext, TocContext } from './contexts'

const FILTER_DELAY_IN_MS = 1000

export const useSectionItems = (parentId: PageId = '', level: number = 0, highlight: SectionHighlight) => {
    const { toc, filter, url, breadcrumbs } = useContext(TocContext)

    const items = buildMenuSection(toc, {
        url,
        breadcrumbs,
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

    /**
     * Filter results should appear when the user enters the whole query.
     * So waiting for FILTER_DELAY_IN_MS until the user stops typing
     */
    const onChangeHandler = useCallback((value: string) => {
        if (timeout.current) {
            clearTimeout(timeout.current)
        }

        const text = value.trim()

        if (text === '') {
            onReset()
            return
        }

        if (!isFiltering) {
            onFilterStart()
        }

        timeout.current = window.setTimeout(() => {
            onChange(text.trim())
        }, FILTER_DELAY_IN_MS)
    }, [isFiltering, onChange, onFilterStart, onReset])

    useEffect(() => () => {
        clearTimeout(timeout.current)
    }, [])

    return { onChange: onChangeHandler, isFiltering }
}
