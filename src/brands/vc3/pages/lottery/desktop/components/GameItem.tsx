import { useCallback } from 'react'
import styled from 'styled-components/macro'
import { LotoGameListItem } from '@services/game/type'
import { AutoWrapItem } from '@components/common/autoWrapContainer'
import { px, fs, range } from '@components/common/responsive'

interface GameItemProps {
    game: LotoGameListItem
    isActive: boolean
    handleClick: (game: LotoGameListItem) => void,
    gameIndex: number
}

const SGameItem = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: ${px(10)} 0;
    cursor: pointer;
    ${range('margin-bottom', 5, 15)}
    margin-bottom: 5px;
`

const SIcon = styled.div<{ iconUrl: string; gameId: string | number; isActive: boolean }>`
    ${range('width', 32, 100)};
    ${range('height', 32, 100)};
    background: url(${(props) => props.iconUrl}) no-repeat center center/contain;
    transform: scale(${(props) => (props.isActive ? 1.2 : 1)});
    transition: 0.25s ease-in-out transform;

    &:hover {
        transform: scale(1.2);
    }
`

const SDefaultIcon = styled.div<{ isActive: boolean }>`
    width: ${px(100)};
    height: ${px(100)};
    background-color: ${(props) => props.theme.colors.brand};
    border-radius: ${px(37)};
    opacity: 0.75;
    transform: scale(${(props) => (props.isActive ? 1.2 : 1)});
    transition: 0.25s ease-in-out transform;

    &:hover {
        transform: scale(1.2);
    }
`

const SGamename = styled.div`
    text-align: center;
    ${range('margin-top', 5, 20)}
    margin-top: ${px(20)};

    span {
        ${fs(16)}
    }
`

const Sdescription = styled.div`
    color: #7e7e7e;
    text-align: center;
    max-width: 100%;

    span {
        ${fs(14)}
    }
`

const GameItem = ({ handleClick, game, isActive, gameIndex }: GameItemProps) => {
    const { code, iconUrl, name, description } = game

    const onItemClick = useCallback(() => {
        handleClick(game)
    }, [handleClick, game])

    return (
        <AutoWrapItem onClick={onItemClick}>
            <SGameItem data-qa={`btnLottery${gameIndex}`}>
                {iconUrl && iconUrl.length > 4 ? (
                    <SIcon gameId={code} isActive={isActive} iconUrl={iconUrl} data-qa={`imgLottery${gameIndex}`}></SIcon>
                ) :
                    (
                        <SDefaultIcon isActive={isActive}></SDefaultIcon>
                    )}
                <SGamename>
                    <span data-qa={`txtLottery${gameIndex}_title`}>{name}</span>
                </SGamename>
                <Sdescription>
                    <span data-qa={`txtLottery${gameIndex}_desc`}>{description && description.length > 1 ? description : '---'}</span>
                </Sdescription>
            </SGameItem>
        </AutoWrapItem >
    )
}

export default GameItem
