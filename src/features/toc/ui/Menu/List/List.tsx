import { TransitionGroup } from 'react-transition-group'

import { useIsLoading, useListRenderModes } from '../Context/hooks'
import { Section } from '../Section/Section'

import styles from './List.module.css'

/**
 * Renders the root list of the menu. While loading it shows a skeleton,
 * and if nothing is found by filter, shows a message that nothing was found
 *
 * Wraps the menu in transitions provider for smooth collapsing animations
 */
export function List() {
    const isLoading = useIsLoading()
    const { isEmpty, isFiltered } = useListRenderModes()

    if (isEmpty) {
        return (
            <p className={styles.empty}>No pages found by your request</p>
        )
    }

    /**
     * Do not use animations when the component is filtered or loaded,
     * as the user is not interacting with the menu directly,
     * so the animation may distract them
     */
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
