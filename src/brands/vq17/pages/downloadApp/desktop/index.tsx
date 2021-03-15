// import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

import bg from '@brand/assets/images/downloadApp/desktop/bg.jpg'
import mobileImg from '@brand/assets/images/downloadApp/desktop/mobile.png'
import titleBg from '@brand/assets/images/downloadApp/desktop/title-bg.png'
import icon1 from '@brand/assets/images/downloadApp/desktop/icon-1.png'
import icon2 from '@brand/assets/images/downloadApp/desktop/icon-2.png'
import icon3 from '@brand/assets/images/downloadApp/desktop/icon-3.png'
import icon4 from '@brand/assets/images/downloadApp/desktop/icon-4.png'
import qrBg from '@brand/assets/images/downloadApp/desktop/qr-bg.png'
import btnBg from '@brand/assets/images/downloadApp/desktop/btn-bg.png'
import androidIcon from '@brand/assets/images/downloadApp/desktop/an-icon.png'
import iosIcon from '@brand/assets/images/downloadApp/desktop/ios-icon.png'
import securityAndResIcon from '@brand/assets/images/downloadApp/desktop/security-res-icon.png'
import paymentIcon from '@brand/assets/images/downloadApp/desktop/payment-icon.png'
import useTranslation from '@hooks/useTranslation'
import useCopyRight from '@hooks/useCopyRight'
import useDownloadApp from '@pages/downloadApp/desktop/hook'
import QrCode from '@components/common/qrCode'

import bgImg from '@mixins/backgroundImg'

const SDownloadAppPage = styled.div`
    ${bgImg(bg, 'cover')}
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 1260px;
`

const MainContainer = styled.div`
    width: 1200px;
    margin: 0 auto;
`

const TopContainer = styled.div`
    display: flex;
`

const Mobile = styled.div`
    ${bgImg(mobileImg, 'contain')}
    width: 512px;
    height: 675px;
`

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 40px;
    margin-right: 80px;
    width: 618px;
    height: 610px;
`

const Title = styled.div`
    font-size: 50px;
    color: #ffffff;
    letter-spacing: 0.75px;
`

const BrandName = styled.span`
    color: #d0bd87;
`

const TitleBg = styled.span`
    ${bgImg(titleBg, '100% 100%')}
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0 15px;
    color: #000000;
    font-size: 50px;
`

const GamesContainer = styled.div`
    width: 100%;
    padding: 30px 0;
`

const GamesContainerLabel = styled.p`
    font-size: 22px;
    margin: 0;
    color: #d0bd87;
    text-align: center;
    padding-bottom: 25px;
`

const Games = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`

// TODO: change to Link
const Game = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    text-decoration: none;
`

const GameIcon = styled.div<{ bg: string }>`
    ${(props) => bgImg(props.bg, 'contain')}
    width: 56px;
    height: 45px;
`

const GameTitle = styled.p`
    font-size: 15px;
    margin: 0;
    padding-top: 15px;
    color: #ffffff;
    text-align: center;
`

const DownloadContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`

const QrBg = styled.div`
    ${(props) => bgImg(qrBg, 'contain')}
    display: flex;
    align-items: center;
    width: 260px;
    height: 210px;
    position: relative;
`

const QrText = styled.div`
    ${(props) => props.theme.typography.Subtitle2}
    line-height: 1;
    color: #080705;
    width: 20px;
    padding: 0 53px 0 15px;
`

const BtnContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    align-items: center;
`

const DlBtn = styled.div`
    ${bgImg(btnBg, 'contain')}
    display: flex;
    align-items: center;
    width: 320px;
    height: 90px;
    padding-left: 45px;
`

const BtnIcon = styled.div<{ bg: string }>`
    ${(props) => bgImg(props.bg, 'contain')}
    width: 60px;
    height: 60px;
`

const BtnTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    align-items: center;
    padding-left: 15px;
`

const BtnText = styled.p`
    ${(props) => props.theme.typography.Body1}
    color: #d0bd87;
    margin: 2px 0;
`

const Section = styled.div`
    margin-top: 28px;
    width: 100%;
`

const SectionTitle = styled.p`
    font-size: 22px;
    margin: 0 0 10px;
    color: #e9db6a;
    text-align: left;
`

const SectionDescription = styled.p`
    ${(props) => props.theme.typography.Body2}
    margin: 0;
    color: #ffffff;
`

const BottomSectionsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`

const HalfWidthSection = styled(Section)`
    width: 40%;
`

const SectionImg = styled.div<{ bg: string }>`
    ${(props) => bgImg(props.bg, 'contain', 'no-repeat', 'left')}
    width: 100%;
    height: 90px;
