import { useCallback } from 'react'
import styled from 'styled-components/macro'
import bgImg from '@mixins/backgroundImg'
import { useSelector } from '@redux'
import { GameListItem } from '@services/game/type'
import ArrowDown from '@brand/assets/images/slotMachine/mobile/arrow_down.svg'
import ArrowUp from '@brand/assets/images/slotMachine/mobile/arrow_up.svg'
import Collapse from '@components/common/collapse'
import useTranslation from '@hooks/useTranslation'
import GameSuppliers from '@constants/gameSuppliers'

interface IGameItemProps {
    game: GameListItem
    current: GameListItem | null
    onClickHandler: (game: GameListItem | null) => void
    onImageClick: () => void
    onTrial: (supplier: GameSuppliers, gameId: string) => void
    onEnter: (supplier: GameSuppliers, gameId: string) => void
}

const CardWrapper = styled.div`
    margin: 0 auto 8px;
    width: 90%;
`

const CardContainer = styled.div`
    background-color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.cardBg};
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
`

const IconContainer = styled.div`
    padding: 4px;
    width: 40%;
    min-width: 115px;
`

const Icon = styled.div<{ src: string }>`
    width: 100%;
    height: 80px;
    ${(props) => bgImg(props.src, 'contain')}
    border-radius: 12px;
`

const TitleContainer = styled.div`
    min-width: 170px;
    width: 55%;
    padding: 8px 16px;
`

const Title = styled.div`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    ${(props) => props.theme.typography.Subtitle3}
    font-weight: bold;
`

const RatingScoreDiv = styled.div`
    color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.score};
    ${(props) => props.theme.typography.Body5}
`
const ScoreSpan = styled.span`
    ${(props) => props.theme.typography.Body2}
    font-weight: bold;
`

const Arrow = styled.div<{ isExpand: boolean }>`
    position: absolute;
    right: 16px;
    width: 5%;
    height: 19%;
    ${(props) => (props.isExpand ? bgImg(ArrowDown, '') : bgImg(ArrowUp, ''))}
`

const BtnContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    text-align: center;
    background-color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.btnContainerBg};
    padding: 12px 0;
`

const Btn = styled.div`
    padding: 8px 0;
    border-radius: 6px;
    cursor: pointer;
`

const BtnStart = styled(Btn)`
    width: 50%;
    color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.btnStartText};
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

export default ({ game, current, onImageClick, onClickHandler, onTrial, onEnter }: IGameItemProps) => {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
    const isExpand = current?.id === game.id
    const onIconClick = useCallback(() => {
        onClickHandler(game)
        onImageClick()
    }, [game, onClickHandler, onImageClick])
    const onArrowClick = useCallback(() => {
        if (current?.id === game.id) {
            onClickHandler(null)
        } else {
            onClickHandler(game)
        }
    }, [current, game, onClickHandler])
    const onBtnStartClick = useCallback(() => {
        onEnter && onEnter(game.supplier, game.id)
    }, [game, onEnter])

    const onBtnTryClick = useCallback(() => {
        onTrial && onTrial(game.supplier, game.id)
    }, [game, onTrial])

    const t = useTranslation()

    return (
        <CardWrapper>
            <CardContainer>
                <IconContainer onClick={onIconClick}>
                    <Icon src={game.imgUrl} />
                </IconContainer>
                <TitleContainer>
                    <Title>{game.name}</Title>
                    <RatingScoreDiv>
                        {t('slotMachine.hotGames.rating')}
                        <ScoreSpan>{game.score?.toFixed(1)}</ScoreSpan>
                    </RatingScoreDiv>
                </TitleContainer>
                <Arrow isExpand={isExpand} onClick={onArrowClick} />
            </CardContainer>
            <Collapse isExpanded={isExpand}>
                <BtnContainer>
                    {!isLoggedIn && <BtnTry onClick={onBtnTryClick}>{t('slotMachine.hotGames.trial')}</BtnTry>}
                    <BtnStart onClick={onBtnStartClick}>{t('slotMachine.hotGames.start')}</BtnStart>
                </BtnContainer>
            </Collapse>
        </CardWrapper>
    )
}
