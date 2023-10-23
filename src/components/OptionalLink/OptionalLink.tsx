import type { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

export type OptionalLinkProps = PropsWithChildren<{
    to?: string
    className?: string
    onClick?: () => void
}>

export function OptionalLink({ to, className, children, onClick }: OptionalLinkProps) {
    if (to) {
        return (<Link to={to} className={className} onClick={onClick}>{children}</Link>)
    }

    return (<span className={className} onClick={onClick}>{children}</span>)
}
