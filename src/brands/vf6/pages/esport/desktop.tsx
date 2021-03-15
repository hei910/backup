import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'
import { gameList } from '@pages/esport/constants'
import useEsport from '@pages/esport/hook'

import BannerImage from '@brand/assets/images/avia/desktop/e-sport-event.png'
import BannerTitle from '@brand/assets/images/avia/desktop/web-title.png'
import BgImage from '@brand/assets/images/avia/desktop/bg.png'
import LightEffect from '@brand/assets/images/avia/desktop/light-effect.png'
import LightHoverEffect from '@brand/assets/images/avia/desktop/light-hover-effect.png'

import CSGOIcon from '@brand/assets/images/avia/desktop/csgo.svg'
import DOTAIcon from '@brand/assets/images/avia/desktop/dota2.svg'
import FIFAIcon from '@brand/assets/images/avia/desktop/fifa.svg'
import HOKIcon from '@brand/assets/images/avia/desktop/honor-of-kings.svg'
import HOWIcon from '@brand/assets/images/avia/desktop/heros-of-warcraft.svg'
import LOLIcon from '@brand/assets/images/avia/desktop/lol.svg'
import OverwatchIcon from '@brand/assets/images/avia/desktop/overwatch.svg'
import WOWIcon from '@brand/assets/images/avia/desktop/world-of-warcraft.svg'

import bgImg from '@mixins/backgroundImg'

const SMainContianer = styled.div`
    ${bgImg(BgImage, 'cover')}
    width: 100%;
    height: 90%;
    position: relative;
`
const SBannerContainer = styled.div`
    ${bgImg(BannerImage, 'contain')}
    height: 65%;
    transition: height 0.3s ease-in-out;
    position: relative;
`
const SBannerContentContainer = styled.div`
    text-align: center;
    margin-top: -40px;
    height: 45%;
`
const SBannerTitle = styled.img`
    height: 30%;
    margin-top: auto;
`
const SBannerText = styled.div`
    font-size: 21px;
    color: #403939;
`
const SLightEffeft = styled.div`
    position: absolute;
    ${bgImg(LightEffect, 'contain')}
    height: 75%;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;

    :hover {
        ${bgImg(LightHoverEffect, 'contain')}
    }
`
const SButtonsContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin: 26px 0 16px;
    transition: margin 0.3s ease-in-out;
    @media (max-width: 1366px) {
        margin: 16px 0 16px;
    }
`
const SIconContainer = styled.div`
    font-size: 12px;
    margin: 0px 25px;
    transition: margin 0.3s ease-in-out;
    @media (max-width: 1366px) {
        margin: 0px 18px;
    }
`
const SIcon = styled.img`
    height: 70px;
    width: 70px;
    transition: height 0.3s ease-in-out, width 0.3s ease-in-out;
    @media (max-width: 1366px) {
        height: 59px;
        width: 59px;
    }
`
const SIconText = styled.div`
    color: #403939;
    width: 100%;
    text-align: center;
    margin-top: 5px;
`
const SEnterGameButton = styled.div`
    width: 301px;
    height: 97px;
    border-radius: 15px;
    box-shadow: 2px 3.5px 9px 0 rgba(77, 104, 255, 0.63);
    background-color: #3d7eeb;
    margin: 0 61px;
    font-size: 40px;
    font-weight: bold;
    object-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    line-height: 2.2;
    letter-spacing: 4px;
    cursor: pointer;
    @media (max-width: 1366px) {
        width: 263px;
        height: 85px;
        margin: 0 32px;
        font-size: 36px;
    }

    :hover {
        font-size: 44px;
        @media (max-width: 1366px) {
            font-size: 40px;
        }
    }
`
const Copyright = styled.div`
    position: absolute;
    width: 100%;
    text-align: center;
    color: #707070;
    padding-top: 10px;
    bottom: 10px;
    left: 0;
    right: 0;
    ${(props) => props.theme.typography.Body5}
    transition: height 0.3s ease-in-out, width 0.3s ease-in-out;
    @media (max-width: 1366px) {
        bottom: 5px;
        padding-top: 5px;
    }
`
const iconList1 = [
    { type: gameList.LOL, image: LOLIcon },
    { type: gameList.HOK, image: HOKIcon },
    { type: gameList.DOTA, image: DOTAIcon },
    { type: gameList.CSGO, image: CSGOIcon },
]
const iconList2 = [
    { type: gameList.HOW, image: HOWIcon },
    { type: gameList.OVERWATCH, image: OverwatchIcon },
    { type: gameList.WOW, image: WOWIcon },
    { type: gameList.FIFA, image: FIFAIcon },
]
export default () => {
    const t = useTranslation()
    const { onEnterClick, copyRight } = useEsport()

    return (
        <>
            <SMainContianer>
                <SBannerContainer>
                    <SLightEffeft />
                </SBannerContainer>
                <SBannerContentContainer>
                    <SBannerTitle src={BannerTitle} alt={t(`esport.bannerText`)} />
                    <SBannerText>{t(`esport.bannerText`)}</SBannerText>
                    <SButtonsContainer>
                        {iconList1.map((icon, index) => (
                            <SIconContainer key={`avia-icons-${index}-${icon.type}`}>
                                <SIcon src={icon.image} alt={t(`esport.${icon.type}`)} />
                                <SIconText>{t(`esport.${icon.type}`)}</SIconText>
                            </SIconContainer>
                        ))}
                        <SEnterGameButton onClick={onEnterClick} data-qa="btnPlayAvia">
                            {t(`general.components.button.enterGame`)}
                        </SEnterGameButton>
                        {iconList2.map((icon, index) => (
                            <SIconContainer key={`avia-icons-${index}-${icon.type}`}>
                                <SIcon src={icon.image} alt={t(`esport.${icon.type}`)} />
                                <SIconText>{t(`esport.${icon.type}`)}</SIconText>
                            </SIconContainer>
                        ))}
                    </SButtonsContainer>
                </SBannerContentContainer>
            </SMainContianer>
            <Copyright>{copyRight}</Copyright>
        </>
    )
}
