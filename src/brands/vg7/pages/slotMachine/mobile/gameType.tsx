import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { GameTypeItemCss, GameTypeListCss, GameTypeIconCss, GameTypeIconBgImgCss2 } from '@components/common/gameType'
import GameTypeIconsImg from '@brand/assets/images/slotMachine/mobile/game-type-icons.png'
import useGameType from '@components/common/gameType/hook'

const GameTypeList = styled.div`
    ${GameTypeListCss('nowrap')}
    background: white;
`

const GameTypeIcon = styled.div<{ index: number }>`
    ${GameTypeIconCss(42, 42)}
    ${(props) => GameTypeIconBgImgCss2(GameTypeIconsImg, 42, 42, props.index)}
`

const GameTypeTitle = styled.div`
    ${(props) => props.theme.typography.Body5}
    padding-top: 3px;
    color: #878787;
`

const GameTypeItemWrapper = styled.div`
    text-align: center;
    border-right: 1px solid #f0f0f0;
`

const GameTypeItem = styled(Link)`
    ${GameTypeItemCss(4, 100)}

    &:last-child {
        ${GameTypeItemWrapper} {
            border-right: none;
        }
    }

    &.active {
        background-color: #333333;

        ${GameTypeItemWrapper} {
            border-right: none;
        }

        ${GameTypeTitle} {
            color: #ff9900;
        }
    }

    &.maintenance {
        ${GameTypeItemWrapper} {
            border-right: none;
        }
    }
`

const GameType: React.FC<{}> = () => {
    const gameTypes = useGameType()
    return (
        <GameTypeList>
            {gameTypes.map((gameType, idx) => {
                return (
                    <GameTypeItem className={gameType.className} key={`game-type-${gameType.title}`} to={gameType.to}>
                        <GameTypeItemWrapper>
                            <GameTypeIcon index={idx} className={gameType.className} />
                            <GameTypeTitle>{gameType.title}</GameTypeTitle>
                        </GameTypeItemWrapper>
                    </GameTypeItem>
                )
            })}
        </GameTypeList>
    )
}

export default GameType
