import { useState, useEffect, useRef, useCallback } from 'react'
import styled from 'styled-components/macro'
import ResizeObserver from 'rc-resize-observer'

interface ICollapse {
    isExpanded: boolean
    defaultHeight?: number
    transitionDuration?: number
}

const OuterContainer = styled.div<{ height: string; transitionDuration: number }>`
    height: ${(props) => props.height};
    overflow: hidden;
    transition-duration: ${(props) => props.transitionDuration}s;
`

const InnerContainer = styled.div`
    height: auto;
    overflow: auto;
`

const Collapse: React.FC<ICollapse> = ({ isExpanded, defaultHeight = 0, transitionDuration = 0.3, children }) => {
    const [realTransitionDuration, setRealTransitionDuration] = useState(transitionDuration)
    const [displayHeight, setDisplayHeight] = useState(`${defaultHeight}px` || '0px')
    const innerContainerRef = useRef<HTMLDivElement>(null)

    const onResize = useCallback(
        ({ height }: { height: number }) => {
            if (isExpanded) {
                setRealTransitionDuration(0)
                setDisplayHeight(`${height}px`)
            }
        },
        [isExpanded],
    )

    const onCollapse = useCallback(() => {
        setRealTransitionDuration(transitionDuration)
        setDisplayHeight(`${defaultHeight}px`)
    }, [defaultHeight, transitionDuration])

    useEffect(() => {
        if (isExpanded) {
            if (innerContainerRef.current) {
                const overallHeight = innerContainerRef.current.clientHeight
                setRealTransitionDuration(transitionDuration)
                setDisplayHeight(`${overallHeight}px`)
            }
        } else {
            onCollapse()
        }
    }, [isExpanded, innerContainerRef, onResize, onCollapse, transitionDuration])

    return (
        <OuterContainer height={displayHeight} transitionDuration={realTransitionDuration}>
            <ResizeObserver onResize={onResize}>
                <InnerContainer ref={innerContainerRef}>{children}</InnerContainer>
            </ResizeObserver>
        </OuterContainer>
    )
}

export default Collapse
