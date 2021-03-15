import React, { useCallback } from 'react'
import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'
import bgImg from '@styles/mixins/backgroundImg'
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
    background: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.boxShadow};
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
    margin: 8px 1%;
    position: relative;
    transition: transform 0.2s ease;
    overflow: hidden;
    box-shadow: 0px 3px 8px 0 ${(props) => props.theme.colors.page.common.slotMachine.gameItem.boxShadow};
    border-radius: 5px;
    background: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.bgColor};

    :hover {
        ${SDarkOverlayContainer} {
            top: 0;
            visibility: visible;
        }
    }
`
const SImage = styled.div<{ img: string }>`
    ${(props) => bgImg(props.img, 'cover')}
    height: 75%;
    border-radius: 5px;
    margin: 4px;
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
    color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.color};
    width: 65%;
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
    background: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.startBtn.bgColor};
    text-align: center;
    flex: 6;
    color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.startBtn.color};
    ${(props) => !props.isLoggedIn && ` margin: 48px auto 8px auto;`};
    ${(props) => props.isLoggedIn && ` margin: 64px auto 0 auto;`};
    transition: background 0.15s ease;

    :hover {
        background: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.startBtn.hoverBgColor};
    }
`
const STryGameButton = styled(SButton)`
    color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.tryBtn.color};
    text-align: center;
    flex: 4;
    background: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.tryBtn.bgColor};
    margin: 0 auto;
    transition: background 0.15s ease;

    :hover {
        background: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.tryBtn.hoverBgColor};
    }
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
            <SImage img={game.imgUrl} />
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
