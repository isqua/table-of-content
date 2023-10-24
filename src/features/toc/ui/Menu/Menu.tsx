import { TransitionGroup } from 'react-transition-group'

import { useCurrentPageUrl } from '../../../../hooks/useCurrentPageUrl'
import type { TableOfContent } from '../../types'
import { MenuProvider } from './Context/MenuProvider'
import { Section } from './Section/Section'

import styles from './Menu.module.css'

type MenuProps = {
    toc: TableOfContent
    isLoading?: boolean
}

export function Menu({ toc, isLoading }: MenuProps): JSX.Element {
    const currentUrl = useCurrentPageUrl()

    return (
        <nav className={styles.menu}>
            <ul className={styles.list}>
                <MenuProvider toc={toc} url={currentUrl} isLoading={isLoading}>
                    {isLoading && (<Section parentId='' level={0} />)}
                    {!isLoading && (
                        <TransitionGroup component={null}>
                            <Section parentId='' level={0} />
                        </TransitionGroup>
                    )}
                </MenuProvider>
            </ul>
        </nav>
    )
}
