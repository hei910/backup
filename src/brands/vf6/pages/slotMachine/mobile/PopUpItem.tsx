import React, { useCallback } from 'react'
import styled from 'styled-components/macro'
import bgImg from '@styles/mixins/backgroundImg'
import { GameListItem } from '@services/game/type'
import useTranslation from '@hooks/useTranslation'
import GameSuppliers from '@constants/gameSuppliers'

interface IGameItemProps {
    game: GameListItem
    onClickHandler: (game: GameListItem) => void
    onTrial: (supplier: GameSuppliers, gameId: string) => void
    onEnter: (supplier: GameSuppliers, gameId: string) => void
    closeModal: () => void
}
const SItemContainer = styled.div`
    width: 232px;
    height: 303px;
    margin: 0 0 16px;
    border-radius: 10px;
    box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
`
const SImage = styled.div<{ img: string }>`
    ${(props) => bgImg(props.img, 'cover')}
    width: 100%;
    height: 204px;
    padding: 11.6px 14.2px 0 14.7px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
`
const STitle = styled.div`
    text-align: center;
    font-size: 16px;
    color: #333333;
    width: 100%;
`
const SContentContainer = styled.div`
    height: 98px;
    margin-top: 16px;
`
const SButtonContainer = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 12px;
`
const SButtons = styled.div`
    font-size: 14px;
    border-radius: 17px;
    width: 100%;
    text-align: center;
    padding: 8px 16px 8px 16px;
`
const STryGameButton = styled(SButtons)`
    flex: 3;
    color: #3d7eeb;
    border: solid 1px #3d7eeb;
    background-color: #ffffff;
    margin-right: 8px;
    margin-left: 16px;
`

const SStartGameButton = styled(SButtons)`
    flex: 7;
    width: 113px;
    color: #ffffff;
    background-color: #3d7eeb;
    margin-right: 16px;
`

const PopUpItem: React.FC<IGameItemProps> = ({ game, onClickHandler, onTrial, onEnter, closeModal }) => {
    const t = useTranslation()
    const onBtnStartClick = useCallback(() => {
        onClickHandler(game)
        onEnter(game.supplier, game.id)
        closeModal()
    }, [game, onClickHandler, onEnter, closeModal])

    const onBtnTryClick = useCallback(() => {
        onClickHandler(game)
        onTrial(game.supplier, game.id)
        closeModal()
    }, [game, onClickHandler, onTrial, closeModal])

    return (
        <SItemContainer>
            <SImage img={game.imgUrl}></SImage>
            <SContentContainer>
                <STitle>{game.name}</STitle>
                <SButtonContainer>
                    <STryGameButton onClick={onBtnTryClick} data-qa="btnTrial">{t('slotMachine.hotGames.trial')}</STryGameButton>
                    <SStartGameButton onClick={onBtnStartClick} data-qa="btnPlay">{t('slotMachine.hotGames.start')}</SStartGameButton>
                </SButtonContainer>
            </SContentContainer>
        </SItemContainer>
    )
}

export default PopUpItem
