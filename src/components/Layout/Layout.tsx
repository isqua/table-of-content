import type { PropsWithChildren } from 'react'

import styles from './Layout.module.css'

export function Layout({ children }: PropsWithChildren): JSX.Element {
    return (
        <div className={styles.layout}>
            {children}
        </div>
    )
}

Layout.Main = function Sidebar({ children }: PropsWithChildren): JSX.Element {
    return (
        <main className={styles.main}>
            {children}
        </main>
    )
}

Layout.Sidebar = function Sidebar({ children }: PropsWithChildren): JSX.Element {
    return (
        <div className={styles.sidebar}>
            {children}
        </div>
    )
}
