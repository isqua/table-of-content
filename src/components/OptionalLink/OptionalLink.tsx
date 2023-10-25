import type { KeyboardEvent, PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

type OptionalLinkProps = PropsWithChildren<{
    to?: string
    className?: string
    onClick?: () => void
}>

type ClickableLinkProps = PropsWithChildren<{
    onClick: () => void
    className?: string
}>

function captureKey(key: string, callback: () => void) {
    return function (event: KeyboardEvent) {
        if (event.key === key) {
            callback()
        }
    }
}

function ClickableLink({ className, children, onClick }: ClickableLinkProps) {
    return (
        <span
            tabIndex={0}
            role="button"
            className={className}
            onClick={onClick}
            onKeyUp={captureKey('Enter', onClick)}
        >
            {children}
        </span>
    )
}

export function OptionalLink({ to, className, children, onClick }: OptionalLinkProps) {
    if (to) {
        return (<Link to={to} className={className} onClick={onClick}>{children}</Link>)
    }

    if (onClick) {
        return (<ClickableLink className={className} onClick={onClick}>{children}</ClickableLink>)
    }

    return (<span className={className}>{children}</span>)
}
