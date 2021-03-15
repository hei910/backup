import styled from 'styled-components/macro'
import Bg from '@brand/assets/images/downloadApp/desktop/bg.jpg'
import TitleLogo from '@brand/assets/images/downloadApp/title.png'
import Icon01 from '@brand/assets/images/downloadApp/icon01.png'
import Icon02 from '@brand/assets/images/downloadApp/icon02.png'
import Icon03 from '@brand/assets/images/downloadApp/icon03.png'
import Icon04 from '@brand/assets/images/downloadApp/icon04.png'
import Icon05 from '@brand/assets/images/downloadApp/icon05.png'
import IconApple from '@brand/assets/images/downloadApp/icon_apple.png'
import IconAndroid from '@brand/assets/images/downloadApp/icon_android.png'
import useTranslation from '@hooks/useTranslation'
import useDownloadApp from '@pages/downloadApp/desktop/hook'
import QrCode from '@components/common/qrCode'
import Footer from '@brand/components/desktop/footer'
import bgImg from '@mixins/backgroundImg'

const games = [
    {
        name: 'sport',
        icon: Icon01,
    },
    {
        name: 'liveCasino',
        icon: Icon02,
    },
    {
        name: 'slotMachine',
        icon: Icon03,
    },
    {
        name: 'lottery',
        icon: Icon04,
    },
    {
        name: 'fishHunter',
        icon: Icon05,
    },
]

const PageContainer = styled.div`
    ${bgImg(Bg, 'cover')}
    height: 80%;
    min-height: 800px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ContentContainer = styled.div`
    position: relative;
    right: 15%;
    width: 700px;
`

const Title = styled.img`
    width: 518px;
    height: 128px;
`

const Description = styled.div`
    font-size: 17.5px;
    color: #ffffff;
    margin: 10px 0;
    text-shadow: 0px 1px 6px #000000;
`

const ProductTitle = styled.div`
    font-size: 20.5px;
    background-color: #1a8867;
    color: #ffe24a;
    text-align: center;
    margin: 10px 0 20px;
    width: 167px;
    height: 38px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const GameList = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: center;
`

const GameBlock = styled.div`
    font-size: 20.5px;
    color: white;
    text-align: center;
    padding: 0 5px;
`

const GameIcon = styled.img`
    width: 111px;
    height: 111px;
`

const Line = styled.hr`
    width: 100%;
    height: 0;
    opacity: 0.5;
    margin: 30px 0 40px;
`

const DownloadContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const AndroidContainer = styled.div`
    color: white;
`

const IosContainer = styled(AndroidContainer)`
    text-align: right;
`

const PlatformIcon = styled.img`
    width: 60px;
`

const AndroidIcon = styled.div`
    ${(props) => props.theme.typography.H4Headline}
    text-align: left;
    color: white;
`

const IosIcon = styled(AndroidIcon)`
    text-align: right;
`

const OSText = styled.div`
    ${(props) => props.theme.typography.Body1}
    color: white;
    padding-top: 5px;
`

const QRCodeContainer = styled.div`
    background-color: white;
    padding: 10px;
    margin: 0 20px;
`

const DownloadApp: React.FC<{}> = () => {
    const t = useTranslation()
    const { brandName, qrCodeUrl, iosAppVersion, androidAppVersion } = useDownloadApp()

    return (
        <>
            <PageContainer>
                <ContentContainer>
                    <Title src={TitleLogo} />
                    <Description>
                        {t('downloadApp.description.1')}
                        <br />
                        {t('downloadApp.description.2')}
                        <br />
                        {t('downloadApp.description.3', { brandName })}
                    </Description>
                    <ProductTitle> {t('downloadApp.appSupportDescription')}:</ProductTitle>
                    <GameList>
                        {games.map((game, index) => {
                            return (
                                <GameBlock key={index}>
                                    <GameIcon src={game.icon} />
                                    <div>{t(`downloadApp.gameList.${game.name}`)}</div>
                                </GameBlock>
                            )
                        })}
                    </GameList>
                    <Line />
                    <DownloadContainer>
                        <IosContainer>
                            <IosIcon>
                                <PlatformIcon src={IconApple} />
                                <div>{t('downloadApp.appPlatform.ios.os')}</div>
                            </IosIcon>
                            <OSText>
                                {t('downloadApp.appPlatform.ios.description.span1')}
                                <br />{' '}
                                {t('downloadApp.appPlatform.ios.description.span2', { appVersion: iosAppVersion })}
                            </OSText>
                        </IosContainer>
                        <QRCodeContainer>
                            <QrCode url={qrCodeUrl} size={180} includeMargin={false} />
                        </QRCodeContainer>
                        <AndroidContainer>
                            <AndroidIcon>
                                <PlatformIcon src={IconAndroid} />
                                <div>{t('downloadApp.appPlatform.android.os')}</div>
                            </AndroidIcon>
                            <OSText>
                                {t('downloadApp.appPlatform.android.description.span1')}
                                <br />{' '}
                                {t('downloadApp.appPlatform.android.description.span2', {
                                    appVersion: androidAppVersion,
                                })}
                            </OSText>
                        </AndroidContainer>
                    </DownloadContainer>
                </ContentContainer>
            </PageContainer>
            <Footer />
        </>
    )
}

export default DownloadApp
