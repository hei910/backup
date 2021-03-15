import styled, { keyframes, css } from 'styled-components/macro'
import bg from '@brand/assets/images/downloadApp/desktop/bg.jpg'
import icon1 from '@brand/assets/images/downloadApp/desktop/icon-1.png'
import icon2 from '@brand/assets/images/downloadApp/desktop/icon-2.png'
import icon3 from '@brand/assets/images/downloadApp/desktop/icon-3.png'
import icon4 from '@brand/assets/images/downloadApp/desktop/icon-4.png'
import icon5 from '@brand/assets/images/downloadApp/desktop/icon-5.png'
import apple from '@brand/assets/images/downloadApp/desktop/apple-icon.svg'
import android from '@brand/assets/images/downloadApp/desktop/android-icon.svg'
import header from '@brand/assets/images/downloadApp/desktop/title.png'
import useTranslation from '@hooks/useTranslation'
import gi1 from '@brand/assets/images/downloadApp/desktop/gi1.png'
import gi2 from '@brand/assets/images/downloadApp/desktop/gi2.png'
import gi3 from '@brand/assets/images/downloadApp/desktop/gi3.png'
import gi4 from '@brand/assets/images/downloadApp/desktop/gi4.png'
import gi5 from '@brand/assets/images/downloadApp/desktop/gi5.png'
import gi6 from '@brand/assets/images/downloadApp/desktop/gi6.png'
import gi7 from '@brand/assets/images/downloadApp/desktop/gi7.png'
import gi8 from '@brand/assets/images/downloadApp/desktop/gi8.png'
import gi9 from '@brand/assets/images/downloadApp/desktop/gi9.png'
import gi10 from '@brand/assets/images/downloadApp/desktop/gi10.png'
import gi11 from '@brand/assets/images/downloadApp/desktop/gi11.png'
import gi12 from '@brand/assets/images/downloadApp/desktop/gi12.png'
import gi13 from '@brand/assets/images/downloadApp/desktop/gi13.png'
import gi14 from '@brand/assets/images/downloadApp/desktop/gi14.png'
import QRCode from '@components/common/qrCode'
import useDownloadApp from '@pages/downloadApp/desktop/hook'

import bgImg from '@mixins/backgroundImg'

const fade_in = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
`
const go_up4 = keyframes`
    0% {transform: translate3d(0, 480px, 0);}
    100% {transform: translate3d(0, 0px, 0);}
`
const floaty1 = keyframes`
    0% { transform: translate3d(0, 0px, 0); }
    50% { transform: translate3d(0, 6px, 0); }
    100% { transform: translate3d(0, 0px, 0); }
`
const floaty2 = keyframes`
    0% {transform: translate3d(0, 0px, 0);}
    50% {transform: translate3d(0, 12px, 0);}
    100% {transform: translate3d(0, 0px, 0);}
`
const SGi = styled.div<{ gi: number }>`
    position: absolute;
    margin-left: 10%;
    opacity: 0;
    ${(props) => props.gi === 0 && SGi0};
    ${(props) => props.gi === 1 && SGi1};
    ${(props) => props.gi === 2 && SGi2};
    ${(props) => props.gi === 3 && SGi3};
    ${(props) => props.gi === 4 && SGi4};
    ${(props) => props.gi === 5 && SGi5};
    ${(props) => props.gi === 6 && SGi6};
    ${(props) => props.gi === 7 && SGi7};
    ${(props) => props.gi === 8 && SGi8};
    ${(props) => props.gi === 9 && SGi9};
    ${(props) => props.gi === 10 && SGi10};
    ${(props) => props.gi === 11 && SGi11};
    ${(props) => props.gi === 12 && SGi12};
    ${(props) => props.gi === 13 && SGi13};
