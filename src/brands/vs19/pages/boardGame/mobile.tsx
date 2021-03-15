import styled from 'styled-components/macro'
import backgroundImg from '@brand/assets/images/boardGame/mobile/bg.jpg'
import titleImg from '@brand/assets/images/boardGame/mobile/title.png'
import hotImg from '@brand/assets/images/boardGame/desktop/hot.png'
import kyBoxImg from '@brand/assets/images/boardGame/mobile/ky-box.png'
import maintainingyBoxImg from '@brand/assets/images/boardGame/mobile/ky-box-maintenance.png'
import kyBtnImg from '@brand/assets/images/boardGame/mobile/button-ky-on.png'
import trialButton from '@brand/assets/images/boardGame/mobile/try-button-on.png'
import { useSelector } from '@redux'
import bgImg from '@styles/mixins/backgroundImg'
import GameSuppliers from '@constants/gameSuppliers'
import useLiveCasino from '@pages/boardGame/hook'

import Maintenance from './components/maintenance'

const SContainer = styled.div`
    ${bgImg(backgroundImg, 'cover', 'no-repeat', '50% 45%')}
    width: 100%;
    min-height: 62vh;
    height: auto;
    padding: 0.75em 0;
    position: relative;
    font-size: 1.75vh;
`

const STitle = styled.div`
    ${bgImg(titleImg, 'auto 100%')}
    width: 18.75em;
    height: 9em;
    margin: 5em auto 0 auto;
`

const SContent = styled.div`
    width: 100%;
    height: auto;
`

const SGameContainer = styled.div`
    width: 25em;
    min-height: 10.5em;
    height: auto;
    margin: 0.5em auto;
    position: relative;
`

const SHotIcon = styled.div`
    width: 5.9825em;
    height: 5.9825em;
    margin: 0;
    ${bgImg(hotImg, 'cover', 'no-repeat', '50% 50%')}
    position: absolute;
    top: -2em;
    left: -1.5em;
`

const SKYGameBG = styled.div<{ isMaintenance: boolean }>`
    width: 100%;
    height: 11em;
    position: relative;
    ${(props) =>
        props.isMaintenance
            ? bgImg(maintainingyBoxImg, 'contain', 'no-repeat', '50% 50%')
            : bgImg(kyBoxImg, 'contain', 'no-repeat', '50% 50%')}
`

const SButtonGroup = styled.div`
    width: 100%;
    height: 2.5em;
    padding: 6.25em 0;
    display: flex;
    justify-content: center;
    position: relative;
`

const RealButton = styled.div`
    width: 9em;
    height: 2.5em;
    margin: 0 0.5em;
`

const TrialButton = styled(RealButton)<{ isMaintenance: boolean }>`
    width: 6.25em;
    pointer-events: ${(props) => (props.isMaintenance ? 'none' : 'auto')};
    ${bgImg(trialButton, 'cover')};
`

const KYButton = styled(RealButton)<{ isMaintenance: boolean; isLoggedIn: boolean }>`
    ${bgImg(kyBtnImg, 'cover')}
    pointer-events: ${(props) => (props.isMaintenance ? 'none' : 'auto')};
`

const MaintenanceContainer = styled.div`
    width: 80%;
    height: 4em;
    margin: auto;
    position: relative;
    top: 5.25em;
`

export default () => {
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
                        data-qa={isKyMaintaining ? 'imgKyTitle ' : 'ctnrKyMaintenance'}>
                        {isKyMaintaining ? (
                            <MaintenanceContainer>
                                <Maintenance supplier={GameSuppliers.ky} />
                            </MaintenanceContainer>
                        ) : (
                            <SButtonGroup>
                                <KYButton
                                    isMaintenance={isKyMaintaining}
                                    isLoggedIn={isLoggedIn}
                                    onClick={() => onEnterClick(GameSuppliers.ky)}
                                    data-qa={isKyMaintaining ? 'btnKyStartMaintenance' : 'btnKyStart'}
                                />
                                {!isLoggedIn && (
                                    <TrialButton
                                        isMaintenance={isKyMaintaining}
                                        onClick={() => onTrialEnterClick(GameSuppliers.ky)}
                                        data-qa={isKyMaintaining ? 'btnKyTrialMaintenance' : 'btnKyTrial'}
                                    />
                                )}
                                <SHotIcon />
                            </SButtonGroup>
                        )}
                    </SKYGameBG>
                </SGameContainer>
            </SContent>
        </SContainer>
    )
}
