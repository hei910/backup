import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { GameTypeItemCss, GameTypeListCss } from '@components/common/gameType'
import bgImg from '@mixins/backgroundImg'
import MaintenanceImg from '@brand/assets/images/slotMachine/desktop/maintenance.svg'
import useGameType from '@components/common/gameType/hook'

const Container = styled.div`
    width: 100%;
    background-color: #1f1f1f;
`

const GameTypeList = styled.div`
    ${GameTypeListCss('nowrap')}
    border-bottom: 2px solid #f9cc1b;
`

const GameTypeTitle = styled.div`
    ${(props) => props.theme.typography.H4Headline}
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
`

const GameTypeItem = styled(Link)`
    ${GameTypeItemCss(10)}

    &.maintenance {
        ${GameTypeTitle} {
            color: #9a9a9a;
        }
    }

    &.active {
        background-color: #3e3e3e;

        ${GameTypeTitle} {
            color: #f9cc1b;
        }
    }

    &.maintenance.active {
        ${GameTypeTitle} {
            color: #9a9a9a;
        }
    }
`

const MaintenanceIcon = styled.div`
    ${bgImg(MaintenanceImg, 'contain')}
    width: 24px;
    height: 24px;
    margin-left: 7px;
`

const SGameType: React.FC<{}> = () => {
    const gameTypes = useGameType()
    return (
        <Container>
            <GameTypeList>
                {gameTypes.map((gameType) => {
                    return (
                        <GameTypeItem
                            className={gameType.className}
                            key={`game-type-${gameType.title}`}
                            to={gameType.to}>
                            <GameTypeTitle>
                                {gameType.title}
                                {gameType.isMaintenance && <MaintenanceIcon />}
                            </GameTypeTitle>
                        </GameTypeItem>
                    )
                })}
            </GameTypeList>
        </Container>
    )
}

export default SGameType
