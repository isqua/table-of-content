import type { PropsWithChildren, ReactNode, RefObject } from 'react'
import { CSSTransition } from 'react-transition-group'
import type { CSSTransitionClassNames } from 'react-transition-group/CSSTransition'

type HeightTransitionProps = PropsWithChildren<{
    /** Show the component; triggers the enter or exit states */
    isVisible: boolean
    /** A React reference to DOM element that need to transition */
    nodeRef: RefObject<HTMLElement | null>
    /** The animation `classNames` applied to the component as it enters or exits */
    classNames: CSSTransitionClassNames
    /** Minimum expected height of the element, in case the element is not visible */
    minHeight: number
}>

function addEndListener(ref: RefObject<HTMLElement | null>) {
    return function (done: () => void) {
        const node = ref.current

        node?.addEventListener('transitionend', function onTransitionEnd(event) {
            if (event.target === node) {
                done()
            }
        })
    }
}

function adjustMaximumHeightBeforeTransition(ref: RefObject<HTMLElement | null>, minHeight: number) {
    return function() {
        if (ref.current) {
            const height = ref.current.offsetHeight

            if (height > 0) {
                // Create transition from actual element height
                // if element is outside the viewport, height must be not precise,
                // then fallback to minimum element height
                ref.current.style.maxHeight = `${String(Math.max(height, minHeight))}px`
            }
        }
    }
}

export function HeightTransition(props: HeightTransitionProps): ReactNode {
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
