import styled, { css } from 'styled-components/macro'
import bg from '@brand/assets/images/downloadApp/desktop/background.jpg'
import mobileScreen from '@brand/assets/images/downloadApp/desktop/phone.png'
import headerImage from '@brand/assets/images/downloadApp/desktop/title.png'
import arrow from '@brand/assets/images/downloadApp/desktop/arrow.png'
import iosIcon from '@brand/assets/images/downloadApp/desktop/ios.png'
import androidIcon from '@brand/assets/images/downloadApp/desktop/android.png'
import live from '@brand/assets/images/downloadApp/desktop/live.png'
import lottery from '@brand/assets/images/downloadApp/desktop/lottery.png'
import slot from '@brand/assets/images/downloadApp/desktop/slot.png'
import sports from '@brand/assets/images/downloadApp/desktop/sports.png'
import useTranslation from '@hooks/useTranslation'
import QRCode from '@components/common/qrCode'
import useDownloadApp from '@pages/downloadApp/desktop/hook'
import useCopyRight from '@hooks/useCopyRight'
import bgImg from '@mixins/backgroundImg'

const SMainContainer = styled.div`
    ${bgImg(bg, 'cover')}
    height: 100%;
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    min-height: 768px;
    overflow: hidden;
`
const SInnerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`

const SLeftContainer = styled.div`
    width: 60%;
    position: relative;
`
const SMainPicture = styled.img`
    width: 100%;
`
const SIcon = styled.div<{ bg: string; type: string }>`
    ${(props) => bgImg(props.bg, 'contain')};
    ${(props) => props.type === 'liveCasino' && SIconLive};
    ${(props) => props.type === 'sport' && SIconSports};
    ${(props) => props.type === 'lottery' && SIconLottery};
    ${(props) => props.type === 'slotMachine' && SIconSlot};
    height: 18%;
    width: 18%;
    position: absolute;
`
const SIconLive = css`
    bottom: 20%;
    left: 13%;
`
const SIconLottery = css`
    bottom: 20%;
    right: 18%;
`
const SIconSports = css`
    top: 21%;
    left: 13%;
`
const SIconSlot = css`
    top: 21%;
    right: 18%;
`

const SIconText = styled.div`
    ${(props) => props.theme.typography.Subtitle4}
    width: 100%;
    margin-top: 45%;
    text-align: center;
`
const SRightContainer = styled.div`
    position: relative;
    width: 43%;
    right: 9%;
`
const SHeaderContainer = styled.div`
    position: relative;
    margin-bottom: 18%;
`
const SHeaderImage = styled.img`
    width: 100%;
`
const SHeaderText = styled.div`
    ${(props) => props.theme.typography.Subtitle3}
    position: absolute;
    bottom: 8px;
    right: 8px;
    letter-spacing: 3px;
    font-style: italic;
`
const SArrowImage = styled.img`
    width: 20%;
    left: -11%;
    bottom: 100%;
    position: absolute;
`

const SRightBottomContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 260px;
`

const SQRCodeContainer = styled.div`
    min-width: 280px;
    height: 100%;
    border-left: 35px solid #f6e41b;
    border-right: 3px solid #f6e41b;
    border-top: 3px solid #f6e41b;
    border-bottom: 3px solid #f6e41b;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`
const SQRCode = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 94%;
    height: 94%;
`

const SQRCodeText = styled.div`
    ${(props) => props.theme.typography.Subtitle1}
    position: absolute;
    top: 0px;
    left: -27px;
    width: 18px;
`
const SIOSAndroidContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 55%;
    margin-left: 10px;
`

const SPlatformContainer = styled.div`
    /* width: 351px; */
    height: 120px;
    border: 1px solid #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.1);
`

const SPlatformImage = styled.img`
    height: 80px;
`
const SPlatformTitleContainer = styled.div`
    padding-left: 20px;
`
const SPlatformTitle = styled.div`
    ${(props) => props.theme.typography.H4Headline}
    letter-spacing: 8px;
    text-align: center;
    color: #ffffff;
`
const SPlatformSubTitle = styled.div`
    ${(props) => props.theme.typography.Body2}
    text-align: center;
    color: #e6e6e6;
`
const SSpan = styled.span`
    letter-spacing: 6px;
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
    color: #999999;
    background-color: #252525;
`

const games = [
    {
        name: 'sport',
        icon: sports,
    },
    {
        name: 'slotMachine',
        icon: slot,
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

const DownloadApp = () => {
    const t = useTranslation()
    const { qrCodeUrl, iosAppVersion, androidAppVersion } = useDownloadApp()
    const copyRight = useCopyRight()

    return (
        <SMainContainer>
            <SInnerContainer>
                <SLeftContainer>
                    <SMainPicture src={mobileScreen} alt="" />
                    {games.map((game) => (
                        <SIcon type={game.name} bg={game.icon} key={`game-icon-${game.name}`}>
                            <SIconText>{t(`downloadApp.gameList.${game.name}`)}</SIconText>
                        </SIcon>
                    ))}
                </SLeftContainer>

                <SRightContainer>
                    <SHeaderContainer>
                        <SHeaderImage src={headerImage} />
                        <SHeaderText>{t(`downloadApp.header`)}</SHeaderText>
                    </SHeaderContainer>
                    <SRightBottomContainer>
                        <SArrowImage src={arrow} />
                        <SQRCodeContainer>
                            <SQRCode>
                                <QRCode url={qrCodeUrl} size={230} includeMargin={false} />
                            </SQRCode>

                            <SQRCodeText>{t(`downloadApp.qrCodeDescription`)}</SQRCodeText>
                        </SQRCodeContainer>

                        <SIOSAndroidContainer>
                            <SPlatformContainer>
                                <SPlatformImage src={iosIcon} />
                                <SPlatformTitleContainer>
                                    <SPlatformTitle>{t(`downloadApp.iosHeader`)}</SPlatformTitle>
                                    <div data-qa="txtSupportVerIOS">
                                        <SPlatformSubTitle>
                                            <SSpan>{t(`downloadApp.appPlatform.ios.description.span1`)}</SSpan>
                                        </SPlatformSubTitle>
                                        <SPlatformSubTitle>
                                            <SSpan>
                                                {t(`downloadApp.appPlatform.ios.description.span2`, {
                                                    appVersion: iosAppVersion,
                                                })}
                                            </SSpan>
                                        </SPlatformSubTitle>
                                    </div>
                                </SPlatformTitleContainer>
                            </SPlatformContainer>
                            <SPlatformContainer>
                                <SPlatformImage src={androidIcon} />
                                <SPlatformTitleContainer>
                                    <SPlatformTitle>{t(`downloadApp.androidHeader`)}</SPlatformTitle>
                                    <div data-qa="txtSupportVerAn">
                                        <SPlatformSubTitle>
                                            <SSpan>{t(`downloadApp.appPlatform.android.description.span1`)}</SSpan>
                                        </SPlatformSubTitle>
                                        <SPlatformSubTitle>
                                            <SSpan>
                                                {t(`downloadApp.appPlatform.android.description.span2`, {
                                                    appVersion: androidAppVersion,
                                                })}
                                            </SSpan>
                                        </SPlatformSubTitle>
                                    </div>
                                </SPlatformTitleContainer>
                            </SPlatformContainer>
                        </SIOSAndroidContainer>
                    </SRightBottomContainer>
                </SRightContainer>
            </SInnerContainer>
            <Footer>{copyRight}</Footer>
        </SMainContainer>
    )
}

export default DownloadApp
