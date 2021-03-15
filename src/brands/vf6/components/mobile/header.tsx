import { forwardRef, useCallback, useState } from 'react'
import styled from 'styled-components/macro'

import DownloadAppModal from './downloadAppModal'

import BrandLogo from '@brand/assets/images/header/mobile/logo.svg'
import closeIcon from '@brand/assets/images/header/mobile/icon_close.png'

import useHeader from '@components/mobile/header/hook'
import defaultAvatar from '@images/header/mobile/Soccer_Messi.png'
import DownloadAppAlert from '@brand/components/mobile/downloadAppAlert'

import bgImg from '@mixins/backgroundImg'
import { isIos } from '@utils/userAgent'
import { locationTo } from '@utils/v1Functions'
import { useDispatch, useSelector } from '@redux'
import { addDownloadCount } from '@services/download/api'
import { setDisplayAppComingSoonModal } from '@services/modal/action'

const StyledHeader = styled.div`
    display: flex;
    height: 44px;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    background-color: #ffffff;
    position: relative;
`

const Logo = styled.img`
    width: 120px;
    height: 52px;
`
const ButtonsGp = styled.div`
    display: flex;
`

const Button = styled.div`
    ${(props) => props.theme.typography.Body5}
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    width: 74px;
    height: 28px;
    border-radius: 14px;
    margin: 0 0 0 8px;
    background: #3d7eeb;
`

const Right = styled.div`
    display: flex;
    position: relative;
    align-items: center;
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
    top: 2px;
    right: 0;
    height: 16px;
    width: 16px;
    font-size: 11px;
    background-color: #3d7eeb;
    border-radius: 50%;
    color: #ffffff;
`

const CloseButton = styled.div`
    ${bgImg(closeIcon, 'contain')}
    width: 29px;
    height: 29px;
    margin-right: 8px;
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

    const dispatch = useDispatch()
    const { clickRateBrandCode } = useSelector((state) => state.app.brandInfo)
    const { link, status } = useSelector((state) => state.download.android)
    const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false)

    const onInstallClick = useCallback(() => {
        if (isIos()) {
            setIsDownloadModalOpen(true)
        } else {
            if (status === 'comingSoon') {
                dispatch(setDisplayAppComingSoonModal(true))
            } else {
                locationTo(link)
                addDownloadCount(clickRateBrandCode, link, false)
            }
        }
    }, [status, dispatch, link, clickRateBrandCode])

    return (
        <div ref={ref}>
            <DownloadAppAlert onInstallClick={onInstallClick} />
            <StyledHeader>
                <Logo src={BrandLogo} onClick={directToHomePage} data-qa="btnHeaderLogo" />
                {!isAppMaintenance &&
                    (isLoggedIn ? (
                        <Right>
                            <Avatar
                                src={
                                    userProfileIcon
                                        ? `${process.env.CDN_DOMAIN || ''}/${userProfileIcon}`
                                        : defaultAvatar
                                }
                                onClick={openMobileDrawer}
                            />
                            {unreadCountInMenu > 0 && <MessageCount>{unreadCountInMenu}</MessageCount>}
                        </Right>
                    ) : (
                        <ButtonsGp>
                            {isLoginModalOpened || isRegisterModalOpened ? (
                                <CloseButton onClick={onCloseClick} data-qa="btnHeaderClose" />
                            ) : (
                                <>
                                    <Button onClick={showLoginModal} data-qa="btnHeaderLogin">
                                        登录
                                    </Button>
                                    <Button onClick={showRegisterModal} data-qa="btnHeaderRegister">
                                        注册
                                    </Button>
                                </>
                            )}
                        </ButtonsGp>
                    ))}
            </StyledHeader>
            <DownloadAppModal isOpen={isDownloadModalOpen} closeModal={() => setIsDownloadModalOpen(false)} />
        </div>
    )
})

export default Header
