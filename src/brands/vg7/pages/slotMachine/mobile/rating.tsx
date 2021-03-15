import React, { useCallback } from 'react'
import styled from 'styled-components/macro'
import { useSelector } from '@redux'
import bgImg from '@mixins/backgroundImg'
import RankOneImg from '@brand/assets/images/slotMachine/desktop/No.1.png'
import RankTwoImg from '@brand/assets/images/slotMachine/desktop/No.2.png'
import RankThreeImg from '@brand/assets/images/slotMachine/desktop/No.3.png'
import CrownImg from '@brand/assets/images/slotMachine/desktop/big_Crown.png'
import useTranslation from '@hooks/useTranslation'
import GameSuppliers from '@constants/gameSuppliers'
import { GameListItem } from '@brand/services/game/type'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.scss'

const RatingContainer = styled.div<{ img: string }>`
    ${(props) => bgImg(props.img, 'cover')};
    height: 91px;
    width: 170px;
    margin: 0 auto;
    position: relative;
    box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    display: flex;
`

const SRatingContent = styled.div`
    width: 50%;
    padding: 8px 0 10px 0;
    text-align: center;
    color: white;
`
const Ranking = styled.div`
    font-size: 18px;
`

const Popularity = styled.div`
    font-size: 9px;
`

const CrownImgCon = styled.div`
    ${bgImg(CrownImg)};
    width: 15px;
    height: 10px;
    margin: 0 auto;
`

const GameButton = styled.div`
    margin: 2px auto;
    background-color: #413f43;
    width: 70px;
    height: 19px;
    border-radius: 4px;
    font-size: 9px;
    border: 1px solid grey;
    display: flex;
    justify-content: center;
    align-items: center;
`
const SRatingScoreWrapper = styled.div`
    display: flex;
    width: 50%;
    height: 100%;
    justify-content: center;
    align-items: center;
    margin-top: 35px;
`
const RatingScore = styled.div`
    background-color: #fff;
    color: #f2951b;
    width: 49px;
    height: 12.5px;
    border-radius: 5px;
    font-size: 8.5px;
    display: flex;
    justify-content: center;
    align-items: center;
`
const GameName = styled.div`
    font-size: 12px;
`
const OuterContainer = styled.div`
    margin: 10px 0px;
`

const RankMap = [
    {
        rank: 2,
        btnColor: '#006eb5',
        game: {
            score: 9.9,
            id: 'dragonball',
            name: '赛亚烈战',
            type: '',
            supplier: GameSuppliers.dt,
            imgUrl: RankTwoImg,
        },
    },
    {
        rank: 1,
        btnColor: '#ad6600',
        game: {
            score: 9.9,
            id: 'sd',
            name: '灌篮大师',
            type: '',
            supplier: GameSuppliers.dt,
            imgUrl: RankOneImg,
        },
    },
    {
        rank: 3,
        btnColor: '#783c94',
        game: {
            score: 9.9,
            id: 'naruto',
            name: 'NINJA',
            type: '',
            supplier: GameSuppliers.dt,
            imgUrl: RankThreeImg,
        },
    },
]

interface IProps {
    onTrial: (supplier: GameSuppliers, gameId: string) => void
    onEnter: (supplier: GameSuppliers, gameId: string) => void
}

export default ({ onEnter, onTrial }: IProps) => {
    const t = useTranslation()
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

    const onBtnStartClick = useCallback(
        (game: GameListItem) => {
            onEnter(game.supplier, game.id)
        },
        [onEnter],
    )

    const onBtnTryClick = useCallback(
        (game: GameListItem) => {
            onTrial(game.supplier, game.id)
        },
        [onTrial],
    )

    return (
        <OuterContainer>
            <Swiper
                spaceBetween={375 - window.innerWidth - 105}
                loop={true}
                slidesPerView={1.5}
                centeredSlides={true}
                initialSlide={1}
                loopAdditionalSlides={2}>
                {RankMap.map((game) => (
                    <SwiperSlide key={game.game.name + game.game.score}>
                        <RatingContainer img={game.game.imgUrl}>
                            <SRatingContent>
                                <GameName>{game.game.name}</GameName>
                                <CrownImgCon />
                                <Ranking>{t('slotMachine.hotGames.rank', { rank: game.rank })}</Ranking>
                                <Popularity>{t('slotMachine.hotGames.popularity')}</Popularity>
                                {isLoggedIn ? (
                                    <GameButton onClick={() => onBtnStartClick(game.game)}>
                                        {t('slotMachine.hotGames.start')}
                                    </GameButton>
                                ) : (
                                    <GameButton onClick={() => onBtnTryClick(game.game)}>
                                        {t('slotMachine.hotGames.trial')}
                                    </GameButton>
                                )}
                            </SRatingContent>
                            <SRatingScoreWrapper>
                                <RatingScore>
                                    {t('slotMachine.hotGames.rating')} {game.game.score}
                                </RatingScore>
                            </SRatingScoreWrapper>
                        </RatingContainer>
                    </SwiperSlide>
                ))}
            </Swiper>
        </OuterContainer>
    )
}
