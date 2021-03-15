import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { GameTypeItemCss, GameTypeListCss, GameTypeIconCss, GameTypeIconBgImgCss } from '@components/common/gameType'
import GameTypeIconsImg from '@brand/assets/images/slotMachine/game-type-icons.png'
import useGameType from '@components/common/gameType/hook'

const Container = styled.div`
    width: 100%;
`

const GameTypeList = styled.div`
    ${GameTypeListCss('wrap')}
`

const GameTypeIcon = styled.div<{ index: number }>`
    ${GameTypeIconCss(54, 54)}
    ${(props) => GameTypeIconBgImgCss(GameTypeIconsImg, 54, 54, props.index)}
`

const GameTypeTitle = styled.div`
    ${(props) => props.theme.typography.Body2}
    margin-top: 4px;
    color: #000000;
`

const GameTypeItem = styled(Link)`
    ${GameTypeItemCss(12)}
    background-color: #ffffff;
    border-right: 2px solid #cccccc;

    &:last-child {
        border-right: none;
    }

    &.active {
        background-color: #ff9200;

        ${GameTypeTitle} {
            color: #ffffff;
        }
    }

    :hover {
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

const SGameType: React.FC<{}> = () => {
    const gameTypes = useGameType()

    return (
        <Container>
            <GameTypeList>
                {gameTypes.map((gameType, idx) => {
                    return (
                        <GameTypeItem
                            className={gameType.className}
                            key={`game-type-${gameType.title}`}
                            to={gameType.to}>
                            <GameTypeIcon className={gameType.className} index={idx} />
                            <GameTypeTitle>{gameType.title}</GameTypeTitle>
                        </GameTypeItem>
                    )
                })}
            </GameTypeList>
        </Container>
    )
}

export default SGameType
