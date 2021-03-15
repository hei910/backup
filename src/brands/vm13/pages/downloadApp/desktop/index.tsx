// import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components/macro'
import bg from '@brand/assets/images/downloadApp/desktop/bg.jpg'
import title from '@brand/assets/images/downloadApp/desktop/title.svg'
import mobile1 from '@brand/assets/images/downloadApp/desktop/mobile1.png'
import mobile2 from '@brand/assets/images/downloadApp/desktop/mobile2.png'
import mobile3 from '@brand/assets/images/downloadApp/desktop/mobile3.png'
import mobile4 from '@brand/assets/images/downloadApp/desktop/mobile4.png'
import mobile5 from '@brand/assets/images/downloadApp/desktop/mobile5.png'
import leftBall from '@brand/assets/images/downloadApp/desktop/left-ball.png'
import rightBall from '@brand/assets/images/downloadApp/desktop/right-ball.png'
import topCoin from '@brand/assets/images/downloadApp/desktop/top-coin.png'
import middleCoin from '@brand/assets/images/downloadApp/desktop/middle-coin.png'
import bottomCoin from '@brand/assets/images/downloadApp/desktop/bottom-coin.png'
import player from '@brand/assets/images/downloadApp/desktop/player.png'
import footballIcon from '@brand/assets/images/downloadApp/desktop/football-icon.svg'
import pokerIcon from '@brand/assets/images/downloadApp/desktop/poker-icon.svg'
import casinoIcon from '@brand/assets/images/downloadApp/desktop/casino-icon.svg'
import lotteryIcon from '@brand/assets/images/downloadApp/desktop/lottery-icon.svg'
import fishHunterIcon from '@brand/assets/images/downloadApp/desktop/fishHunter-icon.svg'
import androidIcon from '@brand/assets/images/downloadApp/desktop/android-icon.svg'
import appleIcon from '@brand/assets/images/downloadApp/desktop/apple-icon.svg'
import useTranslation from '@hooks/useTranslation'
import useDownloadApp from '@pages/downloadApp/desktop/hook'

import Qrcode from '@components/common/qrCode'
import InfoSection from './infoSection'
import Footer from '@brand/components/desktop/footer'

import bgImg from '@mixins/backgroundImg'

const fadeInWithoutMoving = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`

const fadeIn = keyframes`
    from {
        top: -25%;
        opacity: 0;
    }

    to {
        top: 0;
        opacity: 1;
    }
`
const floating = keyframes`
    from {
        transform: translate(0, 0);
    }

    to {
        transform: translate(0, 20px);
    }
`

const SDownloadAppPage = styled.div`
    ${bgImg(bg, 'cover')}
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 813px;
`

const AnimationContainer = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    height: 813px;
    width: 702px;
    margin-right: 70px;
`

const SMobile = styled.div<{ bg: string; delay: number }>`
    ${(props) => bgImg(props.bg, 'contain')}
    position: relative;
    height: 330px;
    width: 442px;
    opacity: 0;
    animation: ${fadeIn} 0.75s ${(props) => `${props.delay}s`} ease-in-out 1 forwards;
`

const MobileRow = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    ${SMobile} {
        :first-child {
            margin-right: -8%;
        }

        :last-child {
            margin-left: -8%;
        }
    }
`

const MiddleRow = styled(MobileRow)`
    position: relative;
    bottom: 100px;
    right: 5px;
`

const BottomRow = styled(MobileRow)`
    position: relative;
    bottom: 200px;
    left: 140px;
`

const Balls = styled.div`
    display: flex;
    position: absolute;
    opacity: 0;
    animation: ${fadeInWithoutMoving} 1s 6s forwards, ${floating} 1.5s 6s infinite alternate ease-in-out;
    z-index: 2;
    top: 30px;
    left: 70px;
`

const LeftBall = styled.div`
    ${bgImg(leftBall, 'contain')}
    width: 113px;
    height: 162px;
    margin-right: 70px;
`

const RightBall = styled.div`
    ${bgImg(rightBall, 'contain')}
    width: 62px;
    height: 99px;
`

const Player = styled.div`
    ${bgImg(player, 'contain')}
    position: absolute;
    opacity: 0;
    animation: ${fadeInWithoutMoving} 1s 5s forwards, ${floating} 1.5s 5s infinite alternate ease-in-out;
    z-index: 2;
    top: 60px;
    left: 500px;
    width: 252px;
    height: 372px;
`

const Coins = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    opacity: 0;
    animation: ${fadeInWithoutMoving} 1s 7s forwards, ${floating} 1.5s 7s infinite alternate ease-in-out;
    z-index: 2;
    bottom: 250px;
    left: 140px;
`

const TopCoin = styled.div`
    ${bgImg(topCoin, 'contain')}
    width: 66px;
    height: 83px;
`

const MiddleCoin = styled.div`
    ${bgImg(middleCoin, 'contain')}
    width: 62px;
    height: 71px;
`

const BottomCoin = styled.div`
    ${bgImg(bottomCoin, 'contain')}
    width: 134px;
    height: 94px;
`

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 80%;
`

const Title = styled.div`
    ${bgImg(title, 'contain')}
    width: 577px;
    height: 100px;
    margin: 36px 0 26px;
