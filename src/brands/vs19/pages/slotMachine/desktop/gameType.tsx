import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { GameTypeItemCss, GameTypeListCss, GameTypeIconCss } from '@components/common/gameType'
import imageSprite from '@mixins/imageSprite'
import bgImg from '@mixins/backgroundImg'
import GameTypeIconsImg from '@brand/assets/images/slotMachine/desktop/game-type-icons.png'
import ItemArrow from '@brand/assets/images/slotMachine/desktop/game-type-item-arrow.png'
import ItemArrowHover from '@brand/assets/images/slotMachine/desktop/game-type-item-arrow-hover.png'
import ItemArrowActive from '@brand/assets/images/slotMachine/desktop/game-type-item-arrow-on.png'
import ItemBg from '@brand/assets/images/slotMachine/desktop/game-type-item-bg.png'
import ItemBgActive from '@brand/assets/images/slotMachine/desktop/game-type-item-bg-on.png'
import useGameType from '@components/common/gameType/hook'

const Container = styled.div`
    width: 100%;
    padding: 0 24px;
`

const GameTypeList = styled.div`
    ${GameTypeListCss('nowrap')}
    justify-content: center;
`

const GameTypeIcon = styled.div`
    ${GameTypeIconCss(54, 54)}
`

const GameTypeTitle = styled.div`
    ${(props) => props.theme.typography.Body2}
    margin-top: 4px;
    color: #ffffff;
`

const GameTypeArrow = styled.div`
    ${bgImg(ItemArrow)}
    position: absolute;
    bottom: 12px;
    right: 12px;
    width: 11px;
    height: 11px;
`

const GameTypeItem = styled(Link)<{ index: number }>`
    ${bgImg(ItemBg)}
    ${GameTypeItemCss(10)}
    position: relative;
    margin-right: 20px;

    ${GameTypeIcon} {
        ${(props) =>
        imageSprite({
            url: GameTypeIconsImg,
            width: 54,
            height: 54,
            itemIndex: props.index,
            indexMap: {
                active: 0,
                default: 1,
                hover: 2,
                other: 3,
            },
        })}

        &.maintenance {
            ${(props) =>
        imageSprite({
            url: GameTypeIconsImg,
            width: 54,
            height: 54,
            itemIndex: props.index,
            indexMap: {
                active: 0,
                default: 1,
                hover: 2,
                other: 3,
            },
            type: 'other',
        })}
        }
    }

    &:last-child {
        margin-right: 0;
    }

    &:hover:not(.active):not(.maintenance) {
        ${GameTypeArrow} {
            ${bgImg(ItemArrowHover)};
        }

        ${GameTypeIcon} {
            background-position: ${(props) => 54 * -1 * 4 * props.index - 54 * 2}px 0;
        }
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
                            index={idx}
                            to={gameType.to}>
                            <GameTypeIcon className={gameType.className} />
                            <GameTypeTitle>{gameType.title}</GameTypeTitle>
                            <GameTypeArrow />
                        </GameTypeItem>
                    )
                })}
            </GameTypeList>
        </Container>
    )
}

export default SGameType
