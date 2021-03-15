import React from 'react'
import { useSelector } from '@redux'
import styled from 'styled-components/macro'
import bgImg from '@styles/mixins/backgroundImg'
import { GameListItem } from '@services/game/type'
import { ratioHeightForMobile } from '@mixins/ratioLength'
import GameSuppliers from '@constants/gameSuppliers'

interface IGameItemProps {
    game: GameListItem
    onClickHandler: (game: GameListItem) => void
    onTrial: (supplier: GameSuppliers, gameId: string) => void
    onEnter: (supplier: GameSuppliers, gameId: string) => void
}
const SItemContainer = styled.div`
    ${ratioHeightForMobile(115)};
    width: 30%;
    margin: 0 1.5% 12px;
    border-radius: 10px;
    box-shadow: 2px 2px 6px 0 ${(props) => props.theme.colors.page.common.slotMachine.gameItem.boxShadow};
    background-color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.bgColor};
`
const SImage = styled.div<{ img: string }>`
    ${(props) => bgImg(props.img, 'cover')}
    width: 100%;
    height: 80%;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
`
const STitle = styled.div`
    text-align: center;
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.color};
`
const SButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20%;
    cursor: pointer;
`
const GameItem = ({ game, onClickHandler, onTrial, onEnter }: IGameItemProps) => {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
    const onClick = () => {
        onClickHandler(game)
        if (isLoggedIn) {
            onEnter && onEnter(game.supplier, game.id)
        } else {
            onTrial && onTrial(game.supplier, game.id)
        }
    }
    return (
        <SItemContainer onClick={onClick}>
            <SImage img={game.imgUrl}></SImage>
            <SButtonContainer>
                <STitle>{game.name}</STitle>
            </SButtonContainer>
        </SItemContainer>
    )
}

export default GameItem
