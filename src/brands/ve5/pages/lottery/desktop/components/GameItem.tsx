import { useCallback } from 'react'
import styled from 'styled-components/macro'
import { px, fs } from '@components/common/responsive'
import { LotoGameListItem } from '@services/game/type'

interface GameItemProps {
    game: LotoGameListItem
    isActive: boolean
    handleClick: (game: LotoGameListItem) => void,
    gameIndex: number
}

const SGameItem = styled.div`
    text-align: center;
    width: 20%;
    margin: ${px(14, 0)};
    cursor: pointer;
`

const SIcon = styled.div<{ iconUrl: string; gameId: string | number; isActive: boolean }>`
    width: ${px(80)};
    height: ${px(80)};
    margin: 0 auto;
    background: url(${(props) => props.iconUrl}) no-repeat center center / contain;
    transform: scale(${(props) => (props.isActive ? 1.2 : 1)});
    transition: 0.25s ease-in-out transform;

    &:hover {
        transform: scale(1.2);
    }
`

const SGamename = styled.div`
    ${fs(14)}
    text-align: center;
    margin-top: 0.75em;
`

const Sdescription = styled.div`
    ${fs(14)}
    text-align: center;
`

const GameItem = ({ game, handleClick, isActive, gameIndex }: GameItemProps) => {
    const { code, iconUrl, name, description } = game

    const onItemClick = useCallback(() => {
        handleClick(game)
    }, [handleClick, game])

    return (
        <SGameItem onClick={onItemClick} data-qa={`btnLottery${gameIndex}`}>
            <SIcon gameId={code} isActive={isActive} iconUrl={iconUrl} data-qa={`imgLottery${gameIndex}`}></SIcon>
            <SGamename data-qa={`txtLottery${gameIndex}_title`}>{name}</SGamename>
            <Sdescription data-qa={`txtLottery${gameIndex}_desc`}>{description}</Sdescription>
        </SGameItem>
    )
}

export default GameItem
