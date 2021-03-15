import { useCallback } from 'react'
import styled from 'styled-components/macro'
import { px, fs, range } from '@components/common/responsive'
import { LotoGameListItem } from '@services/game/type'
import img_bg_gameIcon from '@brand/assets/images/lottery/desktop/bg-game.png'
import img_game_new from '@brand/assets/images/lottery/desktop/icon-new.png'

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
`

const SIcon = styled.div<{ iconUrl: string; gameId: string | number; isActive: boolean; isNew?: boolean }>`
    margin: 0 auto;
    padding: 6px;
    background: ${(props) => (props.isActive ? 'url(' + img_bg_gameIcon + ')' : '')} no-repeat center center / contain;
    transform: scale(${(props) => (props.isActive ? 1.25 : 1)});
    transition: 0.25s ease-in-out transform;
    box-sizing: content-box;

    &:hover {
        transform: scale(1.25);
        background-image: url(${img_bg_gameIcon});
    }

    & > div {
        ${range('width', 32, 80)}
        ${range('height', 32, 80)}
        margin: 0 auto;
        background: url(${(props) => props.iconUrl}) no-repeat center center / contain;
        position: relative;

        &:before {
            content: '';
            background: black;
            ${range('width', 32, 80)}
            ${range('height', 32, 80)}
            border-radius: 50%;
            position: absolute;
            top: 0;
            left: 0;
            opacity: ${(props) => (props.isActive ? 0 : 0.6)};
        }

        &:after {
            content: '';
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background: url(${(props) => (props.isNew ? img_game_new : '')}) no-repeat center center / contain;
        }
    }
`

const SGamename = styled.div`
    ${fs(14)}
    text-align: center;
    margin-top: 0.75em;
`

const GameItem = ({ game, handleClick, isActive, gameIndex }: GameItemProps) => {
    const { code, iconUrl, name, isNew } = game

    const onItemClick = useCallback(() => {
        handleClick(game)
    }, [handleClick, game])

    return (
        <SGameItem onClick={onItemClick} data-qa={`btnLottery${gameIndex}`}>
            <SIcon data-qa={`imgLottery${gameIndex}`} gameId={code} isActive={isActive} iconUrl={iconUrl} isNew={isNew}>
                <div></div>
            </SIcon>
            <SGamename data-qa={`txtLottery${gameIndex}_title`}>{name}</SGamename>
        </SGameItem>
    )
}

export default GameItem
