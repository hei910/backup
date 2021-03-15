import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { GameTypeItemCss, GameTypeListCss, GameTypeIconCss, GameTypeIconBgImgCss2 } from '@components/common/gameType'
import GameTypeIconsImg from '@brand/assets/images/slotMachine/mobile/game-type-icons.png'
import bgImg from '@mixins/backgroundImg'
import ItemArrow from '@brand/assets/images/slotMachine/mobile/game-type-item-arrow.png'
import ItemArrowActive from '@brand/assets/images/slotMachine/mobile/game-type-item-arrow-on.png'
import ItemBg from '@brand/assets/images/slotMachine/mobile/game-type-item-bg.png'
import ItemBgActive from '@brand/assets/images/slotMachine/mobile/game-type-item-bg-on.png'
import useGameType from '@components/common/gameType/hook'

const GameTypeList = styled.div`
    ${GameTypeListCss('nowrap')}
    margin: 0 2px;
`

const GameTypeIcon = styled.div<{ index: number }>`
    ${GameTypeIconCss(42, 42)}
    ${(props) => GameTypeIconBgImgCss2(GameTypeIconsImg, 42, 42, props.index)}
`

const GameTypeTitle = styled.div`
    ${(props) => props.theme.typography.Body5}
    padding-top: 3px;
    color: #ffffff;
`

const GameTypeArrow = styled.div`
    ${bgImg(ItemArrow)}
    position: absolute;
    bottom: 0;
    right: 0;
    width: 10px;
    height: 10px;
    margin: 4px;
`

const GameTypeItem = styled(Link)`
    ${bgImg(ItemBg)}
    ${GameTypeItemCss(4, 87)}
    text-decoration: none;
    height: 89px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &:last-child {
        margin-right: 0;
    }

    &.active:not(.maintenance) {
        ${bgImg(ItemBgActive)}

        ${GameTypeArrow} {
            ${bgImg(ItemArrowActive)};
        }

        ${GameTypeTitle} {
            color: #000000;
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
                        <GameTypeIcon className={gameType.className} index={idx} />
                        <GameTypeTitle>{gameType.title}</GameTypeTitle>
                        <GameTypeArrow />
                    </GameTypeItem>
                )
            })}
        </GameTypeList>
    )
}

export default GameType
