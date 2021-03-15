import styled, { css, keyframes } from 'styled-components/macro'
import SwiperCore, { Autoplay, EffectFade, Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import bgImg from '@mixins/backgroundImg'

import Banner1 from '@brand/assets/images/downloadApp/mobile/1@2x.png'
import Banner2 from '@brand/assets/images/downloadApp/mobile/2@2x.png'
import Banner3 from '@brand/assets/images/downloadApp/mobile/3@2x.png'
import Banner4 from '@brand/assets/images/downloadApp/mobile/4@2x.png'
import Banner5 from '@brand/assets/images/downloadApp/mobile/5@2x.png'
import LeftArrow from '@brand/assets/images/downloadApp/mobile/left-arrow.svg'
import RightArrow from '@brand/assets/images/downloadApp/mobile/right-arrow.svg'
import { useMemo, useState } from 'react'

const SlideUpKeyframes = keyframes`
    0% {bottom: -30px;}
    100% {bottom: 0;}
`

const SlideDownKeyframes = keyframes`
    0% {bottom: 0;}
    100% {bottom: -30px;}
`

const FadeInKeyframes = keyframes`
    0% {opacity: 0;}
    100% {opacity: 1;}
`

const FadeOutKeyframes = keyframes`
    0% {opacity: 1;}
    100% {opacity: 0;}
`

const InAnimationCss = css`
    animation: ${FadeInKeyframes} 0.5s 0s ease-in both 1 normal, ${SlideUpKeyframes} 0.5s 0s ease-in both 1 normal;
`

const OutAnimationCss = css`
    animation: ${FadeOutKeyframes} 0.5s 0s ease-out both 1 normal, ${SlideDownKeyframes} 0.5s 0s ease-out both 1 normal;
`

const SSwiperCard = styled.div<{ bg: string }>`
    width: 100%;
    height: 309px;
    margin: 0 auto;
    cursor: pointer;
    ${(props) => bgImg(props.bg, 'contain')}
`

const SLayout = styled.div<{ isReady: boolean }>`
    position: relative;

    .swiper-container {
        margin-top: -36px;
        padding-bottom: 32px;
    }

    .swiper-slide {
        visibility: hidden;
        ${(props) => props.isReady && OutAnimationCss}

        &.swiper-slide-prev {
            visibility: ${(props) => (props.isReady ? 'visible' : 'hidden')};
        }

        &.swiper-slide-active,
        &.swiper-slide-duplicate-active {
            visibility: visible;
            ${(props) => props.isReady && InAnimationCss}
        }
    }

    .swiper-pagination-bullet {
        width: 24px;
        border-radius: 6px;
        box-shadow: 0 3px 6px 0 #a4b9db;
        background-color: #f8f8f8;
        transition-duration: 500ms;

        &.swiper-pagination-bullet-active {
            width: 32px;
            border-radius: 6px;
            box-shadow: 0 3px 6px 0 #a4b9db;
            background-color: #ffffff;
        }
    }
`

const SArrowBtn = styled.div`
    position: absolute;
    top: 160px;
    width: 48px;
    height: 48px;
    z-index: 10;
    cursor: pointer;
`

const SPrevBtn = styled(SArrowBtn)`
    left: 0;
    ${bgImg(LeftArrow)}
`

const SNextBtn = styled(SArrowBtn)`
    right: 0;
    ${bgImg(RightArrow)}
`

SwiperCore.use([Autoplay, Pagination, Navigation, EffectFade])

const Banner = () => {
    const [isReady, setIsReady] = useState(false)
    const banners = useMemo(() => [Banner1, Banner2, Banner3, Banner4, Banner5], [])

    return (
        <SLayout isReady={isReady}>
            <Swiper
                height={309}
                initialSlide={0}
                slidesPerView={1}
                loop={true}
                loopPreventsSlide={false}
                autoplay={{
                    delay: 8000,
                    waitForTransition: false,
                }}
                effect="fade"
                onSlideChange={(swiper) => {
                    if (swiper.realIndex !== 0) {
                        setIsReady(true)
                    }
                }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                pagination={{
                    clickable: true,
                }}>
                {banners.map((banner, index) => (
                    <SwiperSlide key={`banner-slide-${index}`}>
                        <SSwiperCard bg={banner} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <SPrevBtn className="swiper-button-prev" />
            <SNextBtn className="swiper-button-next" />
        </SLayout>
    )
}

export default Banner
