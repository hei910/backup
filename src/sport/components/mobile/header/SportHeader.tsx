import BasketballMainIcon from '@sport/assets/img/mobile/icon-basketball-main.png'
import FootballMainIcon from '@sport/assets/img/mobile/icon-football-main.png'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useSelector } from '@redux'
import { RouteSportType, SportItem } from '@services/sportMenu/types'
import styled from 'styled-components/macro'
import { mobileMenuItemList } from '@sport/util/constant'
import { sportTypeCodeMap } from '@sport/util/dictionary'

// Interface & types
interface SportHeaderProps {
    menuData: SportItem
}

interface ComponentProps {}

// Styled Components
const SportHeaderMainContainer = styled.div`
    height: 174px;
    width: 100%;
    padding: 0 6px;
    background: #f2f2f2;
    margin-top: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const SportHeaderSubContainer = styled.div`
    background: white;
    height: 99%;
    width: 100%;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`

const SSportHeaderTopRow = styled.div`
    width: 100%;
    margin: 2px 0 0 0;
    height: 60%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const SFootballMenu = styled(Link)`
    flex: 2;
    height: 100%;
    position: relative;
    margin-right: 6px;
    margin-left: 6px;
`

const SFootballIcon = styled.img`
    position: absolute;
    top: 0;
    right: 0;
    max-height: 104px;
`

const SFootballInnerContainer = styled.div`
    background: #444444;
    height: 100%;
    margin-top: 4px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
`

const SFootballTextContainer = styled.div`
    height: 100%;
    margin: 6px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const SFootballTopTextContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const SFootballTitle = styled.div`
    font-size: 24px;
    color: rgba(255, 255, 255, 0.2);
    font-weight: 600;
    line-height: 22px;
    /* z-index: 1; */
`

const SFootballSubTitle = styled.div`
    font-size: 11px;
    color: rgba(255, 255, 255, 0.2);
    font-weight: 600;
    line-height: 11px;
    /* z-index: 1; */
`

const SBasketballMenu = styled(Link)`
    flex: 0.7;
    height: 100%;
    position: relative;
    margin-right: 6px;
`

const SBasketballIcon = styled.img`
    position: absolute;
    max-height: 64px;
    top: 0;
    right: 0;
`

const SBasketballInnerContainer = styled.div`
    background: #444444;
    height: 100%;
    margin-top: 4px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
`

const SBasketballTextContainer = styled.div`
    height: 100%;
    margin: 8px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`

const SBasketballTitle = styled.div`
    color: white;
    font-size: 14px;
    font-weight: 600;
    /* z-index: 1; */
    line-height: 14px;
`

const SFootballBottomContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const SFootballSubTitle2 = styled.div`
    color: white;
    font-size: 20px;
    font-weight: 600;
    line-height: 20px;
`

const SBallImage = styled.img`
    width: 50px;
    height: 50px;
`

const SFootballNumber = styled.div`
    color: white;
    font-size: 20px;
    font-weight: 600;
    line-height: 20px;
    margin-left: 4px;
`

const SBasketballNumber = styled.div`
    font-size: 20px;
    color: white;
    font-weight: 600;
    line-height: 24px;
`

const SSportHeaderBottomRow = styled.div`
    width: 100%;
    height: 40%;
    /* white-space: nowrap;
    overflow-x: scroll; */
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
`

const SBottomRowInnerWrapper = styled.div`
    margin: 3px 0 0 6px;
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`

const MenuItems = styled(Link)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 7px 6px 7px 6px;
    margin: 0 6px 0 0px;
    height: 52px;
    width: 100%;
    color: #fff;
    background: #444444;
    border-radius: 5px;
    position: relative;
`

// const MenuItemsFirst = styled(MenuItems)`
//     margin: 7.5px 6px 0 6px;
// `;

const MenuText = styled.div`
    width: 100%;
    text-align: left;
    color: #fff;
`

const MenuItemText = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 14px;
    font-weight: 600;
    line-height: 14px;
    margin: 4px 0;
    /* z-index: ; */
`

const MenuImages = styled.div`
    width: 30px;
    max-width: 50px;
    position: absolute;
    right: 20px;
    top: 2px;