`

const SymbolContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 577px;
    height: 121px;
    border-radius: 19px;
    margin-bottom: 35px;
`

const SymbolContainerLabel = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    right: 0;
    margin: 0 auto;
    position: absolute;
    z-index: 1;
    width: 152px;
    height: 28px;
    border-radius: 16px;
    background-color: #000000;
    color: #ffffff;
    bottom: -40px;
`

// TODO change to Link
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
    width: 60px;
    height: 48px;
    margin: 0 0 9px;
`

const GameTitle = styled.p`
    ${(props) => props.theme.typography.Body2}
    margin: 0;
    color: #1d1d1d;
`

const AppContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 577px;
    margin-top: 28px;
`

const App = styled.div`
    height: 100%;
    text-align: center;
`

const AppIcon = styled.div<{ bg: string }>`
    ${(props) => bgImg(props.bg, 'contain')}
    width: auto;
    height: 60px;
    margin-bottom: 5px;
`

const AppTitle = styled.p`
    ${(props) => props.theme.typography.Subtitle2}
    color: #000000;
    margin: 0;
`

const AppDescription = styled.p`
    ${(props) => props.theme.typography.Subtitle4}
    margin: 20px 0 0 0;
`

const AppVer = styled.p`
    ${(props) => props.theme.typography.Body3}
    margin: 0;
`

const QrCodeContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 190px;
    height: 190px;
    border-radius: 19px;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.16);
    background-color: #fccb2c;
    margin: 0 10px;
`

const QrCodeDescription = styled.p`
    ${(props) => props.theme.typography.Body3}
    color: #000000;
    margin: 0;
    padding-top: 10px;
`

const DownloadApp: React.FC<{}> = () => {
    const t = useTranslation()
    const { qrCodeUrl, iosAppVersion, androidAppVersion } = useDownloadApp()

    const games = [
        {
            icon: footballIcon,
            title: t('downloadApp.gameList.sport'),
        },
        {
            icon: pokerIcon,
            title: t('downloadApp.gameList.liveCasino'),
        },
        {
            icon: casinoIcon,
            title: t('downloadApp.gameList.slotMachine'),
        },
        {
            icon: lotteryIcon,
            title: t('downloadApp.gameList.lottery'),
        },
        {
            icon: fishHunterIcon,
            title: t('downloadApp.gameList.fishHunter'),
        },
    ]

    return (
        <>
            <SDownloadAppPage>
                <AnimationContainer>
                    <Balls>
                        <LeftBall />
                        <RightBall />
                    </Balls>
                    <Player />
                    <Coins>
                        <TopCoin />
                        <MiddleCoin />
                        <BottomCoin />
                    </Coins>
                    <MobileRow>
                        <SMobile bg={mobile3} delay={2} />
                        <SMobile bg={mobile2} delay={1} />
                    </MobileRow>
                    <MiddleRow>
                        <SMobile bg={mobile4} delay={3} />
                        <SMobile bg={mobile1} delay={0} />
                    </MiddleRow>
                    <BottomRow>
                        <SMobile bg={mobile5} delay={4} />
                    </BottomRow>
                </AnimationContainer>
                <ContentContainer>
                    <Title />
                    <SymbolContainer>
                        {games.map((game) => {
                            return (
                                // change to "to" props for Link
                                <Game key={game.title}>
                                    <GameIcon bg={game.icon} />
                                    <GameTitle>{game.title}</GameTitle>
                                </Game>
                            )
                        })}
                        <SymbolContainerLabel>{t('downloadApp.appSupportDescription')}</SymbolContainerLabel>
                    </SymbolContainer>
                    <AppContainer>
                        <App>
                            <AppIcon bg={appleIcon} />
                            <AppTitle>{t('downloadApp.appPlatform.ios.device')}</AppTitle>
                            <div data-qa="txtSupportVerIOS">
                                <AppDescription>
                                    {t('downloadApp.appPlatform.ios.os')}
                                    {t('downloadApp.appPlatform.ios.description.span1')}
                                </AppDescription>
                                <AppVer>
                                    {' '}
                                    {t(`downloadApp.appPlatform.ios.description.span2`, {
                                        appVersion: iosAppVersion,
                                    })}
                                </AppVer>
                            </div>
                        </App>
                        <QrCodeContainer>
                            <Qrcode url={qrCodeUrl} size={105} includeMargin={false} />
                            <QrCodeDescription>{t('downloadApp.qrCodeDescription')}</QrCodeDescription>
                        </QrCodeContainer>
                        <App>
                            <AppIcon bg={androidIcon} />
                            <AppTitle>{t('downloadApp.appPlatform.android.device')}</AppTitle>
                            <div data-qa="txtSupportVerAn">
                                <AppDescription>
                                    {t('downloadApp.appPlatform.android.os')}
                                    {t('downloadApp.appPlatform.android.description.span1')}
                                </AppDescription>
                                <AppVer>
                                    {' '}
                                    {t(`downloadApp.appPlatform.android.description.span2`, {
                                        appVersion: androidAppVersion,
                                    })}
                                </AppVer>
                            </div>
                        </App>
                    </AppContainer>
                </ContentContainer>
            </SDownloadAppPage>
            <InfoSection />
            <Footer />
        </>
    )
}

export default DownloadApp
