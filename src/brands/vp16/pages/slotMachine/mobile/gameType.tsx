import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { GameTypeItemCss, GameTypeListCss, GameTypeIconCss, GameTypeIconBgImgCss } from '@components/common/gameType'
import GameTypeBgImg from '@brand/assets/images/slotMachine/game-type-bg.svg'
import GameTypeIconsImg from '@brand/assets/images/slotMachine/game-type-icons.svg'
import useGameType from '@components/common/gameType/hook'
import bgImg from '@mixins/backgroundImg'

const GameTypeList = styled.div`
    ${bgImg(GameTypeBgImg, 'cover')}
    ${GameTypeListCss('nowrap')}
`

const GameTypeIcon = styled.div<{ index: number }>`
    ${GameTypeIconCss(25, 25)}
    ${(props) => GameTypeIconBgImgCss(GameTypeIconsImg, 25, 25, props.index)}
`

const GameTypeTitle = styled.div`
    ${(props) => props.theme.typography.Body6}
    padding-top: 5px;
    color: #ffffff;
`

const GameTypeItemWrapper = styled.div`
    text-align: center;
    border-right: 1px solid #0a6e32;
`

const GameTypeItem = styled(Link)`
    ${GameTypeItemCss(13, 70)}

    &:last-child {
        ${GameTypeItemWrapper} {
            border-right: none;
        }
    }

    &.active:not(.maintenance) {
        ${GameTypeTitle} {
            color: #f6e51d;
        }
    }

    &.active.maintenance {
        background-color: rgba(0, 0, 0, 0.4);
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
                            <GameTypeIcon className={gameType.className} index={idx} />
                            <GameTypeTitle>{gameType.title}</GameTypeTitle>
                        </GameTypeItemWrapper>
                    </GameTypeItem>
                )
            })}
        </GameTypeList>
    )
}

export default GameType
