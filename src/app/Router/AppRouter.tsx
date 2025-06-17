import { RouterProvider, createBrowserRouter } from 'react-router'

import { routes } from './routes'

const router = createBrowserRouter(routes, {
    basename: import.meta.env.BASE_URL,
})

export function AppRouter() {
    return (
        <RouterProvider router={router} />
    )
}
