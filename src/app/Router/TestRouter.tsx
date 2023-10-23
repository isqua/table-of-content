import { PropsWithChildren } from 'react'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'

type TestRouterProps = PropsWithChildren<{
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
