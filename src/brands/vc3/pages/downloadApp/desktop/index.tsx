import styled from 'styled-components/macro'
import bannerImg from '@brand/assets/images/downloadApp/desktop/banner.jpg'
import useDownloadApp from '@pages/downloadApp/desktop/hook'
import useTranslation from '@hooks/useTranslation'
import QrCode from '@components/common/qrCode'
import Footer from '@brand/pages/home/desktop/HomeFooter'
import bgImg from '@mixins/backgroundImg'

const PageContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    min-height: 1024px;
`
const Banner = styled.img`
    ${bgImg(bannerImg, 'auto')}
    background-color: #28282a;
    width: 100%;
    height: 375px;
`

const ContentContainer = styled.div`
    margin: 10px auto;
    /* width: 1366px; */
`

const ContentHeader = styled.div`
    height: 40px;
    background-color: #e3e3e3;
    margin: 0 auto;
`

const ContentHeaderText = styled.div`
    ${(props) => props.theme.typography.Body4}
    display: inline-block;
    padding: 10px 20px;
    height: 100%;
    text-align: center;
    color: #ffffff;
    background: #363636;
    transition-duration: 0.3s;
`

const Content = styled.div`
    ${(props) => props.theme.typography.Body2}
    width: 780px;
    padding: 0 0 70px 90px;
    color: #6e6e6e;
`

const ContentWrapper = styled.div`
    display: flex;
    justify-content: center;
`

const Title = styled.h2`
    ${(props) => props.theme.typography.H3Headline}
    font-weight: bolder;
    color: #13196b;
    margin: 20px 0 10px;
`

const ContentParagraph = styled.p`
    margin: 0 0 10px;

    :last-child {
        margin: 0;
    }

    > span {
        font-weight: bold;
    }
`
const LowerContent = styled.div`
    background-color: #0c186c;
    width: 100%;
    position: absolute;
    bottom: 0;
`
const QRCodeContainer = styled.div`
    margin: 30px;
`

const DownloadApp: React.FC<{}> = () => {
    const t = useTranslation()
    const { brandName, qrCodeUrl, iosAppVersion, androidAppVersion } = useDownloadApp()

    return (
        <PageContainer>
            <Banner />
            <ContentContainer>
                <ContentHeader>
                    <ContentHeaderText>{t('downloadApp.header', { brandName })}</ContentHeaderText>
                </ContentHeader>
                <ContentWrapper>
                    <Content>
                        <Title>{t('downloadApp.header', { brandName })}</Title>
                        <ContentParagraph>{t('downloadApp.description', { brandName })}</ContentParagraph>
                        <br />
                        <ContentParagraph data-qa="txtSupportVerIOS">
                            {t('downloadApp.ios.system')}:{' '}
                            <span>
                                {' '}
                                {t(`downloadApp.appPlatform.ios.description.span2`, {
                                    appVersion: iosAppVersion,
                                })}
                            </span>
                        </ContentParagraph>

                        <ContentParagraph data-qa="txtSupportVerAn">
                            {t('downloadApp.android.system')}:{' '}
                            <span>
                                {t(`downloadApp.appPlatform.android.description.span2`, {
                                    appVersion: androidAppVersion,
                                })}
                            </span>
                        </ContentParagraph>
                        <br />
                        <ContentParagraph>
                            {t('downloadApp.app', { brandName }) + ': '}
                            <span>
                                {`${t('downloadApp.gameList.sport')} `}
                                {`${t('downloadApp.gameList.liveCasino')} `}
                                {`${t('downloadApp.gameList.esport')} `}
                                {`${t('downloadApp.gameList.slotMachine')} `}
                                {`${t('downloadApp.gameList.boardGame')} `}
                                {`${t('downloadApp.gameList.lottery')} `}
                                {t('downloadApp.gameList.fishHunter')}
                            </span>
                        </ContentParagraph>
                        <ContentParagraph>{t('downloadApp.scanQRCode', { brandName })}</ContentParagraph>
                    </Content>
                    <QRCodeContainer>
                        <QrCode url={qrCodeUrl} size={220} includeMargin={false} />
                    </QRCodeContainer>
                </ContentWrapper>
            </ContentContainer>
            <LowerContent>
                <Footer />
            </LowerContent>
        </PageContainer>
    )
}

export default DownloadApp
