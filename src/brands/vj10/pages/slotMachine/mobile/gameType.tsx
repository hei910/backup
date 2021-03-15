import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { GameTypeItemCss, GameTypeListCss, GameTypeIconCss, GameTypeIconBgImgCss } from '@components/common/gameType'
import GameTypeIconsImg from '@brand/assets/images/slotMachine/mobile/game-type-icons.png'
import useGameType from '@components/common/gameType/hook'

const GameTypeList = styled.div`
    ${GameTypeListCss('nowrap')}
`

const GameTypeIcon = styled.div<{ index: number }>`
    ${GameTypeIconCss(31, 31)}
    ${(props) => GameTypeIconBgImgCss(GameTypeIconsImg, 31, 31, props.index)}
`

const GameTypeTitle = styled.div`
    ${(props) => props.theme.typography.Body2}
    padding-top: 5px;
    color: #ffffff;
`

const GameTypeItem = styled(Link)`
    ${GameTypeItemCss(17, 100)}

    &.maintenance {
        background-color: rgba(117, 117, 117, 0.5);
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
