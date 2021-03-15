import styled from 'styled-components/macro'
import backgroundImg from '@brand/assets/images/boardGame/desktop/bg.jpg'
import kyBtnImg from '@brand/assets/images/boardGame/desktop/button-ky-on.png'
import trialButton from '@brand/assets/images/boardGame/desktop/try-button-on.png'
import maintainingButton from '@brand/assets/images/boardGame/desktop/button-ky-maintenance.png'
import gameListImg from '@brand/assets/images/boardGame/desktop/gamelist.png'
import { useSelector } from '@redux'
import useCopyRight from '@hooks/useCopyRight'
import bgImg from '@styles/mixins/backgroundImg'
import GameSuppliers from '@constants/gameSuppliers'
import useLiveCasino from '@pages/boardGame/hook'

import Maintenance from './components/maintenance'

const SContainer = styled.div`
    ${bgImg(backgroundImg, 'cover', 'no-repeat', '50% 10%')}
    width: 100%;
    min-height: 100vh;
    height: auto;
    padding: 0;
    position: relative;
    font-size: 1vh;
`

const SLeft = styled.div`
    width: 50%;
    height: 100vh;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
`

const SContent = styled.div`
    width: 52.5%;
    height: 47.5%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
`

const SGameContainer = styled.div`
    width: auto;
    min-height: 10em;
    height: auto;
    padding: 0;
    position: relative;

    @media (max-width: ${(props) => props.theme.sizes.laptopL}) {
        padding: 10% 0 0 0;
    }
`

const SButtonGroup = styled.div`
    width: 40em;
    height: 10em;
    margin: 0 auto 0 0;
    position: relative;

    @media (max-width: ${(props) => props.theme.sizes.desktopS}) {
        width: 30em;
        height: 7.5em;
    }

    @media (max-width: ${(props) => props.theme.sizes.laptopL}) {
        width: 160px;
        height: 35px;
    }
`

const TrialButton = styled.div`
    width: 18.5em;
    height: 10em;
    margin: 0 auto 0 0;
    padding: 1em 0 0 0;
    cursor: pointer;
    ${bgImg(trialButton, 'cover')};

    @media (max-width: ${(props) => props.theme.sizes.desktopS}) {
        width: 13.875em;
        height: 7.5em;
    }

    @media (max-width: ${(props) => props.theme.sizes.laptopL}) {
        width: 65px;
        height: 35px;
    }
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
    width: 320px;
    height: auto;
    margin: 1em 0;
    position: relative;
`

const SGameListImage = styled.div`
    width: 100%;
    height: 10%;
    margin: 6em 0 0 0;
    ${bgImg(gameListImg, '90%')}
    position: absolute;
    bottom: 11%;
`

const SCopyRight = styled.div`
    width: 100%;
    height: 2em;
    padding: 0.25em;
    background-color: #1a1a1a;
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
    const isKyTrial = !isLoggedIn && !isKyMaintaining

    return (
        <SContainer>
            <SLeft>
                <SContent>
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
            </SLeft>
            <SGameListImage />
            <SCopyRight>{copyRight}</SCopyRight>
        </SContainer>
    )
}
