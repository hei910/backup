import useTranslation from '@hooks/useTranslation'
import { forwardRef } from 'react'
import styled from 'styled-components/macro'
import CustomerServiceIcon from '@brand/assets/images/header/mobile/cs-icon.svg'
import BrandLogo from '@brand/assets/images/header/mobile/logo.svg'
import hamburgerIcon from '@brand/assets/images/header/mobile/icon-hamburger.svg'
import closeIcon from '@brand/assets/images/header/mobile/icon_x.png'
import DownloadAppAlert from '@brand/components/mobile/downloadAppAlert'
import useHeader from '@components/mobile/header/hook'
import bgImg from '@mixins/backgroundImg'
import { directToDownloadApp, directToContactCs } from '@utils/v1Functions'

import colors from '@styles/colors'

const StyledHeader = styled.div`
    display: flex;
    height: 44px;
    justify-content: space-between;
    align-items: center;
    padding: 0 14px;
    background-color: white;
    position: relative;
    z-index: ${(props) => props.theme.vars.mobileHeaderZIndex};
`

const Logo = styled.img`
    width: 120px;
    height: 52px;
`
const ButtonsGp = styled.div`
    display: flex;
    align-items: center;
`

const Button = styled.div`
    ${(props) => props.theme.typography.Body5}
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    width: 62px;
    height: 24px;
    border-radius: 14px;
    margin-left: 8px;
    background: ${colors.component.common.button.primary.normalBg};

    :first-child {
        margin-left: 0;
    }
`

const CsButton = styled.div`
    ${(props) => props.theme.typography.Body5}
    color: #ff840c;
    width: 97px;
    height: 28px;
    border-radius: 14px;
    background-color: #ffe8d2;
    margin: auto 0 auto auto;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`

const CsIcon = styled.div`
    ${bgImg(CustomerServiceIcon, 'cover', 'no-repeat')};
    width: 20px;
    height: 20px;
    margin-right: 4px;
`

const CloseButton = styled.div`
    ${bgImg(closeIcon, 'contain')}
    width: 24px;
    height: 24px;
    margin-right: 8px;
`

const Hamburger = styled.div`
    ${bgImg(hamburgerIcon, 'contain')}
    width: 25px;
    height: 25px;
    margin-left: 8px;
`

const Header = forwardRef<HTMLDivElement>((_, ref) => {
    const { isAppMaintenance, isLoggedIn, isLoginModalOpened, isRegisterModalOpened, showLoginModal, showRegisterModal, onCloseClick, directToHomePage, openMobileDrawer } = useHeader()
    const t = useTranslation()

    return (
        <div ref={ref}>
            <DownloadAppAlert onInstallClick={directToDownloadApp} />
            <StyledHeader>
                <Logo src={BrandLogo} onClick={directToHomePage} data-qa={'btnHeaderLogo'} />
                <ButtonsGp>
                    {!isAppMaintenance ? (
                        isLoggedIn ? (
                            <Hamburger onClick={openMobileDrawer} data-qa='btnSideMenu' />
                        ) : (
                            <ButtonsGp>
                                {isLoginModalOpened || isRegisterModalOpened ? (
                                    <CloseButton onClick={onCloseClick} data-qa='btnHeaderClose' />
                                ) : (
                                    <>
                                        <Button data-qa='btnHeaderLogin' onClick={showLoginModal}>
                                            登录
                                        </Button>
                                        <Button data-qa='btnHeaderRegister' onClick={showRegisterModal}>
                                            注册
                                        </Button>
                                    </>
                                )}
                            </ButtonsGp>
                        )
                    ) : (
                        <CsButton data-qa='btnContactCs' onClick={directToContactCs}>
                            <CsIcon />
                            {t('general.home.contactCs')}
                        </CsButton>
                    )}
                </ButtonsGp>
            </StyledHeader>
        </div>
    )
})

export default Header
