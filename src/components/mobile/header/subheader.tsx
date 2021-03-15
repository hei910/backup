import { useMemo } from 'react'
import styled from 'styled-components/macro'

import SportIcon from '@images/header/mobile/icon_sport.png'
import SportActiveIcon from '@images/header/mobile/icon_sport_active.png'
import LiveCasinoIcon from '@images/header/mobile/icon_live_casino.gif'
import ESportIcon from '@images/header/mobile/icon_esport.png'
import ESportActiveIcon from '@images/header/mobile/icon_esport_active.png'
import CasinoIcon from '@images/header/mobile/icon_casino.png'
import CasinoActiveIcon from '@images/header/mobile/icon_casino_active.png'
import BoardGameIcon from '@images/header/mobile/icon_board_game.png'
import BoardGameActiveIcon from '@images/header/mobile/icon_board_game_active.png'
import FishHunterIcon from '@images/header/mobile/icon_fish_hunter.png'
import FishHunterActiveIcon from '@images/header/mobile/icon_fish_hunter_active.png'
import LotteryIcon from '@images/header/mobile/icon_lottery.png'
import LotteryActiveIcon from '@images/header/mobile/icon_lottery_active.png'
import JoinIcon from '@images/header/mobile/icon_join.png'
import FriendshipIcon from '@images/header/mobile/icon_friendship.png'
import CsIcon from '@images/header/mobile/icon_cs.png'
import RepairIcon from '@images/header/mobile/repair.png'
import { useLocation } from 'react-router-dom'
import {
    directToBoardGame,
    directToCasinoDt,
    directToEsport,
    directToFishHunter,
    directToFriendship,
    directToLiveCasino,
    directToLottery,
    directToLiveChat,
    directToSport,
} from '@utils/v1Functions'
import Pages from '@pages'
import useTranslation from '@hooks/useTranslation'
import { useSelector } from '@redux'
import useRegisterModal from '@hooks/useRegisterModal'
import GameTypes from '@constants/gameTypes'

interface INavItemProps {
    title: string
    icon: string
    activeIcon: string
    active?: boolean
    isMaintenance?: boolean
    isGray?: boolean
    onClick?: () => void
}

interface IStyledNavItemProps {
    active?: boolean
}

interface IIconProps {
    image: string
    isGray?: boolean
}

const StyledSubheader = styled.div`
    height: 56px;
    padding: 0 5px;
    background-color: #f2f2f2;
    text-align: center;
    overflow-x: auto;
`

const ItemsContainer = styled.div`
    width: min-content;
    height: 100%;
    display: flex;
    align-items: center;
    margin: 0 auto;
`

const StyledNavItem = styled.div<IStyledNavItemProps>`
    padding: 0 5px;
    text-align: center;
    color: #b4b4b4;
    ${(props) => props.active && 'color: #333;'}
`

const Icon = styled.div<IIconProps>`
    height: 24px;
    margin: 0 auto;
    background-image: url(${(props) => props.image});
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-position: center;
    ${(props) => props.isGray && 'filter: grayscale(100%);'}
`

const MaintenanceIcon = styled.div`
    width: 18px;
    height: 18px;
    margin-left: 18px;
    background-image: url(${RepairIcon});
    background-size: 100% 100%;
    background-position: center;
`

const Title = styled.div`
    font-size: 11px;
    font-weight: 700;
    line-height: 20px;
    white-space: nowrap;
`

const NavItem: React.FC<INavItemProps> = ({ title, icon, activeIcon, active, isMaintenance, isGray, onClick }) => {
    return (
        <StyledNavItem active={active} onClick={onClick}>
            <Icon image={active && !isMaintenance ? activeIcon : icon} isGray={isGray}>
                {isMaintenance && <MaintenanceIcon />}
            </Icon>
            <Title>{title}</Title>
        </StyledNavItem>
    )
}

