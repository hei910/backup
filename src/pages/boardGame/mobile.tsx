import styled from 'styled-components/macro'
import backgroundImg from '@brand/assets/images/boardGame/mobile/bg.png'
import titleImg from '@brand/assets/images/boardGame/mobile/title.png'
import kyBoxImg from '@brand/assets/images/boardGame/mobile/ky-box.png'
import kyBtnImg from '@brand/assets/images/boardGame/mobile/button-ky-on.png'
import trialButton from '@brand/assets/images/boardGame/mobile/try-button-on.png'
import maintainingTrialButton from '@brand/assets/images/boardGame/mobile/try-button-maintenance.png'
import maintainingButton from '@brand/assets/images/boardGame/mobile/button-ky-maintenance.png'
import { useSelector } from '@redux'
import bgImg from '@styles/mixins/backgroundImg'
import GameSuppliers from '@constants/gameSuppliers'

import useLiveCasino from './hook'
import Maintenance from './components/maintenance'

const SContainer = styled.div`
    ${bgImg(backgroundImg, 'cover', 'no-repeat', '50% 45%')}
    width: 100%;
    min-height: 62vh;
    height: auto;
    padding: 0.75em 0;
    position: relative;
    font-size: 4vw;
`

const STopSection = styled.div`
    margin: 0 auto;
    padding: 0;
    position: relative;
`

const STitle = styled.div`
    ${bgImg(titleImg, 'auto 100%')}
    width: 18.75em;
    height: 7em;
    margin: 3em auto 0 auto;
`

const SContent = styled.div`
    width: 100%;
    height: auto;
`

const SGameContainer = styled.div`
    width: 23.4375em;
    min-height: 10.5em;
    height: auto;
    margin: 2.5em auto;
    position: relative;
`

const SKYGameBG = styled.div`
    width: 100%;
    height: 10.5em;
    ${bgImg(kyBoxImg, 'contain', 'no-repeat', '-40% 50%')}
`

const SButtonGroup = styled.div`
    width: 10em;
    height: 2.5em;
`

const KYButtonGroup = styled(SButtonGroup)`
    padding: 2.5em 0 0 2.5em;
`

const TrialButton = styled.div<{ isMaintenance: boolean }>`
    width: 10em;
    height: 2.5em;
    pointer-events: ${(props) => (props.isMaintenance ? 'none' : 'auto')};
    ${(props) => (props.isMaintenance ? bgImg(maintainingTrialButton, 'cover') : bgImg(trialButton, 'cover'))};
`

const RealButton = styled.div`
    width: 10em;
    height: 5em;
`

const KYButton = styled(RealButton)<{ isMaintenance: boolean; isLoggedIn: boolean }>`
    ${(props) => (props.isMaintenance ? bgImg(maintainingButton, 'cover') : bgImg(kyBtnImg, 'cover'))}
    pointer-events: ${(props) => (props.isMaintenance ? 'none' : 'auto')};
    margin: 0 4.5em 0 auto;
    ${(props) => props.isLoggedIn && `margin-top: 1em;`}
`

const MaintenanceContainer = styled.div`
    width: 90%;
    height: 100%;
    margin: 0.5em auto;
    position: relative;
    bottom: 0;
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
                    <SKYGameBG data-qa={isKyMaintaining ? 'imgKyTitle ' : 'ctnrKyMaintenance'}>
                        <KYButtonGroup>
                            {!isLoggedIn && (
                                <TrialButton
                                    isMaintenance={isKyMaintaining}
                                    onClick={() => onTrialEnterClick(GameSuppliers.ky)}
                                    data-qa={isKyMaintaining ? 'btnKyTrialMaintenance' : 'btnKyTrial'}
                                />
                            )}
                            <KYButton
                                isMaintenance={isKyMaintaining}
                                isLoggedIn={isLoggedIn}
                                onClick={() => onEnterClick(GameSuppliers.ky)}
                                data-qa={isKyMaintaining ? 'btnKyStartMaintenance' : 'btnKyStart'}
                            />
                        </KYButtonGroup>
                    </SKYGameBG>
                    {isKyMaintaining && (
                        <MaintenanceContainer>
                            <Maintenance supplier={GameSuppliers.ky} />
                        </MaintenanceContainer>
                    )}
                </SGameContainer>
            </SContent>
        </SContainer>
    )
}
