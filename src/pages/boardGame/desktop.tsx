import styled from 'styled-components/macro'
import backgroundImg from '@brand/assets/images/boardGame/desktop/bg.png'
import titleImg from '@brand/assets/images/boardGame/desktop/title.png'
import kyGirlImg from '@brand/assets/images/boardGame/desktop/ky-girl-on.png'
import maintainingKyGirlImg from '@brand/assets/images/boardGame/desktop/ky-girl-maintenance.png'
import kyBtnImg from '@brand/assets/images/boardGame/desktop/button-ky-on.png'
import trialButton from '@brand/assets/images/boardGame/desktop/try-button-on.png'
import maintainingTrialButton from '@brand/assets/images/boardGame/desktop/try-button-maintenance.png'
import maintainingButton from '@brand/assets/images/boardGame/desktop/button-ky-maintenance.png'
import { useSelector } from '@redux'
import useCopyRight from '@hooks/useCopyRight'
import bgImg from '@styles/mixins/backgroundImg'
import GameSuppliers from '@constants/gameSuppliers'

import useLiveCasino from './hook'
import Maintenance from './components/maintenance'

const SContainer = styled.div`
    ${bgImg(backgroundImg, 'cover', 'no-repeat', '50% 50%')}
    width: 100%;
    min-height: 100vh;
    height: auto;
    padding: 0;
    position: relative;
    font-size: 2vh;
`

const SContent = styled.div`
    width: 90%;
    margin: 0 auto;
    padding: 1em 0 0 0;
    position: relative;
`

const STitle = styled.div`
    ${bgImg(titleImg, 'auto 100%')}
    width: 45em;
    height: 8em;
    margin: 0 auto;
    padding: 0.75em 0 0 0;
`

const SGameContainer = styled.div`
    width: 23.4375em;
    min-height: 10.5em;
    height: auto;
    margin: 0 auto;
    padding: 0;
    position: relative;
`

const SKYGameBG = styled.div<{ isMaintenance: boolean }>`
    width: 22.675em;
    height: 25em;
    margin: 0 auto;
    ${(props) =>
        props.isMaintenance
            ? bgImg(maintainingKyGirlImg, 'cover', 'no-repeat', '50% 50%')
            : bgImg(kyGirlImg, 'cover', 'no-repeat', '50% 50%')};
`

const SButtonGroup = styled.div`
    width: 23.4375em;
    height: 8.5em;
    margin: 0 auto;
    position: relative;
    bottom: 6.75em;
`

const TrialButton = styled.div<{ isMaintenance: boolean }>`
    width: 8em;
    height: 8em;
    position: absolute;
    top: -8.5em;
    right: -3.5em;
    cursor: pointer;
    pointer-events: ${(props) => (props.isMaintenance ? 'none' : 'auto')};
    ${(props) => (props.isMaintenance ? bgImg(maintainingTrialButton, 'cover') : bgImg(trialButton, 'cover'))};
`

const RealButton = styled.div`
    width: 100%;
    height: 100%;
    cursor: pointer;
`

const KYButton = styled(RealButton)<{ isMaintenance: boolean; isLoggedIn: boolean }>`
    ${(props) => (props.isMaintenance ? bgImg(maintainingButton, 'cover') : bgImg(kyBtnImg, 'cover'))}
    pointer-events: ${(props) => (props.isMaintenance ? 'none' : 'auto')};
    margin: 0 4.5em 0 auto;
`

const MaintenanceContainer = styled.div`
    width: 40%;
    height: auto;
    margin: 0 auto;
    position: relative;
    top: -6em;
`

const SCopyRight = styled.div`
    width: 100%;
    height: auto;
    padding: 0;
    background-color: transparent;
    ${(props) => props.theme.typography.Body4}
    text-align: center;
    color: #ffffff;
    position: absolute;
    bottom: 0;
`

export default () => {
    const copyRight = useCopyRight()
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
    const { onEnterClick, onTrialEnterClick, supplierMaintenance } = useLiveCasino()
    const isKyMaintaining = supplierMaintenance[GameSuppliers.ky]?.isMaintenance

    return (
        <SContainer>
            <SContent>
                <STitle data-qa="imgBoardGameMainTitle" />
                <SGameContainer>
                    <SKYGameBG
                        isMaintenance={isKyMaintaining}
                        data-qa={isKyMaintaining ? 'imgKyBanner ' : 'ctnrKyMaintenance'}
                    />
                    <SButtonGroup>
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
                    </SButtonGroup>
                </SGameContainer>
                {isKyMaintaining && (
                    <MaintenanceContainer>
                        <Maintenance supplier={GameSuppliers.ky} />
                    </MaintenanceContainer>
                )}
            </SContent>
            <SCopyRight>{copyRight}</SCopyRight>
        </SContainer>
    )
}
