import styled from 'styled-components/macro'
import { useSelector } from '@redux'
import useTranslation from '@hooks/useTranslation'
import {
    directToEsport,
    directToBoardGame,
    directToSport,
    directToFishHunter,
    directToFriendship,
    directToLottery,
    directToSlotMachine,
    directToLiveCasino,
    directToContactCs,
    directToDownloadApp,
} from '@utils/v1Functions'
import MessageIcon from './messageIcon'
import { ratioHeightForMobile } from '@mixins/ratioLength'
import bgImg from '@mixins/backgroundImg'

import sportImg from '@brand/assets/images/home/mobile/btn_sport.jpg'
import liveCasinoImg from '@brand/assets/images/home/mobile/btn_live.jpg'
import esportImg from '@brand/assets/images/home/mobile/btn_esports.jpg'
import boardGameImg from '@brand/assets/images/home/mobile/btn_board_game.jpg'
import lotteryImg from '@brand/assets/images/home/mobile/btn_lottery.jpg'
import slotMachineImg from '@brand/assets/images/home/mobile/btn_casino.jpg'
import fishHunterImg from '@brand/assets/images/home/mobile/btn_fishhunter.jpg'
import csImg from '@brand/assets/images/home/mobile/btn_service.jpg'
import friendshipImg from '@brand/assets/images/home/mobile/btn_friendship.jpg'
import downloadAppImg from '@brand/assets/images/home/mobile/btn_apps.jpg'

type subTitleColor = 'black' | 'orange'
type textAlign = 'left' | 'right'
type textPosition = 'top' | 'bottom'

interface ILink {
    name: string
    img: string
    color: subTitleColor
    height: number
    textAlign?: textAlign
    textPosition?: textPosition
    onClick: () => void
    dataQa: string
}

const Container = styled.div`
    background-color: #ffffff;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.25);
    border-radius: 6px;
    padding: 0 8px 16px;
    width: 100%;
    margin-bottom: 20px;
`

const STopSection = styled.div`
    padding-top: 20px;
    margin: 0 20px 20px;
    position: relative;
    width: calc(100% - 40px);
    min-height: 135px;
`

const TopSectionMainTitle = styled.div`
    ${(props) => props.theme.typography.H4Headline}
    color: #484848;
`

const TopSectionSubTitle = styled.div`
    ${(props) => props.theme.typography.Body1}
    color: #ff8b00;
`

const ColumnsContainer = styled.div`
    display: flex;
`

const SLink = styled.div`
    position: relative;
`

const LinkImg = styled.div<{ height: number; bg: string }>`
    ${(props) => ratioHeightForMobile(props.height)}
    ${(props) => bgImg(props.bg)}
    width: 100%;
    border-radius: 6px;
`

const Column = styled.div`
    width: 50%;
    padding: 0 4px;

    ${SLink} {
        margin-bottom: 8px;

        &:last-child {
            margin-bottom: 0;
        }
    }
`

const LinkText = styled.div<{ textPosition: textPosition }>`
    position: absolute;
    width: 100%;
    padding: 0 12px;
    ${(props) => `
        ${props.textPosition}: 0;
        margin-${props.textPosition}: 12px;
    `}
`

const LinkMainTitle = styled.div<{ textAlign: textAlign }>`
    ${(props) => props.theme.typography.Subtitle1}
    text-align: ${(props) => props.textAlign};
    color: #ffffff;
`

const LinkSubTitle = styled.div<{ textAlign: textAlign; color: subTitleColor }>`
    ${(props) => props.theme.typography.Body5}
    text-align: ${(props) => props.textAlign};
    color: ${(props) => (props.color === 'black' ? '#818181' : '#7f4500')};
`

const columnA: ILink[] = [
    {
        name: 'sport',
        img: sportImg,
        color: 'orange',
        onClick: directToSport,
        height: 150,
        dataQa: 'btnGoSport',
    },
    {
        name: 'esport',
        img: esportImg,
        color: 'black',
        textAlign: 'left',
        onClick: directToEsport,
        height: 148,
        dataQa: 'btnGoEsport',
    },
    {
        name: 'lottery',
        img: lotteryImg,
        color: 'orange',
        textAlign: 'left',
        onClick: directToLottery,
        height: 126,
        dataQa: 'btnGoLottery',
    },
    {
        name: 'fishHunter',
        img: fishHunterImg,
        color: 'black',
        onClick: directToFishHunter,
        height: 139,
        dataQa: 'btnGoFishHunter',
    },
    {
        name: 'friendship',
        img: friendshipImg,
        color: 'orange',
        textAlign: 'left',
        onClick: directToFriendship,
        height: 131,
        dataQa: 'btnFriendship',
    },
]

const columnB: ILink[] = [
    {
        name: 'liveCasino',
        img: liveCasinoImg,
        color: 'black',
        onClick: directToLiveCasino,
        height: 129,
        dataQa: 'btnGoLiveCasino',
    },
    {
        name: 'boardGame',
        img: boardGameImg,
        color: 'orange',
        onClick: directToBoardGame,
        height: 154,
        dataQa: 'btnGoBoardGame',
    },
    {
        name: 'slotMachine',
        img: slotMachineImg,
        color: 'black',
        onClick: directToSlotMachine,
        height: 150,
        dataQa: 'btnGoSlot',
    },
    {
        name: 'cs',
        img: csImg,
        color: 'orange',
        onClick: directToContactCs,
        height: 131,
        dataQa: 'btnCs',
    },
    {
        name: 'downloadApp',
        img: downloadAppImg,
        color: 'black',
        textPosition: 'bottom',
        onClick: directToDownloadApp,
        height: 131,
        dataQa: 'btnGoDownloadApp',
    },
]

const TopSection: React.FC<{}> = () => {
    const t = useTranslation()
    const brandName = useSelector((state) => state.app.brandInfo.brandName)
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
    const username = useSelector((state) => state.user.userProfile.username)

    return (
        <STopSection>
            <TopSectionMainTitle>{t(`home.topSection.mainTitle`)}</TopSectionMainTitle>
            <TopSectionSubTitle>
                {isLoggedIn ? username : t(`home.topSection.subTitle`, { brandName })}
            </TopSectionSubTitle>
            <MessageIcon />
        </STopSection>
    )
}

const Link: React.FC<ILink> = ({
    name,
    img,
    color,
    onClick,
    height,
    dataQa,
    textAlign = 'right',
    textPosition = 'top',
}) => {
    const t = useTranslation()

    return (
        <SLink data-qa={dataQa} onClick={onClick}>
            <LinkImg height={height} bg={img} />
            <LinkText textPosition={textPosition}>
                <LinkMainTitle textAlign={textAlign}>{t(`home.${name}.mainTitle`)}</LinkMainTitle>
                <LinkSubTitle textAlign={textAlign} color={color}>
                    {t(`home.${name}.subTitle`)}
                </LinkSubTitle>
            </LinkText>
        </SLink>
    )
}

const LinkColumns: React.FC<{}> = () => {
    return (
        <Container>
            <TopSection />
            <ColumnsContainer>
                <Column>
                    {columnA.map(({ name, ...linkProps }) => {
                        return <Link key={`homePage-link-${name}`} name={name} {...linkProps} />
                    })}
                </Column>
                <Column>
                    {columnB.map(({ name, ...linkProps }) => {
                        return <Link key={`homePage-link-${name}`} name={name} {...linkProps} />
                    })}
                </Column>
            </ColumnsContainer>
        </Container>
    )
}

export default LinkColumns
