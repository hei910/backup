import { useCallback, useEffect, useState, forwardRef } from 'react'
import styled from 'styled-components/macro'

import BrandLogo from '@brand/assets/images/header/mobile/logo.svg'
import LoginIcon from '@brand/assets/images/header/mobile//login.svg'
import MenuIcon from '@brand/assets/images/header/mobile//menu.svg'
import CloseIcon from '@brand/assets/images/header/mobile//icon_close.png'
import useHeader from '@components/mobile/header/hook'
import Subheader from './subheader'

import defaultAvatar from '@images/header/mobile/Soccer_Messi.png'

interface IHeaderProps {
    isCenter?: boolean
    hideSubheader?: boolean
}

interface IStyledHeaderContainerProps {
    hide?: boolean
}

const StyledHeaderContainer = styled.div<IStyledHeaderContainerProps>`
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: ${(props) => props.theme.vars.headerZIndex};
    ${(props) => props.hide && 'transform: translateY(-108px);'}
    transition: transform .3s ease;
`

const StyledHeader = styled.div`
    display: flex;
    height: 52px;
    align-items: center;
    background-color: ${(props) => props.theme.vars.mobileHeaderBgColor};
    padding: 0 10px;
    color: #ffffff;
    font-size: 16px;
    position: relative;
`

const Center = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    position: absolute;
`

const Left = styled.div`
    display: flex;
    align-items: center;
    top: 0;
    bottom: 0;
    left: 10px;
    position: absolute;
`

const Logo = styled.img`
    height: 52px;
`

const Right = styled.div`
    display: flex;
    align-items: center;
    top: 0;
    bottom: 0;
    right: 8px;
    position: absolute;
`

const CloseButton = styled.div`
    width: 29px;
    height: 29px;
    background-image: url(${CloseIcon});
    background-size: contain;
    margin-left: 8px;
`

const RegisterButton = styled.div`
    width: 37px;
    height: 37px;
    background-image: url(${LoginIcon});
    background-size: contain;
    margin-left: 8px;
`

const MenuButton = styled.div`
    width: 37px;
    height: 37px;
    background-image: url(${MenuIcon});
    background-size: contain;
    margin-left: 8px;
`

const Avatar = styled.img`
    height: 45px;
    width: 45px;
    border-radius: 50%;
`

const MessageCount = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 4px;
    right: 0;
    height: 16px;
    width: 16px;
    font-size: 11px;
    background-color: #ff9200;
    border-radius: 50%;
    color: white;
`

const Header = forwardRef<HTMLDivElement, IHeaderProps>(({ isCenter, hideSubheader }, ref) => {
    const {
        isAppMaintenance,
        isLoggedIn,
        isLoginModalOpened,
        isRegisterModalOpened,
        userProfileIcon,
        unreadCountInMenu,
        directToHomePage,
        openMobileDrawer,
        onCloseClick,
        showLoginModal,
    } = useHeader()
    const [lastScrollY, setLastScrollY] = useState(0)
    const [hideHeader, setHideHeader] = useState(false)

    const onScroll = useCallback(
        (e: Event) => {
            const scrollY = (e.currentTarget as Window).scrollY
            if (scrollY > 200 && lastScrollY < scrollY) {
                setHideHeader(true)
            } else {
                setHideHeader(false)
            }
            setLastScrollY(scrollY)
        },
        [lastScrollY],
    )

    useEffect(() => {
        window.addEventListener('scroll', onScroll)
        return () => {
            window.removeEventListener('scroll', onScroll)
        }
    }, [onScroll])

    return (
        <StyledHeaderContainer hide={hideHeader} ref={ref}>
            <StyledHeader>
                {isCenter ? (
                    <Center>
                        <Logo src={BrandLogo} onClick={directToHomePage} />
                    </Center>
                ) : (
                    <Left>
                        <Logo src={BrandLogo} onClick={directToHomePage} />
                    </Left>
                )}
                {!isAppMaintenance && (
                    <Right>
                        {isLoggedIn ? (
                            <>
                                <Avatar
                                    src={
                                        userProfileIcon
                                            ? `${process.env.CDN_DOMAIN || ''}/${userProfileIcon}`
                                            : defaultAvatar
                                    }
                                    onClick={openMobileDrawer}
                                />
                                {unreadCountInMenu > 0 && <MessageCount>{unreadCountInMenu}</MessageCount>}
                            </>
                        ) : (
                            <>
                                {isLoginModalOpened || isRegisterModalOpened ? (
                                    <CloseButton onClick={onCloseClick} />
                                ) : (
                                    <RegisterButton onClick={showLoginModal} />
                                )}
                                <MenuButton onClick={openMobileDrawer} />
                            </>
                        )}
                    </Right>
                )}
            </StyledHeader>
            {!hideSubheader && <Subheader />}
        </StyledHeaderContainer>
    )
})

export default Header
