import type { PropsWithChildren, RefObject } from 'react'
import { CSSTransition } from 'react-transition-group'
import type { CSSTransitionClassNames } from 'react-transition-group/CSSTransition'

type ItemTransitionProps = PropsWithChildren<{
    isVisible: boolean
    nodeRef: RefObject<HTMLElement>
    classNames: CSSTransitionClassNames
    minHeight: number
}>

function addEndListener(ref: RefObject<HTMLElement>) {
    return function (done: () => void) {
        const node = ref.current

        node?.addEventListener('transitionend', function onTransitionEnd(event) {
            if (event.target === node) {
                done()
            }
        })
    }
}

function adjustMaximumHeightBeforeTransition(ref: RefObject<HTMLElement>, minHeight: number) {
    return function() {
        if (ref.current) {
            const height = ref.current.offsetHeight

            if (height > 0) {
                // Create transition from actual item height
                // if item is outside the viewport, height must be not precise,
                // then fallback to minimum item height
                ref.current.style.maxHeight = `${Math.max(height, minHeight)}px`
            }
        }
    }
}

export function HeightTransition(props: ItemTransitionProps): JSX.Element {
    const { isVisible, children, nodeRef, classNames, minHeight } = props

    return (
        <CSSTransition
            mountOnEnter
            unmountOnExit
            nodeRef={nodeRef}
            in={isVisible}
            addEndListener={addEndListener(nodeRef)}
            onExit={adjustMaximumHeightBeforeTransition(nodeRef, minHeight)}
            classNames={classNames}
        >
            {children}
        </CSSTransition>
    )
}
