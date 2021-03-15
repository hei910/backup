import PageContainer, { FullWidthContainer } from '@components/mobile/pageContainer'
import styled from 'styled-components/macro'

import iosMainImage from '@brand/assets/images/downloadApp/mobile/main-ios.jpg'
import androidMainImage from '@brand/assets/images/downloadApp/mobile/main-an.jpg'
import iosLogo from '@brand/assets/images/downloadApp/mobile/logo-ios.svg'
import androidLogo from '@brand/assets/images/downloadApp/mobile/logo-an.svg'
import AppLogo from '@brand/assets/images/downloadApp/mobile/app-logo.svg'
import Icon1 from '@brand/assets/images/downloadApp/mobile/icon-1.svg'
import Icon2 from '@brand/assets/images/downloadApp/mobile/icon-2.svg'
import Icon3 from '@brand/assets/images/downloadApp/mobile/icon-3.svg'
import Icon4 from '@brand/assets/images/downloadApp/mobile/icon-4.svg'
import useDownloadApp from '@pages/downloadApp/mobile/hook'
import useTranslation from '@hooks/useTranslation'
import { showRegister } from '@utils/v1Functions'

const Section1 = styled(FullWidthContainer)`
    background: ${(props) => props.theme.colors.page.mobile.downloadApp.topBgColor};
    padding: 0 20px;
`

const TopContainer = styled.div`
    position: relative;
    max-width: 470px;
    width: 100%;
    margin: 0 auto;
`

const OsContainer = styled.div`
    position: absolute;
    top: 25.6px;
`

const OsIcon = styled.img`
    height: 55.2px;
    margin-bottom: 20px;
`

const OsMessage = styled.div`
    color: ${(props) => props.theme.colors.page.mobile.downloadApp.osColor};
    line-height: 1.5em;
`

const BackgroundImg = styled.img`
    width: 100%;
    padding: 0 20px;
`

const Card = styled.div`
    margin-top: -90px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16);
    background-color: ${(props) => props.theme.colors.page.mobile.downloadApp.cardBgColor};
    position: relative;
`

const InfoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: start;
    padding: 20px;
`

const LogoImg = styled.img`
    width: 70px;
    height: 70px;
    border-radius: 10px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16);
`

const InfoContent = styled.div`
    margin-left: 20px;
`

const InfoTitle = styled.div`
    margin-bottom: 8px;
    font-size: 24px;
    line-height: 1;
    letter-spacing: 1.9px;
    color: ${(props) => props.theme.colors.page.mobile.downloadApp.titleColor};
`

const InfoMessage = styled.div`
    font-size: 16px;
    line-height: 1.5;
    letter-spacing: 1.6px;
    color: ${(props) => props.theme.colors.page.mobile.downloadApp.infoColor};
    white-space: pre-line;
`

const SupportMessageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    :before,
    :after {
        content: '';
        flex: 1 0 auto;
        height: 1px;
        margin: 0 8px;
        background: ${(props) => props.theme.colors.page.mobile.downloadApp.hrColor};
    }
`

const SupportMessage = styled.div`
    font-size: 11px;
    color: ${(props) => props.theme.colors.page.mobile.downloadApp.supportColor};
    background-color: ${(props) => props.theme.colors.page.mobile.downloadApp.supportBgColor};
    border-radius: 32px;
    padding: 5.5px 20.5px;
`

const GameContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 0;
`

const GameItem = styled.div`
    width: 25%;
    text-align: center;
`

const GameIcon = styled.img`
    width: 27px;
    height: 27px;
    margin-bottom: 8px;
`

const GameText = styled.div`
    color: ${(props) => props.theme.colors.page.mobile.downloadApp.gameColor};
    font-size: 12px;
`

const BottomContainer = styled.div`
    padding: 16px 0;
    text-align: center;
`

const PromoMessage = styled.div`
    font-size: 14px;
    line-height: 1.43;
    color: ${(props) => props.theme.colors.page.mobile.downloadApp.promoColor};
    margin-bottom: 24px;
`

const RegisterLink = styled.span`
    padding: 0 4px;
    color: ${(props) => props.theme.colors.page.mobile.downloadApp.linkColor};
`

const CustomButton = styled.a`
    width: 200px;
    margin: 8px auto;
    padding: 16.5px 48px;
    border-radius: 25px;
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.1);
    background-color: ${(props) => props.theme.colors.page.mobile.downloadApp.btnBgColor};
    font-size: 20px;
    font-weight: bold;
    color: ${(props) => props.theme.colors.page.mobile.downloadApp.btnColor};
    display: block;
