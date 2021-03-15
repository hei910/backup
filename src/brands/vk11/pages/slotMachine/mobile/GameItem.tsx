import React, { useCallback } from 'react'
import { useSelector } from '@redux'
import bgImg from '@styles/mixins/backgroundImg'
import styled from 'styled-components/macro'
import { GameListItem } from '@services/game/type'
import useTranslation from '@hooks/useTranslation'
import GameSuppliers from '@constants/gameSuppliers'
// import useTranslation from '@hooks/useTranslation'

interface IGameItemProps {
    game: GameListItem
    index: number
    onTrial: (supplier: GameSuppliers, gameId: string) => void
    onEnter: (supplier: GameSuppliers, gameId: string) => void
}

const SItemContainer = styled.div`
    width: 45%;
    height: 146px;
    background: #ffffff;
    border-radius: 10px;
    margin: 0 2.5% 10px;
    box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
`
const SImage = styled.div<{ img: string }>`
    ${(props) => bgImg(props.img, 'cover')}
    height: 84px;
    width: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`
const SGameTitle = styled.div`
    ${(props) => props.theme.typography.Body4}
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #626d8e;
    text-align: center;
    margin: 4px;
    flex: 1 0 auto;
`
const SButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
`
const SButton = styled.div`
    height: 28px;
    border-radius: 14px;
    font-size: 12px;
    padding: 8px 0;
    margin-bottom: 4px;
`
const SStartGameButton = styled(SButton)`
    text-align: center;
    flex: 6;
    margin: 0 8px 0 4px;
    background-color: #fd8524;
    border: 1px solid transparent;
    color: #ffffff;
`
const STryGameButton = styled(SButton)`
    text-align: center;
    flex: 4;
    color: #fd8524;
    border: solid 1px #ffd1a3;
    margin: 0 0 0 8px;
`

const GameItem = ({ game, index, onTrial, onEnter }: IGameItemProps) => {
    const t = useTranslation()
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

    const onBtnStartClick = useCallback(() => {
        onEnter && onEnter(game.supplier, game.id)
    }, [game, onEnter])

    const onBtnTryClick = useCallback(() => {
        onTrial && onTrial(game.supplier, game.id)
    }, [game, onTrial])

    return (
        <SItemContainer data-qa={`btnGameItem${index}`}>
            <SImage img={game.imgUrl} />
            <SGameTitle>{game.name}</SGameTitle>
            <SButtonContainer>
                {!isLoggedIn && (
                    <STryGameButton data-qa={`btnGameItem${index}_trial`} onClick={onBtnTryClick}>
                        {t('slotMachine.hotGames.trial')}
                    </STryGameButton>
                )}
                <SStartGameButton data-qa={`btnGameItem${index}_play`} onClick={onBtnStartClick}>
                    {t('slotMachine.hotGames.start')}
                </SStartGameButton>
            </SButtonContainer>
        </SItemContainer>
    )
}

export default GameItem
