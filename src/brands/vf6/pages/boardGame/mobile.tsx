import styled from 'styled-components/macro'
import backgroundImg from '@brand/assets/images/boardGame/mobile/bg.jpg'
import titleImg from '@brand/assets/images/boardGame/mobile/title.png'
import kyBtnImg from '@brand/assets/images/boardGame/mobile/button-ky-on.png'
import trialButton from '@brand/assets/images/boardGame/mobile/try-button-on.png'
import maintainingButton from '@brand/assets/images/boardGame/mobile/button-ky-maintenance.png'
import { useSelector } from '@redux'
import bgImg from '@styles/mixins/backgroundImg'
import GameSuppliers from '@constants/gameSuppliers'
import useLiveCasino from '@pages/boardGame/hook'

import Maintenance from './components/maintenance'

const SContainer = styled.div`
    ${bgImg(backgroundImg, 'cover', 'no-repeat', '50% 0%')}
    width: 100%;
    min-height: 68vh;
    height: auto;
    position: relative;
    font-size: 3.75vw;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`

const SContent = styled.div`
    width: 100%;
    height: auto;
    margin: 7.5em auto 0;

    @media (min-width: ${(props) => props.theme.sizes.tablet}) {
        margin: 10em auto 0;
    }
`

const STitle = styled.div`
    ${bgImg(titleImg, 'auto 100%')}
    width: 13em;
    height: 9em;
    margin: 0 auto 0 0.5em;
`

const SGameContainer = styled.div`
    width: 23.4375em;
    min-height: 10.5em;
    height: auto;
    margin: 0 auto 0 0.125em;
    position: relative;
`

const SButtonGroup = styled.div`
    width: 11em;
    height: auto;
    position: relative;
    top: -2.5em;
`

const TrialButton = styled.div`
    width: 45%;
    height: 3.5em;
    margin: 0 auto 0 0.5em;
    ${bgImg(trialButton, 'cover')}
`

const RealButton = styled.div`
    width: 100%;
    height: 5em;
`

const KYButton = styled(RealButton)<{ isMaintenance: boolean; isLoggedIn: boolean }>`
    ${(props) => (props.isMaintenance ? bgImg(maintainingButton, 'cover') : bgImg(kyBtnImg, 'cover'))}
    pointer-events: ${(props) => (props.isMaintenance ? 'none' : 'auto')};
    margin: 0.5em 4.5em 0 auto;
    ${(props) => props.isLoggedIn && `margin-top: 1em;`}
`

const MaintenanceContainer = styled.div`
    width: 50%;
    height: auto;
    max-height: 45%;
    position: absolute;
    bottom: 4em;
`

export default () => {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
    const { onEnterClick, onTrialEnterClick, supplierMaintenance } = useLiveCasino()
    const isKyMaintaining = supplierMaintenance[GameSuppliers.ky]?.isMaintenance
    const isKyTrial = !isLoggedIn && !isKyMaintaining

    return (
        <SContainer>
            <SContent>
                <STitle />
                <SGameContainer>
                    <SButtonGroup>
                        <KYButton
                            isMaintenance={isKyMaintaining}
                            isLoggedIn={isLoggedIn}
                            onClick={() => onEnterClick(GameSuppliers.ky)}
                            data-qa={isKyMaintaining ? 'btnKyStartMaintenance' : 'btnKyStart'}
                        />
                        {isKyTrial && (
                            <TrialButton
                                onClick={() => onTrialEnterClick(GameSuppliers.ky)}
                                data-qa={isKyMaintaining ? 'btnKyTrialMaintenance' : 'btnKyTrial'}
                            />
                        )}
                    </SButtonGroup>

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
