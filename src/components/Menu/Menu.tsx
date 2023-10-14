import { type PageURL, type TableOfContent } from '../../features/toc'
import { Section } from './Section/Section'
import { MenuProvider } from './Context/MenuProvider'

import styles from './Menu.module.css'

type MenuProps = {
    toc: TableOfContent
    url: PageURL
}

export function Menu({ toc, url }: MenuProps): JSX.Element {
    return (
        <nav className={styles.menu}>
            <ul className={styles.list}>
                <MenuProvider toc={toc} url={url}>
                    <Section parentId='' level={0} />
                </MenuProvider>
            </ul>
        </nav>
    )
}
