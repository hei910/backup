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

const MainContainer = styled.div`
    width: 100%;
    padding-top: 10px;
    display: flex;
    justify-content: space-between;
    background-color: #f2f2f2;
`

const RatingContainer = styled.div<{ img: string }>`
    ${(props) => bgImg(props.img, 'cover')};
    height: 220px;
    width: 399px;
    position: relative;
    box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.2);
    border-radius: 2.5px;
    ${(props) => props.img === RankOneImg && ' transform: scale(1.10)'};
`
const RatingContent = styled.div`
    padding-top: 20px;
    width: 50%;
    position: absolute;
    text-align: center;
    color: white;

    > div {
        padding: 5px 0;
    }
`
const Ranking = styled.div`
    font-size: 40px;
`

const Popularity = styled.div`
    font-size: 14px;
`

const CrownImgCon = styled.div`
    ${bgImg(CrownImg)};
    width: 30px;
    height: 18px;
    margin: 0 auto;
`
const GameName = styled.div`
    margin-bottom: 10px;
`

const TrialButton = styled.div<{ btnColor: string }>`
    background-color: ${(props) => props.btnColor};
    margin: 10px auto;
    color: #fff;
    width: 140px;
    height: 36px;
    border-radius: 18px;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`
const StartButton = styled.div<{ btnColor: string }>`
    background-color: ${(props) => props.btnColor};
    margin: 10px auto;
    color: #fff;
    width: 140px;
    height: 36px;
    border-radius: 18px;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`
const RatingScore = styled.div`
    font-size: 16px;
    width: 100px;
    height: 27px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    position: absolute;
    top: 181px;
    left: 245px;
    border: 1px solid white;
    border-radius: 5px;
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
    onEnter: (supplier: GameSuppliers, gameId: string) => void
    onTrial: (supplier: GameSuppliers, gameId: string) => void
}

export default ({ onEnter, onTrial }: IProps) => {
    const t = useTranslation()
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

    const onBtnStartClick = useCallback(
        (game: GameListItem) => {
            onEnter && onEnter(game.supplier, game.id)
        },
        [onEnter],
    )

    const onBtnTryClick = useCallback(
        (game: GameListItem) => {
            onTrial && onTrial(game.supplier, game.id)
        },
        [onTrial],
    )

    return (
        <MainContainer>
            {RankMap.map((game, index) => (
                <RatingContainer img={game.game.imgUrl} key={`rating-${game.game.name}-${index}`}>
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
                    <RatingScore>
                        {t('slotMachine.hotGames.rating')} {game.game.score}
                    </RatingScore>
                </RatingContainer>
            ))}
        </MainContainer>
    )
}
