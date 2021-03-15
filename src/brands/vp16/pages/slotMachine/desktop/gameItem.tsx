import React, { useCallback } from 'react'
import styled from 'styled-components/macro'
import bgImg from '@mixins/backgroundImg'
import Typography from '@mixins/typography'
import { useSelector } from '@redux'
import { GameListItem } from '@services/game/type'
import TagRating from '@brand/assets/images/slotMachine/desktop/tag_rating.svg'
import useTranslation from '@hooks/useTranslation'
import GameSuppliers from '@constants/gameSuppliers'
interface IGameItemProps {
    game: GameListItem
    onTrial: (supplier: GameSuppliers, gameId: string) => void
    onEnter: (supplier: GameSuppliers, gameId: string) => void
}

const CardContainer = styled.div`
    position: relative;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 ${(props) => props.theme.colors.page.common.slotMachine.gameItem.cardShadow};
    background-color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.cardBg};
    min-width: 220px;
    width: 15%;
    margin: 10px 8px 38px 7px;
`

const Content = styled.div`
    padding: 8px 16px;
`

const Icon = styled.div<{ src: string }>`
    width: 100%;
    height: 150px;
    ${(props) => bgImg(props.src, '')}
    border-radius: 10px 10px 0 0;
`

const TitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const Title = styled.span`
    ${(props) => props.theme.typography.H4Headline}
    width: 100%;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
    width: 50%;
    color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.btnStartText};
    box-shadow: 0 0 5px 0 ${(props) => props.theme.colors.page.common.slotMachine.gameItem.btnStartShadow};
    background-image: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.btnStartBg};
    ${(props) => props.theme.typography.Body2}
    font-weight: bold;
`

const BtnTry = styled(Btn)`
    width: 25%;
    color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.btnTryText};
    background-color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.btnTry};
    ${(props) => props.theme.typography.Body3}
`

const RatingTag = styled.div`
    width: 50px;
    height: 50px;
    padding: 4px 12px;
    ${bgImg(TagRating, '')}
    position: absolute;
    top: 11px;
    right: -8px;
    color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.score};
    text-align: center;
`

const RatingSpan = styled.div`
    ${(props) => props.theme.typography.Body6}
    ${Typography(9, 16)}
`

const ScoreSpan = styled.div`
    ${(props) => props.theme.typography.Body4}
    font-weight: bold;
`

export default ({ game, onTrial, onEnter }: IGameItemProps) => {
    const t = useTranslation()
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
    const onBtnStartClick = useCallback(() => {
        onEnter && onEnter(game.supplier, game.id)
    }, [game, onEnter])

    const onBtnTryClick = useCallback(() => {
        onTrial && onTrial(game.supplier, game.id)
    }, [game, onTrial])

    return (
        <CardContainer>
            <RatingTag>
                <RatingSpan>{t('slotMachine.hotGames.rating')}</RatingSpan>
                <ScoreSpan>{game.score?.toFixed(1) || 9.8}</ScoreSpan>
            </RatingTag>
            <Icon src={game.imgUrl} />
            <Content>
                <TitleContainer>
                    <Title>{game.name}</Title>
                </TitleContainer>
                <Line />
                <BtnContainer>
                    {!isLoggedIn && <BtnTry onClick={onBtnTryClick}>{t('slotMachine.hotGames.trial')}</BtnTry>}
                    <BtnStart onClick={onBtnStartClick}>{t('slotMachine.hotGames.start')}</BtnStart>
                </BtnContainer>
            </Content>
        </CardContainer>
    )
}
