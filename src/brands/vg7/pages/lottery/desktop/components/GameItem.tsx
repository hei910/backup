import { useCallback } from 'react'
import styled from 'styled-components/macro'
import bgImg from '@styles/mixins/backgroundImg'
import { LotoGameListItem } from '@brand/services/game/type'
import { AutoWrapItem } from '@components/common/autoWrapContainer'
import { px } from '@components/common/responsive'
import { range } from '@components/common/responsive'

const colors = {
    // colors.xyz
    txtLottery: '#ffffff',
    txtLotterySelected: '#000000',
    txtLotteryBg: '#000000',
    txtLotteryBgSelected: 'linear-gradient(to top, #fff48a, #ffd647)',
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
`

const SGameName = styled.div<{ isActive?: boolean }>`
    padding: 0.25em 0.5em;
    ${range('font-size', 12, 16)}
    border-radius: ${px(10)};
    width: ${px(100)};
    height: ${px(24)};
    color: ${(props) => (props.isActive ? colors.txtLotterySelected : colors.txtLottery)};
    background: ${(props) => (props.isActive ? colors.txtLotteryBgSelected : colors.txtLotteryBg)};
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media screen and (max-height: 600px) {
        width: 100px;
    }
`

const SIcon = styled.div<{ iconUrl: string; isActive: boolean }>`
    ${range('width', 44, 80)}
    ${range('height', 44, 80)}
    margin: 0 auto 4px;
    ${(props) => bgImg(props.iconUrl, 'contain')}
    transform: ${(props) => (props.isActive ? 'scale(1.2)' : 'scale(1.0)')};
    transition: 0.25s ease-in-out transform;
    margin-bottom: 15px;
`

const SDefaultIcon = styled.div<{ isActive: boolean }>`
    ${range('width', 44, 80)}
    ${range('height', 44, 80)}
    background-color: ${(props) => props.theme.colors.brand};
    margin-bottom: 10px;
    transform: ${(props) => (props.isActive ? 'scale(1.2)' : 'scale(1.0)')};
    transition: 0.25s ease-in-out transform;
`
interface GameItemProps {
    game: LotoGameListItem
    isActive: boolean
    handleClick: (game: LotoGameListItem) => void
    gameIndex: number
}

export default ({ game, handleClick, isActive, gameIndex }: GameItemProps) => {
    const { iconUrl, name } = game

    const onItemClick = useCallback(() => {
        handleClick(game)
    }, [handleClick, game])

    return (
        <AutoWrapItem onClick={onItemClick}>
            <SGameItem data-qa={`btnLottery${gameIndex}`}>
                {iconUrl && iconUrl.length > 4 ? (
                    <SIcon data-qa={`imgLottery${gameIndex}`} iconUrl={iconUrl} isActive={isActive}></SIcon>
                ) : (
                    <SDefaultIcon isActive={isActive}></SDefaultIcon>
                )}
                <SGameName data-qa={`txtLottery${gameIndex}_title`} isActive={isActive}>
                    {name}
                </SGameName>
            </SGameItem>
        </AutoWrapItem>
    )
}
