import { useReducer, type Reducer, useMemo } from 'react'

type DataFilter<T> = (text: string) => T

export interface FilterActions {
    onFilterStart: () => void
    onReset: () => void
    onChange: (text: string) => void
}

export interface UseFilterResult<T> {
    data: null | T
    manager: FilterActions & { isFiltering: boolean }
}

export interface FilterState<T> {
    isLoading: boolean
    text: string
    data: null | T
}

interface StartFilterAction {
    type: 'start'
}

interface ChangeFilterAction<T> {
    type: 'change'
    text: string
    data: T
}

interface ResetFilterAction {
    type: 'reset'
}

type RequestAction<T> = StartFilterAction | ChangeFilterAction<T> | ResetFilterAction

function filterReducer<T>(state: FilterState<T>, action: RequestAction<T>): FilterState<T> {
    switch (action.type) {
        case 'start':
            return {
                ...state,
                isLoading: true
            }
        case 'change':
            return {
                isLoading: false,
                text: action.text,
                data: action.data,
            }
        case 'reset':
            return initialFilterState
    }
}

function noop() {}

export const noopFilterActions: FilterActions = {
    onFilterStart: noop,
    onChange: noop,
    onReset: noop,
}

export const initialFilterState = {
    isLoading: false,
    text: '',
    data: null,
}

export function useFilter<T>(fn: DataFilter<T>): UseFilterResult<T> {
    const [state, dispatch] = useReducer<Reducer<FilterState<T>, RequestAction<T>>>(
        filterReducer,
        initialFilterState,
    )

    const manager = useMemo(() => ({
        isFiltering: state.isLoading,
        onFilterStart: () => {
            dispatch({ type: 'start' })
        },
        onChange: (text: string) => {
            const data = fn(text)

            dispatch({ type: 'change', text, data })
        },
        onReset: () => {
            dispatch({ type: 'reset' })
        },
    }), [fn, state.isLoading])

    return {
        data: state.data,
        manager,
    }
}
