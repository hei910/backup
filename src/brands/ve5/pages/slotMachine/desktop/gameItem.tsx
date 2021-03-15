import { useCallback } from 'react'
import styled from 'styled-components/macro'
import bgImg from '@mixins/backgroundImg'
import { useSelector } from '@redux'
import { GameListItem } from '@services/game/type'
import GameSuppliers from '@constants/gameSuppliers'
import useTranslation from '@hooks/useTranslation'

interface IGameItemProps {
    game: GameListItem
    onTrial: (supplier: GameSuppliers, gameId: string) => void
    onEnter: (supplier: GameSuppliers, gameId: string) => void
}

const CardContainer = styled.div`
    border-radius: 10px;
    box-shadow: 0 0 10px 0 ${(props) => props.theme.colors.page.common.slotMachine.gameItem.cardShadow};
    background-color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.cardBg};
    min-width: 230px;
    width: 23%;
    margin: 0 1% 22px;
`

const Content = styled.div`
    padding: 8px 16px;
`

const Icon = styled.div<{ src: string }>`
    width: 100%;
    height: 150px;
    ${(props) => bgImg(props.src, '')}
    border-radius: 10px;
    margin: 0 auto;
`

const TitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 12px;
`

const Title = styled.span`
    width: 75%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    ${(props) => props.theme.typography.Subtitle1}
`

const Score = styled.span`
    ${(props) => props.theme.typography.Body3}
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
    width: 50%;
    color: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.btnStartText};
    box-shadow: 0 0 5px 0 ${(props) => props.theme.colors.page.common.slotMachine.gameItem.btnStartShadow};
    background-image: ${(props) => props.theme.colors.page.common.slotMachine.gameItem.btnStartBg};
    ${(props) => props.theme.typography.Body2}
`

const BtnTry = styled(Btn)`
    width: 25%;
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