`
const SGiB = styled.b<{ gi: number }>`
    width: 100%;
    height: 100%;
    display: block;
    ${(props) => props.gi === 0 && SGi0B};
    ${(props) => props.gi === 1 && SGi1B};
    ${(props) => props.gi === 2 && SGi2B};
    ${(props) => props.gi === 3 && SGi3B};
    ${(props) => props.gi === 4 && SGi4B};
    ${(props) => props.gi === 5 && SGi5B};
    ${(props) => props.gi === 6 && SGi6B};
    ${(props) => props.gi === 7 && SGi7B};
    ${(props) => props.gi === 8 && SGi8B};
    ${(props) => props.gi === 9 && SGi9B};
    ${(props) => props.gi === 10 && SGi10B};
    ${(props) => props.gi === 11 && SGi11B};
    ${(props) => props.gi === 12 && SGi12B};
    ${(props) => props.gi === 13 && SGi13B};
`
const SGi13 = css`
    width: calc(124px * 0.95);
    height: calc(124px * 0.95);
    bottom: calc(-10px * 0.95);
    left: calc(430px * 0.95);
    animation: ${go_up4} 0.75s 0s ease-in-out 1 forwards, ${fade_in} 0.75s 0s ease-in-out 1 forwards;
`
const SGi13B = css`
    ${bgImg(gi1)}
    animation: ${floaty2} 3s 0s ease-in-out infinite forwards;
`
const SGi12 = css`
    width: calc(77px * 0.95);
    height: calc(75px * 0.95);
    bottom: calc(80px * 0.95);
    left: calc(520px * 0.95);
    animation: ${go_up4} 0.75s 0.2s ease-in-out 1 forwards, ${fade_in} 0.75s 0.2s ease-in-out 1 forwards;
`
const SGi12B = css`
    ${bgImg(gi2)}
    animation: ${floaty1} 3s 0.2s ease-in-out infinite forwards;
`
const SGi11 = css`
    width: calc(321px * 0.95);
    height: calc(547px * 0.95);
    bottom: calc(0px * 0.95);
    left: calc(10px * 0.95);
    animation: ${go_up4} 0.75s 0.2s ease-in-out 1 forwards, ${fade_in} 0.75s 0.2s ease-in-out 1 forwards;
`
const SGi11B = css`
    ${bgImg(gi3)}
`
const SGi10 = css`
    width: calc(496px * 0.95);
    height: calc(244px * 0.95);
    bottom: calc(0px * 0.95);
    left: calc(89px * 0.95);
    animation: ${go_up4} 0.75s 0s ease-in-out 1 forwards, ${fade_in} 0.75s 0s ease-in-out 1 forwards;
`
const SGi10B = css`
    ${bgImg(gi4)}
`
const SGi9 = css`
    width: calc(168px * 0.95);
    height: calc(178px * 0.95);
    bottom: calc(70px * 0.95);
    left: calc(325px * 0.95);
    animation: ${go_up4} 0.75s 0.5s ease-in-out 1 forwards, ${fade_in} 0.75s 0.5s ease-in-out 1 forwards;
`
const SGi9B = css`
    ${bgImg(gi5)}
`
const SGi8 = css`
    width: calc(221px * 0.95);
    height: calc(320px * 0.95);
    bottom: calc(60px * 0.95);
    left: calc(400px * 0.95);
    animation: ${go_up4} 0.75s 0.7s ease-in-out 1 forwards, ${fade_in} 0.75s 0.7s ease-in-out 1 forwards;
`
const SGi8B = css`
    ${bgImg(gi6)}
`
const SGi7 = css`
    width: calc(623px * 0.95);
    height: calc(394px * 0.95);
    bottom: calc(0px * 0.95);
    left: calc(20px * 0.95);
    animation: ${go_up4} 0.75s 0s ease-in-out 1 forwards, ${fade_in} 0.75s 0s ease-in-out 1 forwards;
`
const SGi7B = css`
    ${bgImg(gi7)}
`
const SGi6 = css`
    width: calc(190px * 0.95);
    height: calc(158px * 0.95);
    bottom: calc(290px * 0.95);
    left: calc(220px * 0.95);
    animation: ${go_up4} 0.75s 0.8s ease-in-out 1 forwards, ${fade_in} 0.75s 0.8s ease-in-out 1 forwards;
