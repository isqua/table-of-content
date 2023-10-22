import type { PropsWithChildren, ReactElement } from 'react'
import { render, type RenderOptions } from '@testing-library/react'

import { TestRouter } from '../components/Router'

type AppProvidersProps = {
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
