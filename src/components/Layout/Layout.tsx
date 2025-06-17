import type { PropsWithChildren, ReactNode } from 'react'

import styles from './Layout.module.css'

export function Layout({ children }: PropsWithChildren): ReactNode {
    return (
        <div className={styles.layout}>
            {children}
        </div>
    )
}

Layout.Main = function Main({ children }: PropsWithChildren): ReactNode {
    return (
        <main className={styles.main}>
            {children}
        </main>
    )
}

Layout.Sidebar = function Sidebar({ children }: PropsWithChildren): ReactNode {
    return (
        <div className={styles.sidebar}>
            {children}
        </div>
    )
}
