import type { RouteObject } from 'react-router'

import { Root } from '../Root'

export const routes: RouteObject[] = [
    {
        path: '*',
        element: <Root />,
    },
]
