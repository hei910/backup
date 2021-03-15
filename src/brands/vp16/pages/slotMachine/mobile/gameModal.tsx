import React from 'react'
import styled from 'styled-components/macro'
import CloseIcon from '@brand/assets/images/slotMachine/mobile/cross_icon.svg'
import { GameListItem } from '@services/game/type'
import useTranslation from '@hooks/useTranslation'

interface IGameModalProps {
    isOpen: boolean
    closeButton: () => void
    game: GameListItem
}
const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`

const GameContainer = styled.div`
    width: 275px;
    height: 265px;
    padding: 3px;
    background-color: white;
    text-align: center;
    font-size: 22px;
    font-weight: bold;
    border-radius: 13px;

    > img {
        height: 212px;
        width: 269px;
        margin-bottom: 10px;
        border-radius: 13px;
    }
`

const CloseButton = styled.div`
    margin: 10px auto;
    width: 98px;
    height: 43px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #a8a8a8;
    border-radius: 18px;
    border: solid 1px #707070;

    > img {
        height: 14px;
        width: 14px;
        margin-right: 5px;
    }
`

export default ({ isOpen, closeButton, game }: IGameModalProps) => {
    const t = useTranslation()
    return isOpen ? (
        <Overlay>
            <div>
                <GameContainer>
                    <img src={game?.imgUrl} />
                    {game?.name}
                </GameContainer>
                <CloseButton onClick={closeButton}>
                    <img src={CloseIcon} />
                    {t('slotMachine.gameModal.close')}
                </CloseButton>
            </div>
        </Overlay>
    ) : (
        <></>
    )
}
