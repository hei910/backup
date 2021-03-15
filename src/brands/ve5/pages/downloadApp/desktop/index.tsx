import styled from 'styled-components/macro'
import QrCode from '@components/common/qrCode'
import useTranslation from '@hooks/useTranslation'
import useDownloadApp from '@pages/downloadApp/desktop/hook'
import Footer from '@brand/components/desktop/footer'

import logo_1 from '@brand/assets/images/footer/desktop/logo_01_01.png'
import logo_2 from '@brand/assets/images/footer/desktop/logo_01_02.png'
import logo_3 from '@brand/assets/images/footer/desktop/logo_01_03.png'
import logo_4 from '@brand/assets/images/footer/desktop/logo_01_04.png'
import logo_5 from '@brand/assets/images/footer/desktop/logo_01_05.png'
import logo_6 from '@brand/assets/images/footer/desktop/logo_01_06.png'
import logo_7 from '@brand/assets/images/footer/desktop/logo_01_07.png'
import logo_8 from '@brand/assets/images/footer/desktop/logo_01_08.png'
import logo_9 from '@brand/assets/images/footer/desktop/logo_01_09.png'

import logo1 from '@brand/assets/images/footer/desktop/logo_02_01.png'
import logo2 from '@brand/assets/images/footer/desktop/logo_02_02.png'
import logo3 from '@brand/assets/images/footer/desktop/logo_02_03.png'
import logo4 from '@brand/assets/images/footer/desktop/logo_02_04.png'
import logo5 from '@brand/assets/images/footer/desktop/logo_02_05.png'
import logo6 from '@brand/assets/images/footer/desktop/logo_02_06.png'
import logo7 from '@brand/assets/images/footer/desktop/logo_02_07.png'
import logo8 from '@brand/assets/images/footer/desktop/logo_02_08.png'
import logo9 from '@brand/assets/images/footer/desktop/logo_02_09.png'
import logo10 from '@brand/assets/images/footer/desktop/logo_02_10.png'

import bg from '@brand/assets/images/downloadApp/new_bg.jpg'
import apple from '@brand/assets/images/downloadApp/apple.png'
import androidIcon from '@brand/assets/images/downloadApp/android.png'

import bgImg from '@mixins/backgroundImg'

const OuterContainer = styled.div`
    width: 100%;
`

const MainContainer = styled.div`
    ${(props) => bgImg(bg, 'auto')}
    width: 100%;
    height: 880px;
    background-color: #eeeeee;
`

const Title = styled.div`
    ${(props) => props.theme.typography.BannerText1}
    text-align: center;
    color: #525693;
`

const Content = styled.div`
    position: absolute;
    left: 50%;
    top: 15%;
`
const QrSystem = styled.div`
    margin-top: 20px;
    display: flex;
`

const QrBox = styled.div`
    display: flex;
    align-items: center;
    width: 280px;
    height: 250px;
    background-color: #bdbeec;
    margin-left: 20px;
    padding-right: 15px;
`

const QrText = styled.div`
    ${(props) => props.theme.typography.Subtitle1}
    margin: 0px 10px;
    width: 22px;
`

const MobileInfo = styled.div`
    margin: 0px 20px;
`
const Mobile = styled.div`
    height: 115px;
    width: 280px;
    border: 1px #525693 solid;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-around;

    :last-child {
        margin-bottom: 0;
    }
`

const MobileVersion = styled.div`
    ${(props) => props.theme.typography.Subtitle1}
    color: #525693;
    text-align: center;
`

const MobileTitle = styled.div`
    ${(props) => props.theme.typography.H4Headline}
    font-weight: bold;
    margin-bottom: 5px;
`

const SInfoSection = styled.div`
    width: 100%;
    color: #6e6e6e;
    background-color: #eeeeee;
    padding: 50px 0 50px;
`

const InfoSectionContainer = styled.div`
    margin: 0 auto;
    max-width: 1440px;
    display: flex;
`

const InfoTextContainer = styled.div`
    padding: 25px;
    width: 43%;
`

