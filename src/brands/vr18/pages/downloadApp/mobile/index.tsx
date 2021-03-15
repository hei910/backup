import styled from 'styled-components/macro'
import Bg from '@brand/assets/images/downloadApp/mobile/bg.jpg'
import TitleLogo from '@brand/assets/images/downloadApp/title.png'
import ImgPhone from '@brand/assets/images/downloadApp/mobile/phone.png'
import IconApple from '@brand/assets/images/downloadApp/icon_apple.png'
import IconAndroid from '@brand/assets/images/downloadApp/icon_android.png'
import IconFAQ from '@brand/assets/images/downloadApp/mobile/icon_faq.png'
import Icon01 from '@brand/assets/images/downloadApp/icon01.png'
import Icon02 from '@brand/assets/images/downloadApp/icon02.png'
import Icon03 from '@brand/assets/images/downloadApp/icon03.png'
import Icon04 from '@brand/assets/images/downloadApp/icon04.png'
import Icon05 from '@brand/assets/images/downloadApp/icon05.png'
import useTranslation from '@hooks/useTranslation'
import useDownloadApp from '@pages/downloadApp/mobile/hook'
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
    width: 100%;
    padding: 10px 0;
    position: relative;
    background-color: #000000;
    ${bgImg(Bg, 'cover')}
`

const Title = styled.div`
    width: 85%;
    height: 10vh;
    margin: 0 auto;
    ${bgImg(TitleLogo)};
    background-size: contain;
`

const SImgPhone = styled.div`
    width: 100%;
    height: 350px;
    margin-top: 15px;
    ${bgImg(ImgPhone, 'contain')}
`

const BtnGroup = styled.div`
    width: 90%;
    margin: 0 auto;
`

const SButton = styled.div`
    width: 100%;
    min-width: 290px;
    margin: 10px auto;
    border-radius: 15px;
    padding: 10px;
    background-image: linear-gradient(to bottom, #18b183, #075b42);
    color: #ffffff;
    text-align: center;
    ${(props) => props.theme.typography.Subtitle2}
`

const STutorialButton = styled(SButton)`
    background-image: linear-gradient(#535353, #3a3a3a);
`

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const AppIcon = styled.img<{ width: number }>`
    margin-right: 12px;
    width: ${(props) => props.width}px;
`

const AppTextContainer = styled.div`
    text-align: left;
`

const AppTitle = styled.div`
    ${(props) => props.theme.typography.Subtitle2}
`

const AppSystem = styled.div`
    ${(props) => props.theme.typography.Body6}
`

const AppText = styled.div`
    ${(props) => props.theme.typography.Body3}
`

const ContentContainer = styled.div`
    width: 100%;
    background-color: #04151a;
`

const Content = styled.div`
    width: 90%;
    margin: 0 auto;
`

const Description = styled.div`
    width: 100%;
    color: #ffffff;
    margin-bottom: 10px;
    ${(props) => props.theme.typography.Body4}
`

const ProductTitle = styled.div`
    width: auto;
    display: inline-block;
    padding: 4px 8px;
    background-color: #1a8867;
    color: #ffe24a;
    text-align: center;
    ${(props) => props.theme.typography.Body1}
`

const GameList = styled.div`
    width: 100%;
    padding: 12px 0;
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: center;
    flex-wrap: wrap;
`

const GameIcon = styled.img`
    max-width: 100px;
    width: 100%;
`

const GameBlock = styled.div`
    width: 33.33%;
    text-align: center;
`

const GameText = styled.div`
    text-align: center;
    color: white;
    ${(props) => props.theme.typography.Body3}
`

interface IDownloadBlock {
    appVersion: string
    onClick: () => void
}

interface IIosDownloadBlock extends IDownloadBlock {
    onTutorClick: () => void
}

const AndroidDownloadBlock: React.FC<IDownloadBlock> = ({ appVersion, onClick }) => {
    const t = useTranslation()

    return (
        <SButton data-qa="btnDownload" onClick={onClick}>
            <ButtonContainer>
                <AppIcon src={IconAndroid} width={48} />
                <AppTextContainer>
                    <AppTitle>{t('downloadApp.downloadAndroid')}</AppTitle>
                    <AppSystem data-qa="txtSupportVer">{`${t(
                        'downloadApp.appPlatform.android.description.span1',
                    )}: ${t('downloadApp.appPlatform.android.description.span2', { appVersion })}`}</AppSystem>
                </AppTextContainer>
            </ButtonContainer>
        </SButton>
    )
}

const IosDownloadBlock: React.FC<IIosDownloadBlock> = ({ appVersion, onClick, onTutorClick }) => {
    const t = useTranslation()

    return (
        <>
            <SButton data-qa="btnDownload" onClick={onClick}>
                <ButtonContainer>
                    <AppIcon src={IconApple} width={45} />
                    <AppTextContainer>
                        <AppTitle>{t('downloadApp.downloadIOS')}</AppTitle>
                        <AppSystem data-qa="txtSupportVer">{`${t(
                            'downloadApp.appPlatform.ios.description.span1',
                        )}: ${t('downloadApp.appPlatform.ios.description.span2', { appVersion })}`}</AppSystem>
                        <AppText>{t('downloadApp.safari')}</AppText>
                    </AppTextContainer>
                </ButtonContainer>
            </SButton>
            <STutorialButton data-qa="btnDownloadTutorial" onClick={onTutorClick}>
                <ButtonContainer>
                    <AppIcon src={IconFAQ} width={25} />
                    <AppTitle>{t('downloadApp.tutorial')}</AppTitle>
                </ButtonContainer>
            </STutorialButton>
        </>
    )
}

const DownloadApp: React.FC<{}> = () => {
    const t = useTranslation()
    const { brandName, isIos, appVersion, showRegisterModal, onDownloadClick, status, onHowClick } = useDownloadApp()

    return (
        <>
            <PageContainer>
                <Title />
                <SImgPhone />
                <BtnGroup>
                    {status === 'needLogin' && (
                        <SButton data-qa="btnAppRegister2" onClick={showRegisterModal}>
                            {t('downloadApp.register')}
                        </SButton>
                    )}
                    {status === 'comingSoon' && <SButton>{t('downloadApp.comingSoon')}</SButton>}
                    {status === 'available' &&
                        (isIos() ? (
                            <IosDownloadBlock
                                onClick={onDownloadClick}
                                onTutorClick={onHowClick}
                                appVersion={appVersion}
                            />
                        ) : (
                            <AndroidDownloadBlock onClick={onDownloadClick} appVersion={appVersion} />
                        ))}
                </BtnGroup>
            </PageContainer>
            <ContentContainer>
                <Content>
                    <Description>
                        {`${t('downloadApp.description.1')}${t(
                            'downloadApp.description.2',
                        )}${t('downloadApp.description.3', { brandName })}`}
                    </Description>
                    <ProductTitle>{t('downloadApp.appSupportDescription')}：</ProductTitle>
                    <GameList>
                        {games.map((game, index) => {
                            return (
                                <GameBlock key={`game-icon-${index}`}>
                                    <GameIcon src={game.icon} />
                                    <GameText>{t(`downloadApp.gameList.${game.name}`)}</GameText>
                                </GameBlock>
                            )
                        })}
                    </GameList>
                </Content>
            </ContentContainer>
        </>
    )
}

export default DownloadApp
