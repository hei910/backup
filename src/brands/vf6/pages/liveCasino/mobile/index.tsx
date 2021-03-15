import useTranslation from '@hooks/useTranslation'
import styled, { keyframes } from 'styled-components/macro'
import topBackgroundImg from '@brand/assets/images/liveCasino/mobile/bg.png'
import bottomBackgroundImg from '@brand/assets/images/liveCasino/mobile/bg2.png'
import coinLeft from '@brand/assets/images/liveCasino/mobile/coin1.png'
import coinRight from '@brand/assets/images/liveCasino/mobile/coin2.png'
import titleImg from '@brand/assets/images/liveCasino/mobile/title.png'
import titleEffectImg from '@brand/assets/images/liveCasino/mobile/title.gif'
import agGameImg from '@brand/assets/images/liveCasino/mobile/ag_bg.png'
import bgGameImg from '@brand/assets/images/liveCasino/mobile/bg_bg.png'
import agRibbonImg from '@brand/assets/images/liveCasino/mobile/ag_ribbon.svg'
import bgRibbonImg from '@brand/assets/images/liveCasino/mobile/bg_ribbon.svg'
import agGirlImg from '@brand/assets/images/liveCasino/mobile/girl_ag.png'
import bgGirlImg from '@brand/assets/images/liveCasino/mobile/girl_bg.png'
import bgImg from '@styles/mixins/backgroundImg'
import GameSuppliers from '@constants/gameSuppliers'

import useLiveCasino from '@pages/liveCasino/hook'
import Maintenance from './maintenance'

const fadeIn = keyframes`
    0% {
        opacity: 0 
    }

    100% {
        opacity: 1 
    }
`

const goUp = keyframes`
    from {
        transform: translate(0, 10%);
    }

    to {
        transform: translate(0, 0);
    }
`

const goUp2 = keyframes`
    from {
        transform: translate(0, 15%);
    }

    to {
        transform: translate(0, 0);
    }
`

const clicking = keyframes`
    0% {
        transform: scale(1); 
    }

    33% {
        transform: scale(0.975); 
    }

    67% {
        transform: scale(1.025); 
    }

    100% {
        transform: scale(1); 
    }
`

const SContainer = styled.div`
    min-width: 320px;
    width: 100%;
    min-height: 566px;
    height: 72vh;
    padding: 25px 0;
    position: relative;
`
const STopBg = styled.div`
    width: 100%;
    height: 50%;
    position: absolute;
    top: 0;
    left: 0;
    ${bgImg(topBackgroundImg, '100%', 'no-repeat', '0% 0%')}
`

const SBottomBg = styled.div`
    width: 100%;
    height: 50%;
    position: absolute;
    bottom: 0;
    left: 0;
    ${bgImg(bottomBackgroundImg, '100%', 'no-repeat', '100% 100%')}
`

const STopSection = styled.div`
    max-width: 562.5px;
    margin: 0 auto;
    position: relative;
`

const STitleContainer = styled.div`
    width: 18.625em;
    height: 5.3125em;
    margin: 0.75em auto;
    position: relative;
    animation: ${fadeIn} 1.5s ease-in-out 0s 1 normal both;
`

const STitle = styled.div`
    ${bgImg(titleImg, 'auto 100%')}
    width: 100%;
    height: 100%;
`

const STitleEffect = styled.div`
    ${bgImg(titleEffectImg, 'auto 100%')}
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
`

const SSubTitle = styled.div`
    min-width: 325px;
    max-width: 325px;
    margin: auto;
    padding: 0 2em;
    font-size: 0.8125em;
    text-align: center;
    color: #333;
`

const SCoinLeft = styled.div`
    ${bgImg(coinLeft, 'auto 100%')}
    width: 4.3125em;
    height: 4.25em;
    position: absolute;
    top: 0;
    left: -1.25em;
    animation: ${fadeIn} 1.5s ease-in-out 0s 1 normal both, ${goUp2} 1.5s ease-in-out 0s infinite alternate both;
`

