import clsx from 'clsx'

import { Input } from '../../../../../components/Input'
import { Skeleton } from '../../../../../components/Skeleton'
import { useFilterInput, useIsLoading } from '../Context/hooks'

import styles from './Filter.module.css'

export function Filter(): JSX.Element {
    const isLoading = useIsLoading()
    const { onChange, isFiltering } = useFilterInput()

    return (
        <div className={clsx(styles.filter)}>
            {isLoading ? (<Skeleton />) : (
                <Input
                    onChange={onChange}
                    isLoading={isFiltering}
                    placeholder='Filter menu'
                />
            )}
        </div>
    )
}
