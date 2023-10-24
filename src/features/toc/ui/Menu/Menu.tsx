import { TransitionGroup } from 'react-transition-group'

import { useCurrentPageUrl } from '../../../../hooks/useCurrentPageUrl'
import type { TableOfContent } from '../../types'
import { MenuProvider } from './Context/MenuProvider'
import { Filter } from './Filter/Filter'
import { Section } from './Section/Section'

import styles from './Menu.module.css'

export type MenuProps = {
    toc: TableOfContent
    isLoading?: boolean
}

export function Menu({ toc, isLoading }: MenuProps): JSX.Element {
    const currentUrl = useCurrentPageUrl()

    return (
        <nav className={styles.menu}>
            <MenuProvider toc={toc} url={currentUrl} isLoading={isLoading}>
                {!isLoading && <Filter />}
                <ul className={styles.list}>
                    {isLoading && (<Section parentId='' level={0} />)}
                    {!isLoading && (
                        <TransitionGroup component={null}>
                            <Section parentId='' level={0} />
                        </TransitionGroup>
                    )}
                </ul>
            </MenuProvider>
        </nav>
    )
}
