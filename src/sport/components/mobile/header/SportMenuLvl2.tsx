import { MobileMenuSearchIcon } from '@sport/components/icons'
import useCustomParams from '@sport/hooks/useCustomParams'
import { mix } from 'polished'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { NavLink, NavLinkProps } from 'react-router-dom'
import { useSelector } from '@sport/stores'
import { toggleShowSearchBar } from '@services/sportGlobal/actions'
import { mobileDateLookup, MRouteDateType, RouteSportType } from '@services/sportMenu/types'
import styled, { css } from 'styled-components/macro'
import { rotate } from '@sport/styles/common/keyframes'
import { sportsMenuLevel2 } from '@sport/util/constant'

interface MobileSportsMenuLvl2Props {}

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

const SportsMenuContainer = styled.div`
    height: 88px;
    width: 100vw;
`

const TextWrap = styled.span`
    letter-spacing: 0px;
`

const NumberWrap = styled.div`
    color: #8f8f8f;
    text-align: right;
    position: absolute;
    top: 2px;
    right: 0;
    margin-right: 3px;
`

const IconWrap = styled.div`
    width: 28px;
    height: 28px;
    margin: 6px;

    svg path {
        fill: #8f8f8f;
    }
`

const activeStyle = css<{ isinplay?: string }>`
    background: ${(props) => props.theme.sport.colors.accent};
    box-shadow: 0 2.5px 8px 0 ${(props) => mix(0.5, props.theme.sport.colors.accent, 'rgba(0, 0, 0, 0.1)')};

    ${NumberWrap} {
        color: white;
    }

    ${TextWrap} {
        color: white;
    }

    ${IconWrap} {
        animation: ${(props) => (props.isinplay === 'true' ? rotate : 'none')} 3s linear infinite;

        svg path {
            fill: white;
        }
    }
`

const MobileSportsMenuItems = styled(CustomNavLink)<{ isinplay?: string; isactive?: string }>`
    height: 68px;
    width: 60px;
    min-width: 60px;
    font-size: 12px;
    font-weight: 600;
    color: #484848;
    background: white;
    margin: 10px 5px 10px 5px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    box-shadow: 0 2.5px 7.5px 0 rgba(0, 0, 0, 0.1);
    ${(props) => props.isactive === 'true' && activeStyle};
`

// const SMobileSearchMenuItems = styled.div<{ isActive: boolean }>`
//     height: 68px;
//     width: 60px;
//     min-width: 60px;
//     font-size: 12px;
//     font-weight: 600;
//     color: #484848;
//     background: white;
//     margin: 10px 5px 10px 5px;
//     border-radius: 5px;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     position: relative;
//     box-shadow: 0 2.5px 7.5px 0 rgba(0, 0, 0, 0.1);
// `

const SubContainer = styled.div`
    height: 88px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow-x: scroll;
    overflow-y: hidden;

    div:first-child {
        margin-left: 10px;
    }

    ${MobileSportsMenuItems}:last-child {
        margin-right: 10px;
    }
`

const MobileSportsMenuLvl2: React.FC<MobileSportsMenuLvl2Props> = (props) => {
    const { date, sports } = useCustomParams()
    const isFilter = date !== 'inplay' && date !== 'upcoming'
    const dispatch = useDispatch()
    const showSearchBar = useSelector((state) => state.sportGlobal.showSearchBar)
    const isInplay = date === 'inplay'

    const menuData = useSelector((state) => state.sportMenu.data)
    const dateType = mobileDateLookup[date as MRouteDateType]

    const sportsMenu = sportsMenuLevel2.filter((item) => (menuData?.[item.slug as RouteSportType]?.[dateType] ?? 0) > 0)
    const { t } = useTranslation()

    return (
        <SportsMenuContainer>
            <SubContainer>
                {sportsMenu.map((item, index) => {
                    const Icon = item.icon
                    const path = isFilter
                        ? `/sport/select-competition/${date}/${item.slug}`
                        : `/sport/${date}/${item.slug}`

                    const active = sports === item.slug

                    const count = menuData?.[item.slug as RouteSportType]?.[dateType] ?? 0

                    return (
                        <MobileSportsMenuItems
                            to={item.slug ? path : item.path}
                            key={`${item.title}-menu2-${index}`}
                            disabled={item.slug === sports}
                            isinplay={isInplay.toString()}
                            isactive={active.toString()}>
                            <NumberWrap>{count}</NumberWrap>
                            <IconWrap>
                                <Icon />
                            </IconWrap>
                            <TextWrap>{t(item.title)}</TextWrap>
                        </MobileSportsMenuItems>
                    )
                })}
                {date !== 'outright' && (
                    <MobileSportsMenuItems
                        to={'/'}
                        key={`search-bar-btn`}
                        disabled={true}
                        onClick={() => dispatch(toggleShowSearchBar(!showSearchBar))}
                        isinplay="false"
                        isactive={showSearchBar.toString()}>
                        <NumberWrap></NumberWrap>
                        <IconWrap>
                            <MobileMenuSearchIcon />
                        </IconWrap>
                        <TextWrap>{t('menu.search')}</TextWrap>
                    </MobileSportsMenuItems>
                )}
            </SubContainer>
        </SportsMenuContainer>
    )
}

export default MobileSportsMenuLvl2
