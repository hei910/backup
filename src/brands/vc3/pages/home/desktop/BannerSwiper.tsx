import { getPromotionBannerList } from '@services/promotion/api'
import { PromotionBanner } from '@services/promotion/types'
import { directFromLinkMap, directToJetsoArticle } from '@utils/v1Functions'
import { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components/macro'
import SwiperCore, { Autoplay, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { PaginationOptions } from 'swiper/types/components/pagination'
import bgImg from '@mixins/backgroundImg'

const SLayout = styled.div`
    height: 280px;
`

const PaginationBullets = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 0;

    .swiper-pagination-bullet {
        margin: 0 3px;
        width: 20px;
        height: 0;
        border: solid 1px #000000;
        border-radius: 5px;
        opacity: 0.2;
        transition-duration: 0.3s;
        cursor: pointer;
    }

    .swiper-pagination-bullet-active {
        opacity: 1;
        border: solid 1px #0c186c;
    }
`

const SwiperCard = styled.div<{ bg: string }>`
    ${(props) => bgImg(props.bg, 'cover')}
    width: 100%;
    height: 280px;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.18);
    cursor: pointer;
`

SwiperCore.use([Autoplay, Pagination])

const BannerSwiper = () => {
    const paginationRef = useRef<HTMLDivElement>(null)
    const [banners, setBanners] = useState<PromotionBanner[]>([])

    const paginationParams: PaginationOptions = {
        el: paginationRef.current!,
        clickable: true,
        type: 'bullets',
    }

    const swiperProps = {
        height: 280,
        slidesPerView: 1,
        loop: true,
        autoplay: {
            delay: 8000,
        },
        pagination: paginationParams,
    }

    useEffect(() => {
        const init = async () => {
            const bannerList = await getPromotionBannerList()
            setBanners(bannerList)
        }
        init()
    }, [])

    const onSlideClick = useCallback((banner: PromotionBanner) => {
        if (banner.articleId) {
            directToJetsoArticle(banner.articleId, banner.eventId)
        } else if (banner.link) {
            directFromLinkMap(banner.link)
        }
    }, [])

    return (
        <SLayout>
            <Swiper {...swiperProps}>
                {banners.map((banner, index) => {
                    return (
                        <SwiperSlide
                            key={`banner-${banner.rowId}`}
                            onClick={() => onSlideClick(banner)}
                            data-qa={`btnBanner${index + 1}`}>
                            <SwiperCard bg={banner.bannerUrl} />
                        </SwiperSlide>
                    )
                })}
                <PaginationBullets ref={paginationRef} />
            </Swiper>
        </SLayout>
    )
}

export default BannerSwiper
