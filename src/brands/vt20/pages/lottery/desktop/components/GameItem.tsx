import { useCallback } from "react";
import styled from 'styled-components/macro'
import bgImg from '@styles/mixins/backgroundImg'
import { LotoGameListItem } from "@brand/services/game/type";
import { AutoWrapItem } from '@components/common/autoWrapContainer'
import { px } from '@components/common/responsive'


const colors = { // colors.xyz
    txtLottery: '#ffffff',
    // txtLotterySelected: '#ffffff',
    // txtLotteryBg: '#000000',
    // txtLotteryBgSelected: 'linear-gradient(to top, #fff48a, #ffd647)',
}

const SGameItem = styled.div`
    flex: 0 0 12.5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: ${px(10)} 0;
    cursor: pointer;
`;

const SGameName = styled.div<{ isActive?: boolean }>`
    font-size: 16px;
    text-align: center;
    border-radius: ${px(10)};
    width: ${px(100)};
    height: ${px(24)};
    color: ${colors.txtLottery};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 12px;

    @media screen and (max-height: 600px) {
        width: 100px;
    }
`;

const SIcon = styled.div<{ iconUrl: string }>`
    width: ${px(80)};
    height: ${px(80)};
    margin: 0 auto ${px(4)};
    ${(props) => bgImg(props.iconUrl, 'contain')};
    transition: 0.25s ease-in-out transform;

    &:hover {
        transform: scale(1.2);
    }
`;

const SDefaultIcon = styled.div`
    width: ${px(80)};
    height: ${px(80)};
    background-color: ${(props) => props.theme.colors.brand};
    border-radius: ${px(37)};
    transition: 0.25s ease-in-out transform;

    &:hover {
        transform: scale(1.2);
    }
`

interface GameItemProps {
    game: LotoGameListItem,
    isActive: boolean,
    handleClick: (game: LotoGameListItem) => void,
    gameIndex: number
};

export default ({ game, handleClick, isActive, gameIndex }: GameItemProps) => {
    const { iconUrl, name } = game;

    const onItemClick = useCallback(() => {
        handleClick(game)
    }, [handleClick, game])

    return (
        <AutoWrapItem onClick={onItemClick}>
            <SGameItem data-qa={`btnLottery${gameIndex}`}>
                {iconUrl && iconUrl.length > 4 ?
                    <SIcon data-qa={`imgLottery${gameIndex}`} iconUrl={iconUrl}></SIcon>
                    :
                    <SDefaultIcon></SDefaultIcon>
                }
                <SGameName data-qa={`txtLottery${gameIndex}_title`} isActive={isActive}>{name}</SGameName>
            </SGameItem>
        </AutoWrapItem>
    )

}
