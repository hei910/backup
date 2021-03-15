import React, { useCallback } from 'react'
import styled from 'styled-components/macro'
import bgImg from '@mixins/backgroundImg'
import { useSelector } from '@redux'
import { GameListItem } from '@services/game/type'
import useTranslation from '@hooks/useTranslation'
import GameSuppliers from '@constants/gameSuppliers'

interface IGameItemProps {
    game: GameListItem
    onClickHandler: (game: GameListItem) => void
    onTrial: (supplier: GameSuppliers, gameId: string) => void
    onEnter: (supplier: GameSuppliers, gameId: string) => void
    activeGame: GameListItem | null
}

const Title = styled.div`
    width: 65%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    ${(props) => props.theme.typography.Subtitle4}
`

const CardContainer = styled.div<{ activeGame: boolean }>`
    width: 48%;
    margin: 4px 1%;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 ${(props) => props.theme.colors.page.common.slotMachine.gameItem.cardShadow};
    ${(props) =>
        !props.activeGame &&
        `
        background-color: ${props.theme.colors.page.common.slotMachine.gameItem.cardBg};`}
    ${(props) =>
        props.activeGame &&
        `
        background-color: ${props.theme.colors.page.common.slotMachine.gameItem.cardBgHover};
        cursor: pointer;
        ${Title} {
            color: ${props.theme.colors.page.common.slotMachine.gameItem.titleHover};
        }`}
`

const Content = styled.div`
    padding: 8px;
`

const Icon = styled.div<{ src: string }>`
    width: 100%;
    height: 100px;
    /* padding: 78.74% 0 0; */
    ${(props) => bgImg(props.src, 'cover')}
    border-radius: 10px;
    margin: 0 auto;
`

const TitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 4px;
`

const Score = styled.div`
    ${(props) => props.theme.typography.Body6}
    color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.score};
`

const Line = styled.hr`
    background-color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.line};
    height: 1px;
    border: none;
`

const BtnContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    text-align: center;
`

const Btn = styled.div`
    padding: 4px 0;
    border-radius: 6px;
    cursor: pointer;
`

const BtnStart = styled(Btn)`
    width: 55%;
    color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.btnStartText};
    box-shadow: 0 0 5px 0 ${(props) => props.theme.colors.page.common.slotMachine.gameItem.btnStartShadow};
    background-image: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.btnStartBg};
    ${(props) => props.theme.typography.Body2}
`

const BtnTry = styled(Btn)`
    width: 30%;
    background-color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.btnTry};
    ${(props) => props.theme.typography.Body3}
`

export default ({ game, onClickHandler, onTrial, onEnter, activeGame }: IGameItemProps) => {
    const t = useTranslation()
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
    const onBtnStartClick = useCallback(() => {
        onClickHandler(game)
        onEnter && onEnter(game.supplier, game.id)
    }, [onClickHandler, onEnter, game])

    const onBtnTryClick = useCallback(() => {
        onClickHandler(game)
        onTrial && onTrial(game.supplier, game.id)
    }, [onClickHandler, onTrial, game])

    const onContainerClick = useCallback(() => {
        onClickHandler(game)
    }, [game, onClickHandler])

    const isActiveGame = activeGame !== null && activeGame.id === game.id

    return (
        <CardContainer activeGame={isActiveGame} onClick={onContainerClick}>
            <Content>
                <Icon src={game.imgUrl} />
                <TitleContainer>
                    <Title>{game.name}</Title>
                    <Score>{`${t('slotMachine.hotGames.rating')} ${game.score?.toFixed(1) || 9.8}`}</Score>
                </TitleContainer>
                <Line />
                <BtnContainer>
                    <BtnStart onClick={onBtnStartClick}>{t('slotMachine.hotGames.start')}</BtnStart>
                    {!isLoggedIn && <BtnTry onClick={onBtnTryClick}>{t('slotMachine.hotGames.trial')}</BtnTry>}
                </BtnContainer>
            </Content>
        </CardContainer>
    )
}
