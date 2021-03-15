import styled, { keyframes } from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'
import useDownloadApp from '@pages/downloadApp/desktop/hook'

import bg from '@brand/assets/images/downloadApp/desktop/bg.jpg'
import device1 from '@brand/assets/images/downloadApp/desktop/device1.png'
import device2 from '@brand/assets/images/downloadApp/desktop/device2.png'
import device3 from '@brand/assets/images/downloadApp/desktop/device3.png'
import girlImg from '@brand/assets/images/downloadApp/desktop/girl.png'
import girlEye from '@brand/assets/images/downloadApp/desktop/girl2.gif'
import ballImg from '@brand/assets/images/downloadApp/desktop/ball.png'
import qrImg from '@brand/assets/images/downloadApp/desktop/qrcode.png'
import blink from '@brand/assets/images/downloadApp/desktop/blink.png'

import QRCode from '@components/common/qrCode'
import Footer from '@brand/components/desktop/footer'

import bgImg from '@mixins/backgroundImg'

const fade_in = keyframes`
    0% {opacity: 0 }
    100% {opacity: 1 }
`

const zoom_in = keyframes`
    0% {transform: scale(0) }
    100% {transform: scale(1) }
`

const go_right2 = keyframes`
    0% {transform: translateX(-100%); }
    100% {transform: translateX(0); }
`

const go_left2 = keyframes`
    0% {transform: translateX(50%); }
    100% {transform: translateX(0); }
`

const floaty1 = keyframes`
    0% {transform: translate(0, 12%); }
    100% {transform: translate(0, -12%); }
`

const floaty2 = keyframes`
    0% { transform: translate(0, 25%);}
    100% { transform: translate(0, -25%);}
`

const blinking = keyframes`
    0% { opacity: 0; }
    50% { opacity: 1; }
    100% {opacity: 0;}
`

const OuterContainer = styled.div`
    width: 100%;
    height: 100%;
    max-height: 880px;
    ${bgImg(bg)}
`
const DeviceContainer = styled.div`
    position: absolute;
    left: 33%;
    width: 32%;
    height: 40%;
    top: 55%;
    display: flex;
`

const Device1 = styled.div`
    ${bgImg(device1)}
    width: 44%;
    height: 75%;
    opacity: 0;
    animation: ${zoom_in} 0.7s 0.3s ease-in-out 1 forwards, ${fade_in} 0.7s 0.3s ease-in-out 1 forwards;
`

const Device2 = styled.div`
    ${bgImg(device2)}
    width: 45%;
    height: 92%;
    opacity: 0;
    animation: ${fade_in} 0.7s 0.6s ease-in-out 1 forwards, ${go_right2} 0.7s 0.6s ease-in-out 1 forwards;
`

const Device3 = styled.div`
    ${bgImg(device3)}
    width: 36%;
    height: 89%;
    opacity: 0;
    animation: ${fade_in} 0.7s 0.9s ease-in-out 1 forwards, ${go_left2} 0.7s 0.9s ease-in-out 1 forwards;
`
const Girl = styled.div`
    ${bgImg(girlImg)}
    z-index: 1;
    height: 70%;
    width: 17%;
    position: absolute;
    right: 9%;
    bottom: 0;
    animation: ${go_left2} 1s 0s ease-out 1 forwards;
`

const GirlE = styled.div`
    ${bgImg(girlEye)}
    height: 14%;
    width: 17%;
    position: absolute;
    right: 9%;
    bottom: 56%;
    animation: ${go_left2} 1s 0s ease-out 1 forwards;
    z-index: 2;
`
const ContentContainer = styled.div`
    width: 80%;
    height: 100%;
    position: relative;
    margin: 0 auto;
    max-height: 880px;
    max-width: 1553px;
`

const QrContainer = styled.div`
    margin: 0 auto;
    text-align: center;
`

const QrTitle = styled.div`
    ${(props) => props.theme.typography.H1Headline}
    font-weight: bold;
    color: white;
    padding-top: 10px;
`

const QrDescription = styled.div`
    ${(props) => props.theme.typography.Body2}
    color: white;
    margin-top: 10px;
`

const QrBox = styled.div`
    ${bgImg(qrImg)}
    display: flex;
    justify-content: center;
    width: 180px;
    height: 180px;
    margin: 0 auto;
    padding-top: 20px;
    margin-top: 20px;
`

const Ball = styled.div<{ num: { t: number; x: number; y: number; h: number; w: number; f: any; a: any } }>`
    ${bgImg(ballImg)}
    opacity: 0;
    height: ${(props) => props.num.h}%;
    width: ${(props) => props.num.w}%;
    position: absolute;
    left: ${(props) => props.num.x}%;
    top: ${(props) => props.num.y}%;
    animation: ${zoom_in} ${(props) => props.num.t}s 0s ease-out 1 forwards,
        ${fade_in} ${(props) => props.num.t}s 0s ease-out 1 forwards,
        ${(props) => props.num.f} 3s 0s ease-in-out infinite forwards
        ${(props) => (props.num.a ? 'alternate-reverse' : 'alternate')};
`

const BlinkBlink = styled.div<{ num: { x: number; y: number; t: number } }>`
    position: absolute;
    left: ${(props) => props.num.x}%;
    bottom: ${(props) => props.num.y}%;
    ${bgImg(blink)}
    width: 50px;
    height: 50px;
    opacity: 0;
    animation: ${blinking} 5.5s ${(props) => props.num.t}s ease-in-out infinite forwards;
`

export default () => {
    const t = useTranslation()
    const { qrCodeUrl } = useDownloadApp()
    return (
        <>
            <OuterContainer>
                <ContentContainer>
                    <QrContainer>
                        <QrTitle>{t('downloadApp.title')}</QrTitle>
                        <QrDescription>
                            {t('downloadApp.description.1')}
                            <br />
                            {t('downloadApp.description.2')}
                        </QrDescription>
                        <QrBox>
                            <QRCode url={qrCodeUrl} size={130} />
                        </QrBox>
                    </QrContainer>
                    <DeviceContainer>
                        <Device1 />
                        <Device2 />
                        <Device3 />
                    </DeviceContainer>
                    <Girl />
                    <GirlE />
                    <Ball num={{ t: 0.8, h: 15, w: 10, x: 20, y: 40, f: floaty1, a: Math.random() > 0.5 }} />
                    <Ball num={{ t: 5, h: 8, w: 5, x: 55, y: 40, f: floaty2, a: Math.random() > 0.5 }} />
                    <Ball num={{ t: 2, h: 5, w: 3, x: 69, y: 46, f: floaty2, a: Math.random() > 0.5 }} />
                    <Ball num={{ t: 2, h: 6, w: 4, x: 27, y: 15, f: floaty2, a: Math.random() > 0.5 }} />
                    <Ball num={{ t: 1.5, h: 15, w: 10, x: 75, y: 21, f: floaty1, a: Math.random() > 0.5 }} />
                    <BlinkBlink num={{ x: 35, y: 10, t: 1 }} />
                    <BlinkBlink num={{ x: 44, y: 6, t: 4 }} />
                    <BlinkBlink num={{ x: 51, y: 10, t: 3 }} />
                    <BlinkBlink num={{ x: 59, y: 8, t: 2 }} />
                </ContentContainer>
            </OuterContainer>
            <Footer />
        </>
    )
}