`
const SGi6B = css`
    ${bgImg(gi8)}
`
const SGi5 = css`
    width: calc(241px * 0.95);
    height: calc(438px * 0.95);
    bottom: calc(300px * 0.95);
    left: calc(380px * 0.95);
    animation: ${go_up4} 0.75s 1s ease-in-out 1 forwards, ${fade_in} 0.75s 1s ease-in-out 1 forwards;
`
const SGi5B = css`
    ${bgImg(gi9)}
`
const SGi4 = css`
    width: calc(89px * 0.95);
    height: calc(39px * 0.95);
    bottom: calc(470px * 0.95);
    left: calc(250px * 0.95);
    animation: ${go_up4} 1.2s 0.8s ease-in-out 1 forwards, ${fade_in} 1.2s 0.8s ease-in-out 1 forwards;
`
const SGi4B = css`
    ${bgImg(gi10)}
    animation: ${floaty1} 3s 0.2s ease-in-out infinite forwards;
`
const SGi3 = css`
    width: calc(81px * 0.95);
    height: calc(31px * 0.95);
    bottom: calc(560px * 0.95);
    left: calc(290px * 0.95);
    animation: ${go_up4} 1.2s 0.7s ease-in-out 1 forwards, ${fade_in} 1.2s 0.7s ease-in-out 1 forwards;
`
const SGi3B = css`
    ${bgImg(gi11)};
    animation: ${floaty2} 3s 0s ease-in-out infinite forwards;
`
const SGi2 = css`
    width: calc(86px * 0.95);
    height: calc(49px * 0.95);
    bottom: calc(590px * 0.95);
    left: calc(220px * 0.95);
    animation: ${go_up4} 1.2s 0.9s ease-in-out 1 forwards, ${fade_in} 1.2s 0.9s ease-in-out 1 forwards;
`
const SGi2B = css`
    ${bgImg(gi12)}
    animation: ${floaty2} 3s 0.4s ease-in-out infinite forwards;
`
const SGi1 = css`
    width: calc(72px * 0.95);
    height: calc(33px * 0.95);
    bottom: calc(650px * 0.95);
    left: calc(260px * 0.95);
    animation: ${go_up4} 1.2s 1.1s ease-in-out 1 forwards, ${fade_in} 1.2s 1.1s ease-in-out 1 forwards;
`
const SGi1B = css`
    ${bgImg(gi13)}
    animation: ${floaty1}3s 0.6s ease-in-out infinite forwards;
`
const SGi0 = css`
    width: calc(234px * 0.95);
    height: calc(284px * 0.95);
    bottom: calc(320px * 0.95);
    left: calc(210px * 0.95);
    animation: ${go_up4} 0.75s 1.2s ease-in-out 1 forwards, ${fade_in} 0.75s 1.2s ease-in-out 1 forwards;
`
const SGi0B = css`
    ${bgImg(gi14)};
`
const SMainContainer = styled.div`
    ${bgImg(bg, 'cover')}
    display: flex;
    align-items: center;
    justify-content: center;
    height: 720px;
    position: relative;
    overflow: hidden;
`

const SInnerContainer = styled.div`
    padding: 0 16px;
    display: flex;
    align-items: center;
    min-width: 1366px;
    height: 720px;
`

const SContainer = styled.div`
    width: 50%;
    position: relative;
    height: 100%;
    padding-top: 50px;
`

const SRightInnerWrapper = styled.div`
    width: 545px;
    margin: 0 auto;
`
const SHeader = styled.img`
    width: 100%;
`
const SText = styled.div`
    ${(props) => props.theme.typography.Subtitle1}
`

const FlexContainer = styled.div`
    display: flex;
    align-items: center;
`

const SDeviceContainer = styled.div`
    width: 180px;
    height: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`

const SDeviceName = styled.div`
    ${(props) => props.theme.typography.H3Headline}
    font-weight: bold;
    text-align: center;
    margin-bottom: 10px;
