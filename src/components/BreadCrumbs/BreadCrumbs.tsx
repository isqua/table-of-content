import { PageDescriptor } from '../../features/toc'
import { OptionalLink } from '../OptionalLink'

import styles from './BreadCrumbs.module.css'

type BreadCrumbsProps = {
    items: PageDescriptor[]
}

export function BreadCrumbs({ items }: BreadCrumbsProps) {
    return (
        <ol className={styles.breadcrumbs}>
            {items.map((item) => (
                <li key={item.id} className={styles.item}>
                    <OptionalLink to={item.url} className={styles.link}>
                        {item.title}
                    </OptionalLink>
                </li>
            ))}
        </ol>
    )
}
