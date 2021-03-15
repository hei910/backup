import styled, { css } from 'styled-components/macro'
import bg from '@brand/assets/images/downloadApp/desktop/Bg.jpg'
import phone from '@brand/assets/images/downloadApp/desktop/phone.png'
import header from '@brand/assets/images/downloadApp/desktop/txt_title.png'
import ios from '@brand/assets/images/downloadApp/desktop/icon_apple.png'
import android from '@brand/assets/images/downloadApp/desktop/icon_android.png'
import game from '@brand/assets/images/downloadApp/desktop/game.png'
import live from '@brand/assets/images/downloadApp/desktop/live.png'
import lottery from '@brand/assets/images/downloadApp/desktop/lottery.png'
import sport from '@brand/assets/images/downloadApp/desktop/sport.png'
import useTranslation from '@hooks/useTranslation'
import logo from '@brand/assets/images/downloadApp/desktop/Bet338_Small_Logo.png'
import QRCode from '@components/common/qrCode'
import useDownloadApp from '@pages/downloadApp/desktop/hook'
import useCopyRight from '@hooks/useCopyRight'
import bgImg from '@mixins/backgroundImg'

const FlexContainer = styled.div`
    display: flex;
`

const SMainContainer = styled.div`
    ${bgImg(bg, 'cover', 'no-repeat')};
    position: relative;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 768px;
    min-width: 1366px;
`
const SInnerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 1366px;
`

const SLeftContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 100px;
    width: 635px;
    height: 717px;
`

const SIcon = styled.div<{ bg: string; type: string }>`
    ${(props) => bgImg(props.bg, 'cover', 'no-repeat')};
    ${(props) => props.type === 'liveCasino' && SLiveIcon};
    ${(props) => props.type === 'slotMachine' && SGameIcon};
    ${(props) => props.type === 'sport' && SSportIcon};
    ${(props) => props.type === 'lottery' && SLotteryIcon};
    position: absolute;
    height: 160px;
    width: 160px;
`
const SLiveIcon = css`
    right: -50px;
    bottom: 170px;
`
const SGameIcon = css`
    right: -50px;
    top: 220px;
`
const SSportIcon = css`
    top: 120px;
    right: 30px;
`
const SLotteryIcon = css`
    bottom: 70px;
    right: 30px;
`
const SIconText = styled.div`
    ${(props) => props.theme.typography.Body5}
    width: 100%;
    margin-top: 75px;
    color: #fff;
    text-align: center;
`
const SPhone = styled.div`
    ${bgImg(phone, 'contain', 'no-repeat')}
    width: 80%;
    height: 100%;
`
const SRightContainer = styled.div`
    width: 630px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const SHeader = styled.img`
    margin-bottom: 10px;
    width: 100%;
`
const SDescription = styled.div`
    ${(props) => props.theme.typography.Body2}
    letter-spacing: 4px;
    color: #fff;
    padding-bottom: 40px;
`
const SSpan = styled.span`
    margin-right: 5px;
`

const SQRCodeContainer = styled.div`
    background: #fff;
    height: 230px;
    width: 230px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const SDeviceContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 80px;
    height: 220px;
`

const SSingleDeviceContainer = styled.div`
    height: 90px;
    width: 270px;
    border-radius: 10px;
`
const SDeviceTop = styled.div<{ type: string }>`
    ${(props) => props.type === 'ios' && SIOSTopCss}
    ${(props) => props.type === 'android' && SAndroidTopCss}
    height: 65%;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`

const SDeviceLogo = styled.div<{ type: string }>`
    ${(props) => bgImg(props.type === 'ios' ? ios : android, 'cover')}
    height: 43px;
    width: 35px;
`
const SDeviceTitle = styled.div`
    ${(props) => props.theme.typography.Subtitle1}
    margin-left: 20px;
`
const SAndroidTopCss = css`
    background: linear-gradient(
        7deg,
        rgba(159, 190, 69, 1) 0%,
        rgba(159, 190, 69, 1) 29%,
        rgba(200, 217, 98, 1) 68%,
        rgba(239, 245, 126, 1) 100%
    );
