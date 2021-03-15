import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { GameTypeItemCss, GameTypeListCss } from '@components/common/gameType'
import bgImg from '@mixins/backgroundImg'
import MaintenanceImg from '@brand/assets/images/slotMachine/mobile/maintenance.png'
import useGameType from '@components/common/gameType/hook'

const GameTypeList = styled.div`
    ${GameTypeListCss('nowrap')}
    background-color: #000000;
`

const GameTypeTitle = styled.div`
    ${(props) => props.theme.typography.Body4}
    color: #ffffff;
`

const MaintenanceIcon = styled.div`
    ${bgImg(MaintenanceImg, 'contain')}
    width: 32px;
    height: 32px;
    margin: 5px auto;
`

const GameTypeItem = styled(Link)`
    ${GameTypeItemCss(16, 85)}

    &.active {
        background-color: #3e3e3e;

        ${GameTypeTitle} {
            color: #f9cc1b;
        }
    }

    &.maintenance {
        padding: 4px 0 4px;
    }
`

const GameType: React.FC<{}> = () => {
    const gameTypes = useGameType()
    return (
        <GameTypeList>
            {gameTypes.map((gameType) => {
                return (
                    <GameTypeItem className={gameType.className} key={`game-type-${gameType.title}`} to={gameType.to}>
                        {gameType.isMaintenance ? <MaintenanceIcon /> : <GameTypeTitle>{gameType.title}</GameTypeTitle>}
                    </GameTypeItem>
                )
            })}
        </GameTypeList>
    )
}

export default GameType
