import { useLocation } from 'react-router-dom'

import { type TableOfContent } from '../../features/toc'
import { Section } from './Section/Section'
import { MenuProvider } from './Context/MenuProvider'

import styles from './Menu.module.css'

type MenuProps = {
    toc: TableOfContent
}

export function Menu({ toc }: MenuProps): JSX.Element {
    const location = useLocation()
    const currentUrl = location.pathname.replace(/^\//, '')

    return (
        <nav className={styles.menu}>
            <ul className={styles.list}>
                <MenuProvider toc={toc} url={currentUrl}>
                    <Section parentId='' level={0} />
                </MenuProvider>
            </ul>
        </nav>
    )
}
