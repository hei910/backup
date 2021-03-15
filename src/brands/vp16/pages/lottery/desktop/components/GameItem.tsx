import { useCallback } from 'react'
import styled from 'styled-components/macro'
import { px, range } from '@components/common/responsive'
import useTranslation from '@hooks/useTranslation'
import { LotoGameListItem } from '@services/game/type'

interface GameItemProps {
    game: LotoGameListItem
    isActive: boolean
    handleClick: (game: LotoGameListItem) => void
    gameIndex: number
}

const SGameItem = styled.div`
    text-align: center;
    width: 20%;
    margin: ${px(14, 0)};
    cursor: pointer;
    position: relative;
`

const SIcon = styled.div<{ iconUrl: string; gameId: string | number; isActive: boolean }>`
    ${range('width', 32, 90)};
    ${range('height', 32, 90)};
    margin: 0 auto;
    background: url(${(props) => props.iconUrl}) no-repeat center center / contain;
    transform: scale(${(props) => (props.isActive ? 1.2 : 1)});
    transition: 0.25s ease-in-out transform;

    &:hover {
        transform: scale(1.2);
    }
`

const SGamename = styled.div`
    font-size: 16px;
    text-align: center;
    margin-top: 8px;
`

const Sdescription = styled.div`
    font-size: 14px;
    color: #7e7e7e;
    text-align: center;
`
const SIsNew = styled.span`
    width: ${px(26)};
    height: ${px(26)};
    background-color: rgb(212, 31, 31);
    border-radius: 50%;
    color: white;
    font-size: ${px(16)};
    line-height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: ${px(5)};
    right: ${px(-5)};
`

const GameItem = ({ game, handleClick, isActive, gameIndex }: GameItemProps) => {
    const t = useTranslation()

    const { code, iconUrl, name, description, isNew } = game

    const onItemClick = useCallback(() => {
        handleClick(game)
    }, [handleClick, game])

    return (
        <SGameItem onClick={onItemClick} data-qa={`btnLottery${gameIndex}`}>
            <SIcon gameId={code} isActive={isActive} iconUrl={iconUrl} data-qa={`imgLottery${gameIndex}`}>
                {isNew && <SIsNew>{t('lottery.latest')}</SIsNew>}
            </SIcon>
            <SGamename data-qa={`txtLottery${gameIndex}_title`}>{name}</SGamename>
            <Sdescription data-qa={`txtLottery${gameIndex}_desc`}>{description}</Sdescription>
        </SGameItem>
    )
}

export default GameItem
