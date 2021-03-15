import MenuIcon from '@sport/assets/img/mobile/menu_icon.png'
import useCustomParams from '@sport/hooks/useCustomParams'
import React, { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, NavLinkProps, useLocation } from 'react-router-dom'
import { useSelector } from '@sport/stores'
import { DateType } from '@services/sportMenu/types'
import styled, { css } from 'styled-components/macro'
import { sportsMenuLevel1 } from '@sport/util/constant'
import { getTotalCount } from '@sport/util/dataProcess'

// Interface & types
interface MobileSportMenuProps {
    menuHandler: (event: React.MouseEvent<HTMLImageElement>) => void
}

interface CustomNavLinkProps extends NavLinkProps {
    disabled?: boolean
}

const CustomNavLink = (props: CustomNavLinkProps) => {
    const onLinkClick = useCallback(
        (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            props.disabled && event.preventDefault()
            props.onClick && props.onClick(event)
        },
        [props],
    )

    return <NavLink {...props} onClick={onLinkClick} />
}

// Styled Components
const SportMenuMainContainer = styled.div`
    /* position: fixed; */
    top: 52;
    height: 56px;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
`

const SportMenuSubContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    border-bottom: 1px solid ${(props) => props.theme.sport.colors.background};
`

const activeNumberCss = css`
    width: 30px;
    text-align: center;
`

const SportMenuItems = styled(CustomNavLink)`
    min-width: 30px;
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`

const SportsMenuTitle = styled.span<{ active?: boolean }>`
    font-size: 15px;
    margin-top: 7px;
    padding: 0 0;
    color: ${(props) => (props.active ? props.theme.sport.colors.accent : '#000000;')};
`

const SportsMenuNumber = styled.span<{ active?: boolean }>`
    font-size: 12px;
    margin-bottom: 7px;
    color: ${(props) => (props.active ? props.theme.sport.colors.accent : '#999999;')};
    ${(props) => props.active && activeNumberCss}
`

const MenuIconContainer = styled.div`
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* margin: 0 3.5vw 0 5vw; */
`

const SportsMenuIcon = styled.img`
    height: auto;
    max-width: 35px;
    background: #fff;
`

const MobileSportsMenu: React.FC<MobileSportMenuProps> = ({ menuHandler }) => {
    const location = useLocation().pathname
    const menuData = useSelector((state) => state.sportMenu.data)
    // const { sports = 'football', date = 'all', isHomePage } = useCustomParams()
    const { sports = 'football', date = 'all' } = useCustomParams()
    const { t } = useTranslation()

    const checkActive = (type: string) => {
        return type === 'home' ? location.replace('/m20', '/').includes(type) || date === 'all' : date.includes(type)
    }

    return (
        <SportMenuMainContainer>
            <SportMenuSubContainer>
                <MenuIconContainer>
                    <SportsMenuIcon onClick={menuHandler} src={MenuIcon} alt="" />
                </MenuIconContainer>
                {sportsMenuLevel1.map((menu, index) => {
                    const countNumber = getTotalCount(menuData, menu.type as DateType)
                    return (
                        <SportMenuItems
                            to={`${menu.path}${menu.type === 'home' ? '' : `/${sports}`}`}
                            key={`${menu.title}-${index}`}
                            // disabled={menu.type === date && !isHomePage}
                            disabled={false}>
                            <SportsMenuTitle active={checkActive(menu.type)}>{t(menu.title)}</SportsMenuTitle>
                            <SportsMenuNumber active={checkActive(menu.type)}>{countNumber}</SportsMenuNumber>
                        </SportMenuItems>
                    )
                })}
            </SportMenuSubContainer>
        </SportMenuMainContainer>
    )
}

export default memo(MobileSportsMenu)
