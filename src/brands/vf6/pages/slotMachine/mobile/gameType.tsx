import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { GameTypeItemCss, GameTypeListCss, GameTypeIconCss } from '@components/common/gameType' //GameTypeIconCss
import GameTypeIconsImg from '@brand/assets/images/slotMachine/mobile/slot-provider.png'
import GameTypeMaintainIconsImg from '@brand/assets/images/slotMachine/mobile/slot-provider-maintenance.png'
import useGameType from '@components/common/gameType/hook'
import imageSprite from '@mixins/imageSprite'

const GameTypeList = styled.div`
    ${GameTypeListCss('nowrap')}
    flex-direction: row;
    overflow-x: scroll;
    background-color: white;
    padding: 3px 7px;
`

const GameTypeIcon = styled.div<{ index: number }>`
    ${GameTypeIconCss(30, 30)}
    ${(props) =>
        imageSprite({
            url: GameTypeIconsImg,
            width: 30,
            height: 30,
            itemIndex: props.index,
        })};

    &.maintenance {
        ${(props) =>
        imageSprite({
            url: GameTypeMaintainIconsImg,
            width: 30,
            height: 30,
            itemIndex: props.index,
        })};
    }
`

const GameTypeTitle = styled.div`
    ${(props) => props.theme.typography.Body6}
    padding-top: 5px;
`

const GameTypeItem = styled(Link)`
    ${GameTypeItemCss(7, 60)}
    background-color: #f2f2f2;
    color: #777777;
    display: flex;
    flex-direction: row;
    flex: 0 0 100px;
    border-radius: 20px;
    padding: 7px;
    margin-right: 8px;

    &.active {
        box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
        color: #3d7eeb;
        background-color: #ffffff;
    }
`

const GameType: React.FC<{}> = () => {
    const gameTypes = useGameType()
    return (
        <GameTypeList>
            {gameTypes.map((gameType, idx) => {
                return (
                    <GameTypeItem className={gameType.className} key={`game-type-${gameType.title}`} to={gameType.to}>
                        <GameTypeIcon className={gameType.className} index={idx} />
                        <GameTypeTitle>{gameType.title}</GameTypeTitle>
                    </GameTypeItem>
                )
            })}
        </GameTypeList>
    )
}

export default GameType