const SCoinRight = styled.div`
    ${bgImg(coinRight, 'auto 100%', 'no-repeat', '160% 100%')}
    width: 12.25em;
    height: 7.3125em;
    position: absolute;
    top: 0;
    right: 0;
    animation: ${fadeIn} 1.5s ease-in-out 0.3s 1 normal both, ${goUp} 1.6s ease-in-out 0.3s infinite alternate both;
`

const SContent = styled.div`
    max-width: 20.3125em;
    width: 99%;
    height: auto;
    margin: auto;
    position: relative;
`

const SGameContainer = styled.div`
    width: 100%;
    max-width: 562.5px;
    height: 10.3125em;
    margin: 1.25em auto;
    border-radius: 0.625em;
    overflow: hidden;
    position: relative;

    :hover {
        animation: ${clicking} 1s 0s ease-in-out 1 normal both;
    }
`

const SBGGameContainer = styled(SGameContainer)`
    box-shadow: 0.08125em 0.1375em 0.625em 0 rgba(81, 114, 228, 0.75);
`
const SAGGameContainer = styled(SGameContainer)`
    box-shadow: 0.08125em 0.1375em 0.625em 0 rgba(125, 63, 191, 0.75);
`

const SBGGameBG = styled.div<{ isMaintenance: boolean }>`
    width: 100%;
    height: 100%;
    ${bgImg(bgGameImg, 'cover')}
    ${(props) => props.isMaintenance && 'filter: saturate(0)'}
`

const SAGGameBG = styled.div<{ isMaintenance: boolean }>`
    width: 100%;
    height: 100%;
    ${bgImg(agGameImg, 'cover')}
    ${(props) => props.isMaintenance && 'filter: saturate(0)'}
`

const SGameDetail = styled.div`
    height: 100%;
    margin: auto;
    padding: 1em;
    color: #fff;
`

const SRibbon = styled.div`
    width: 35px;
    height: 40px;
    margin: 0 20px;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-self: center;
`

const SBgRibbon = styled(SRibbon)`
    ${bgImg(agRibbonImg, '100%')}
`

const SAgRibbon = styled(SRibbon)`
    ${bgImg(bgRibbonImg, '100%')}
`

const SRibbonText = styled.div`
    padding: 20% 0;
    ${(props) => props.theme.typography.Body6}
    text-align: center;
`

const SGameTitleWrapper = styled.div`
    width: 8.5625em;
    height: auto;
    margin: 28px 0 8px;
    padding: 4px 0;
    position: relative;
    animation: ${fadeIn} 1s ease-in-out 0.2s 1 normal both, ${goUp} 1s ease-in-out 0.2s 1 normal both;

    :after {
        content: '';
        display: block;
        width: 6.5625em;
        height: 1px;
        background: hsla(0, 0%, 100%, 0.25);
        position: absolute;
        bottom: 0;
        left: 0;
    }
`

const SGameName = styled.div`
    width: 4.75em;
    position: relative;
    ${(props) => props.theme.typography.H2Headline}
`

const SSupplierName = styled.div`
    width: auto;
    position: relative;
    ${(props) => props.theme.typography.Body2}
`

const SGameDescription = styled.div`
    ${(props) => props.theme.typography.Body5}
    font-size: .5em;
    margin: 0 0 0.75em 0;
    position: relative;
    animation: ${fadeIn} 1s ease-in-out 0.4s 1 normal both, ${goUp2} 1s ease-in-out 0.4s 1 normal both;
`

const SGirl = styled.div`
    width: 11.5625em;
    height: 10.3125em;
    position: absolute;
    bottom: 0;
    right: 0;
`

const SBgGirl = styled(SGirl)`
    ${bgImg(bgGirlImg, 'auto 100%')}
`

const SAgGirl = styled(SGirl)`
    ${bgImg(agGirlImg, 'auto 100%')}
`

