import { type PageDescriptor } from '../../features/toc'
import { BreadCrumbs } from '../BreadCrumbs'

import styles from './Article.module.css'

type ArticleProps = {
    /** A page to display */
    page: PageDescriptor
    /** Array of its ancestors including the page itself */
    breadcrumbs: PageDescriptor[]
}

export function Article({ page, breadcrumbs }: ArticleProps) {
    return (
        <article className={styles.article}>
            <BreadCrumbs items={breadcrumbs} />
            <h1 className={styles.title}>{page.title}</h1>
        </article>
    )
}
