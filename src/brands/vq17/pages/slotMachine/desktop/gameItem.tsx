import React, { useCallback } from 'react'
import styled from 'styled-components/macro'
import bgImg from '@mixins/backgroundImg'
import IconArrow from '@brand/assets/images/slotMachine/desktop/arrowImgWhite.png'
import IconArrowHover from '@brand/assets/images/slotMachine/desktop/arrowImgBlack.png'
import { useSelector } from '@redux'
import { GameListItem } from '@services/game/type'
import GameSuppliers from '@constants/gameSuppliers'
import useTranslation from '@hooks/useTranslation'

interface IGameItemProps {
    game: GameListItem
    onTrial: (supplier: GameSuppliers, gameId: string) => void
    onEnter: (supplier: GameSuppliers, gameId: string) => void
}

const Title = styled.div`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.title};
    ${(props) => props.theme.typography.Subtitle2}
`

const Arrow = styled.div`
    width: 20px;
    height: 20px;
    ${bgImg(IconArrow, '')};
`

const Score = styled.div`
    margin-top: 8px;
    ${(props) => props.theme.typography.Body3}
    color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.score};
`

const DetailsContainer = styled.div`
    padding: 8px 16px;
    background-color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.DetailsBg};
`

const ImageContainer = styled.div`
    position: relative;
`

const BtnContainer = styled.div`
    position: absolute;
    background-color: rgba(0, 0, 0, 0.75);
    text-align: center;
    width: 100%;
    height: 100%;
    padding: 32px 0;
    display: none;
`

const CardContainer = styled.div`
    min-width: 230px;
    width: 23%;
    overflow: hidden;
    margin: 0 1% 16px;

    :hover {
        ${Title} {
            color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.titleHover};
        }

        ${Arrow} {
            ${bgImg(IconArrowHover, '')};
        }

        ${Score} {
            color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.scoreHover};
        }

        ${DetailsContainer} {
            background-color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.DetailsBgHover};
        }

        ${BtnContainer} {
            display: block;
        }
    }
`

const Icon = styled.div<{ src: string }>`
    width: 100%;
    height: 150px;
    ${(props) => bgImg(props.src, 'cover')}
`

const TitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const Btn = styled.div`
    width: 50%;
    padding: 4px 0;
    border-radius: 4px;
    cursor: pointer;
    margin: 0 auto 12px;
`

const BtnStart = styled(Btn)`
    color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.btnStartText};
    background-color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.btnStartBg};
    ${(props) => props.theme.typography.Body2}
`

const BtnTry = styled(Btn)`
    color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.btnTryText};
    background-color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.btnTry};
    ${(props) => props.theme.typography.Body3}
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
                    <Arrow />
                </TitleContainer>
                <Score>{`${t('slotMachine.hotGames.rating')} ${game.score?.toFixed(1)}`}</Score>
            </DetailsContainer>
        </CardContainer>
    )
}
