import { useMemo } from 'react'
import useJetso from '@hooks/useJetso'
import styled from 'styled-components/macro'
import { directToJetsoArticle, directToJetso } from '@utils/v1Functions'
import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import jetsoDetailImg from '@brand/assets/images/home/mobile/jetso-detail.png'

import bgImg from '@mixins/backgroundImg'
import { ratioHeightForMobile } from '@mixins/ratioLength'

const Container = styled.div`
    width: 100vw;
`

const SwiperCard = styled.div<{ bg: string }>`
    ${(props) => bgImg(props.bg, 'cover')}
    ${ratioHeightForMobile(130)}
    width: 90vw;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.18);
    border-radius: 20px;
    margin: 10px 5vw;
`

SwiperCore.use([Autoplay])

const JetsoSlides: React.FC<{}> = () => {
    const { articles, isReady } = useJetso(true)

    const swiperProps = useMemo(
        () => ({
            height: 150,
            spaceBetween: -27,
            slidesPerView: 1,
            initialSlide: 0,
            loop: true,
            loopAdditionalSlides: 2,
            autoplay: {
                delay: 8000,
                disableOnInteraction: false,
            },
        }),
        [],
    )

    const onSlideClick = (rowId: number) => {
        directToJetsoArticle(rowId)
    }

    if (!isReady) {
        return (
            <Container>
                <SwiperSlide onClick={directToJetso}>
                    <SwiperCard bg={jetsoDetailImg} />
                </SwiperSlide>
            </Container>
        )
    }

    return (
        <Container>
            <Swiper {...swiperProps}>
                {articles.map((jetsoArticle, index) => {
                    return (
                        <SwiperSlide
                            key={`jetso-${jetsoArticle.orderId}`}
                            data-qa={`btnJetso${index + 1}`}
                            onClick={() => onSlideClick(jetsoArticle.rowId)}>
                            <SwiperCard bg={`${process.env.CDN_DOMAIN}/${jetsoArticle.mobileHomepageUrl}`} />
                        </SwiperSlide>
                    )
                })}
                <SwiperSlide onClick={directToJetso} data-qa="btnMoreJetso">
                    <SwiperCard bg={jetsoDetailImg} />
                </SwiperSlide>
            </Swiper>
        </Container>
    )
}

export default JetsoSlides
