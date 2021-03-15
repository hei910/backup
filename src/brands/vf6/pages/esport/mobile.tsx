import styled from 'styled-components/macro'
import BgImage from '@brand/assets/images/avia/mobile/mobile-bg.png'
import BannerImage from '@brand/assets/images/avia/mobile/e-sport-event.png'
import TitleImage from '@brand/assets/images/avia/mobile/mob-title.png'
import IconSet from '@brand/assets/images/avia/mobile/icon3x.png'
import useTranslation from '@hooks/useTranslation'
import { gameList } from '@pages/esport/constants'
import useEsport from '@pages/esport/hook'

import bgImg from '@mixins/backgroundImg'
import React from 'react'

const SMainContainer = styled.div`
    ${bgImg(BgImage, 'cover')}
    width: 100%;
    overflow-x: hidden;
    text-align: center;
    padding-bottom: 25px;
`

const SBannerImage = styled.div`
    ${bgImg(BannerImage, 'cover')};
    background-position: 40% 60%;
    height: 45vh;
    display: block;
`
const SContentContainer = styled.div`
    padding: 0 16px;
`
const STitle = styled.img`
    width: 286px;
    height: 118px;
    margin-top: -85px;
`
const SIcons = styled.img`
    height: auto;
    margin-top: 10px;
    width: 100%;
`
const SText = styled.div`
    ${(props) => props.theme.typography.Body3}
    width: 100%;
    word-break: break-all;
    text-align: center;
    margin-top: 10px;
`
const SEnterGameButton = styled.button`
    padding: 0;
    border: 0;
    color: #ffffff;
    font-weight: bold;
    width: 193px;
    height: 63px;
    margin: 10px auto 27px;
    border-radius: 10px;
    box-shadow: 2px 3.5px 9px 0 rgba(77, 104, 255, 0.63);
    background-color: #3d7eeb;
    ${(props) => props.theme.typography.H4Headline}
`
const SGameList = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;
    color: #b5b5b5;
    margin-top: 5px;

    @media (max-width: 320px) {
        font-size: 9px;
    }
`
const SGameText = styled.div``
const SSpan = styled.span`
    margin: 0 7px;
`
const gamelist = [gameList.LOL, gameList.HOK, gameList.DOTA, gameList.CSGO, gameList.HOW, gameList.OVERWATCH]

export default () => {
    const t = useTranslation()
    const { onEnterClick } = useEsport()

    return (
        <SMainContainer>
            <SBannerImage></SBannerImage>
            <STitle src={TitleImage} alt={t(`general.suppliers.esport.avia`)} />
            <SContentContainer>
                <SIcons src={IconSet} alt={t(`esport.bannerText`)} />
                <SText>{t(`esport.bannerText`)}</SText>
                <SEnterGameButton onClick={onEnterClick} data-qa="btnPlayAvia">{t(`general.components.button.enterGame`)}</SEnterGameButton>
                <SGameList>
                    {gamelist.map((game, index) => (
                        <React.Fragment key={`avia-mobile-${index}`}>
                            <SGameText>{t(`esport.${game}`)}</SGameText>
                            {gamelist.length !== index + 1 && <SSpan>|</SSpan>}
                        </React.Fragment>
                    ))}
                </SGameList>
            </SContentContainer>
        </SMainContainer>
    )
}
