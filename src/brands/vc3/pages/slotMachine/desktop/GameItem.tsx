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

const SItemContainer = styled.div<{ isPreview: boolean }>`
    width: ${(props) => (props.isPreview ? '145px' : 'calc(20% - 24px)')};
    height: ${(props) => (props.isPreview ? '155px' : '232px')};
    /* padding: 0 0 13px; */
    margin: ${(props) => (props.isPreview ? '0 0 16px' : '0 12px 16px')};
    border-radius: 10px;
    box-shadow: 2px 2px 6px 0 ${(props) => props.theme.colors.page.common.slotMachine.gameItem.boxShadow};
    background-color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.bgColor};
    cursor: pointer;
`
const SImage = styled.div<{ img: string }>`
    ${(props) => bgImg(props.img, 'cover')}
    width: 100%;
    height: 75%;
    padding: 11.6px 14.2px 0 14.7px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
`
const STitle = styled.div`
    margin: 8px;
    text-align: center;
    font-size: 16px;
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
    color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.tryBtn.color};
    background-color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.bgColor};
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
                <SImage data-qa="imgGame" img={game?.imgUrl}></SImage>
                <SButtonContainer>
                    {(isLoggedIn || isPreview) && <STitle>{game?.name}</STitle>}
                    {!isLoggedIn && !isPreview && (
                        <>
                            <STitle>{game?.name}</STitle>
                            <SButtonContainerOverlay>
                                <STryGameButton data-qa={`btnGameItem${index + 1}_trial `} onClick={onBtnTryClick}>
                                    {t('slotMachine.hotGames.trial')}
                                </STryGameButton>
                                <SStartGameButton data-qa={`btnGameItem${index + 1}_play`} onClick={onBtnStartClick}>
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
