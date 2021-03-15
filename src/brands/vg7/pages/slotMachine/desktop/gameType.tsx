import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { GameTypeItemCss, GameTypeListCss, GameTypeIconCss, GameTypeIconBgImgCss2 } from '@components/common/gameType'
import GameTypeIconsImg from '@brand/assets/images/slotMachine/desktop/game-type-icons.png'
import useGameType from '@components/common/gameType/hook'

const Container = styled.div`
    width: 100%;
`

const GameTypeList = styled.div`
    ${GameTypeListCss('wrap')}
    justify-content: flex-end;
`

const GameTypeIcon = styled.div<{ index: number }>`
    ${GameTypeIconCss(84, 84)}
    ${(props) => GameTypeIconBgImgCss2(GameTypeIconsImg, 84, 84, props.index)}
`

const GameTypeTitle = styled.div`
    ${(props) => props.theme.typography.Body1}
    padding-top: 3px;
    color: #ffffff;
    font-weight: bold;
    text-shadow: 0px 1px 15px rgba(0, 0, 0, 0.5);
    -webkit-text-stroke: 2px rgba(0, 0, 0, 0.7);
`

const GameTypeItem = styled(Link)`
    ${GameTypeItemCss(0, 95)}
    text-decoration: none;
    margin: 15px 15px 0;
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
                            <GameTypeIcon index={idx} className={gameType.className} />
                            <GameTypeTitle>{gameType.title}</GameTypeTitle>
                        </GameTypeItem>
                    )
                })}
            </GameTypeList>
        </Container>
    )
}

export default SGameType
