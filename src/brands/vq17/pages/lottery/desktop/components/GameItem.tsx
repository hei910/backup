import { useCallback } from 'react'
import styled from 'styled-components/macro'
import { LotoGameListItem } from '@services/game/type'
import { AutoWrapItem } from '@components/common/autoWrapContainer'
import { px, fs, range } from '@components/common/responsive'
import iconRing from '@brand/assets/images/lottery/desktop/btn_select.png'
import iconNew from '@brand/assets/images/lottery/desktop/icon_new.png'

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
    margin: ${px(12, 0)};
    cursor: pointer;
    position: relative;
`

const SIcon = styled.div<{ iconUrl: string; gameId: string | number; isActive: boolean }>`
    ${range('width', 30, 79)};
    ${range('height', 30, 79)};
    background: url(${(props) => props.iconUrl}) no-repeat center center/contain;
    position: relative;

    &:before {
        /* active ring  */
        content: '';
        display: ${(props) => (props.isActive ? 'block' : 'none')};
        position: absolute;
        top: 0;
        ${range('width', 33, 82)};
        ${range('height', 33, 82)};
        background: url(${iconRing}) no-repeat center center/contain;
    }

    &:after {
        content: '';
        background: black;
        ${range('width', 30, 80)};
        ${range('height', 30, 80)};
        border-radius: 50%;
        position: absolute;
        top: 0;
        opacity: ${(props) => (props.isActive ? 0 : 0.6)};
    }
`

const SDefaultIcon = styled.div<{ isActive: boolean }>`
    ${range('width', 32, 100)};
    ${range('height', 32, 100)};
    background-color: ${(props) => props.theme.colors.brand};
    border-radius: 37px;
    opacity: 0.75;
    transition: 0.25s ease-in-out transform;
`

const SGamename = styled.div<{ isActive: boolean }>`
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    background-color: #232323;
    color: ${(props) => (props.isActive ? '#f8e50f' : '#b4b4b4')};
    margin-top: 16px;
    border: solid 1px #ac8424;
    border-radius: 6px;
    padding: 2px 10px;
    max-width: 110px;
    min-width: 90px;
`

const Sdescription = styled.div<{ isActive: boolean }>`
    color: ${(props) => (props.isActive ? '#ffffff' : '#787878')};
    text-align: center;
    margin-top: 3px;

    span {
        ${fs(14)}
    }
`

const SIsNew = styled.div`
    width: ${px(61)};
    height: ${px(37)};
    background: url(${iconNew}) no-repeat center center/contain;
    position: absolute;
    bottom: -10px;
    right: -10px;
    z-index: 2;
`

const GameItem = ({ handleClick, game, isActive, gameIndex }: GameItemProps) => {
    const { code, iconUrl, name, description, isNew } = game

    const onItemClick = useCallback(() => {
        handleClick(game)
    }, [handleClick, game])

    return (
        <AutoWrapItem onClick={onItemClick}>
            <SGameItem data-qa={`btnLottery${gameIndex}`}>
                {
                    iconUrl && iconUrl.length > 4 ? (
                        <>
                            <SIcon data-qa={`imgLottery${gameIndex}`} gameId={code} isActive={isActive} iconUrl={iconUrl}>
                                {isNew && <SIsNew />}
                            </SIcon>
                        </>
                    ) :
                        <SDefaultIcon isActive={isActive}></SDefaultIcon>
                }
                <SGamename data-qa={`txtLottery${gameIndex}_title`} isActive={isActive}>{name}</SGamename>
                <Sdescription isActive={isActive}>
                    <span data-qa={`txtLottery${gameIndex}_desc`}>{description && description.length > 1 ? description : '---'}</span>
                </Sdescription>
            </SGameItem>
        </AutoWrapItem>
    )
}

export default GameItem
