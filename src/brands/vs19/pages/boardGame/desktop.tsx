import styled from 'styled-components/macro'
import backgroundImg from '@brand/assets/images/boardGame/desktop/bg.jpg'
import titleImg from '@brand/assets/images/boardGame/desktop/title.png'
import kyBoxImg from '@brand/assets/images/boardGame/desktop/ky-box.png'
import maintainingyBoxImg from '@brand/assets/images/boardGame/desktop/ky-box-maintenance.png'
import kyBtnImg from '@brand/assets/images/boardGame/desktop/button-ky-on.png'
import hoverKyBtnImg from '@brand/assets/images/boardGame/desktop/button-ky-hover.png'
import trialButton from '@brand/assets/images/boardGame/desktop/try-button-on.png'
import hoverTrialButton from '@brand/assets/images/boardGame/desktop/try-button-hover.png'
import maintainingTrialButton from '@brand/assets/images/boardGame/desktop/try-button-maintenance.png'
import maintainingButton from '@brand/assets/images/boardGame/desktop/button-ky-maintenance.png'
import hotImg from '@brand/assets/images/boardGame/desktop/hot.png'
import { useSelector } from '@redux'
import useCopyRight from '@hooks/useCopyRight'
import bgImg from '@styles/mixins/backgroundImg'
import GameSuppliers from '@constants/gameSuppliers'
import useLiveCasino from '@pages/boardGame/hook'

import Maintenance from './components/maintenance'

const SContainer = styled.div`
    ${bgImg(backgroundImg, 'cover', 'no-repeat', '50% 50%')}
    width: 100%;
    min-height: 100vh;
    height: auto;
    padding: 0.75em 0;
    position: relative;
    font-size: 1.125vh;
`

const SContent = styled.div`
    width: 90%;
    margin: 0 auto;
`

const STitle = styled.div`
    ${bgImg(titleImg, 'auto 100%')}
    width: 52.5em;
    height: 25em;
    margin: 0 auto;

    @media (max-width: ${(props) => props.theme.sizes.desktopS}) {
        width: 39.375em;
        height: 18.755em;
    }

    @media (max-width: ${(props) => props.theme.sizes.laptopL}) {
        width: 340px;
        height: 165px;
    }
`

const SGameContainer = styled.div`
    width: auto;
    height: auto;
    margin: 1.5em auto;
    position: relative;
`

const SHotIcon = styled.div`
    width: 15em;
    height: 15em;
    margin: 0 auto 0 -6em;
    ${bgImg(hotImg, 'cover', 'no-repeat', '50% 50%')}
    position: relative;
    top: 0;

    @media (max-width: ${(props) => props.theme.sizes.desktopS}) {
        width: 15em;
        height: 15em;
    }

    @media (max-width: ${(props) => props.theme.sizes.laptopL}) {
        width: 90px;
        height: 90px;
        margin: 0 auto 0 -45px;
    }
`

const SKYGameBG = styled.div<{ isMaintenance: boolean }>`
    width: 75em;
    height: 47.5em;
    margin: 0 auto;
    ${(props) =>
        props.isMaintenance
            ? bgImg(maintainingyBoxImg, 'cover', 'no-repeat', '50% 50%')
            : bgImg(kyBoxImg, 'cover', 'no-repeat', '50% 50%')};

    @media (max-width: ${(props) => props.theme.sizes.desktopS}) {
        width: 56.25em;
        height: 35.625em;
    }

    @media (max-width: ${(props) => props.theme.sizes.laptopL}) {
        width: 337.5px;
        height: 213.75px;
    }
`

const SButtonGroup = styled.div`
    width: 100%;
    height: 8em;
    margin: 20em auto 0 auto;
    position: relative;
    bottom: 0.75em;
    display: flex;
    justify-content: center;

    @media (max-width: ${(props) => props.theme.sizes.desktopS}) {
        margin: 10em auto 0 auto;
    }

    @media (max-width: ${(props) => props.theme.sizes.laptopL}) {
        width: 95%;
        height: 47.5px;
        margin: 55px auto 0 auto;
    }
`

const RealButton = styled.div`
    width: 29em;
    height: 100%;
    margin: 0 0.5em;
    cursor: pointer;
`

const TrialButton = styled(RealButton)<{ isMaintenance: boolean }>`
    width: 20em;
    pointer-events: ${(props) => (props.isMaintenance ? 'none' : 'auto')};
    ${(props) => (props.isMaintenance ? bgImg(maintainingTrialButton, 'cover') : bgImg(trialButton, 'cover'))};

    :hover {
        ${bgImg(hoverTrialButton, 'cover')}
    }
`

const KYButton = styled(RealButton)<{ isMaintenance: boolean; isLoggedIn: boolean }>`
    ${(props) => (props.isMaintenance ? bgImg(maintainingButton, 'cover') : bgImg(kyBtnImg, 'cover'))}
    pointer-events: ${(props) => (props.isMaintenance ? 'none' : 'auto')};

    :hover {
        ${bgImg(hoverKyBtnImg, 'cover')}
    }
`

const MaintenanceContainer = styled.div`
    width: 60em;
    height: 11.5em;
    margin: 0 auto;
    position: relative;
    top: 31em;

    @media (max-width: ${(props) => props.theme.sizes.desktopS}) {
        width: 45em;
        height: 8.25em;
        top: 23.25em;
    }

    @media (max-width: ${(props) => props.theme.sizes.laptopL}) {
        width: 270px;
        height: 49.5px;
        top: 140px;
    }
`

const SCopyRight = styled.div`
    width: 100%;
    height: 2em;
    padding: 0.25em;
    background-color: #1a1a1a;
    font-size: 2em;
    text-align: center;
    color: #999999;
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
                        data-qa={isKyMaintaining ? 'imgKyBanner ' : 'ctnrKyMaintenance'}>
                        {!isKyMaintaining && <SHotIcon />}
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
                            </SButtonGroup>
                        )}
                    </SKYGameBG>
                </SGameContainer>
            </SContent>
            <SCopyRight>{copyRight}</SCopyRight>
        </SContainer>
    )
}
