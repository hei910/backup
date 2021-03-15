import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { GameTypeItemCss, GameTypeListCss, GameTypeIconCss } from '@components/common/gameType'
import GameTypeIconsImg from '@brand/assets/images/slotMachine/game-type-icons.png'
import useGameType from '@components/common/gameType/hook'
import imageSprite from '@mixins/imageSprite'
import bgImg from '@mixins/backgroundImg'

const GameTypeList = styled.div`
    ${GameTypeListCss('nowrap')}
    justify-content: space-between;
`

const GameTypeIcon = styled.div<{ index: number }>`
    ${GameTypeIconCss(30, 30)}
    ${(props) =>
        imageSprite({
            url: GameTypeIconsImg,
            width: 30,
            height: 30,
            itemIndex: props.index,
            indexMap: {
                default: 1,
                active: 0,
            },
        })};

    &.maintenance {
        ${bgImg(GameTypeIconsImg, `auto ${30}px`, 'no-repeat', `${30 * -15}px 0`)}
    }
`

const GameTypeTitle = styled.div`
    ${(props) => props.theme.typography.Body6}
    padding-top: 5px;
    color: #777777;
`

const GameTypeItem = styled(Link)`
    ${GameTypeItemCss(7, 60)}
    background-color: #ffffff;

    &.maintenance {
        background-color: #cecece;
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
