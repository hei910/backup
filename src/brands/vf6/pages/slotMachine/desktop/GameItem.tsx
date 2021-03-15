import React, { useCallback } from 'react'
import styled from 'styled-components/macro'
import { useSelector } from '@redux'
import { GameListItem } from '@services/game/type'
import bgImg from '@styles/mixins/backgroundImg'
import GameSuppliers from '@constants/gameSuppliers'
import useTranslation from '@hooks/useTranslation'

interface IGameItemProps {
    game: GameListItem
    index: number
    onTrial?: (supplier: GameSuppliers, gameId: string) => void
    onEnter?: (supplier: GameSuppliers, gameId: string) => void
    isPreview?: boolean
}

const SImage = styled.div<{ img: string }>`
    ${(props) => bgImg(props.img)}
    width: 100%;
    height: 75%;
    padding: 11.6px 14.2px 0 14.7px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    transition: background-size 1s ease-out;
`

const SItemContainer = styled.div<{ isPreview: boolean }>`
    width: ${(props) => (props.isPreview ? '145px' : '187px')};
    height: ${(props) => (props.isPreview ? '155px' : '232px')};
    margin: 0 10px 16px 10px;
    border-radius: 10px;
    box-shadow: 2px 2px 6px 0 ${(props) => props.theme.colors.page.common.slotMachine.gameItem.boxShadow};
    background-color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.bgColor};

    &:hover {
        ${SImage} {
            background-size: 120% 120%;
        }
    }
`

const STitle = styled.div<{ isPreview: boolean }>`
    margin: 8px;
    text-align: center;
    font-size: ${(props) => (props.isPreview ? '13px' : '16px')};
    line-height: 16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.color};
`
const SButtonContainerOverlay = styled.div`
    position: absolute;
    left: 0;
    background: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.bgColor};
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    cursor: pointer;
    top: -58px;
    transition: top 0.2s ease-in;
`
const SButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 25%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
`
const SButtons = styled.div`
    font-size: 14px;
    border-radius: 17px;
    text-align: center;
    padding: 8px 16px 8px 16px;
`
const STryGameButton = styled(SButtons)`
    width: 65px;
    /* height: 32px; */
    border: solid 1px ${(props) => props.theme.colors.page.common.slotMachine.gameItem.tryBtn.borderColor};
    background-color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.bgColor};
    color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.tryBtn.color};
    margin-right: 8px;
`

const SStartGameButton = styled(SButtons)`
    width: 93px;
    /* height: 32px; */
    color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.startBtn.color};
    background-color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.startBtn.bgColor};
`

const SNotLoggedInWrapper = styled.div<{ hoverEffect: boolean }>`
    width: 100%;
    height: 100%;

    ${STitle} {
        display: block;
    }

    ${(props) =>
        props.hoverEffect &&
        `:hover {
        ${STitle} {
            display: none;
        }

        ${SButtonContainerOverlay} {
            top: 0;
        }
    }`}
`

const GameItem: React.FC<IGameItemProps> = ({ game, onTrial, onEnter, isPreview = false, index }) => {
    const t = useTranslation()
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
    const onBtnStartClick = useCallback(() => {
        onEnter && onEnter(game.supplier, game.id)
    }, [game, onEnter])

    const onBtnTryClick = useCallback(() => {
        onTrial && onTrial(game.supplier, game.id)
    }, [game, onTrial])

    return (
        <SItemContainer
            isPreview={isPreview}
            onClick={isLoggedIn ? onBtnStartClick : () => {}}
            data-qa={`gameItem${index + 1}`}>
            <SNotLoggedInWrapper hoverEffect={!isLoggedIn && !isPreview}>
                <SImage img={game?.imgUrl}></SImage>
                <SButtonContainer>
                    {(isLoggedIn || isPreview) && <STitle isPreview={isPreview}>{game?.name}</STitle>}
                    {!isLoggedIn && !isPreview && (
                        <>
                            <STitle isPreview={isPreview}>{game?.name}</STitle>
                            <SButtonContainerOverlay>
                                <STryGameButton onClick={onBtnTryClick} data-qa={`btnGameItem${index + 1}_trial`}>
                                    {t('slotMachine.hotGames.trial')}
                                </STryGameButton>
                                <SStartGameButton onClick={onBtnStartClick} data-qa={`btnGameItem${index + 1}_play`}>
                                    {t('slotMachine.hotGames.start')}
                                </SStartGameButton>
                            </SButtonContainerOverlay>
                        </>
                    )}
                </SButtonContainer>
            </SNotLoggedInWrapper>
        </SItemContainer>
    )
}

export default GameItem
