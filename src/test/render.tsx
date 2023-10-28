import type { PropsWithChildren, ReactElement } from 'react'
import { render, renderHook, type RenderOptions } from '@testing-library/react'

import { TestRouter } from '../app/Router'

type AppProvidersProps = {
    /** Current URL */
    url?: string
}

type CustomRenderOptions = Omit<RenderOptions, 'wrapper'> & AppProvidersProps

export const renderInApp = (
    ui: ReactElement,
    options?: CustomRenderOptions,
) => {
    const AllTheProviders = ({ children }: PropsWithChildren) => (
        <TestRouter url={options?.url}>{children}</TestRouter>
    )

    render(ui, {
        wrapper: AllTheProviders,
        ...options
    })
}

export const renderHookInApp = <Result, Props>(
    hook: (initialProps: Props) => Result,
    options?: CustomRenderOptions,
) => {
    const AllTheProviders = ({ children }: PropsWithChildren) => (
        <TestRouter url={options?.url}>{children}</TestRouter>
    )

    return renderHook(hook, {
        wrapper: AllTheProviders,
        ...options
    })
}
