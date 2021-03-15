import { forwardRef } from 'react'
import styled from 'styled-components/macro'

import BrandLogo from '@brand/assets/images/header/mobile/logo.svg'
import hamburgerIcon from '@brand/assets/images/header/mobile/icon-hamburger.svg'
import closeIcon from '@brand/assets/images/header/mobile//icon_close.png'
import DownloadAppAlert from '@brand/components/mobile/downloadAppAlert'
import useHeader from '@components/mobile/header/hook'
import bgImg from '@mixins/backgroundImg'
import { useLocation } from 'react-router-dom'
import Pages from '@pages'
import defaultAvatar from '@images/header/mobile/Soccer_Messi.png'
import { directToDownloadApp } from '@utils/v1Functions'

const StyledHeader = styled.div`
    display: flex;
    height: 44px;
    justify-content: space-between;
    align-items: center;
    padding: 0 14px;
    background-color: #0c186c;
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
    color: #0c186c;
    width: 62px;
    height: 24px;
    border-radius: 14px;
    margin-left: 8px;
    background: #ffffff;

    :first-child {
        margin-left: 0;
    }
`

const CloseButton = styled.div`
    ${bgImg(closeIcon, 'contain')}
    width: 29px;
    height: 29px;
    margin-right: 8px;
`

const Hamburger = styled.div`
    ${bgImg(hamburgerIcon, 'contain')}
    width: 18px;
    height: 20px;
    margin-left: 8px;
`

const AvatarContainer = styled.div`
    position: relative;
`

const Avatar = styled.img`
    height: 36px;
    width: 36px;
    border-radius: 50%;
`

const MessageCount = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 1px;
    right: -1px;
    height: 16px;
    width: 16px;
    font-size: 11px;
    background-color: #ff6b6b;
    border-radius: 50%;
    color: #ffffff;
`

const Header = forwardRef<HTMLDivElement>((_, ref) => {
    const {
        isAppMaintenance,
        isLoggedIn,
        isLoginModalOpened,
        isRegisterModalOpened,
        showLoginModal,
        showRegisterModal,
        onCloseClick,
        directToHomePage,
        openMobileDrawer,
        userProfileIcon,
        unreadCountInMenu,
    } = useHeader()
    const location = useLocation()

    return (
        <div ref={ref}>
            <DownloadAppAlert onInstallClick={directToDownloadApp} />
            <StyledHeader>
                <Logo src={BrandLogo} onClick={directToHomePage} />
                <ButtonsGp>
                    {!isAppMaintenance &&
                        (isLoggedIn ? (
                            location.pathname === Pages.home.path ? (
                                <Hamburger onClick={openMobileDrawer} />
                            ) : (
                                <AvatarContainer>
                                    <Avatar
                                        src={
                                            userProfileIcon
                                                ? `${process.env.CDN_DOMAIN || ''}/${userProfileIcon}`
                                                : defaultAvatar
                                        }
                                        onClick={openMobileDrawer}
                                    />
                                    {unreadCountInMenu > 0 && <MessageCount>{unreadCountInMenu}</MessageCount>}
                                </AvatarContainer>
                            )
                        ) : (
                            <ButtonsGp>
                                {isLoginModalOpened || isRegisterModalOpened ? (
                                    <CloseButton onClick={onCloseClick} />
                                ) : (
                                    <>
                                        <Button onClick={showLoginModal}>登录</Button>
                                        <Button onClick={showRegisterModal}>注册</Button>
                                    </>
                                )}
                            </ButtonsGp>
                        ))}
                </ButtonsGp>
            </StyledHeader>
        </div>
    )
})

export default Header
