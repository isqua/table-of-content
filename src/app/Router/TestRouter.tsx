import { PropsWithChildren } from 'react'
import { RouterProvider, createMemoryRouter } from 'react-router'

type TestRouterProps = PropsWithChildren<{
    /** Current URL */
    url?: string
}>

export function TestRouter({ url = '/', children }: TestRouterProps) {
    const router = createMemoryRouter([
        {
            path: '*',
            element: children,
        }
    ], {
        initialEntries: [url],
        initialIndex: 0,
    })

    return (
        <RouterProvider router={router} />
    )
}
