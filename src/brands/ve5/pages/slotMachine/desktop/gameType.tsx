import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { GameTypeItemCss, GameTypeListCss, GameTypeIconCss } from '@components/common/gameType'
import GameTypeIconsImg from '@brand/assets/images/slotMachine/game-type-icons.png'
import useGameType from '@components/common/gameType/hook'
import imageSprite from '@mixins/imageSprite'
import bgImg from '@mixins/backgroundImg'

const GameTypeList = styled.div`
    ${GameTypeListCss('nowrap', 'visible')}
    width: 100%;
`

const GameTypeIcon = styled.div<{ index: number }>`
    ${GameTypeIconCss(46, 46)}
    ${(props) =>
        imageSprite({
            url: GameTypeIconsImg,
            width: 46,
            height: 46,
            itemIndex: props.index,
            indexMap: {
                default: 1,
                active: 0,
            },
        })};

    &.maintenance {
        ${bgImg(GameTypeIconsImg, `auto ${46}px`, 'no-repeat', `${46 * -15}px 0`)}
    }
`

const GameTypeTitle = styled.div`
    ${(props) => props.theme.typography.Body2}
    margin-top: 8px;
    color: #777777;
`

const GameTypeItem = styled(Link)`
    ${GameTypeItemCss(15)}
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

    &.active {
        box-shadow: 0 -3px 6px 0 rgba(0, 0, 0, 0.16);
    }

    &.maintenance {
        box-shadow: 0 -3px 6px 0 rgba(0, 0, 0, 0.16);
        background-color: #cecece;
    }
`

const SGameType: React.FC<{}> = () => {
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

export default SGameType