`

const SDeviceDescription = styled.div`
    ${(props) => props.theme.typography.Subtitle2}
    text-align: center;
`

const SDeviceDescription2 = styled.div`
    ${(props) => props.theme.typography.Body3}
    text-align: center;
`
const SDeviceImage = styled.img`
    height: 90px;
    width: 90px;
`

const SQRCodeContainer = styled.div`
    background: #ffffff;
    height: 224px;
    width: 190px;
    padding: 10px;
    border-radius: 12px;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
`
const SQRText = styled.div`
    ${(props) => props.theme.typography.Body2}
    text-align: center;
    margin: 15px 0 5px;
`
// TODO: change to react-router-dom 'Link'
const SIconContainer = styled.div`
    width: 110px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const GameIcon = styled.img`
    height: 66px;
    width: 66px;
`

const SIconHeader = styled.div`
    padding-top: 10px;
    text-align: center;
`
const SHr = styled.hr`
    border: none;
    border-bottom: 1px solid #cccccc;
    margin: 30px 0;
`
const gameList = [
    { name: 'sport', img: icon1 },
    { name: 'liveCasino', img: icon2 },
    { name: 'slotMachine', img: icon3 },
    { name: 'lottery', img: icon4 },
    { name: 'fishHunter', img: icon5 },
]

const DownloadAppBanner = () => {
    const t = useTranslation()
    const { qrCodeUrl, iosAppVersion, androidAppVersion } = useDownloadApp()

    return (
        <SMainContainer>
            <SInnerContainer>
                <SContainer>
                    {Array(15).map((array, index) => (
                        <SGi gi={index} key={`gi-${index}`}>
                            <SGiB gi={index} />
                        </SGi>
                    ))}
                </SContainer>
                <SContainer>
                    <SRightInnerWrapper>
                        <SHeader src={header} />
                        <SText>{t('downloadApp.description')}</SText>
                        <SHr></SHr>
                        <FlexContainer>
                            <SDeviceContainer>
                                <SDeviceImage src={apple} />
                                <div data-qa="txtSupportVerIOS">
                                    <SDeviceName>{t(`downloadApp.appPlatform.ios.device`)}</SDeviceName>
                                    <SDeviceDescription>
                                        {t(`downloadApp.appPlatform.ios.description.span1`)}
                                    </SDeviceDescription>
                                    <SDeviceDescription2>
                                        {t(`downloadApp.appPlatform.ios.description.span2`, {
                                            appVersion: iosAppVersion,
                                        })}
                                    </SDeviceDescription2>
                                </div>
                            </SDeviceContainer>
                            <SQRCodeContainer>
                                <QRCode url={qrCodeUrl} size={170} includeMargin={false} />
                                <SQRText>{t(`downloadApp.qrCodeDescription`)}</SQRText>
                            </SQRCodeContainer>
                            <SDeviceContainer>
                                <SDeviceImage src={android} />
                                <div data-qa="txtSupportVerAn">
                                    <SDeviceName>{t(`downloadApp.appPlatform.android.device`)}</SDeviceName>
                                    <SDeviceDescription>
                                        {t(`downloadApp.appPlatform.android.description.span1`)}
                                    </SDeviceDescription>
                                    <SDeviceDescription2>
                                        {t(`downloadApp.appPlatform.android.description.span2`, {
                                            appVersion: androidAppVersion,
                                        })}
                                    </SDeviceDescription2>
                                </div>
                            </SDeviceContainer>
                        </FlexContainer>
                        <SHr />
                        <FlexContainer>
                            {gameList.map((game, index) => (
                                <SIconContainer key={`icon-${index}`}>
                                    <GameIcon src={game.img} />
                                    <SIconHeader>{t(`downloadApp.gameList.${game.name}`)}</SIconHeader>
                                </SIconContainer>
                            ))}
                        </FlexContainer>
                    </SRightInnerWrapper>
                </SContainer>
            </SInnerContainer>
        </SMainContainer>
    )
}

export default DownloadAppBanner
