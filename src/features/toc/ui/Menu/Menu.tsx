
import type { TableOfContent } from '../../types'
import { MenuProvider } from './Context/MenuProvider'
import { Filter } from './Filter/Filter'
import { List } from './List/List'

import styles from './Menu.module.css'

export type MenuProps = {
    toc: TableOfContent
    activeUrl: string
    isLoading?: boolean
}

export function Menu({ toc, activeUrl, isLoading }: MenuProps): JSX.Element {
    return (
        <nav className={styles.menu}>
            <MenuProvider toc={toc} url={activeUrl} isLoading={isLoading}>
                <Filter />
                <List />
            </MenuProvider>
        </nav>
    )
}
