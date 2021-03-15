import { useCallback } from 'react'
import styled from 'styled-components/macro'
import bgImg from '@styles/mixins/backgroundImg'
import iconOutlineImg from '@brand/assets/images/lottery/desktop/icon_outline.png'
import { LotoGameListItem } from '@brand/services/game/type'
import { AutoWrapItem } from '@components/common/autoWrapContainer'
import { range } from '@components/common/responsive'


const SGameItem = styled.div`
    width: 100px;
    height: 50%;
    background: none;
    margin-bottom: 15px;
    opacity: 1;
    cursor: pointer;

    @media only screen and (max-width: 1440px) {
        width: 85px;
        margin-bottom: 10px;
    }
`

const SGameName = styled.div`
    font-size: 12px;
    margin-top: 8px;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`
const SIconWrapper = styled.div<{ isActive: boolean }>`
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    padding: 2px;
    /* ${range('padding', 2, 3)} */
    ${(props) => props.isActive ? bgImg(iconOutlineImg, 'contain') : ''}
`;

const SIcon = styled.div<{ iconUrl: string }>`
    ${range('width', 40, 60)}
    ${range('height', 40, 60)}
    border-radius: 45px;
    ${(props) => bgImg(props.iconUrl, 'contain')}
`

const SDefaultIcon = styled.div`
    ${range('width', 44, 80)}
    ${range('height', 44, 80)}
    background-color: ${(props) => props.theme.colors.brand};
    margin-bottom: 10px;
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
                <SIconWrapper isActive={isActive}>
                    {iconUrl && iconUrl.length > 4 ? (
                        <SIcon data-qa={`imgLottery${gameIndex}`} iconUrl={iconUrl} />
                    ) : (
                        <SDefaultIcon />
                    )}
                </SIconWrapper>

                <SGameName data-qa={`txtLottery${gameIndex}_title`}>
                    {name}
                </SGameName>
            </SGameItem>
        </AutoWrapItem>
    )
}