`

const SIOSTopCss = css`
    background: linear-gradient(
        9deg,
        rgba(82, 149, 211, 1) 0%,
        rgba(82, 149, 211, 1) 35%,
        rgba(73, 189, 238, 1) 68%,
        rgba(160, 252, 253, 1) 100%
    );
`

const SDeviceBottom = styled.div<{ type: string }>`
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    height: 35%;
    background: #e6e6e6;
    box-shadow: 0px 5px 0px 0px rgba(175, 175, 175, 1);
    color: ${(props) => (props.type === 'ios' ? '#5295d3' : '#728939')};
`
const SDeviceBottomText = styled.div`
    ${(props) => props.theme.typography.Body4}
    text-align: center;
    padding-top: 5px;
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

const DownloadApp = () => {
    const games = [
        {
            name: 'sport',
            icon: sport,
        },
        {
            name: 'slotMachine',
            icon: game,
        },
        {
            name: 'liveCasino',
            icon: live,
        },
        {
            name: 'lottery',
            icon: lottery,
        },
    ]
    const t = useTranslation()
    const { qrCodeUrl, iosAppVersion, androidAppVersion } = useDownloadApp()
    const copyRight = useCopyRight()
    return (
        <SMainContainer>
            <SInnerContainer>
                <SLeftContainer>
                    <SPhone />
                    {games.map((game, index) => (
                        <SIcon type={game.name} bg={game.icon} key={index}>
                            <SIconText>{t(`downloadApp.gameList.${game.name}`)}</SIconText>
                        </SIcon>
                    ))}
                </SLeftContainer>
                <SRightContainer>
                    <SHeader src={header} />
                    <SDescription>
                        <SSpan>
                            <img src={logo} />
                        </SSpan>
                        {t(`downloadApp.description`)}
                    </SDescription>

                    <FlexContainer>
                        <SQRCodeContainer>
                            <QRCode url={qrCodeUrl} size={210} includeMargin={false} />
                        </SQRCodeContainer>
                        <SDeviceContainer>
                            <SSingleDeviceContainer data-qa="imgiOSDownload">
                                <SDeviceTop type={'ios'}>
                                    <SDeviceLogo type={'ios'}></SDeviceLogo>
                                    <SDeviceTitle>{t(`downloadApp.iosHeader`)}</SDeviceTitle>
                                </SDeviceTop>
                                <SDeviceBottom type={'ios'}>
                                    <SDeviceBottomText>
                                        {t(`downloadApp.appPlatform.ios.os`)}
                                        {t(`downloadApp.appPlatform.ios.description.span1`)} :{' '}
                                        {t(`downloadApp.appPlatform.ios.description.span2`, {
                                            appVersion: iosAppVersion,
                                        })}
                                    </SDeviceBottomText>
                                </SDeviceBottom>
                            </SSingleDeviceContainer>
                            <SSingleDeviceContainer data-qa="imgAndroidDownload">
                                <SDeviceTop type={'android'}>
                                    <SDeviceLogo type={'android'}></SDeviceLogo>
                                    <SDeviceTitle>{t(`downloadApp.androidHeader`)}</SDeviceTitle>
                                </SDeviceTop>
                                <SDeviceBottom type={'android'}>
                                    <SDeviceBottomText>
                                        {t(`downloadApp.appPlatform.android.os`)}
                                        {t(`downloadApp.appPlatform.android.description.span1`)} :{' '}
                                        {t(`downloadApp.appPlatform.android.description.span2`, {
                                            appVersion: androidAppVersion,
                                        })}
                                    </SDeviceBottomText>
                                </SDeviceBottom>
                            </SSingleDeviceContainer>
                        </SDeviceContainer>
                    </FlexContainer>
                </SRightContainer>
            </SInnerContainer>
            <Footer>{copyRight}</Footer>
        </SMainContainer>
    )
}

export default DownloadApp
