import { useReducer, type Reducer } from 'react'

interface DataFilter<T> {
    (text: string): T
}

export type FilterActions = {
    onFilterStart: () => void
    onReset: () => void
    onChange: (text: string) => void
}

export type UseFilterResult<T> = {
    state: FilterState<T>
    actions: FilterActions
}

type FilterState<T> = {
    isLoading: boolean
    text: string
    data: null | T
}

type StartFilterAction = {
    type: 'start'
}

type ChangeFilterAction<T> = {
    type: 'change'
    text: string
    data: T
}

type ResetFilterAction = {
    type: 'reset'
}

type RequestAction<T> = StartFilterAction | ChangeFilterAction<T> | ResetFilterAction

function requestReducer<T>(state: FilterState<T>, action: RequestAction<T>): FilterState<T> {
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
        requestReducer,
        initialFilterState,
    )

    const onFilterStart = () => {
        dispatch({ type: 'start' })
    }

    const onChange = (text: string) => {
        const data = fn(text)

        dispatch({ type: 'change', text, data })
    }

    const onReset = () => {
        dispatch({ type: 'reset' })
    }

    return {
        state,
        actions: {
            onFilterStart,
            onChange,
            onReset,
        }
    }
}
