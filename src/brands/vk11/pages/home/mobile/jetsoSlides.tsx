import useJetso from '@hooks/useJetso'
import styled from 'styled-components/macro'
import { directToJetsoArticle } from '@utils/v1Functions'
import SwiperCore, { Autoplay, Pagination } from 'swiper'
import { PaginationOptions } from 'swiper/types/components/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'

import { ratioHeightForMobile } from '@mixins/ratioLength'
import bgImg from '@mixins/backgroundImg'
import colors from '@styles/colors'

const Container = styled.div`
    ${ratioHeightForMobile(132)};
    position: relative;
    width: 100%;

    .swiper-container {
        position: unset;
    }

    .swiper-pagination-clickable.swiper-pagination-bullets {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 15px 0 17px;
        position: absolute;
        bottom: 0;

        .swiper-pagination-bullet {
            opacity: 0.2;
            border: solid 1px #000000;
            border-radius: 5px;
            transition-duration: 0.3s;
            margin: 0 0 0 6px;

            :first-child {
                margin: 0;
            }
        }

        .swiper-pagination-bullet-active {
            width: 16px;
            opacity: 1;
            border: solid 1px ${colors.brand};
            background-color: ${colors.brand};
        }
    }
`

const SwiperCard = styled.div<{ bg: string }>`
    ${(props) => bgImg(props.bg, 'cover')}
    ${ratioHeightForMobile(98)}
    width: calc(100% - 30px);
    border-radius: 10px;
    margin: 0 15px;
`

SwiperCore.use([Autoplay, Pagination])

const paginationProps: PaginationOptions = {
    clickable: true,
    type: 'bullets',
}

const swiperProps = {
    spaceBetween: 0,
    slidesPerView: 1,
    loop: true,
    loopAdditionalSlides: 2,
    autoplay: {
        delay: 8000,
        disableOnInteraction: false,
    },
    pagination: paginationProps,
}

const JetsoSlides: React.FC<{}> = () => {
    const { articles, isReady } = useJetso(true)

    const onSlideClick = (rowId: number) => {
        directToJetsoArticle(rowId)
    }

    return (
        <Container>
            {isReady && (
                <Swiper {...swiperProps}>
                    {articles.slice(0, 3).map((jetsoArticle, i) => {
                        return (
                            <SwiperSlide data-qa={`btnJetso${i + 1}`} key={`jetso-${jetsoArticle.orderId}`} onClick={() => onSlideClick(jetsoArticle.rowId)}>
                                <SwiperCard bg={`${process.env.CDN_DOMAIN}/${jetsoArticle.mobileHomepageUrl}`} />
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            )}
        </Container>
    )
}

export default JetsoSlides
