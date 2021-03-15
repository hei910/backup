import { useCallback } from "react";
import styled from "styled-components/macro";
import { LotoGameListItem } from '@services/game/type'
import { AutoWrapItem } from '@components/common/autoWrapContainer'
import { px, range } from '@components/common/responsive'


interface GameItemProps {
    game: LotoGameListItem,
    isActive: boolean,
    handleClick: (game: LotoGameListItem) => void,
    gameIndex: number
}

const SIcon = styled.div<{ iconUrl: string, gameId: string | number, isActive: boolean }>`
    ${range('width', 32, 100)};
    ${range('height', 32, 100)};
    background: url(${(props) => props.iconUrl}) no-repeat center center/contain;
`

const SBlackIcon = styled.div<{ isActive: boolean }>`
    background: black;
    ${range('width', 32, 100)};
    ${range('height', 32, 100)};
    border-radius: 50%;
    position: absolute;
    top: 0;
    opacity: ${(props) => props.isActive ? 0 : 0.6};
`

const SGameItem = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: ${px(20, 0)};
    cursor: pointer;
    position: relative;
`

const SDefaultIcon = styled.div < { isActive: boolean }>`
    ${range('width', 32, 100)};
    ${range('height', 32, 100)};
    background-color: ${(props) => props.theme.colors.brand};
    border-radius: 37px;
    opacity: 0.75;
    transform: scale(${(props) => props.isActive ? 1.2 : 1});
    transition: 0.25s ease-in-out transform;

    &:hover {
        transform: scale(1.2)
    }
`

const SGamename = styled.div < { isActive: boolean }>`
    font-size: 16px;
    text-align: center;
    color: #ffffff;
    margin-top: 8px;
    font-weight: bold;
`

const GameItem = ({ handleClick, game, isActive, gameIndex }: GameItemProps) => {
    const { code, iconUrl, name } = game;

    const onItemClick = useCallback(() => {
        handleClick(game)
    }, [handleClick, game]);

    return (
        <AutoWrapItem onClick={onItemClick}>
            <SGameItem data-qa={`btnLottery${gameIndex}`}>
                {iconUrl && iconUrl.length > 4 ?
                    <>
                        <SIcon gameId={code} isActive={isActive} iconUrl={iconUrl} data-qa={`imgLottery${gameIndex}`}>
                            <SBlackIcon isActive={isActive}></SBlackIcon>
                        </SIcon>
                    </>
                    :
                    <SDefaultIcon isActive={isActive}></SDefaultIcon>
                }
                <SGamename data-qa={`txtLottery${gameIndex}_title`} isActive={isActive}>{name}</SGamename>
            </SGameItem>
        </AutoWrapItem>
    )
}

export default GameItem;