const InfoSectionSubTitle = styled.div`
    ${(props) => props.theme.typography.Subtitle1}
    padding: 15px 0;
    color: #6e6e6e;
`
const InfoSectionSubTitleSe = styled(InfoSectionSubTitle)`
    padding-top: 40px;
`
const InfoSectionText = styled.div`
    ${(props) => props.theme.typography.Body3}
`

const PaymentContainer = styled.div`
    padding: 25px;
    width: 55%;

    > img {
        padding: 0 5px 10px 5px;
    }
`

const SQRCodeContainer = styled.div`
    flex-grow: 1;
    flex-shrink: 0;
`

const logoList1 = [logo_1, logo_2, logo_3, logo_4, logo_5, logo_6, logo_7, logo_8, logo_9]
const logoList2 = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9, logo10]

export default () => {
    const t = useTranslation()
    const { qrCodeUrl, brandName, iosAppVersion, androidAppVersion } = useDownloadApp()

    const renderInfoSection = () => {
        return (
            <SInfoSection>
                <InfoSectionContainer>
                    <InfoTextContainer>
                        <InfoSectionSubTitle>
                            {t('downloadApp.infoSection.about.title', { brandName })}
                        </InfoSectionSubTitle>
                        <InfoSectionText>{t('downloadApp.infoSection.about.content1', { brandName })}</InfoSectionText>
                        <InfoSectionText>{t('downloadApp.infoSection.about.content2', { brandName })}</InfoSectionText>
                        <InfoSectionSubTitleSe>
                            {t('downloadApp.infoSection.betResponsibility.title')}
                        </InfoSectionSubTitleSe>
                        <InfoSectionText>
                            {t('downloadApp.infoSection.betResponsibility.content', { brandName })}
                        </InfoSectionText>
                    </InfoTextContainer>
                    <PaymentContainer>
                        <InfoSectionSubTitle>{t('downloadApp.infoSection.payment.title')}</InfoSectionSubTitle>
                        {logoList1.map((logo, idx) => (
                            <img key={`payment-logo-${idx}`} src={logo} />
                        ))}
                        <InfoSectionSubTitle>{t('downloadApp.infoSection.safety.title')}</InfoSectionSubTitle>
                        {logoList2.map((logo, idx) => (
                            <img key={`safety-logo-${idx}`} src={logo} />
                        ))}
                    </PaymentContainer>
                </InfoSectionContainer>
            </SInfoSection>
        )
    }

    return (
        <>
            <OuterContainer>
                <MainContainer>
                    <Content>
                        <Title>
                            {t('downloadApp.description.1')}
                            <br />
                            {t('downloadApp.description.2')}
                        </Title>
                        <QrSystem>
                            <QrBox>
                                <QrText> {t('downloadApp.qrCodeDescription')}</QrText>
                                <SQRCodeContainer>
                                    <QrCode url={qrCodeUrl} size={220} />
                                </SQRCodeContainer>
                            </QrBox>
                            <MobileInfo>
                                <Mobile>
                                    <img src={apple} />
                                    <MobileVersion data-qa="txtSupportVerIOS">
                                        <MobileTitle>{t('downloadApp.appPlatform.ios.device')}</MobileTitle>
                                        {t('downloadApp.appPlatform.ios.description.span1')}
                                        <br />
                                        {t(`downloadApp.appPlatform.ios.description.span2`, {
                                            appVersion: iosAppVersion,
                                        })}
                                    </MobileVersion>
                                </Mobile>
                                <Mobile>
                                    <img src={androidIcon} />
                                    <MobileVersion data-qa="txtSupportVerAn">
                                        <MobileTitle>{t('downloadApp.appPlatform.android.device')}</MobileTitle>
                                        {t('downloadApp.appPlatform.android.description.span1')}
                                        <br />
                                        {t(`downloadApp.appPlatform.android.description.span2`, {
                                            appVersion: androidAppVersion,
                                        })}
                                    </MobileVersion>
                                </Mobile>
                            </MobileInfo>
                        </QrSystem>
                    </Content>
                </MainContainer>
            </OuterContainer>
            {renderInfoSection()}
            <Footer />
        </>
    )
}
