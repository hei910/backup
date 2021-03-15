import React from 'react'
import { useSelector } from '@redux'
import styled from 'styled-components/macro'
import { GameListItem } from '@services/game/type'
import useTranslation from '@hooks/useTranslation'
import GameSuppliers from '@constants/gameSuppliers'
// import useTranslation from '@hooks/useTranslation'

interface IGameItemProps {
    game: GameListItem
    onTrial: (supplier: GameSuppliers, gameId: string) => void
    onEnter: (supplier: GameSuppliers, gameId: string) => void
}

const SItemContainer = styled.div`
    width: 46%;
    background: #1e1e1e;
    margin: 4px 2%;
    display: flex;
    flex-direction: column;
`
const SImage = styled.img`
    object-fit: cover;
    height: 60%;
    width: 100%;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
`
const STextContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 4px;
    flex: 1 1 auto;
`
const SGameTitle = styled.div`
    font-size: 13px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.titleColor};
`
const SGameScore = styled.div`
    font-size: 11px;
    color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.scoreColor};
    white-space: nowrap;
`
const SButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0 4px;
`
const SButton = styled.div`
    font-size: 15px;
    padding: 8px 0;
    margin-bottom: 4px;
`
const SStartGameButton = styled(SButton)<{ isLoggedIn: boolean }>`
    background: ${(props) =>
        `linear-gradient(170deg, ${props.theme.colors.page.common.slotMachine.gameItem.startBtn.gradientBgColor1} 50%,${props.theme.colors.page.common.slotMachine.gameItem.startBtn.gradientBgColor2} 50%);`};
    text-align: center;
    flex: 6;
    color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.startBtn.color};
    margin-left: 4px;
    margin-right: 4px;
    border: 1px solid ${(props) => props.theme.colors.page.common.slotMachine.gameItem.startBtn.borderColor};
    ${(props) => props.isLoggedIn && `border-radius: 5px;`}
    ${(props) =>
        !props.isLoggedIn &&
        `    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;`}
`
const STryGameButton = styled(SButton)`
    background: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.tryBtn.bgColor};
    border: 1px solid ${(props) => props.theme.colors.page.common.slotMachine.gameItem.tryBtn.borderColor};
    color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.tryBtn.color};
    text-align: center;
    flex: 4;
    margin-right: 4px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
`

const GameItem = ({ game, onTrial, onEnter }: IGameItemProps) => {
    const t = useTranslation()
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

    const onBtnStartClick = () => {
        onEnter(game.supplier, game.id)
    }

    const onBtnTryClick = () => {
        onTrial(game.supplier, game.id)
    }

    return (
        <SItemContainer>
            <SImage src={game.imgUrl} />
            <STextContainer>
                <SGameTitle>{game.name}</SGameTitle>
                <SGameScore>
                    {t('slotMachine.hotGames.rating')}：{game.score}
                </SGameScore>
            </STextContainer>

            <SButtonContainer>
                <SStartGameButton isLoggedIn={isLoggedIn} onClick={onBtnStartClick}>
                    {t('slotMachine.hotGames.start')}
                </SStartGameButton>
                {!isLoggedIn && (
                    <STryGameButton onClick={onBtnTryClick}>{t('slotMachine.hotGames.trial')}</STryGameButton>
                )}
            </SButtonContainer>
        </SItemContainer>
    )
}

export default GameItem
