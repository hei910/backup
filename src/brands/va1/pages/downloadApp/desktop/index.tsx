import styled from 'styled-components/macro'
import bg from '@brand/assets/images/downloadApp/desktop/bg.jpg'
import btnBg from '@brand/assets/images/downloadApp/desktop/dl-btn-bg.png'
import androidIcon from '@brand/assets/images/downloadApp/desktop/an-icon.png'
import iosIcon from '@brand/assets/images/downloadApp/desktop/ios-icon.png'
import title from '@brand/assets/images/downloadApp/desktop/title.png'
import useTranslation from '@hooks/useTranslation'
import useDownloadApp from '@pages/downloadApp/desktop/hook'
import QrCode from '@components/common/qrCode'
import Footer from '@brand/components/desktop/footer'
import bgImg from '@mixins/backgroundImg'

const SDownloadAppPage = styled.div`
    ${bgImg(bg, 'cover')}
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`

const ContentContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 676px;
    height: 100%;
    top: 0px;
    left: 320px;
    bottom: 80px;
`

const Title = styled.div`
    ${bgImg(title, 'contain')}
    padding-top: 10px;
    width: 100%;
    height: 250px;
`

const HightLightBox = styled.div`
    ${(props) => props.theme.typography.Subtitle2}
    padding: 7px 35px;
    margin-bottom: 10px;
    color: #ffffff;
    background-color: rgba(0, 0, 0, 0.5);
`

const RegularText = styled.p`
    ${(props) => props.theme.typography.Body2}
    color: #FFFFFF;
    margin: 0;
    text-align: center;
`

const DownloadContainer = styled.div`
    display: flex;
    padding-top: 20px;
`

const DlBtnContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
    padding-left: 35px;
`

const DlBtn = styled.div`
    ${(props) => props.theme.typography.H4Headline}
    ${bgImg(btnBg, 'contain')}
    display: flex;
    align-items: center;
    padding-left: 55px;
    width: 354px;
    height: 90px;
    transition-duration: 0.3s;
`

const BtnIcon = styled.div`
    position: relative;
    bottom: 2px;
    width: 45px;
    height: 55px;
    margin-right: 20px;
    transition-duration: 0.3s;
`

const AnDlBtn = styled(DlBtn)`
    color: #97c024;

    ${BtnIcon} {
        ${bgImg(androidIcon, 'contain')}
    }
`

const IosDlBtn = styled(DlBtn)`
    color: #3496d9;

    ${BtnIcon} {
        ${bgImg(iosIcon, 'contain')}
    }
`

const DownloadApp: React.FC<{}> = () => {
    const t = useTranslation()
    const { qrCodeUrl, brandName } = useDownloadApp()

    return (
        <>
            <SDownloadAppPage>
                <ContentContainer>
                    <Title />
                    <HightLightBox>{t('downloadApp.highlightText')}</HightLightBox>
                    <RegularText>{t('downloadApp.description.span1')}</RegularText>
                    <RegularText>{t('downloadApp.description.span2')}</RegularText>
                    <RegularText>{t('downloadApp.description.span3', { brandName })}</RegularText>
                    <DownloadContainer>
                        <QrCode url={qrCodeUrl} size={220} />
                        <DlBtnContainer>
                            <IosDlBtn data-qa="imgiOSDownload">
                                <BtnIcon />
                                {t('downloadApp.iosDlBtn')}
                            </IosDlBtn>
                            <AnDlBtn data-qa="imgAndroidDownload">
                                <BtnIcon />
                                {t('downloadApp.anDlBtn')}
                            </AnDlBtn>
                        </DlBtnContainer>
                    </DownloadContainer>
                </ContentContainer>
            </SDownloadAppPage>
            <Footer />
        </>
    )
}

export default DownloadApp