`

const Footer = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 100%;
    color: #ecd698;
    background: linear-gradient(90deg, rgba(99, 81, 53, 0) 0, #635135 40%, #635135 60%, rgba(99, 81, 53, 0) 100%);
`

const DownloadApp: React.FC<{}> = () => {
    const t = useTranslation()
    const { brandName, qrCodeUrl, iosAppVersion, androidAppVersion } = useDownloadApp()
    const copyRight = useCopyRight()

    const games = [
        {
            icon: icon1,
            title: t('downloadApp.gameList.sport'),
        },
        {
            icon: icon2,
            title: t('downloadApp.gameList.slotMachine'),
        },
        {
            icon: icon3,
            title: t('downloadApp.gameList.liveCasino'),
        },
        {
            icon: icon4,
            title: t('downloadApp.gameList.lottery'),
        },
    ]

    return (
        <SDownloadAppPage>
            <MainContainer>
                <TopContainer>
                    <ContentContainer>
                        <Title>
                            <BrandName>{brandName}</BrandName>
                            {t('downloadApp.title.span1')}
                            <br />
                            {t('downloadApp.title.span2')}
                            <br />
                            {t('downloadApp.title.span3')}
                            <TitleBg>{t('downloadApp.title.withBg')}</TitleBg>
                        </Title>
                        <GamesContainer>
                            <GamesContainerLabel>{t('downloadApp.appSupportDescription')}:</GamesContainerLabel>
                            <Games>
                                {games.map((game) => {
                                    return (
                                        // TODO: change to "to" props for Link
                                        <Game key={game.title}>
                                            <GameIcon bg={game.icon} />
                                            <GameTitle>{game.title}</GameTitle>
                                        </Game>
                                    )
                                })}
                            </Games>
                        </GamesContainer>
                        <DownloadContainer>
                            <QrBg>
                                <QrText>{t('downloadApp.qrCodeDescription')}</QrText>
                                <QrCode url={qrCodeUrl} size={170} />
                            </QrBg>
                            <BtnContainer>
                                <DlBtn data-qa="imgiOSDownload">
                                    <BtnIcon bg={androidIcon} />
                                    <BtnTextContainer>
                                        <BtnText>
                                            {t('downloadApp.appPlatform.android.os')}
                                            {t('downloadApp.appPlatform.android.description.span1')} :
                                        </BtnText>
                                        <BtnText>
                                            {' '}
                                            {t(`downloadApp.appPlatform.android.description.span2`, {
                                                appVersion: androidAppVersion,
                                            })}
                                        </BtnText>
                                    </BtnTextContainer>
                                </DlBtn>
                                <DlBtn data-qa="imgAndroidDownload">
                                    <BtnIcon bg={iosIcon} />
                                    <BtnTextContainer>
                                        <BtnText>
                                            {t('downloadApp.appPlatform.ios.os')}
                                            {t('downloadApp.appPlatform.ios.description.span1')} :
                                        </BtnText>
                                        <BtnText>
                                            {' '}
                                            {t(`downloadApp.appPlatform.ios.description.span2`, {
                                                appVersion: iosAppVersion,
                                            })}
                                        </BtnText>
                                    </BtnTextContainer>
                                </DlBtn>
                            </BtnContainer>
                        </DownloadContainer>
                    </ContentContainer>
                    <Mobile />
                </TopContainer>
                <Section>
                    <SectionTitle>{t('downloadApp.infoSection.about.title', { brandName })}</SectionTitle>
                    <SectionDescription>{t('downloadApp.infoSection.about.content', { brandName })}</SectionDescription>
                </Section>
                <Section>
                    <SectionTitle>{t('downloadApp.infoSection.betResponsibility.title')}</SectionTitle>
                    <SectionDescription>
                        {t('downloadApp.infoSection.betResponsibility.content', { brandName })}
                    </SectionDescription>
                </Section>
                <BottomSectionsContainer>
                    <HalfWidthSection>
                        <SectionTitle>{t('downloadApp.infoSection.safety.title')}</SectionTitle>
                        <SectionImg bg={securityAndResIcon} />
                    </HalfWidthSection>
                    <HalfWidthSection>
                        <SectionTitle>{t('downloadApp.infoSection.payment.title')}</SectionTitle>
                        <SectionImg bg={paymentIcon} />
                    </HalfWidthSection>
                </BottomSectionsContainer>
            </MainContainer>
            <Footer>{copyRight}</Footer>
        </SDownloadAppPage>
    )
}

export default DownloadApp