`

const sportsTotalCount = (sportType: string, menuData: SportItem) => {
    try {
        if (sportType === 'upcoming') {
            return Object.values(menuData).reduce((total, current) => total + current['UpComingInplay'], 0)
        } else {
            let count = 0
            Object.entries(menuData[sportType as RouteSportType])
                .map(([key, count]) => ({
                    key,
                    count: count,
                }))
                .forEach((type) => {
                    if (type.key !== 'Live') {
                        count = count + type.count
                    }
                })
            return count
            // return Object.values(menuData[sportType as RouteSportType]).reduce((total, current) => total + current, 0);
        }
    } catch (err) {
        return 0
    }
}

const SportHeaderTopRow: React.FC<SportHeaderProps> = ({ menuData }) => {
    const { t } = useTranslation()
    return (
        <SSportHeaderTopRow>
            <SFootballMenu to={'/sport/select-competition/all/football'}>
                <SFootballIcon src={FootballMainIcon} alt="Football icon" />
                <SFootballInnerContainer>
                    <SFootballTextContainer>
                        <SFootballTopTextContainer>
                            <SFootballTitle>FOOTBALL</SFootballTitle>
                            <SFootballSubTitle>{t('topPage.topGames')}</SFootballSubTitle>
                        </SFootballTopTextContainer>

                        <SFootballBottomContainer>
                            <SFootballSubTitle2>{t(sportTypeCodeMap['football'])}</SFootballSubTitle2>
                            <SFootballNumber>{sportsTotalCount('football', menuData)}</SFootballNumber>
                        </SFootballBottomContainer>
                    </SFootballTextContainer>
                </SFootballInnerContainer>
            </SFootballMenu>
            <SBasketballMenu to={'/sport/select-competition/all/basketball'}>
                <SBasketballIcon src={BasketballMainIcon} alt="Football icon" />
                <SBasketballInnerContainer>
                    <SBasketballTextContainer>
                        <SBasketballTitle>{t(sportTypeCodeMap['basketball'])}</SBasketballTitle>
                        <SBasketballNumber>{sportsTotalCount('basketball', menuData)}</SBasketballNumber>
                    </SBasketballTextContainer>
                </SBasketballInnerContainer>
            </SBasketballMenu>
        </SSportHeaderTopRow>
    )
}

const SportHeaderBottomRow: React.FC<SportHeaderProps> = ({ menuData }) => {
    const { t } = useTranslation()
    return (
        <SSportHeaderBottomRow>
            <SBottomRowInnerWrapper>
                {mobileMenuItemList.map((item, index) => {
                    const sportsCount = sportsTotalCount(item.title, menuData)
                    const title = item.title === 'upcoming' ? t(`menu.${item.title}`) : t(sportTypeCodeMap[item.title])
                    return (
                        <MenuItems to={item.path} key={`${item.title}-${index}`}>
                            <MenuItemText>
                                <MenuText>{title}</MenuText>
                                <MenuText>{sportsCount}</MenuText>
                            </MenuItemText>
                            <MenuImages>
                                <SBallImage src={item.icon} alt="icon" />
                            </MenuImages>
                        </MenuItems>
                    )
                })}
            </SBottomRowInnerWrapper>
            {/* <MenuItemsFirst to={'/sport/popular/football'}>
                <MenuItemText>
                    <MenuText>即将开赛</MenuText>
                    <MenuText>4</MenuText>
                </MenuItemText>
                <MenuImages>
                    <img src={MobilePopularMain} alt="icon" />
                </MenuImages>
            </MenuItemsFirst> */}
        </SSportHeaderBottomRow>
    )
}

const SportHeader: React.FC<ComponentProps> = () => {
    const menuData = useSelector((state) => state.sportMenu.data)
    return (
        <SportHeaderMainContainer>
            <SportHeaderSubContainer>
                <SportHeaderTopRow menuData={menuData} />
                <SportHeaderBottomRow menuData={menuData} />
            </SportHeaderSubContainer>
        </SportHeaderMainContainer>
    )
}

export default SportHeader
