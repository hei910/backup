import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import bgImg from '@mixins/backgroundImg'
import { GameTypeListCss } from '@components/common/gameType'
import MaintenanceWhiteImg from '@brand/assets/images/slotMachine/desktop/maintenance-icon.svg'
import useGameType from '@components/common/gameType/hook'

const GameTypeList = styled.div`
    ${GameTypeListCss('nowrap')}
    justify-content: flex-start;
`

const GameTypeTitle = styled.div`
    ${(props) => props.theme.typography.Body3}
    display: flex;
    justify-content: center;
    align-items: center;
    color: #a5a5a5;
`

const MaintenanceIcon = styled.div`
    ${bgImg(MaintenanceWhiteImg, 'contain')}
    width: 17px;
    height: 17px;
    margin-right: 4px;
`

const GameTypeItem = styled(Link)`
    text-align: center;
    text-decoration: none;
    padding: 6px 12px;
    margin-right: 20px;
    border-radius: 17px;
    background-color: #ffffff;

    :last-child {
        margin-right: 12px;
    }

    &.active {
        background-color: #3d7eeb;

        ${GameTypeTitle} {
            color: #ffffff;
        }
    }

    &.maintenance {
        background-color: #a5a5a5;

        ${GameTypeTitle} {
            color: #ffffff;
        }
    }
`

const SGameType: React.FC<{}> = () => {
    const gameTypes = useGameType()

    return (
        <GameTypeList>
            {gameTypes.map((gameType) => {
                return (
                    <GameTypeItem className={gameType.className} key={`game-type-${gameType.title}`} to={gameType.to}>
                        <GameTypeTitle>
                            {gameType.isMaintenance && <MaintenanceIcon />}
                            {gameType.title}
                        </GameTypeTitle>
                    </GameTypeItem>
                )
            })}
        </GameTypeList>
    )
}

export default SGameType
