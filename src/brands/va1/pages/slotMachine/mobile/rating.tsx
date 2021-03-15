import React, { useCallback } from 'react'
import styled from 'styled-components/macro'
import { useSelector } from '@redux'
import bgImg from '@mixins/backgroundImg'
import RankOneImg from '@brand/assets/images/slotMachine/mobile/No.1.png'
import RankTwoImg from '@brand/assets/images/slotMachine/mobile/No.2.png'
import RankThreeImg from '@brand/assets/images/slotMachine/mobile/No.3.png'
import CrownImg from '@brand/assets/images/slotMachine/mobile/crown.png'
import useTranslation from '@hooks/useTranslation'
import GameSuppliers from '@constants/gameSuppliers'
import { GameListItem } from '@brand/services/game/type'

const MainContainer = styled.div`
    width: 100%;
    padding: 10px 8px 0;
    display: flex;
    justify-content: space-between;
    background-color: #f2f2f2;
`

const RatingContainer = styled.div<{ img: string }>`
    height: ${(props) => (props.img === RankOneImg ? '210px' : '200px')};
    width: 115px;
    ${(props) => bgImg(props.img, 'cover')};
    position: relative;
    box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.2);
    border-radius: 2.5px;
`
const RatingContent = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    top: 50%;
    text-align: center;
    color: white;
`
const Ranking = styled.div`
    font-size: 24px;
`

const Popularity = styled.div`
    font-size: 10px;
`

const GameName = styled.div`
    font-size: 10px;
`

const CrownImgCon = styled.div`
    ${bgImg(CrownImg)};
    width: 18px;
    height: 12px;
    margin: 0 auto;
`

const TrialButton = styled.div<{ btnColor: string }>`
    background-color: ${(props) => props.btnColor};
    margin: 10px auto;
    color: #fff;
    width: 65px;
    height: 22px;
    font-size: 12px;
    border-radius: 2.5px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const StartButton = styled.div<{ btnColor: string }>`
    background-color: ${(props) => props.btnColor};
    margin: 10px auto;
    color: #fff;
    width: 65px;
    height: 22px;
    font-size: 12px;
    border-radius: 2.5px;
    display: flex;
    justify-content: center;
    align-items: center;
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
    onEnter: () => void
    onTrial: () => void
}

export default ({ onEnter, onTrial }: IProps) => {
    const t = useTranslation()
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

    const onBtnStartClick = useCallback(
        (game: GameListItem) => {
            onEnter && onEnter()
        },
        [onEnter],
    )

    const onBtnTryClick = useCallback(
        (game: GameListItem) => {
            onTrial && onTrial()
        },
        [onTrial],
    )

    return (
        <MainContainer>
            {RankMap.map((game, idx) => (
                <RatingContainer key={`rating-item-${idx}`} img={game.game.imgUrl}>
                    <RatingContent>
                        <GameName>{game.game.name}</GameName>
                        <CrownImgCon />
                        <Ranking>{t('slotMachine.hotGames.rank', { rank: game.rank })}</Ranking>
                        <Popularity>{t('slotMachine.hotGames.popularity')}</Popularity>
                        {isLoggedIn ? (
                            <StartButton btnColor={game.btnColor} onClick={() => onBtnStartClick(game.game)}>
                                {t('slotMachine.hotGames.start')}
                            </StartButton>
                        ) : (
                            <TrialButton btnColor={game.btnColor} onClick={() => onBtnTryClick(game.game)}>
                                {t('slotMachine.hotGames.trial')}
                            </TrialButton>
                        )}
                    </RatingContent>
                </RatingContainer>
            ))}
        </MainContainer>
    )
}
