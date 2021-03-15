import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'
import useDownloadApp from '@pages/downloadApp/desktop/hook'
import Footer from '@brand/components/desktop/footer'

import BgImage from '@brand/assets/images/downloadApp/bg.jpg'
import Phone from '@brand/assets/images/downloadApp/phone.png'
import Title from '@brand/assets/images/downloadApp/title.png'
import Icons1 from '@brand/assets/images/downloadApp/1.png'
import Icons2 from '@brand/assets/images/downloadApp/2.png'
import Icons3 from '@brand/assets/images/downloadApp/3.png'
import Icons4 from '@brand/assets/images/downloadApp/4.png'
import IosIcon from '@brand/assets/images/downloadApp/btn_apple.png'
import AndroidIcon from '@brand/assets/images/downloadApp/btn_android.png'
import QrCode from '@components/common/qrCode'

import bgImg from '@mixins/backgroundImg'

const BgContainer = styled.div`
    ${bgImg(BgImage)}
    width: 100vw;
    height: 870px;
    display: flex;
    align-items: center;
`

const PhoneImage = styled.div`
    ${bgImg(Phone)};
    width: 769px;
    height: 736px;
`

const RightContainer = styled.div`
    margin-left: 25px;
    max-width: 550px;
`

const TitleContainer = styled.div`
    ${bgImg(Title)};
    position: relative;
    right: 165px;
    width: 668px;
    height: 181px;
    top: 30px;
`

const ContentContainer = styled.div`
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ProductContainer = styled.div`
    width: 100%;
    padding-top: 75px;
`

const ProductList = styled.div`
    margin-top: 10px;
    display: flex;
`

const ProductItem = styled.div<{ icon: string }>`
    ${(props) => bgImg(props.icon, 'contain')};
    ${(props) => props.theme.typography.Subtitle1};
    display: flex;
    justify-content: center;
    align-items: center;
    color: #4b7feb;
    width: 125px;
    height: 125px;
    margin-left: 15px;
`

const ProductTitle = styled.div`
    ${(props) => props.theme.typography.Body1};
    background-color: #225095;
    color: #ffffff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px 15px;
`

const QrContainer = styled.div`
    display: flex;
    margin-top: 20px;
`

const QrButton = styled.div`
    margin-left: 20px;
`

const AppPlatformButton = styled.div<{ ios?: boolean }>`
    ${(props) => bgImg(props.ios ? IosIcon : AndroidIcon, 'contain')};
    ${(props) => props.theme.typography.H4Headline}
    font-weight: bold;
    width: 320px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #ffffff;
    padding: 0 20px 0 80px;
    margin-top: 20px;

    div:last-child {
        ${(props) => props.theme.typography.Body3};
        max-width: 140px;
    }
`

export default () => {
    const t = useTranslation()
    const { qrCodeUrl, iosAppVersion, androidAppVersion } = useDownloadApp()

    return (
        <>
            <BgContainer>
                <ContentContainer>
                    <PhoneImage />
                    <RightContainer>
                        <TitleContainer />
                        <ProductContainer>
                            <ProductTitle>{t('downloadApp.product')} :</ProductTitle>
                            <ProductList>
                                <ProductItem icon={Icons1}> {t('downloadApp.gameList.sport')}</ProductItem>
                                <ProductItem icon={Icons2}> {t('downloadApp.gameList.slotMachine')}</ProductItem>
                                <ProductItem icon={Icons3}> {t('downloadApp.gameList.liveCasino')}</ProductItem>
                                <ProductItem icon={Icons4}> {t('downloadApp.gameList.lottery')}</ProductItem>
                            </ProductList>
                            <QrContainer>
                                <QrCode url={qrCodeUrl} size={220} includeMargin={false} />
                                <QrButton>
                                    <AppPlatformButton ios data-qa="imgiOSDownload">
                                        <div>{t('downloadApp.apple')}</div>
                                        <div>
                                            {t('downloadApp.system')} :
                                            <br />
                                            {t(`downloadApp.appPlatform.ios.description.span2`, {
                                                appVersion: iosAppVersion,
                                            })}
                                        </div>
                                    </AppPlatformButton>
                                    <AppPlatformButton data-qa="imgAndroidDownload">
                                        <div>{t('downloadApp.android')}</div>
                                        <div>
                                            {t('downloadApp.system')} :
                                            <br />
                                            {t(`downloadApp.appPlatform.android.description.span2`, {
                                                appVersion: androidAppVersion,
                                            })}
                                        </div>
                                    </AppPlatformButton>
                                </QrButton>
                            </QrContainer>
                        </ProductContainer>
                    </RightContainer>
                </ContentContainer>
            </BgContainer>
            <Footer />
        </>
    )
}
