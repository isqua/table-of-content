import { type PageDescriptor } from '../../features/toc'

import styles from './Article.module.css'

type ArticleProps = {
    page: PageDescriptor
}

export function Article({ page }: ArticleProps) {
    return (
        <article className={styles.article}>
            <h1 className={styles.title}>{page.title}</h1>
        </article>
    )
}