`

const StyledPageContainer = styled(PageContainer)`
    background-color: ${(props) => props.theme.colors.page.mobile.downloadApp.bgColor};
`

const DownloadAppPage = () => {
    const t = useTranslation()
    const { brandName, isIos, appVersion, showRegisterModal, onDownloadClick, onHowClick, status } = useDownloadApp()

    return (
        <StyledPageContainer>
            <Section1>
                <TopContainer>
                    <OsContainer>
                        <OsIcon src={isIos() ? iosLogo : androidLogo} />
                        <div data-qa="txtSupportVer">
                            <OsMessage>
                                {isIos() ? t('downloadApp.ios.message1') : t('downloadApp.android.message1')}
                            </OsMessage>
                            <OsMessage>
                                {isIos()
                                    ? t('downloadApp.ios.message2', { appVersion })
                                    : t('downloadApp.android.message2', { appVersion })}
                            </OsMessage>
                        </div>
                    </OsContainer>
                    <BackgroundImg src={isIos() ? iosMainImage : androidMainImage} />
                </TopContainer>
            </Section1>

            <TopContainer>
                <Card>
                    <InfoContainer>
                        <LogoImg src={AppLogo} />
                        <InfoContent>
                            <InfoTitle>
                                {isIos()
                                    ? status === 'available' || status === 'comingSoon'
                                        ? t('downloadApp.ios.member.title')
                                        : t('downloadApp.ios.guest.title')
                                    : t('downloadApp.android.title')}
                            </InfoTitle>
                            <InfoMessage>
                                {isIos()
                                    ? status === 'available' || status === 'comingSoon'
                                        ? t('downloadApp.ios.member.info', { brandName })
                                        : t('downloadApp.ios.guest.info', { brandName })
                                    : t('downloadApp.android.info', { brandName })}
                            </InfoMessage>
                        </InfoContent>
                    </InfoContainer>
                    <SupportMessageContainer>
                        <SupportMessage>{t('downloadApp.support')}</SupportMessage>
                    </SupportMessageContainer>
                    <GameContainer>
                        <GameItem>
                            <GameIcon src={Icon1} />
                            <GameText>{t('downloadApp.gameList.sport')}</GameText>
                        </GameItem>
                        <GameItem>
                            <GameIcon src={Icon2} />
                            <GameText>{t('downloadApp.gameList.slotMachine')}</GameText>
                        </GameItem>
                        <GameItem>
                            <GameIcon src={Icon3} />
                            <GameText>{t('downloadApp.gameList.liveCasino')}</GameText>
                        </GameItem>
                        <GameItem>
                            <GameIcon src={Icon4} />
                            <GameText>{t('downloadApp.gameList.lottery')}</GameText>
                        </GameItem>
                    </GameContainer>
                </Card>
            </TopContainer>

            <BottomContainer>
                <PromoMessage>
                    {isIos() && status === 'available' && t('downloadApp.ios.member.promo', { brandName })}
                    {isIos() && status === 'needLogin' && (
                        <>
                            {t('downloadApp.ios.guest.promo1')}
                            <RegisterLink data-qa="btnAppRegister1" onClick={showRegister}>
                                {t('downloadApp.ios.guest.promo2')}
                            </RegisterLink>
                            {t('downloadApp.ios.guest.promo3', { brandName })}
                        </>
                    )}
                    {!isIos() && t('downloadApp.android.promo', { brandName })}
                </PromoMessage>
                {status === 'needLogin' && (
                    <CustomButton data-qa="btnAppRegister2" onClick={showRegisterModal}>
                        {t('downloadApp.register')}
                    </CustomButton>
                )}
                {status === 'available' && (
                    <CustomButton data-qa="btnDownload" onClick={onDownloadClick}>
                        {t('downloadApp.download')}
                    </CustomButton>
                )}
                {status === 'comingSoon' && <CustomButton>{t('downloadApp.comingSoon')}</CustomButton>}
                {status === 'available' && isIos() && (
                    <CustomButton data-qa="btnDownloadTutorial" onClick={onHowClick}>
                        {t('downloadApp.how')}
                    </CustomButton>
                )}
            </BottomContainer>
        </StyledPageContainer>
    )
}

export default DownloadAppPage
