import { useState, useEffect, useCallback, useRef } from 'react'
import styled from 'styled-components/macro'
import { INavigatorProps } from './types'
import NavigatorIcons from '@brand/assets/images/home/mobile/navigator_icons.png'

import imageSprite from '@mixins/imageSprite'

const SectionNavigator = styled.div`
    position: sticky;
    top: 0;
    display: flex;
    width: 100%;
    height: 78px;
    padding: 16px 20px 24px;
    background-color: #ffffff;
    transition-duration: 0.3s;
    z-index: ${(props) => props.theme.vars.homeNavigatorZIndex};
`

const NavigatorIcon = styled.div<{ iconIndex: number }>`
    ${(props) =>
        imageSprite({
            url: NavigatorIcons,
            width: 37,
            height: 37,
            itemIndex: props.iconIndex,
            indexMap: {
                default: 1,
                active: 0,
            },
        })}
    width: 37px;
    height: 37px;
`

const NavigatorItem = styled.div<{ isActive?: boolean }>`
    border-bottom: 2px solid ${(props) => (props.isActive ? '#3d7eeb' : '#ffffff')};
    display: flex;
    justify-content: center;
    flex: 1;
`

const Navigator: React.FC<INavigatorProps> = ({ refs, pageRef }) => {
    const [activeItem, setActiveItem] = useState(0)
    const navigatorRef = useRef<HTMLDivElement>(null)

    const getNavigatorHeight = useCallback(() => {
        if (navigatorRef.current) {
            return navigatorRef.current.clientHeight
        } else {
            return 0
        }
    }, [])

    const getOffsetTop = useCallback(
        (ref: React.RefObject<HTMLDivElement>) => {
            if (ref.current && pageRef.current) {
                if (pageRef.current.parentElement) {
                    return ref.current.offsetTop - pageRef.current.parentElement.offsetTop - getNavigatorHeight()
                } else {
                    return 0
                }
            } else {
                return 0
            }
        },
        [getNavigatorHeight, pageRef]
    )

    const scrollToSection = useCallback(
        (ref: React.RefObject<HTMLDivElement>) => {
            if (ref.current && pageRef.current) {
                if (pageRef.current.parentElement) {
                    pageRef.current.parentElement.scrollTo({
                        top: getOffsetTop(ref),
                        behavior: 'smooth',
                    })
                }
            }
        },
        [getOffsetTop, pageRef]
    )

    const checkInView = useCallback(() => {
        refs.forEach((ref, idx) => {
            if (ref.current && pageRef.current) {
                if (pageRef.current.parentElement) {
                    if (pageRef.current.parentElement.scrollTop <= getOffsetTop(ref) + ref.current.clientHeight && pageRef.current.parentElement.scrollTop >= getOffsetTop(ref) * 0.95) {
                        setActiveItem(idx)
                    }
                }
            }
        })
    }, [refs, getOffsetTop, pageRef])

    useEffect(() => {
        if (pageRef.current) {
            if (pageRef.current.parentElement) {
                pageRef.current.parentElement.addEventListener('scroll', checkInView)
            }
        }
    }, [checkInView, pageRef])

    return (
        <SectionNavigator ref={navigatorRef}>
            {refs.map((_, idx) => {
                return (
                    <NavigatorItem data-qa={`btnNavItem${idx + 1}`} onClick={() => scrollToSection(refs[idx])} key={`nav-item-${idx}`} isActive={activeItem === idx}>
                        <NavigatorIcon className={activeItem === idx ? 'active' : ''} iconIndex={idx} />
                    </NavigatorItem>
                )
            })}
        </SectionNavigator>
    )
}

export default Navigator
