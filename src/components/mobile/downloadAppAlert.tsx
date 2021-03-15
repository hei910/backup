import { useState, useEffect } from 'react'
import { useSelector } from '@redux'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'
import closeIcon from '@brand/assets/images/downloadAppAlert/close.png'
import logo from '@brand/assets/images/downloadAppAlert/logo.png'
import { appWindow } from '@utils/v1Functions'
import { isWebView } from '@utils/userAgent'
import useTranslation from '@hooks/useTranslation'
import { getCookie, setCookie } from '@utils/cookie'

import bgImg from '@mixins/backgroundImg'

interface IDownloadAppAlertProps {
    onInstallClick: () => void
}

const FlexContainer = styled.div`
    display: flex;
    align-items: center;
`

const Container = styled(FlexContainer)<{ isShow: boolean }>`
    justify-content: space-between;
    padding: 0 14px;
    height: ${(props) => (props.isShow ? '44px' : '0')};
    transition-duration: 0.3s;
    background-color: ${(props) => props.theme.colors.component.mobile.downloadAppAlert.bgColor};
`

const InstallBtn = styled(FlexContainer)`
    ${(props) => props.theme.typography.Body4}
    justify-content: center;
    width: 70px;
    height: 30px;
    border-radius: 15px;
    background: ${(props) => props.theme.colors.component.mobile.downloadAppAlert.installBtnColor};
    color: #ffffff;
`

const CloseBtn = styled.div`
    ${bgImg(closeIcon)}
    width: 16px;
    height: 16px;
    margin-right: 14px;
`

const Logo = styled.div`
    ${bgImg(logo)}
    width: 26px;
    height: 26px;
    margin-right: 14px;
`

const Title = styled.div`
    font-size: 14px;
    line-height: 1.38;
    font-weight: bold;
    color: ${(props) => props.theme.colors.component.mobile.downloadAppAlert.titleColor};
`

const SubTitle = styled.div`
    font-size: 11px;
    line-height: 1.45;
    font-weight: 600;
    color: ${(props) => props.theme.colors.component.mobile.downloadAppAlert.color};
`

const DownloadAppAlert: React.FC<IDownloadAppAlertProps> = ({ onInstallClick }) => {
    const [isShow, setIsShow] = useState(false)
    const t = useTranslation()
    const brandName = useSelector((state) => state.app.brandInfo.brandName)
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
    const location = useLocation()

    const onClose = () => {
        setIsShow(false)
    }

    useEffect(() => {
        if (isLoggedIn) {
            if (location.pathname === '/') {
                const v1DownloadAppAlert = appWindow.parent.document.querySelector('.download-app-alert-wrapper')
                if (v1DownloadAppAlert) {
                    v1DownloadAppAlert.style.display = 'none'
                }
                if (!isWebView() && !getCookie('mobileAppDialog')) {
                    setIsShow(true)
                    setCookie('mobileAppDialog', 'true')
                }
            } else {
                setIsShow(false)
            }
        }
    }, [isLoggedIn, location])

    return (
        <Container data-qa='alertDownloadApp' isShow={isShow}>
            <FlexContainer>
                <CloseBtn onClick={onClose} data-qa='btnCloseDownloadApp' />
                <Logo data-qa='imgDownloadAppLogo' />
                <div>
                    <Title data-qa='txtDownloadAppTitle'>{t('general.components.downloadAppAlert.title', { brandName })}</Title>
                    <SubTitle data-qa='txtDownloadAppSubtitle'>{t('general.components.downloadAppAlert.subTitle')}</SubTitle>
                </div>
            </FlexContainer>
            <InstallBtn data-qa='btnDownloadApp' onClick={onInstallClick}>
                {t('general.components.downloadAppAlert.install')}
            </InstallBtn>
        </Container>
    )
}

export default DownloadAppAlert
