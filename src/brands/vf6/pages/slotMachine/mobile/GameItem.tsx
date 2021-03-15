import React from 'react'
import styled from 'styled-components/macro'
import bgImg from '@styles/mixins/backgroundImg'
import { GameListItem } from '@services/game/type'

interface IGameItemProps {
    game: GameListItem
    onClick: (game: GameListItem) => void
    index: number
}
const SItemContainer = styled.div`
    width: 31.333%;
    height: 142px;
    margin: 0 1% 16px;
    border-radius: 10px;
    box-shadow: 2px 2px 6px 0 ${(props) => props.theme.colors.page.common.slotMachine.gameItem.boxShadow};
    background-color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.bgColor};
`
const SImage = styled.div<{ img: string }>`
    ${(props) => bgImg(props.img, 'cover')}
    width: 100%;
    height: 106px;
    padding: 11.6px 14.2px 0 14.7px;
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
    height: 36px;
    cursor: pointer;
`
const GameItem = ({ game, onClick, index }: IGameItemProps) => {
    const onItemClick = () => onClick(game)

    return (
        <SItemContainer onClick={onItemClick} data-qa={`btnGameItem${index + 1}`}>
            <SImage img={game.imgUrl}></SImage>
            <SButtonContainer>
                <STitle>{game.name}</STitle>
            </SButtonContainer>
        </SItemContainer>
    )
}

export default GameItem
