import type { RouteObject } from 'react-router-dom'

import { Root } from '../Root'

export const routes: RouteObject[] = [
    {
        path: '*',
        element: <Root />,
    },
]
