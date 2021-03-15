import React, { useCallback } from 'react'
import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'
import bg from '@brand/assets/images/downloadApp/desktop/bg.jpg'
import qrBg from '@brand/assets/images/downloadApp/desktop/qr_bg.png'
import brandIcon from '@brand/assets/images/downloadApp/desktop/brand_icon.svg'
import CustomerServiceIcon from '@brand/assets/images/downloadApp/desktop/cs_icon.svg'
import header from '@brand/assets/images/downloadApp/desktop/title.png'
import ios from '@brand/assets/images/downloadApp/desktop/icon_apple.png'
import android from '@brand/assets/images/downloadApp/desktop/icon_android.png'
import logo from '@brand/assets/images/downloadApp/desktop/icon.png'
import QRCode from '@components/common/qrCode'
import useDownloadApp from '@pages/downloadApp/desktop/hook'
import bgImg from '@mixins/backgroundImg'
import { useSelector } from '@redux'

const STopBar = styled.div`
    height: 56px;
    background-color: #ffffff;
    box-shadow: 2px 2px 6px 0 rgba(255, 132, 12, 0.1);
`

const STopContentContainer = styled.div`
    height: 100%;
    width: 1200px;
    margin: 0 auto;
    display: flex;
`

const BrandIcon = styled.div`
    ${bgImg(brandIcon, 'cover', 'no-repeat')};
    width: 206px;
    height: 56px;
`

const SButton = styled.div`
    ${(props) => props.theme.typography.Body3}
    color: #ff840c;
    width: 125px;
    height: 39px;
    border-radius: 20px;
    background-color: #ffe8d2;
    margin: auto 0 auto auto;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`

const CsIcon = styled.div`
    ${bgImg(CustomerServiceIcon, 'cover', 'no-repeat')};
    width: 25px;
    height: 25px;
    margin-right: 4px;
`

const SMainContainer = styled.div`
    ${bgImg(bg, 'cover', 'no-repeat')};
    position: relative;
    height: calc(100% - 58px);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 442px;
    min-width: 1280px;
    transform: translateY(2px);
`

const PositionedContainer = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    left: calc(45% - 560px);
    top: 0;
    bottom: 0;
`

const SHeader = styled.div`
    ${bgImg(header, 'cover', 'no-repeat')};
    margin: 0 auto;
    width: 45vw;
    height: 6.62vw;
    max-width: 745px;
    min-width: 575px;
    max-height: 110px;
    min-height: 85px;
`
const SDescription = styled.div`
    ${(props) => props.theme.typography.H3Headline}
    text-align: right;
    text-shadow: 0px 2px 3px #440606;
    letter-spacing: 0.3px;
    color: #ffffff;
    display: flex;
    flex-wrap: nowrap;
`

const SDescriptionText = styled.div`
    width: 580px;
    text-indent: 110px;
`

const SIcon = styled.div`
    ${bgImg(logo, 'contain', 'no-repeat')};
    width: 20vh;
    height: 20vh;
    max-width: 170px;
    min-width: 125px;
    max-height: 170px;
    min-height: 125px;
`

const FlexContainer = styled.div`
    display: flex;
    justify-content: center;
    @media (min-height: 600px) {
        transform-origin: top right;
        transform: scale(1.15);
    }
`

const SDeviceContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: 16px;
    height: 200px;
`

const SSingleDeviceContainer = styled.div`
    height: 92px;
    width: 265px;
    border-radius: 15px;
    background-color: '#ffffff';
`
const SDeviceTop = styled.div`
    background-color: #ffffff;
    height: 54px;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    color: #ff840c;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`

const SDeviceLogo = styled.div<{ type: string }>`
    ${(props) => bgImg(props.type === 'ios' ? ios : android, 'cover')}
    width: 30px;
    height: 34px;
`
const SDeviceTitle = styled.div`
    ${(props) => props.theme.typography.H4Headline}
    font-weight: bold;
    margin-left: 16px;
`

const SDeviceBottom = styled.div`
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
    height: 38px;
    background-color: #f0f0f0;
    color: #555555;
    box-shadow: #c1b3b3 0px 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateY(-1px);
`
const SDeviceBottomText = styled.div`
    ${(props) => props.theme.typography.Body2}
    text-align: center;
    padding-top: 5px;
`

const SQRCodeContainer = styled.div`
    ${bgImg(qrBg, 'contain', 'no-repeat')};
    height: 200px;
    width: 200px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const DownloadApp = () => {
    const t = useTranslation()
    const csLink = useSelector((state) => state.app.brandInfo.csLink)
    const { qrCodeUrl, iosAppVersion, androidAppVersion } = useDownloadApp()

    const onCsLinkClick = useCallback(() => {
        window.open(csLink)
    }, [csLink])

    return (
        <>
            <STopBar>
                <STopContentContainer>
                    <BrandIcon data-qa="imgHeaderLogo" />
                    <SButton data-qa="btnHeaderCs" onClick={onCsLinkClick}>
                        <CsIcon />
                        {t('general.home.contactCs')}
                    </SButton>
                </STopContentContainer>
            </STopBar>
            <SMainContainer>
                <PositionedContainer>
                    <div>
                        <SHeader data-qa="imgTitle" />
                        <SDescription>
                            <SDescriptionText data-qa="txtDesc">{t('downloadapp.description')}</SDescriptionText>
                            <SIcon data-qa="imgBrandLogo" />
                        </SDescription>
                        <FlexContainer>
                            <SDeviceContainer>
                                <SSingleDeviceContainer data-qa="btniOSDownload">
                                    <SDeviceTop>
                                        <SDeviceLogo type="ios" />
                                        <SDeviceTitle>{t('downloadapp.iosHeader')}</SDeviceTitle>
                                    </SDeviceTop>
                                    <SDeviceBottom>
                                        <SDeviceBottomText data-qa="txtSupportVerIOS">
                                            {t('downloadapp.appPlatform.ios.description.span1')} :{' '}
                                            {t('downloadapp.appPlatform.ios.description.span2', {
                                                appVersion: iosAppVersion,
                                            })}
                                        </SDeviceBottomText>
                                    </SDeviceBottom>
                                </SSingleDeviceContainer>
                                <SSingleDeviceContainer data-qa="btnAndroidDownload">
                                    <SDeviceTop>
                                        <SDeviceLogo type="android" />
                                        <SDeviceTitle>{t('downloadapp.androidHeader')}</SDeviceTitle>
                                    </SDeviceTop>
                                    <SDeviceBottom>
                                        <SDeviceBottomText data-qa="txtSupportVerAn">
                                            {t('downloadapp.appPlatform.android.description.span1')} :{' '}
                                            {t('downloadapp.appPlatform.android.description.span2', {
                                                appVersion: androidAppVersion,
                                            })}
                                        </SDeviceBottomText>
                                    </SDeviceBottom>
                                </SSingleDeviceContainer>
                            </SDeviceContainer>
                            <SQRCodeContainer>
                                <QRCode url={qrCodeUrl} size={180} includeMargin={false} />
                            </SQRCodeContainer>
                        </FlexContainer>
                    </div>
                </PositionedContainer>
            </SMainContainer>
        </>
    )
}

export default DownloadApp
