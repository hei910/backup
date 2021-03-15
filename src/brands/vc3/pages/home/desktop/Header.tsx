import React from 'react'
import styled from 'styled-components/macro'
import BrandLogo from '@brand/assets/images/home/9393-logo.svg'
import {
    directToAgentJoin,
    directToBoardGame,
    directToCasinoDt,
    directToDownloadApp,
    directToFishHunter,
    directToHomePage,
    directToJetso,
    directToLiveCasino,
    directToLottery,
    directToSport,
    directToSportInPlay,
} from '@utils/v1Functions'

const SHeader = styled.div`
    width: 1024px;
    display: flex;
    align-items: center;
`

const SLogoLayout = styled.div`
    padding: 0 15px 0 5px;
`

const SLogo = styled.img`
    height: 42.9px;
    width: 149.2px;
    cursor: pointer;
`

const SMenuLayout = styled.div`
    display: flex;
    justify-content: space-around;
    flex-grow: 1;
`

const SMenuItem = styled.div`
    font-weight: 900;
    font-size: 18px;
    line-height: 22px;
    cursor: pointer;
`

const Header = () => {
    const menuItem = [
        {
            text: '体育',
            action: directToSport,
            requireLogin: false,
        },
        {
            text: '真人',
            action: directToLiveCasino,
            requireLogin: false,
        },
        {
            text: '电子竞技',
            action: directToSportInPlay,
            requireLogin: false,
        },
        {
            text: '老虎机',
            action: directToCasinoDt,
            requireLogin: false,
        },
        {
            text: '棋牌',
            action: directToBoardGame,
            requireLogin: false,
        },
        {
            text: '彩票',
            action: directToLottery,
            requireLogin: false,
        },
        {
            text: '捕鱼',
            action: directToFishHunter,
            requireLogin: false,
        },
        {
            text: '优惠活动',
            action: directToJetso,
            requireLogin: false,
        },
        {
            text: '代理加盟',
            action: directToAgentJoin,
            requireLogin: false,
        },
        {
            text: 'APP下载',
            action: directToDownloadApp,
            requireLogin: false,
        },
    ]

    return (
        <SHeader>
            <SLogoLayout>
                <SLogo src={BrandLogo} onClick={directToHomePage} />
            </SLogoLayout>
            <SMenuLayout>
                {menuItem.map((item, index) => {
                    return (
                        <SMenuItem key={`${item.text}-${index}`} onClick={item.action}>
                            {item.text}
                        </SMenuItem>
                    )
                })}
            </SMenuLayout>
        </SHeader>
    )
}

export default Header
