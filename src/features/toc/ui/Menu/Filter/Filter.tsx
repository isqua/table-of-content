import { Input } from '../../../../../components/Input'
import { useFilterInput } from '../Context/hooks'

import styles from './Filter.module.css'

export function Filter(): JSX.Element {
    const { onChange, isLoading } = useFilterInput()

    return (
        <div className={styles.filter}>
            <Input
                onChange={onChange}
                isLoading={isLoading}
                placeholder='Filter menu'
            />
        </div>
    )
}