const BtnTrial = styled.div`
    width: 6.5em;
    height: 2.375em;
    border-radius: 1.65em 0 0 1.65em;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0.9375em;
    right: 0;
    ${(props) => props.theme.typography.Body5}
    color: #fff;
    animation: ${fadeIn} 1s ease-in-out 0.8s 1 normal both;
`

const BgBtnTrial = styled(BtnTrial)`
    background-color: #4d64ff;
`

const AgBtnTrial = styled(BtnTrial)`
    background-color: #4d64ff;
`

const SCopyRight = styled.div`
    margin: 2.25em auto;
    padding: 0 1em;
    font-size: 0.6875em;
    text-align: center;
    color: #666;
`

const MaintenanceContainer = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
`

export default () => {
    const t = useTranslation()
    const { onEnterClick, onTrialEnterClick, supplierMaintenance } = useLiveCasino()
    const isBgMaintaining = supplierMaintenance[GameSuppliers.bg]?.isMaintenance
    const isAgMaintaining = supplierMaintenance[GameSuppliers.ag]?.isMaintenance

    return (
        <SContainer>
            <STopBg />
            <SBottomBg />
            <SCoinLeft />
            <SCoinRight />
            <SContent>
                <STopSection>
                    <STitleContainer>
                        <STitle />
                        <STitleEffect />
                    </STitleContainer>
                    <SSubTitle>{t('liveCasino.subtitle')}</SSubTitle>
                </STopSection>
                <SBGGameContainer>
                    <SBGGameBG isMaintenance={isBgMaintaining}>
                        <SGameDetail onClick={() => onEnterClick(GameSuppliers.bg)}>
                            <SBgRibbon>
                                <SRibbonText>{t('liveCasino.ribbon.bg')}</SRibbonText>
                            </SBgRibbon>
                            <SGameTitleWrapper>
                                <SGameName>{t('general.suppliers.livecasino.bg')}</SGameName>
                                <SSupplierName>{t('liveCasino.supplierName.bg')}</SSupplierName>
                            </SGameTitleWrapper>

                            {!isBgMaintaining && <SGameDescription>{t('liveCasino.description.bg')}</SGameDescription>}
                            <SBgGirl />
                        </SGameDetail>
                        {!isBgMaintaining && (
                            <BgBtnTrial onClick={() => onTrialEnterClick(GameSuppliers.bg)}>
                                {t('general.trial')}
                            </BgBtnTrial>
                        )}
                    </SBGGameBG>
                    {isBgMaintaining && (
                        <MaintenanceContainer>
                            <Maintenance supplier={GameSuppliers.bg} />
                        </MaintenanceContainer>
                    )}
                </SBGGameContainer>
                <SAGGameContainer>
                    <SAGGameBG isMaintenance={isAgMaintaining}>
                        <SGameDetail onClick={() => onEnterClick(GameSuppliers.ag)}>
                            <SAgRibbon>
                                <SRibbonText>{t('liveCasino.ribbon.ag')}</SRibbonText>
                            </SAgRibbon>
                            <SGameTitleWrapper>
                                <SGameName>{t('general.suppliers.livecasino.ag')}</SGameName>
                                <SSupplierName>{t('liveCasino.supplierName.ag')}</SSupplierName>
                            </SGameTitleWrapper>

                            {!isAgMaintaining && <SGameDescription>{t('liveCasino.description.ag')}</SGameDescription>}
                            <SAgGirl />
                        </SGameDetail>
                        {!isAgMaintaining && (
                            <AgBtnTrial onClick={() => onTrialEnterClick(GameSuppliers.ag)}>
                                {t('general.trial')}
                            </AgBtnTrial>
                        )}
                    </SAGGameBG>
                    {isAgMaintaining && (
                        <MaintenanceContainer>
                            <Maintenance supplier={GameSuppliers.ag} />
                        </MaintenanceContainer>
                    )}
                </SAGGameContainer>
                <SCopyRight>{t('liveCasino.copyRight')}</SCopyRight>
            </SContent>
        </SContainer>
    )
}
