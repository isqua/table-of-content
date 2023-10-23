import { useEffect, useReducer, type Reducer } from 'react'

interface DataFetcher<T> {
    (): Promise<T>
}

type RequestState<T> = {
    isLoading: boolean
    isError: boolean
    isSuccess: boolean
    data: T
}

type RequestSuccessAction<T> = {
    type: 'success'
    data: T
}

type RequestErrorAction = {
    type: 'error'
}

type RequestAction<T> = RequestErrorAction | RequestSuccessAction<T>

function requestReducer<T>(state: RequestState<T>, action: RequestAction<T>): RequestState<T> {
    if (action.type === 'success') {
        return {
            isLoading: false,
            isError: false,
            isSuccess: true,
            data: action.data,
        }
    } else {
        return {
            isLoading: false,
            isError: true,
            isSuccess: false,
            data: state.data,
        }
    }
}

function getInitialState<T>(placeholder: T): RequestState<T> {
    return {
        isLoading: true,
        isError: false,
        isSuccess: false,
        data: placeholder,
    }
}

export function useRequestWithPlaceholder<T>(fn: DataFetcher<T>, placeholder: T) {
    const [state, dispatch] = useReducer<Reducer<RequestState<T>, RequestAction<T>>>(
        requestReducer,
        getInitialState<T>(placeholder)
    )

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await fn()

                dispatch({
                    type: 'success',
                    data: result
                })
            } catch (_e: unknown) {
                dispatch({ type: 'error' })
            }
        }

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        fetchData()
    }, [fn, dispatch])

    return state
}
