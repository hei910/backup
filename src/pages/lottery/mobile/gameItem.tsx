import styled from 'styled-components/macro'
import backgroundImg from '@styles/mixins/backgroundImg'
import { useCallback } from 'react'
import GameSuppliers from '@constants/gameSuppliers'
import { AutoWrapItem } from '@components/common/autoWrapContainer'

interface IGameItem {
    src: string
    gameTitle: string
    intervalDesc: string
    gameId: string
    qaNum: number
    onEnter: (newSupplier?: GameSuppliers | undefined, newGameId?: string | undefined) => Promise<void>
}

const SDefaultIcon = styled.div`
    width: 74px;
    height: 74px;
    margin: 4px auto;
    border-radius: 37px;
    background-color: ${(props) => props.theme.colors.brand};
    opacity: 0.75;
`

const Icon = styled.div<{ src: string }>`
    width: 74px;
    height: 74px;
    margin: 4px auto;
    ${(props) => backgroundImg(props.src, 'cover')}
`

const SGameTitle = styled.div`
    color: #373737;
    font-size: 14px;
    width: 100%;
    text-align: center;
    margin-bottom: 4px;
`

const SGameInterval = styled.div`
    color: #939393;
    font-size: 12px;
    width: 100%;
    text-align: center;
`

export default ({ src, gameTitle, intervalDesc, gameId, qaNum, onEnter }: IGameItem) => {
    const onGameClick = useCallback(() => {
        console.log('gameId', gameId)
        onEnter && onEnter(GameSuppliers.loto, gameId)
    }, [gameId, onEnter])

    return (
        <AutoWrapItem onClick={onGameClick} data-qa={`btnLottery${qaNum}`}>
            {src.length ? (
                <Icon src={src} data-qa={`imgLottery${qaNum}`} />
            ) : (
                <SDefaultIcon data-qa={`imgLottery${qaNum}`} />
            )}
            <SGameTitle data-qa={`txtLottery${qaNum}_title`}>{gameTitle}</SGameTitle>
            <SGameInterval data-qa={`txtLottery${qaNum}_desc`}>{intervalDesc}</SGameInterval>
        </AutoWrapItem>
    )
}
