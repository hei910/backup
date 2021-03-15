import React, { useCallback } from 'react'
import styled from 'styled-components/macro'
import bgImg from '@mixins/backgroundImg'
import { useSelector } from '@redux'
import { GameListItem } from '@services/game/type'
import GameSuppliers from '@constants/gameSuppliers'
import useTranslation from '@hooks/useTranslation'

interface IGameItemProps {
    game: GameListItem
    current: GameListItem | null
    onClickHandler: (game: GameListItem) => void
    onTrial: (supplier: GameSuppliers, gameId: string) => void
    onEnter: (supplier: GameSuppliers, gameId: string) => void
}

const Title = styled.div`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.title};
    ${(props) => props.theme.typography.Subtitle5}
`

const Score = styled.div`
    margin-top: 4px;
    ${(props) => props.theme.typography.Body5}
    color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.score};
`

const DetailsContainer = styled.div`
    padding: 8px 4px;
    background-color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.DetailsBg};
`

const ImageContainer = styled.div`
    position: relative;
`

const BtnContainer = styled.div`
    position: absolute;
    top: -100%;
    background-color: rgba(0, 0, 0, 0.75);
    text-align: center;
    width: 100%;
    height: 100%;
    padding: 12px 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`

const CardContainer = styled.div<{ active: boolean }>`
    min-width: 95px;
    width: 31.333%;
    overflow: hidden;
    margin: 0 1% 8px;
    ${(props) =>
        props.active &&
        `${Title} {
            color: ${props.theme.colors.page.common.slotMachine.gameItem.titleHover};
        }

        ${Score} {
            color: ${props.theme.colors.page.common.slotMachine.gameItem.scoreHover};
        }

        ${DetailsContainer} {
            background-color: ${props.theme.colors.page.common.slotMachine.gameItem.DetailsBgHover};
        }

        ${BtnContainer} {
            top: 0;
        }`}
`

const Icon = styled.div<{ src: string }>`
    width: 100%;
    height: 100px;
    ${(props) => bgImg(props.src, 'cover')}
`

const TitleContainer = styled.div``

const Btn = styled.div`
    width: 70%;
    padding: 4px 0;
    border-radius: 4px;
    cursor: pointer;
    margin: 0 auto 8px;
`

const BtnStart = styled(Btn)`
    color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.btnStartText};
    background-color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.btnStartBg};
    ${(props) => props.theme.typography.Body3}
`

const BtnTry = styled(Btn)`
    color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.btnTryText};
    background-color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.btnTry};
    ${(props) => props.theme.typography.Body3}
`

export default ({ game, current, onClickHandler, onTrial, onEnter }: IGameItemProps) => {
    const t = useTranslation()
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
    const active = game?.id === current?.id

    const onBtnStartClick = useCallback(() => {
        onEnter(game.supplier, game.id)
    }, [game, onEnter])

    const onBtnTryClick = useCallback(() => {
        onTrial(game.supplier, game.id)
    }, [game, onTrial])

    return (
        <CardContainer active={active} onClick={() => onClickHandler(game)}>
            <ImageContainer>
                <BtnContainer>
                    <BtnStart onClick={onBtnStartClick}>{t('slotMachine.hotGames.start')}</BtnStart>
                    {!isLoggedIn && <BtnTry onClick={onBtnTryClick}>{t('slotMachine.hotGames.trial')}</BtnTry>}
                </BtnContainer>
                <Icon src={game.imgUrl} />
            </ImageContainer>
            <DetailsContainer>
                <TitleContainer>
                    <Title>{game.name}</Title>
                    <Score>{`${t('slotMachine.hotGames.rating')} ${game.score?.toFixed(1)}`}</Score>
                </TitleContainer>
            </DetailsContainer>
        </CardContainer>
    )
}
