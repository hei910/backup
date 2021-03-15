import React, { useEffect, useRef } from 'react'
import Swiper from 'react-id-swiper'
import { useDispatch } from 'react-redux'
// import { useParams } from 'react-router-dom'
import { useSelector } from '@redux'
import { updateDisplayOptions } from '@services/sportGlobal/actions'
// import 'swiper/swiper.min.css'
// import './Swiper.css'
import useCustomParams from '@sport/hooks/useCustomParams'
import styled from 'styled-components/macro'

interface ComponentProps {
    children: any
}

// type paramType = 'bullets' | 'fraction' | 'progressbar' | 'custom' | undefined

const SPaginationContainer = styled.div`
    display: flex;
    position: relative;
    height: 100%;
    width: 100%;
`

const SPaginationItem = styled.div<{ isActive: boolean }>`
    width: 20px;
    height: 2px;
    background: ${(props) => (props.isActive ? '#bbbbbb' : '#eeeeee')};
`

const SPaginationItemLayout = styled.div`
    margin-left: 10px;
`

const SPaginationLayout = styled.div`
    position: absolute;
    bottom: 9px;
    left: 50%;
    display: flex;
    transform: translateX(-50%);
`

const CustomSwiper: React.FC<ComponentProps> = (props) => {
    const swiper = useRef<any>(null)
    const dispatch = useDispatch()
    const { sports } = useCustomParams()

    const halvesView = useSelector(
        (state) => state.sportGlobal.displayOptions?.[sports as 'football' | 'basketball']?.halvesView,
    )

    useEffect(() => {
        ;(swiper?.current?.swiper as any)?.update()
        ;(swiper?.current?.swiper as any)?.slideTo(halvesView === true ? 1 : 0)
    }, [halvesView])

    const params = {
        on: {
            slideChangeTransitionStart: () => {
                const isBeginning = (swiper.current.swiper as any)?.isBeginning
                dispatch(updateDisplayOptions({ halvesView: !isBeginning }, sports as 'football' | 'basketball'))
            },
        },
        spaceBetween: 15,
        pagination: false,
    }

    return (
        <SPaginationContainer>
            <Swiper ref={swiper} {...params}>
                {props.children}
            </Swiper>
            <SPaginationLayout>
                <SPaginationItem isActive={!halvesView} />
                <SPaginationItemLayout>
                    <SPaginationItem isActive={halvesView} />
                </SPaginationItemLayout>
            </SPaginationLayout>
        </SPaginationContainer>
    )
}

export default CustomSwiper
