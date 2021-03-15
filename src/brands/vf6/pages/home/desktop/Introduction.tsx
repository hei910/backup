import styled from 'styled-components/macro'

import coverImage from '@brand/assets/images/home/main-shit.png'
import playIcon from '@brand/assets/images/home/play-button@2x.png'
import sportBanner from '@brand/assets/images/home/sport-section@2x.png'

import dealerBanner from '@brand/assets/images/home/real-dealer-section@2x.png'
import chessBanner from '@brand/assets/images/home/chess-section@2x.png'
import slotBanner from '@brand/assets/images/home/slot-section@2x.png'
import lotteryBanner from '@brand/assets/images/home/lottery-section@2x.png'
import fishBanner from '@brand/assets/images/home/fish-section@2x.png'

import custIcon from '@brand/assets/images/home/icon-custmo@3x.png'
import exchangeIcon from '@brand/assets/images/home/icon-exchange@3x.png'
import joystickIcon from '@brand/assets/images/home/icon-joystiuck@3x.png'
import soccerIcon from '@brand/assets/images/home/Icon-sport-soccer@3x.png'

import useTranslation from '@hooks/useTranslation'

import bgImg from '@mixins/backgroundImg'

import {
    directToSport,
    directToLiveCasino,
    directToBoardGame,
    directToCasinoDt,
    directToLottery,
    directToFishHunter,
    directToTransfer,
    directToLiveChat,
} from '@utils/v1Functions'

const SLayout = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
`

const SLeftInfoLayout = styled.div`
    position: absolute;
    left: 100px;
    top: 50%;
    right: 30%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    z-index: 3;
`

const SRightInfoLayout = styled.div`
    position: absolute;
    right: 0;
    left: 40%;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
    z-index: 2;
`

const SCoverImage = styled.img`
    max-width: 484.2px;
    max-height: 545.2px;
    width: 100%;
    height: 100%;
`

const SBadge = styled.span`
    padding: 3px 10px;
    border-radius: 10px;
    background: #e02020;
    font-size: 13px;
    color: #fff;
`

const SLiveText = styled.div`
    font-size: 56px;
    margin: 15px 0;
    font-weight: bold;
`

const SRedText = styled.span`
    color: #e02020;
`

const SDescriptionText = styled.div`
    font-size: 18px;
    color: #6d7278;
    margin-bottom: 8px;
`

const SPlayButton = styled.div`
    ${bgImg(playIcon, 'cover', 'no-repeat')}
    height: 30px;
    width: 70px;
    margin-right: 10px;
    font-weight: bold;
    cursor: pointer;
`

const SPlayLayout = styled.div`
    display: flex;
    align-items: center;
    font-weight: bold;
    margin-top: 20px;
`

const SIconBannerLayout = styled.div`
    display: flex;
    width: 360px;
    justify-content: space-between;
    margin-top: 20px;
`

const SBannerLayout = styled.div`
    display: flex;
    width: 108px;
    flex-direction: column;
    cursor: pointer;
`

const SBanner = styled.div<{ type: string }>`
    ${(props) => props.type === 'sport' && bgImg(sportBanner, 'cover', 'no-repeat')};
    ${(props) => props.type === 'dealer' && bgImg(dealerBanner, 'cover', 'no-repeat')};
    ${(props) => props.type === 'chess' && bgImg(chessBanner, 'cover', 'no-repeat')};
    ${(props) => props.type === 'slot' && bgImg(slotBanner, 'cover', 'no-repeat')};
    ${(props) => props.type === 'lottery' && bgImg(lotteryBanner, 'cover', 'no-repeat')};
    ${(props) => props.type === 'fish' && bgImg(fishBanner, 'cover', 'no-repeat')};
    height: 69px;
    width: 108px;
`

const SBannerText = styled.div`
    width: 100%;
    text-align: center;
    margin-top: 10px;
    font-size: 13px;
    color: #6d7278;
`

const SIconLayout = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 30px;
    bottom: 100px;
`

const SIcon = styled.img<{ type: string }>`
    margin-bottom: 20px;
    width: ${(props) => (props.type === 'service' ? '24.5px' : '25px')};
    height: ${(props) => (props.type === 'service' ? '20.3px' : '25px')};
    cursor: pointer;
`

type ISectionData = {
    imageType: 'sport' | 'dealer' | 'chess' | 'slot' | 'lottery' | 'fish'
    title: string
    action: () => void
}

type IIconNavigateItem = {
    icon: any
    title: string
    action: () => void
    type: string
}

const Introduction = () => {
    const t = useTranslation()

    const iconNavigateList: IIconNavigateItem[] = [
        {
            icon: custIcon,
            title: t('home.contact'),
            action: directToLiveChat,
            type: 'service',
        },
        {
            icon: exchangeIcon,
            title: t('home.transfer'),
            action: directToTransfer,
            type: 'transfer',
        },
        {
            icon: joystickIcon,
            title: t('home.lottery'),
            action: directToLottery,
            type: 'lottery',
        },
        {
            icon: soccerIcon,
            title: t('home.sport'),
            action: directToSport,
            type: 'sport',
        },
    ]

    const sectionRow1Data: ISectionData[] = [
        {
            imageType: 'sport',
            title: t('home.brandSport'),
            action: directToSport,
        },
        {
            imageType: 'dealer',
            title: t('home.liveCasino'),
            action: directToLiveCasino,
        },
        {
            imageType: 'chess',
            title: t('home.chess'),
            action: directToBoardGame,
        },
    ]

    const sectionRow2Data: ISectionData[] = [
        {
            imageType: 'slot',
            title: t('home.slot'),
            action: directToCasinoDt,
        },
        {
            imageType: 'lottery',
            title: t('home.lottery'),
            action: directToLottery,
        },
        {
            imageType: 'fish',
            title: t('home.fish'),
            action: directToFishHunter,
        },
    ]

    const pageDirection = [sectionRow1Data, sectionRow2Data]

    return (
        <SLayout>
            <SLeftInfoLayout>
                <div>
                    <SBadge>{t('home.liveMatch')}</SBadge>
                </div>
                <SLiveText>
                    {t('home.hd')} <SRedText>LIVE</SRedText> {t('home.broadcast')}
                </SLiveText>
                <SDescriptionText>{t('home.textRow1')}</SDescriptionText>
                <SDescriptionText>{t('home.textRow2')}</SDescriptionText>
                <SDescriptionText>{t('home.textRow3')}</SDescriptionText>
                <SDescriptionText>{t('home.textRow4')}</SDescriptionText>
                <SPlayLayout>
                    <SPlayButton onClick={directToSport} data-qa="btnPlay"/>
                    {t('home.betNow')}
                </SPlayLayout>

                {pageDirection.map((sections, index) => {
                    return (
                        <SIconBannerLayout key={index}>
                            {sections.map((section) => {
                                return (
                                    <SBannerLayout key={section.imageType} onClick={section.action} data-qa={`btn${section.imageType}`}>
                                        <SBanner type={section.imageType} />
                                        <SBannerText>{section.title}</SBannerText>
                                    </SBannerLayout>
                                )
                            })}
                        </SIconBannerLayout>
                    )
                })}
            </SLeftInfoLayout>
            <SRightInfoLayout>
                <SCoverImage src={coverImage} />
            </SRightInfoLayout>

            <SIconLayout>
                {iconNavigateList.map((item, index) => {
                    return (
                        <SIcon type={item.type} title={item.title} key={index} src={item.icon} onClick={item.action} data-qa={`btnIconLayout${index + 1}`} />
                    )
                })}
            </SIconLayout>
        </SLayout>
    )
}

export default Introduction
