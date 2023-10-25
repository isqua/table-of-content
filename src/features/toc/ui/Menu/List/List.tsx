import { TransitionGroup } from 'react-transition-group'

import { useIsLoading, useListRenderModes } from '../Context/hooks'
import { Section } from '../Section/Section'

import styles from './List.module.css'

export function List() {
    const isLoading = useIsLoading()
    const { isEmpty, isFiltered } = useListRenderModes()

    if (isEmpty) {
        return (
            <p className={styles.empty}>No pages found by your request</p>
        )
    }

    if (isLoading || isFiltered) {
        return (
            <ul className={styles.list}>
                <Section parentId='' level={0} />
            </ul>
        )
    }

    return (
        <ul className={styles.list}>
            <TransitionGroup component={null}>
                <Section parentId='' level={0} />
            </TransitionGroup>
        </ul>
    )
}
