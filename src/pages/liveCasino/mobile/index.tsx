import useTranslation from '@hooks/useTranslation'
import styled from 'styled-components/macro'
import backgroundImg from '@brand/assets/images/liveCasino/mobile/bg.png'
import titleImg from '@brand/assets/images/liveCasino/mobile/title.png'
import agGameImg from '@brand/assets/images/liveCasino/mobile/ag_bg.png'
import bgGameImg from '@brand/assets/images/liveCasino/mobile/bg_bg.png'
import trialRight from '@brand/assets/images/liveCasino/mobile/btn_trial_right.png'
import trialLeft from '@brand/assets/images/liveCasino/mobile/btn_trial_left.png'
import bgImg from '@styles/mixins/backgroundImg'
import GameSuppliers from '@constants/gameSuppliers'

import useLiveCasino from '../hook'
import Maintenance from './maintenance'

const SContainer = styled.div`
    ${bgImg(backgroundImg, 'cover', 'no-repeat', '50% 100%')}
    width: 100%;
    min-height: 566px;
    height: 72vh;
    padding: 0.75em 0;
    position: relative;
`

const STopSection = styled.div`
    max-width: 562.5px;
    margin: 0 auto;
    padding: 0 1.5625em;
    position: relative;
`

const STitle = styled.div`
    ${bgImg(titleImg, 'auto 100%')}
    width: 18.75em;
    height: 4.5em;
    margin: 0.5em auto;
`

const SSubTitle = styled.div`
    min-width: 325px;
    max-width: 325px;
    margin: auto;
    padding: 0 2em;
    font-size: 0.625em;
    line-height: 1.3;
    text-align: center;
    color: #333;
`

const SContent = styled.div`
    width: 100%;
    height: auto;
    margin: -0.625em auto;
`

const SGameContainer = styled.div`
    width: 23.4375em;
    max-width: 562.5px;
    height: 12.5em;
    margin: auto;
    position: relative;
`

const SBGGameBG = styled.div<{ isMaintenance: boolean }>`
    width: 100%;
    height: 100%;
    ${bgImg(bgGameImg, 'cover')}
    ${(props) => props.isMaintenance && 'filter: saturate(0) brightness(.5);'}
`

const SAGGameBG = styled.div<{ isMaintenance: boolean }>`
    width: 100%;
    height: 100%;
    ${bgImg(agGameImg, 'cover')}
    ${(props) => props.isMaintenance && 'filter: saturate(0) brightness(.5);'}
`

const SGameDetail = styled.div`
    margin: 0 2.75em;
    padding: 3em 0 0.625em;
    color: #fff;
`

const SBGGameDetail = styled(SGameDetail)`
    padding-left: 40%;
`

const SAGGameDetail = styled(SGameDetail)`
    padding-right: 40%;
`

const SGameName = styled.div`
    width: 4.75em;
    margin: 0.5em 0 0;
    position: relative;
    ${(props) => props.theme.typography.H3Headline}
    font-weight: bold;
`

const SGameDescription = styled.div`
    ${(props) => props.theme.typography.Body4}
    font-size: .625em;
    margin: 0 0 0.75em 0;
`

const BtnTrial = styled.div`
    width: 5.5em;
    height: 2.75em;
`

const BtnTrialLeft = styled(BtnTrial)`
    ${bgImg(trialLeft, 'cover')}
    margin: -0.75em 1.5em 0 auto;
`

const BtnTrialRight = styled(BtnTrial)`
    ${bgImg(trialRight, 'cover')}
    margin: -0.75em auto 0 1.5em;
`

const SCopyRight = styled.div`
    width: 100%;
    margin: 0 0 1em 0;
    ${(props) => props.theme.typography.Body6}
    text-align: center;
    position: absolute;
    bottom: 0;
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
    const { copyRight, onEnterClick, onTrialEnterClick, supplierMaintenance } = useLiveCasino()
    const isBgMaintaining = supplierMaintenance[GameSuppliers.bg]?.isMaintenance
    const isAgMaintaining = supplierMaintenance[GameSuppliers.ag]?.isMaintenance

    return (
        <SContainer>
            <STopSection>
                <STitle />
                <SSubTitle>{t('liveCasino.subtitle')}</SSubTitle>
            </STopSection>
            <SContent>
                <SGameContainer>
                    <SBGGameBG isMaintenance={isBgMaintaining}>
                        <SBGGameDetail onClick={() => onEnterClick(GameSuppliers.bg)}>
                            <SGameName>{t('general.suppliers.livecasino.bg')}</SGameName>
                            <SGameDescription>{t('liveCasino.description.bg')}</SGameDescription>
                        </SBGGameDetail>
                        <BtnTrialLeft onClick={() => onTrialEnterClick(GameSuppliers.bg)} />
                    </SBGGameBG>
                    {isBgMaintaining && (
                        <MaintenanceContainer>
                            <Maintenance supplier={GameSuppliers.bg} />
                        </MaintenanceContainer>
                    )}
                </SGameContainer>
                <SGameContainer>
                    <SAGGameBG isMaintenance={isAgMaintaining}>
                        <SAGGameDetail onClick={() => onEnterClick(GameSuppliers.ag)}>
                            <SGameName>{t('general.suppliers.livecasino.ag')}</SGameName>
                            <SGameDescription>{t('liveCasino.description.ag')}</SGameDescription>
                        </SAGGameDetail>
                        <BtnTrialRight onClick={() => onTrialEnterClick(GameSuppliers.ag)} />
                    </SAGGameBG>
                    {isAgMaintaining && (
                        <MaintenanceContainer>
                            <Maintenance supplier={GameSuppliers.ag} />
                        </MaintenanceContainer>
                    )}
                </SGameContainer>
            </SContent>
            <SCopyRight>{copyRight}</SCopyRight>
        </SContainer>
    )
}
