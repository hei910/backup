import MobileLeftMenuCloseIcon from '@sport/assets/img/mobile/btn_close.png'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, useLocation } from 'react-router-dom'
import { useSelector } from '@sport/stores'
import { DateType } from '@services/sportMenu/types'
import styled from 'styled-components/macro'
import { mobileLeftMenuItemList } from '@sport/util/constant'
import { getTotalCount } from '@sport/util/dataProcess'
import ScrollView from '../scrollView'

interface MobileLeftMenuProps {
    menuHandler: (event: React.MouseEvent<HTMLElement>) => void
    showMenu: boolean
}

const MobileLeftMenuContainer = styled.div`
    top: 0;
    left: 0;
    z-index: 5;
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
`

const MobileLeftMenuIcon = styled.img<{ active?: boolean }>`
    height: 15px;
    width: 15px;
    ${(props) => props.active && `filter: brightness(2);`}
`

const MobileLeftMenuList = styled.div<{ paddingTop: number }>`
    top: ${(props) => props.paddingTop}px;
    left: 0;
    z-index: 4;
    position: fixed;
    width: 216px;
    height: ${(props) => `calc(100vh-${props.paddingTop})`};
    background: #484848;
    overflow-y: auto;
    bottom: 0;
`
const MobileLeftMenuTop = styled.div`
    width: 216px;
    height: 56px;
    border-bottom: 1px solid #383838;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
`
const MobileLeftMenuItems = styled(NavLink)<{ active?: boolean }>`
    width: 216px;
    height: 56px;
    border-bottom: 1px solid #383838;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    ${(props) => props.active && 'background: #787878;'}

    &.active {
        background: #787878;

        div:first-child {
            color: white;
        }

        div:nth-child(2) {
            color: ${(props) => props.theme.sport.colors.accent};

            div {
                color: ${(props) => props.theme.sport.colors.accent};
            }
        }
    }
`

const MobileLeftMenuTitle = styled.div`
    color: #cdcdcd;
    font-size: 13px;
    font-weight: 800;
`

const MobileLeftMenuItemsRight = styled.div`
    display: flex;
    justify-content: space-between;
    width: 43px;
    text-align: right;
`

const MobileLeftMenuNumber = styled.div<{ active?: boolean }>`
    font-size: 13px;
    color: ${(props) => (props.active ? `${props.theme.sport.colors.accent};` : `#cdcdcd;`)};
`

const SScrollView = styled(ScrollView)``

const MobileLeftMenu: React.FC<MobileLeftMenuProps> = ({ menuHandler, showMenu }) => {
    const { t } = useTranslation()
    const menuData = useSelector((state) => state.sportMenu.data)
    const location = useLocation().pathname
    const getPaddingTop = () => {
        const brandCode = process.env.BRAND_CODE
        if (brandCode === 'vf6') {
            return 100
        } else if (brandCode === 'vc3') {
            return 100
        } else {
            return 108
        }
    }

    return (
        <SScrollView open={showMenu}>
            <MobileLeftMenuContainer onClick={menuHandler}>
                <MobileLeftMenuList paddingTop={getPaddingTop()}>
                    <MobileLeftMenuTop onClick={menuHandler}>
                        <MobileLeftMenuTitle>返回</MobileLeftMenuTitle>
                        <MobileLeftMenuIcon src={MobileLeftMenuCloseIcon} alt="" />
                    </MobileLeftMenuTop>
                    {mobileLeftMenuItemList.map((item, index) => {
                        const countNumber =
                            item.type === null || item.type.includes('all')
                                ? ''
                                : getTotalCount(menuData, item.type as DateType)
                        return (
                            <MobileLeftMenuItems
                                to={item.path}
                                key={`${item.title}-${index}`}
                                onClick={menuHandler}
                                active={location.includes(item.type)}>
                                <MobileLeftMenuTitle>{t(item.title)}</MobileLeftMenuTitle>
                                {item.icon ? (
                                    <MobileLeftMenuItemsRight>
                                        <MobileLeftMenuNumber active={location.includes(item.type)}>
                                            {countNumber}
                                        </MobileLeftMenuNumber>
                                        <MobileLeftMenuIcon
                                            active={location.includes(item.type)}
                                            src={item.icon}
                                            alt=""
                                        />
                                    </MobileLeftMenuItemsRight>
                                ) : (
                                    <MobileLeftMenuNumber active={location.includes(item.type)}>
                                        {countNumber}
                                    </MobileLeftMenuNumber>
                                )}
                            </MobileLeftMenuItems>
                        )
                    })}
                </MobileLeftMenuList>
            </MobileLeftMenuContainer>
        </SScrollView>
    )
}

export default MobileLeftMenu
