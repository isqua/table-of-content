import type { KeyboardEvent, PropsWithChildren } from 'react'
import { Link } from 'react-router'

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
    return (event: KeyboardEvent) => {
        if (event.key === key) {
            callback()
        }
    }
}

function ClickableLink({ className, children, onClick }: ClickableLinkProps) {
    return (
        // biome-ignore lint/a11y/useSemanticElements: todo
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

export function OptionalLink({
    to,
    className,
    children,
    onClick,
}: OptionalLinkProps) {
    if (to) {
        return (
            <Link to={to} className={className} onClick={onClick}>
                {children}
            </Link>
        )
    }

    if (onClick) {
        return (
            <ClickableLink className={className} onClick={onClick}>
                {children}
            </ClickableLink>
        )
    }

    return <span className={className}>{children}</span>
}
