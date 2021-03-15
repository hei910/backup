import styled from 'styled-components/macro'

import bg from '@brand/assets/images/downloadApp/desktop/bg.png'
import bgCenter from '@brand/assets/images/downloadApp/desktop/bg_center.jpg'
import titleImage1 from '@brand/assets/images/downloadApp/desktop/title01.png'
import titleImage2 from '@brand/assets/images/downloadApp/desktop/title02.png'
import titleBg from '@brand/assets/images/downloadApp/desktop/icon_head.png'
import gameIcon1 from '@brand/assets/images/downloadApp/desktop/icon_01.png'
import gameIcon2 from '@brand/assets/images/downloadApp/desktop/icon_02.png'
import gameIcon3 from '@brand/assets/images/downloadApp/desktop/icon_03.png'
import gameIcon4 from '@brand/assets/images/downloadApp/desktop/icon_04.png'
import gameIcon5 from '@brand/assets/images/downloadApp/desktop/icon_05.png'
import appleIcon from '@brand/assets/images/downloadApp/desktop/icon_apple.png'
import androidIcon from '@brand/assets/images/downloadApp/desktop/icon_android.png'
import useTranslation from '@hooks/useTranslation'
import useDownloadApp from '@pages/downloadApp/desktop/hook'
import QrCode from '@components/common/qrCode'
import useCopyRight from '@hooks/useCopyRight'

import bgImg from '@mixins/backgroundImg'

const StyledDownloadApp = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    background: linear-gradient(to bottom, #c3cdd7 0%, #c3cdd7 50%, #a6b8ce 50%, #a6b8ce 100%);
`

const MainContainer = styled.div`
    ${bgImg(bg, 'auto 100%', 'repeat-x', 'center center')}
    width: 100%;
`

const Content = styled.div`
    ${bgImg(bgCenter, 'contain')}
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1366px;
    height: 100%;
    max-height: 529px;
    margin: 0 auto;
    overflow: hidden;
`

const LeftSection = styled.div`
    height: 432px;
    margin-left: 64px;
`

const RightSection = styled.div`
    height: 432px;
    margin-right: 32px;
`

const Banner = styled.img`
    margin: 14px 0;
`

const Description = styled.div`
    ${(props) => props.theme.typography.Body3}
    color: #666666;
`

const Title = styled.div`
    ${bgImg(titleBg, 'contain')}
    ${(props) => props.theme.typography.Body3}
    width: 136px;
    height: 35px;
    margin-top: 20px;
    margin-left: -12px;
    padding: 2px 2px 10px 24px;
    color: #ffffff;
`

const GamesContainer = styled.div`
    display: flex;
`

const Game = styled.div`
    margin: 4px;
    text-align: center;
`

const GameImage = styled.img`
    width: 64px;
    height: 64px;
`

const GameText = styled.div`
    ${(props) => props.theme.typography.Body3}
    color: #666666;
`

const AppContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 8px auto;
`

const IosItem = styled.div`
    text-align: right;
`

const AndroidItem = styled.div`
    text-align: left;
`

const IosTitle = styled.div`
    ${(props) => props.theme.typography.H4Headline}
    color: #878787;
    margin-right: 8px;
    font-weight: bold;
`

const AndroidTitle = styled.div`
    ${(props) => props.theme.typography.H4Headline}
    color: #97c024;
    margin-left: 8px;
    font-weight: bold;
`

const AppDescription = styled.div`
    ${(props) => props.theme.typography.Body4}
    color: #666666;
`

const QRCodeContainer = styled.div`
    margin: 20px 12px;
    padding: 8px;
    background-color: #ffffff;
`

const Footer = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 100%;
    color: #999999;
    background-color: #252525;
`

const DownloadAppPage = () => {
    const t = useTranslation()
    const { qrCodeUrl, iosAppVersion, androidAppVersion } = useDownloadApp()
    const copyRight = useCopyRight()

    return (
        <StyledDownloadApp>
            <MainContainer>
                <Content>
                    <LeftSection>
                        <Banner src={titleImage1} />
                        <Description>
                            {t('downloadApp.description.1')}
                            <br />
                            {t('downloadApp.description.2')}
                            <br />
                            {t('downloadApp.description.3')}
                            <br />
                        </Description>
                        <Title>{t('downloadApp.appSupportDescription')}:</Title>
                        <GamesContainer>
                            <Game>
                                <GameImage src={gameIcon1} />
                                <GameText>{t('downloadApp.gameList.sport')}</GameText>
                            </Game>
                            <Game>
                                <GameImage src={gameIcon2} />
                                <GameText>{t('downloadApp.gameList.liveCasino')}</GameText>
                            </Game>
                            <Game>
                                <GameImage src={gameIcon3} />
                                <GameText>{t('downloadApp.gameList.slotMachine')}</GameText>
                            </Game>
                            <Game>
                                <GameImage src={gameIcon4} />
                                <GameText>{t('downloadApp.gameList.lottery')}</GameText>
                            </Game>
                            <Game>
                                <GameImage src={gameIcon5} />
                                <GameText>{t('downloadApp.gameList.fishHunter')}</GameText>
                            </Game>
                        </GamesContainer>
                    </LeftSection>
                    <RightSection>
                        <Banner src={titleImage2} />
                        <AppContainer>
                            <IosItem data-qa="txtSupportVerIOS">
                                <img src={appleIcon} />
                                <IosTitle>{t('downloadApp.appPlatform.ios.os')}</IosTitle>
                                <AppDescription>{t('downloadApp.appPlatform.ios.description.span1')}</AppDescription>
                                <AppDescription>
                                    {' '}
                                    {t(`downloadApp.appPlatform.ios.description.span2`, {
                                        appVersion: iosAppVersion,
                                    })}
                                </AppDescription>
                            </IosItem>
                            <QRCodeContainer>
                                <QrCode url={qrCodeUrl} size={136} includeMargin={false} />
                            </QRCodeContainer>
                            <AndroidItem data-qa="txtSupportVerAn">
                                <img src={androidIcon} />
                                <AndroidTitle>{t('downloadApp.appPlatform.android.os')}</AndroidTitle>
                                <AppDescription>
                                    {t('downloadApp.appPlatform.android.description.span1')}
                                </AppDescription>
                                <AppDescription>
                                    {t(`downloadApp.appPlatform.android.description.span2`, {
                                        appVersion: androidAppVersion,
                                    })}
                                </AppDescription>
                            </AndroidItem>
                        </AppContainer>
                    </RightSection>
                </Content>
                <Footer>{copyRight}</Footer>
            </MainContainer>
        </StyledDownloadApp>
    )
}

export default DownloadAppPage
