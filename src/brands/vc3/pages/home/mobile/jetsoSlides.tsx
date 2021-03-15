import { useSelector } from '@redux'
import useJetso from '@hooks/useJetso'
import styled from 'styled-components/macro'
import { directToJetsoArticle, directToFriendship } from '@utils/v1Functions'
import SwiperCore, { Autoplay, Pagination } from 'swiper'
import { PaginationOptions } from 'swiper/types/components/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
import friendshipBannerImg from '@brand/assets/images/home/mobile/friendship-banner.jpg'
import useTranslation from '@hooks/useTranslation'
import { ratioHeightForMobile } from '@mixins/ratioLength'
import bgImg from '@mixins/backgroundImg'

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
            width: 20px;
            height: 0;
            border: solid 1px #000000;
            border-radius: 5px;
            opacity: 0.2;
            transition-duration: 0.3s;
            margin: 0 0 0 6px;

            :first-child {
                margin: 0;
            }
        }

        .swiper-pagination-bullet-active {
            opacity: 1;
            border: solid 1px #0c186c;
        }
    }
`

const SwiperCard = styled.div<{ bg: string }>`
    ${(props) => bgImg(props.bg, 'cover')}
    ${ratioHeightForMobile(98)}
    width: calc(100% - 30px);
    border-radius: 15px;
    margin: 0 15px;
`

const FriendshipBannerContent = styled.div`
    padding-left: 12px;
    padding-top: 8px;
`

const FriendshipTitle = styled.div`
    ${(props) => props.theme.typography.Body5}
    color: #ffffff;
`

const BreakLine = styled.div`
    width: 69px;
    height: 0;
    border-bottom: 1px solid #ffffff;
    opacity: 0.35;
`

const FriendshipContent = styled.div`
    ${(props) => props.theme.typography.Body2}
    color: #ffffff;
    margin: 4px 0;
`

const FriendshipBtn = styled.div`
    ${(props) => props.theme.typography.Body6}
    display: inline-block;
    padding: 0 8px;
    border-radius: 15px;
    border: solid 1px rgba(242, 242, 242, 0.6);
    background-image: linear-gradient(to right, #d2b497, #f4dfc8);
    color: #0c186c;
    margin-top: 4px;
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
    const brandName = useSelector((state) => state.app.brandInfo.brandName)
    const t = useTranslation()

    const onSlideClick = (rowId: number) => {
        directToJetsoArticle(rowId)
    }

    return (
        <Container>
            {isReady && (
                <Swiper {...swiperProps}>
                    {articles.slice(0, 3).map((jetsoArticle) => {
                        return (
                            <SwiperSlide
                                key={`jetso-${jetsoArticle.orderId}`}
                                onClick={() => onSlideClick(jetsoArticle.rowId)}>
                                <SwiperCard bg={`${process.env.CDN_DOMAIN}/${jetsoArticle.mobileHomepageUrl}`} />
                            </SwiperSlide>
                        )
                    })}
                    <SwiperSlide onClick={directToFriendship}>
                        <SwiperCard bg={friendshipBannerImg}>
                            <FriendshipBannerContent>
                                <FriendshipTitle>{t('home.friendshipBanner.title', { brandName })}</FriendshipTitle>
                                <BreakLine />
                                <FriendshipContent>{t('home.friendshipBanner.content')}</FriendshipContent>
                                <BreakLine />
                                <FriendshipBtn>{t('home.friendshipBanner.btnText')}</FriendshipBtn>
                            </FriendshipBannerContent>
                        </SwiperCard>
                    </SwiperSlide>
                </Swiper>
            )}
        </Container>
    )
}

export default JetsoSlides