const Subheader: React.FC = () => {
    const gamesMaintenance = useSelector((state) => state.app.gamesMaintenance)
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
    const t = useTranslation()
    const location = useLocation()
    const { showRegisterModal } = useRegisterModal()
    const isMaintenance = useMemo(() => {
        return location.pathname === Pages.maintenance?.path
    }, [location.pathname])
    const isGray = useMemo(() => {
        return isMaintenance || location.pathname !== Pages.casino?.path
    }, [isMaintenance, location.pathname])

    return (
        <StyledSubheader>
            <ItemsContainer>
                <NavItem
                    title={t('general.components.subheader.sports')}
                    icon={SportIcon}
                    activeIcon={SportActiveIcon}
                    onClick={() => {
                        directToSport()
                    }}
                    isMaintenance={gamesMaintenance[GameTypes.sport]?.isMaintenance}
                    active={location.pathname.startsWith(Pages.sport?.path)}
                />
                <NavItem
                    title={t('general.components.subheader.casino')}
                    icon={LiveCasinoIcon}
                    activeIcon={LiveCasinoIcon}
                    onClick={directToLiveCasino}
                    isMaintenance={gamesMaintenance[GameTypes.livecasino]?.isMaintenance}
                    isGray={isGray}
                    active={location.pathname.startsWith(Pages.casino?.path)}
                />
                <NavItem
                    title={t('general.components.subheader.esport')}
                    icon={ESportIcon}
                    activeIcon={ESportActiveIcon}
                    onClick={directToEsport}
                    isMaintenance={gamesMaintenance[GameTypes.esport]?.isMaintenance}
                    active={location.pathname.startsWith(Pages.esport?.path)}
                />
                <NavItem
                    title={t('general.components.subheader.casinodt')}
                    icon={CasinoIcon}
                    activeIcon={CasinoActiveIcon}
                    onClick={directToCasinoDt}
                    isMaintenance={gamesMaintenance[GameTypes.slotmachine]?.isMaintenance}
                    active={location.pathname.startsWith(Pages.slotMachine?.path)}
                />
                <NavItem
                    title={t('general.components.subheader.boardGame')}
                    icon={BoardGameIcon}
                    activeIcon={BoardGameActiveIcon}
                    onClick={directToBoardGame}
                    isMaintenance={gamesMaintenance[GameTypes.boardgame]?.isMaintenance}
                    active={location.pathname.startsWith(Pages.boardGame?.path)}
                />
                <NavItem
                    title={t('general.components.subheader.fishHunter')}
                    icon={FishHunterIcon}
                    activeIcon={FishHunterActiveIcon}
                    onClick={directToFishHunter}
                    isMaintenance={gamesMaintenance[GameTypes.fishhunter]?.isMaintenance}
                    active={location.pathname.startsWith(Pages.fishHunter?.path)}
                />
                <NavItem
                    title={t('general.components.subheader.lottery')}
                    icon={LotteryIcon}
                    activeIcon={LotteryActiveIcon}
                    onClick={directToLottery}
                    isMaintenance={gamesMaintenance[GameTypes.lottery]?.isMaintenance}
                    active={location.pathname.startsWith(Pages.lottery?.path)}
                />
                {isLoggedIn ? (
                    <NavItem
                        title={t('general.components.subheader.friendship')}
                        icon={FriendshipIcon}
                        activeIcon={FriendshipIcon}
                        onClick={directToFriendship}
                    />
                ) : !isMaintenance ? (
                    <NavItem
                        title={t('general.components.subheader.join')}
                        icon={JoinIcon}
                        activeIcon={JoinIcon}
                        onClick={showRegisterModal}
                    />
                ) : null}
                <NavItem
                    title={t('general.components.subheader.cs')}
                    icon={CsIcon}
                    activeIcon={CsIcon}
                    onClick={directToLiveChat}
                />
            </ItemsContainer>
        </StyledSubheader>
    )
}

export default Subheader
