import { type TableOfContent } from '../../features/toc'
import { useCurrentPageUrl } from '../../hooks/useCurrentPageUrl'
import { MenuProvider } from './Context/MenuProvider'
import { Section } from './Section/Section'

import styles from './Menu.module.css'

type MenuProps = {
    toc: TableOfContent
}

export function Menu({ toc }: MenuProps): JSX.Element {
    const currentUrl = useCurrentPageUrl()

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
