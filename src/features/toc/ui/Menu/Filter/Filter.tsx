import { Input } from '../../../../../components/Input'
import { useFilterInput } from '../Context/hooks'

import styles from './Filter.module.css'

export function Filter(): JSX.Element {
    const { onChange, isFiltering } = useFilterInput()

    return (
        <div className={styles.filter}>
            <Input
                onChange={onChange}
                isLoading={isFiltering}
                placeholder='Filter menu'
            />
        </div>
    )
}
