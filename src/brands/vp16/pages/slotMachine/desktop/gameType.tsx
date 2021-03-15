import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { GameTypeItemCss, GameTypeListCss, GameTypeIconCss, GameTypeIconBgImgCss } from '@components/common/gameType'
import GameTypeIconsImg from '@brand/assets/images/slotMachine/game-type-icons.svg'
import useGameType from '@components/common/gameType/hook'

const Container = styled.div`
    width: 100%;
    padding: 0 10px;
`

const GameTypeList = styled.div`
    ${GameTypeListCss('nowrap')}
`

const GameTypeIcon = styled.div<{ index: number }>`
    ${GameTypeIconCss(36, 36)}
    ${(props) => GameTypeIconBgImgCss(GameTypeIconsImg, 36, 36, props.index)}
`

const GameTypeTitle = styled.div`
    ${(props) => props.theme.typography.Body2}
    padding-top: 6px;
    color: #ffffff;
`

const GameTypeItemWrapper = styled.div`
    text-align: center;
    padding: 8px 0;
    border-right: 1px solid #0a6e32;
`

const GameTypeItem = styled(Link)`
    ${GameTypeItemCss(8)}

    &:first-child {
        ${GameTypeItemWrapper} {
            border-left: 1px solid #0a6e32;
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
        <Container>
            <GameTypeList>
                {gameTypes.map((gameType, idx) => {
                    return (
                        <GameTypeItem
                            className={gameType.className}
                            key={`game-type-${gameType.title}`}
                            to={gameType.to}>
                            <GameTypeItemWrapper>
                                <GameTypeIcon className={gameType.className} index={idx} />
                                <GameTypeTitle>{gameType.title}</GameTypeTitle>
                            </GameTypeItemWrapper>
                        </GameTypeItem>
                    )
                })}
            </GameTypeList>
        </Container>
    )
}

export default GameType
