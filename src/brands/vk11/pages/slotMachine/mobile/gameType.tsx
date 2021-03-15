import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { GameTypeItemCss, GameTypeListCss, GameTypeIconCss, GameTypeIconBgImgCss } from '@components/common/gameType'
import GameTypeIconsImg from '@brand/assets/images/slotMachine/game-type-icons.png'
import useGameType from '@components/common/gameType/hook'
import backgroundImg from '@mixins/backgroundImg'

const GameTypeList = styled.div`
    ${GameTypeListCss('nowrap')}
    background-color: #ffffff;
    box-shadow: 0 -1px 6px 0 rgba(255, 132, 12, 0.09);
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
`

const GameTypeIcon = styled.div<{ index: number }>`
    ${GameTypeIconCss(28, 28)}
    ${(props) => GameTypeIconBgImgCss(GameTypeIconsImg, 28, 28, props.index)}
`

const GameTypeTitle = styled.div`
    ${(props) => props.theme.typography.Body6}
    padding-top: 4px;
    color: #626d8e;
`

const GameTypeItem = styled(Link)`
    ${GameTypeItemCss(12, 68)}
    flex-grow: 1;
    background-color: #ffffff;

    &.active {
        background-image: linear-gradient(to bottom, #feca2e, #fd8524);

        ${GameTypeTitle} {
            color: #ffffff;
        }
    }

    &.maintenance {
        ${GameTypeIcon} {
            ${backgroundImg(GameTypeIconsImg, 'auto 28px', 'no-repeat', '-420px 0')}
        }

        ${GameTypeTitle} {
            color: #626d8e;
        }
    }

    &.maintenance.active {
        ${GameTypeIcon} {
            ${backgroundImg(GameTypeIconsImg, 'auto 28px', 'no-repeat', '-392px 0')}
        }

        ${GameTypeTitle} {
            color: #ffffff;
        }
    }
`

const GameType: React.FC<{}> = () => {
    const gameTypes = useGameType()
    const gameTypesWithoutHot = useMemo(() => gameTypes.slice(1), [gameTypes])
    return (
        <GameTypeList>
            {gameTypesWithoutHot.map((gameType, idx) => {
                return (
                    <GameTypeItem
                        className={gameType.className}
                        key={`game-type-${gameType.title}`}
                        to={gameType.to}
                        data-qa={`btnTab${gameType.supplier}`}>
                        <GameTypeIcon
                            index={idx + 1}
                            className={gameType.className}
                            data-qa={gameType.isMaintenance ? 'imgMaintenanceIcon' : `imgTab${gameType.supplier}`}
                        />
                        <GameTypeTitle>{gameType.title}</GameTypeTitle>
                    </GameTypeItem>
                )
            })}
        </GameTypeList>
    )
}

export default GameType
