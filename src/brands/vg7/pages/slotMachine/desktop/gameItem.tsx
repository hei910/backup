import React, { useCallback } from 'react'
import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'
import { useSelector } from '@redux'
import { GameListItem } from '@services/game/type'
import GameSuppliers from '@constants/gameSuppliers'

interface IGameItemProps {
    game: GameListItem
    onTrial: (supplier: GameSuppliers, gameId: string) => void
    onEnter: (supplier: GameSuppliers, gameId: string) => void
    isPreview?: boolean
}
const SDarkOverlayContainer = styled.div`
    background: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.overlayBgColor};
    height: 100%;
    opacity: 0;
    position: absolute;
    z-index: 1;
    width: 100%;
    transition: opacity 0.2s ease-in-out;
`
const SGameScore = styled.div`
    font-size: 14px;
    color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.scoreColor};
    text-align: center;
`
const SItemContainer = styled.div`
    width: 18%;
    height: 200px;
    margin: 0 1% 16px;
    position: relative;
    transition: transform 0.2s ease;
    overflow: hidden;
    box-shadow: 0px 3px 8px 0 ${(props) => props.theme.colors.page.common.slotMachine.gameItem.boxShadow};
    border-radius: 5px;
    background: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.bgColor};

    :hover {
        ${SDarkOverlayContainer} {
            opacity: 1;
        }

        ${SGameScore} {
            z-index: 1;
        }
    }
`
const SImage = styled.img`
    width: 100%;
    height: 80%;
    background: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.bgColor};
`

const STextContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* height: 20%; */
    width: 100%;
    height: 20%;
    padding: 8px;
    background: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.bgColor};
`
const SGameTitle = styled.div`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 15.5px;
    color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.titleColor};
    width: 65%;
`

const SButton = styled.div`
    font-size: 18px;
    padding: 8px 0;
    border-radius: 20px;
    cursor: pointer;
    width: 60%;
`
const SStartGameButton = styled(SButton)<{ isLoggedIn: boolean }>`
    background: ${(props) =>
        `linear-gradient(180deg, ${props.theme.colors.page.common.slotMachine.gameItem.startBtn.gradientBgColor1} 35%, ${props.theme.colors.page.common.slotMachine.gameItem.startBtn.gradientBgColor2} 82%)`};
    box-shadow: 0px 2px 0px 0px ${(props) => props.theme.colors.page.common.slotMachine.gameItem.startBtn.boxShadow};
    text-align: center;
    flex: 6;
    color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.startBtn.color};
    ${(props) => !props.isLoggedIn && ` margin: 48px auto 8px auto;`}
    ${(props) => props.isLoggedIn && ` margin: 64px auto 0 auto;`}
`
const STryGameButton = styled(SButton)`
    background: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.tryBtn.bgColor};
    box-shadow: 0px 2px 0px 0px ${(props) => props.theme.colors.page.common.slotMachine.gameItem.tryBtn.boxShadow};
    color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.tryBtn.color};
    text-align: center;
    flex: 4;
    margin: 0 auto;
`

const GameItem: React.FC<IGameItemProps> = ({ game, onTrial, onEnter, isPreview = false }) => {
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
            <SDarkOverlayContainer>
                <SStartGameButton isLoggedIn={isLoggedIn} onClick={onBtnStartClick}>
                    {t('slotMachine.hotGames.start')}
                </SStartGameButton>
                {!isLoggedIn && (
                    <STryGameButton onClick={onBtnTryClick}>{t('slotMachine.hotGames.trial')}</STryGameButton>
                )}
            </SDarkOverlayContainer>
            <SImage src={game.imgUrl} alt={''} />
            <STextContainer>
                <SGameTitle>{game.name}</SGameTitle>
                <SGameScore>
                    {t('slotMachine.hotGames.rating')}：{game.score}
                </SGameScore>
            </STextContainer>
        </SItemContainer>
    )
}

export default GameItem
