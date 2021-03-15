import React, { useCallback } from 'react'
import styled from 'styled-components/macro'
// import useTranslation from '@hooks/useTranslation'
import bgImg from '@styles/mixins/backgroundImg'
import { useSelector } from '@redux'
import { GameListItem } from '@services/game/type'
import useTranslation from '@hooks/useTranslation'
import GameSuppliers from '@constants/gameSuppliers'

interface IGameItemProps {
    game: GameListItem
    onTrial: (supplier: GameSuppliers, gameId: string) => void
    onEnter: (supplier: GameSuppliers, gameId: string) => void
    isPreview?: boolean
}
const SDarkOverlayContainer = styled.div`
    background: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.overlayColor};
    width: 100%;
    height: 100%;
    visibility: hidden;
    position: absolute;
    top: -180px;
    z-index: 1;
    transition: top 0.2s ease-in, visibility 0.1s ease;
`
const SItemContainer = styled.div`
    width: 18%;
    height: 200px;
    position: relative;
    transition: transform 0.2s ease;
    overflow: hidden;
    margin: 8px 1%;

    :hover {
        transform: scale(1.2);
        z-index: 1;

        ${SDarkOverlayContainer} {
            top: 0;
            visibility: visible;
        }
    }
`
const SImage = styled.div<{ img: string }>`
    ${(props) => bgImg(props.img, 'cover')}
    height: 80%;
`

const STextContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* height: 20%; */
    width: 100%;
    height: 20%;
    padding: 8px;
    background: ${(props) =>
        `linear-gradient(175deg, ${props.theme.colors.page.common.slotMachine.gameItem.textContainer.gradientBgColor1} 50%,${props.theme.colors.page.common.slotMachine.gameItem.textContainer.gradientBgColor2} 50%);`};
`
const SGameTitle = styled.div`
    width: 65%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 15.5px;
    color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.titleColor};
`
const SGameScore = styled.div`
    font-size: 14px;
    color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.scoreColor};
    text-align: center;
`
const SButton = styled.div`
    font-size: 15px;
    padding: 8px 0;
    border-radius: 20px;
    cursor: pointer;
    width: 60%;
`
const SStartGameButton = styled(SButton)<{ isLoggedIn: boolean }>`
    background: ${(props) =>
        `linear-gradient(170deg, ${props.theme.colors.page.common.slotMachine.gameItem.startBtn.gradientBgColor1} 50%,${props.theme.colors.page.common.slotMachine.gameItem.startBtn.gradientBgColor2} 50%);`};
    text-align: center;
    flex: 6;
    color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.startBtn.color};
    border: 1px solid ${(props) => props.theme.colors.page.common.slotMachine.gameItem.startBtn.borderColor};
    ${(props) => !props.isLoggedIn && ` margin: 48px auto 8px auto;`}
    ${(props) => props.isLoggedIn && ` margin: 64px auto 0 auto;`}
`
const STryGameButton = styled(SButton)`
    border: 1px solid ${(props) => props.theme.colors.page.common.slotMachine.gameItem.tryBtn.borderColor};
    color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.tryBtn.color};
    text-align: center;
    flex: 4;
    background: ${(props) =>
        `linear-gradient(170deg, ${props.theme.colors.page.common.slotMachine.gameItem.tryBtn.gradientBgColor1} 50%, ${props.theme.colors.page.common.slotMachine.gameItem.tryBtn.gradientBgColor2} 50%);`};
    margin: 0 auto;
`

const GameItem: React.FC<IGameItemProps> = ({ game, onTrial, onEnter, isPreview = false }) => {
    const t = useTranslation()
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
    const onBtnStartClick = useCallback(() => {
        onEnter(game.supplier, game.id)
    }, [game, onEnter])

    const onBtnTryClick = useCallback(() => {
        onTrial(game.supplier, game.id)
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
            <SImage img={game.imgUrl} />
            <STextContainer>
                <SGameTitle>{game.name}</SGameTitle>
                <SGameScore>
                    {t('slotMachine.hotGames.rating')}：{game.score?.toFixed(1)}
                </SGameScore>
            </STextContainer>
        </SItemContainer>
    )
}

export default GameItem
