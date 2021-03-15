import { useCallback } from 'react'
import styled from 'styled-components/macro'
import { px, fs } from '@components/common/responsive'
import { LotoGameListItem } from '@services/game/type'
import img_shadow from '@brand/assets/images/lottery/desktop/shadow.png'

interface IGameItemProps {
    game: LotoGameListItem
    handleClick: (game: LotoGameListItem) => void
    className?: string
    gameIndex: number
}

const SGameItem = styled.div`
    text-align: center;
    width: 20%;
    margin: ${px(14, 0)};
    cursor: pointer;
`

const SIcon = styled.div<{ iconUrl: string; gameId: string | number }>`
    width: ${px(76)};
    height: ${px(86)};
    margin: 0 auto;
    background: top center / contain no-repeat url(${(props) => props.iconUrl}),
        bottom center / contain no-repeat url(${img_shadow});
    transition: 0.25s ease-in-out transform;

    &:hover {
        transform: scale(1.2);
    }
`

const SGamename = styled.div`
    ${fs(14)}
    text-align: center;
`

const GameItem = ({ game, handleClick, className, gameIndex }: IGameItemProps) => {
    const { code, iconUrl, name } = game

    const onItemClick = useCallback(() => {
        handleClick(game)
    }, [handleClick, game])

    return (
        <SGameItem data-qa={`btnLottery${gameIndex}`} className={className} onClick={onItemClick}>
            <SIcon data-qa={`imgLottery${gameIndex}`} gameId={code} iconUrl={iconUrl}></SIcon>
            <SGamename data-qa={`txtLottery${gameIndex}_title`}>{name}</SGamename>
            {/* <Sdescription>{description}</Sdescription> */}
        </SGameItem>
    )
}

export default GameItem
