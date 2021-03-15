import React, { useCallback } from 'react'
import { useSelector } from '@redux'
import bgImg from '@styles/mixins/backgroundImg'
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
    width: 31.333%;
    background: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.bgColor};
    border-radius: 5px;
    margin: 4px 1%;
    box-shadow: 0px 3px 8px 0 ${(props) => props.theme.colors.page.common.slotMachine.gameItem.boxShadow};
    display: flex;
    flex-direction: column;
`
const SImage = styled.div<{ img: string }>`
    ${(props) => bgImg(props.img, 'cover')}
    height: 82px;
    width: 100%;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
`
const SGameTitle = styled.div`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 15px;
    color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.color};
    text-align: center;
    margin: 4px;
    flex: 1 0 auto;
`
const SButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 4px 0;
`
const SButton = styled.div`
    border-radius: 5px;
    font-size: 12px;
    padding: 8px 0;
    margin-bottom: 4px;
`
const SStartGameButton = styled(SButton)`
    background: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.startBtn.bgColor};
    text-align: center;
    flex: 6;
    color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.startBtn.color};
    margin-left: 4px;
    margin-right: 4px;
`
const STryGameButton = styled(SButton)`
    background: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.tryBtn.bgColor};
    border: 1px solid ${(props) => props.theme.colors.page.common.slotMachine.gameItem.tryBtn.color};
    color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.tryBtn.color};
    text-align: center;
    flex: 4;
    margin-right: 4px;
`

const GameItem = ({ game, onTrial, onEnter }: IGameItemProps) => {
    const t = useTranslation()
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

    const onBtnStartClick = useCallback(() => {
        onEnter && onEnter(game.supplier, game.id)
    }, [game, onEnter])

    const onBtnTryClick = useCallback(() => {
        onTrial && onTrial(game.supplier, game.id)
    }, [game, onTrial])

    return (
        <SItemContainer>
            <SImage img={game.imgUrl} />
            <SGameTitle>{game.name}</SGameTitle>
            <SButtonContainer>
                <SStartGameButton onClick={onBtnStartClick}>{t('slotMachine.hotGames.start')}</SStartGameButton>
                {!isLoggedIn && (
                    <STryGameButton onClick={onBtnTryClick}>{t('slotMachine.hotGames.trial')}</STryGameButton>
                )}
            </SButtonContainer>
        </SItemContainer>
    )
}

export default GameItem
