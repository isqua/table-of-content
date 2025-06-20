
import type { ReactNode } from 'react'
import type { TableOfContent } from '../../types'
import { MenuProvider } from './Context/MenuProvider'
import { Filter } from './Filter/Filter'
import { List } from './List/List'

import styles from './Menu.module.css'

export interface MenuProps {
    /** The whole TOC tree */
    toc: TableOfContent
    /** Current URL */
    activeUrl: string
    /** Is the TOC loading */
    isLoading?: boolean
}

export function Menu({ toc, activeUrl, isLoading }: MenuProps): ReactNode {
    return (
        <nav className={styles.menu}>
            <MenuProvider toc={toc} url={activeUrl} isLoading={isLoading}>
                <Filter />
                <List />
            </MenuProvider>
        </nav>
    )
}
