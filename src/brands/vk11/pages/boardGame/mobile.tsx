import styled from 'styled-components/macro'
import backgroundImg from '@brand/assets/images/boardGame/mobile/bg.jpg'
import titleImg from '@brand/assets/images/boardGame/mobile/title.png'
import kyBoxImg from '@brand/assets/images/boardGame/mobile/ky-box.png'
import kyBoxMaintainImg from '@brand/assets/images/boardGame/mobile/ky-main.png'
import kyBoxRecommendImg from '@brand/assets/images/boardGame/mobile/ky-recommend.png'
import kyBtnImg from '@brand/assets/images/boardGame/mobile/button-ky-on.png'
import trialButton from '@brand/assets/images/boardGame/mobile/try-button-on.png'

import { useSelector } from '@redux'
import bgImg from '@styles/mixins/backgroundImg'
import GameSuppliers from '@constants/gameSuppliers'
import useLiveCasino from '@pages/boardGame/hook'

import Maintenance from './components/maintenance'

const SContainer = styled.div`
    ${bgImg( backgroundImg, 'cover', 'no-repeat', '50% 45%')}
    ${(props) => `min-height: calc(100vh - (${props.theme.vars.mobileHeaderHeight} + ${props.theme.vars.mobileFooterHeight}));`}
    padding: 0.75em 0;
    font-size: 4vw;
`

const STopSection = styled.div`
    margin: 0 auto;
    padding: 0;
`

const STitle = styled.div`
    ${bgImg(titleImg, 'auto 100%')}
    width: 18.75em;
    height: 8em;
    margin: 2em auto 0 auto;
`

const SContent = styled.div`
    width: 100%;
    height: auto;
`

const SGameContainer = styled.div`
    width: 23.4375em;
    min-height: 10.5em;
    height: auto;
    margin: 1.5em auto;
`

const SKYGameBG = styled.div<{ isMaintenance: boolean }>`
    width: 100%;
    height: 10.5em;
    position: relative;
    ${props => bgImg((props.isMaintenance ? kyBoxMaintainImg : kyBoxImg), 'contain', 'no-repeat', '-40% 50%')}
`

const KYRecommendIcon = styled.div`
    position: absolute;
    top: 0;
    left: -1em;
    width: 4em;
    height: 4em;
    ${bgImg(kyBoxRecommendImg, 'contain', 'no-repeat')}
`

const KYButtonGroup = styled.div`
    padding: 5.5em 2.5em 0;
    display: flex;
    justify-content: center;
`

const TrialButton = styled.div`
    width: 6em;
    height: 2.5em;
    ${bgImg(trialButton, 'cover')};
    margin-left: 0.6em;
`

const RealButton = styled.div`
    width: 9em;
    height: 2.5em;
`

const KYButton = styled(RealButton)<{ isLoggedIn: boolean }>`
    ${bgImg(kyBtnImg, 'cover')};
`

const MaintenanceContainer = styled.div`
    width: 100%;
    height: 3em;
`

export default () => {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
    const { onEnterClick, onTrialEnterClick, supplierMaintenance } = useLiveCasino()
    const isKyMaintaining = supplierMaintenance[GameSuppliers.ky]?.isMaintenance

    return (
        <SContainer>
            <STopSection>
                <STitle data-qa="imgBoardGameMainTitle" />
            </STopSection>
            <SContent>
                <SGameContainer>
                    <SKYGameBG isMaintenance={isKyMaintaining} data-qa={isKyMaintaining ? 'imgKyTitle ' : 'ctnrKyMaintenance'}>
                        <KYButtonGroup>
                            {!isKyMaintaining
                                ? <>
                                    <KYRecommendIcon />
                                    <KYButton
                                        isLoggedIn={isLoggedIn}
                                        onClick={() => onEnterClick(GameSuppliers.ky)}
                                        data-qa={isKyMaintaining ? 'btnKyStartMaintenance' : 'btnKyStart'}
                                    />
                                    {!isLoggedIn && !isKyMaintaining && (
                                        <TrialButton
                                            onClick={() => onTrialEnterClick(GameSuppliers.ky)}
                                            data-qa={isKyMaintaining ? 'btnKyTrialMaintenance' : 'btnKyTrial'}
                                        />
                                    )}
                                </>
                                : <MaintenanceContainer>
                                    <Maintenance supplier={GameSuppliers.ky} />
                                </MaintenanceContainer>
                            }
                        </KYButtonGroup>
                    </SKYGameBG>
                </SGameContainer>
            </SContent>
        </SContainer>
    )
}
