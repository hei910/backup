import { clearAllBodyScrollLocks } from 'body-scroll-lock'
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components/macro'

interface IScrollView {
    children: any
    className?: string
    open?: boolean
}

const SScrollViewRoot = styled.div``

const ScrollView: React.FC<IScrollView> = ({ children, open, className }) => {
    const node = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // if (node && node.current) {
        //   disableBodyScroll(node.current, { reserveScrollBarGap: true });
        // }

        return () => {
            // if (node && node.current) {
            //     // eslint-disable-next-line react-hooks/exhaustive-deps
            //     enableBodyScroll(node.current)
            // }
            clearAllBodyScrollLocks()
        }
    }, [])

    useEffect(() => {
        // if (node && node.current) {
        //     open
        //         ? disableBodyScroll(node.current, {
        //               reserveScrollBarGap: true,
        //           })
        //         : enableBodyScroll(node.current)
        // }
    }, [open])

    if (children) {
        return (
            <SScrollViewRoot ref={node} className={className}>
                {children}
            </SScrollViewRoot>
        )
    }

    return <div ref={node} />
}

export default ScrollView
