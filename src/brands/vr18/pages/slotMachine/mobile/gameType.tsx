import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { GameTypeItemCss, GameTypeListCss, GameTypeIconCss, GameTypeIconBgImgCss } from '@components/common/gameType'
import GameTypeIconsImg from '@brand/assets/images/slotMachine/game-type-icons.png'
import useGameType from '@components/common/gameType/hook'

const GameTypeList = styled.div`
    ${GameTypeListCss('nowrap')}
`

const GameTypeIcon = styled.div<{ index: number }>`
    ${GameTypeIconCss(27, 27)}
    ${(props) => GameTypeIconBgImgCss(GameTypeIconsImg, 27, 27, props.index)}
`

const GameTypeTitle = styled.div`
    ${(props) => props.theme.typography.Body2}
    padding-top: 7px;
    color: #000000;
`

const GameTypeItem = styled(Link)`
    ${GameTypeItemCss(12, 90)}
    background-color: #ffffff;
    border-right: 1px solid #cccccc;

    &:last-child {
        border-right: none;
    }

    &.active {
        background-color: #ff9200;

        ${GameTypeTitle} {
            color: #ffffff;
        }
    }

    &.maintenance {
        ${GameTypeTitle} {
            color: #888888;
        }
    }

    &.maintenance.active {
        background-color: #cccccc;
    }
`

const GameType: React.FC<{}> = () => {
    const gameTypes = useGameType()
    return (
        <GameTypeList>
            {gameTypes.map((gameType, idx) => {
                return (
                    <GameTypeItem className={gameType.className} key={`game-type-${gameType.title}`} to={gameType.to}>
                        <GameTypeIcon index={idx} className={gameType.className} />
                        <GameTypeTitle>{gameType.title}</GameTypeTitle>
                    </GameTypeItem>
                )
            })}
        </GameTypeList>
    )
}

export default GameType
