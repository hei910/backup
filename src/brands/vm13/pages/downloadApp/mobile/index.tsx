import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'

import useDownloadApp from '@pages/downloadApp/mobile/hook'

import bgImg from '@brand/assets/images/downloadApp/mobile/bg.png'
import apple from '@brand/assets/images/downloadApp/mobile/apple.svg'
import android from '@brand/assets/images/downloadApp/mobile/android.svg'
import icon1 from '@brand/assets/images/downloadApp/mobile/icon1.svg'
import icon2 from '@brand/assets/images/downloadApp/mobile/icon2.svg'
import icon3 from '@brand/assets/images/downloadApp/mobile/icon3.svg'
import icon4 from '@brand/assets/images/downloadApp/mobile/icon4.svg'
import icon5 from '@brand/assets/images/downloadApp/mobile/icon5.svg'
import { DownloadButtonStatus } from '@services/download/types'

const gameList = [
    {
        name: 'sport',
        icon: icon1,
    },
    {
        name: 'liveCasino',
        icon: icon2,
    },
    {
        name: 'casino',
        icon: icon3,
    },
    {
        name: 'lottery',
        icon: icon4,
    },
    {
        name: 'fishHunter',
        icon: icon5,
    },
]

const OuterContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: #e8e8e8;
`
const BgContainer = styled.div`
    height: 270px;
    width: 100%;
    background-image: url(${bgImg});
    background-size: auto 121%;
    background-position: bottom;
    position: relative;
`

const SystemContainer = styled.div`
    background-color: #fff;
    width: 123px;
    height: 92px;
    border-top-left-radius: 23px;
    border-bottom-left-radius: 23px;
    position: absolute;
    bottom: 38px;
    right: 0;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    line-height: 1.5;
    padding: 10px 0;
    font-size: 9px;
    text-align: center;

    > span {
        font-weight: bold;
        font-size: 12px;
    }

    > img {
        width: 35px;
        height: 38px;
    }
`

const Title = styled.div`
    width: 100%;
    margin: 10px 0px;
    text-align: center;
    ${(props) => props.theme.typography.H4Headline};
    font-weight: bold;

    > span {
        background: linear-gradient(180deg, #fcca2c 0%, #ea8808 100%);
        background-clip: text;
        /* stylelint-disable-next-line */
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
`

const GameList = styled.div`
    position: relative;
    width: 95%;
    height: 90px;
    border-radius: 10px;
    border: solid 1px #1d1d1d;
    margin: 20px auto 40px auto;
    display: flex;
    align-items: center;
    justify-content: space-around;
`

const GameItem = styled.div`
    width: 49px;
    height: 80%;
    font-size: 11px;
    text-align: center;
`

const ProductTitle = styled.div`
    width: 112px;
    height: 21px;
    font-size: 12px;
    border-radius: 16px;
    background-color: #000000;
    position: absolute;
    color: white;
    bottom: -10px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Button = styled.div`
    font-weight: bold;
    width: 210px;
    height: 55px;
    border-radius: 11px;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.16);
    border: solid 2px #fccb2c;
    background-image: linear-gradient(to top, #e9b303, #fccb2c);
    margin: 10px auto;
    ${(props) => props.theme.typography.Subtitle1}
    display: flex;
    justify-content: center;
    align-items: center;
`

const ContentContainer = styled.div`
    max-width: 700px;
    margin: 0 auto;
    padding-bottom: 50px;
    text-align: center;
`

const Ending = styled.div`
    margin-top: 22px;
    font-size: 14px;
`

export default () => {
    const t = useTranslation()
    const { isIos, appVersion, platform, status, onDownloadClick, onHowClick, showRegisterModal } = useDownloadApp()

    const androidBtn: Record<DownloadButtonStatus, any> = {
        needLogin: (
            <Button data-qa="btnAppRegister2" onClick={showRegisterModal}>
                {t('downloadApp.register')}
            </Button>
        ),
        available: (
            <Button data-qa="btnDownload" onClick={onDownloadClick}>
                {t('downloadApp.downloadNow')}
            </Button>
        ),
        comingSoon: <Button>{t('downloadApp.comingSoon')}</Button>,
    }

    const iosBtn: Record<DownloadButtonStatus, any> = {
        needLogin: (
            <Button data-qa="btnAppRegister2" onClick={showRegisterModal}>
                {t('downloadApp.register')}
            </Button>
        ),
        available: (
            <>
                <Button data-qa="btnDownload" onClick={onDownloadClick}>
                    {t('downloadApp.downloadNow')}
                </Button>
                <Button data-qa="btnDownloadTutorial" onClick={onHowClick}>
                    {t('downloadApp.how')}
                </Button>
            </>
        ),
        comingSoon: <Button>{t('downloadApp.comingSoon')}</Button>,
    }

    const buttonGroup: Record<typeof platform, Record<DownloadButtonStatus, any>> = {
        ios: iosBtn,
        android: androidBtn,
    }

    return (
        <OuterContainer>
            <BgContainer>
                <SystemContainer data-qa="txtSupportVer">
                    <img src={isIos() ? apple : android} />
                    <br />
                    <span>{t(`downloadApp.${platform}.message1`)}</span>
                    <br />
                    {t(`downloadApp.${platform}.message2`, { appVersion })}
                </SystemContainer>
            </BgContainer>
            <ContentContainer>
                <Title>
                    <span>{t('downloadApp.content1')},</span>
                    <br />
                    <span>{t('downloadApp.content2')}</span>
                </Title>
                <GameList>
                    {gameList.map((game) => (
                        <GameItem key={game.name}>
                            <img src={game.icon} />
                            {t(`downloadApp.gameList.${game.name}`)}
                        </GameItem>
                    ))}
                    <ProductTitle>{t('downloadApp.appSupportDescription')}</ProductTitle>
                </GameList>
                {buttonGroup[platform][status]}

                <Ending>{t('downloadApp.enjoy')}</Ending>
            </ContentContainer>
        </OuterContainer>
    )
}
