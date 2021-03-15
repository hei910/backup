import styled from 'styled-components/macro'
import { useSelector } from '@redux'
import sportCardImg from '@brand/assets/images/home/mobile/sport.png'
import kyCardImg from '@brand/assets/images/home/mobile/ky.png'
import agCardImg from '@brand/assets/images/home/mobile/ag.png'
import bgCardImg from '@brand/assets/images/home/mobile/bg.png'
import lotteryCardImg from '@brand/assets/images/home/mobile/lottery.png'
import dtCardImg from '@brand/assets/images/home/mobile/dt.png'
import mgCardImg from '@brand/assets/images/home/mobile/mg.png'
import ptCardImg from '@brand/assets/images/home/mobile/pt.png'
import pgCardImg from '@brand/assets/images/home/mobile/pg.png'
import cq9CardImg from '@brand/assets/images/home/mobile/cq9.png'
import jdbCardImg from '@brand/assets/images/home/mobile/jdb.png'
import sportMaintenanceCardImg from '@brand/assets/images/home/mobile/sport-disable.png'
import lotteryMaintenanceCardImg from '@brand/assets/images/home/mobile/lottery-disable.png'
import esportMaintenanceCardImg from '@brand/assets/images/home/mobile/esport-disable.png'
import kyMaintenanceCardImg from '@brand/assets/images/home/mobile/ky-disable.png'
import agMaintenanceCardImg from '@brand/assets/images/home/mobile/ag-disable.png'
import bgMaintenanceCardImg from '@brand/assets/images/home/mobile/bg-disable.png'
import fishHunterMaintenanceCardImg from '@brand/assets/images/home/mobile/fish-hunter-disable.png'
import dtMaintenanceCardImg from '@brand/assets/images/home/mobile/dt-disable.png'
import mgMaintenanceCardImg from '@brand/assets/images/home/mobile/mg-disable.png'
import ptMaintenanceCardImg from '@brand/assets/images/home/mobile/pt-disable.png'
import pgMaintenanceCardImg from '@brand/assets/images/home/mobile/pg-disable.png'
import cq9MaintenanceCardImg from '@brand/assets/images/home/mobile/cq9-disable.png'
import jdbMaintenanceCardImg from '@brand/assets/images/home/mobile/jdb-disable.png'
import fishHunterCardImg from '@brand/assets/images/home/mobile/fish-hunter.png'
import esportCardImg from '@brand/assets/images/home/mobile/esport.png'
import Section from './section'
import SectionCard from './sectionCard'
import JetsoSlides from './jetsoSlides'
import Avatar from './avatar'
import { IGameSectionProps } from './types'
import { getSupplierRedirectFunc, directToJetso } from '@utils/v1Functions'
import useTranslation from '@hooks/useTranslation'
import jetsoDetailImg from '@brand/assets/images/home/mobile/jetso-detail.png'
import bgImg from '@mixins/backgroundImg'
import { ratioHeightForMobile } from '@mixins/ratioLength'
import GameSuppliers from '@constants/gameSuppliers'
import GameTypes, { GameTypeSupplierMap } from '@constants/gameTypes'
import AutoWrapContainer from '@components/common/autoWrapContainer'

const SHomePage = styled.div`
    width: 100%;
    background-color: #0c186c;
`

const ContentWrapper = styled.div`
    width: 100%;
    background-color: #ffffff;
    border-radius: 30px;
`

const Sections = styled.div`
    padding: 0 15px 40px;
`

const SectionContainer = styled.div`
    width: 100%;
`

const SizeBox = styled.div`
    width: 100%;
    height: 20px;
`

const JetsoDetailCard = styled.div`
    ${(props) => props.theme.typography.H3Headline}
    ${bgImg(jetsoDetailImg, 'cover')}
    ${ratioHeightForMobile(98)};
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    width: 100%;
    border-radius: 15px;
    margin-top: 40px;
`

const supplierGameImg: Record<GameTypes, Record<string, string>> = {
    [GameTypes.livecasino]: {
        [GameSuppliers.ag]: agCardImg,
        [GameSuppliers.bg]: bgCardImg,
    },
    [GameTypes.slotmachine]: {
        [GameSuppliers.dt]: dtCardImg,
        [GameSuppliers.mg]: mgCardImg,
        [GameSuppliers.pt]: ptCardImg,
        [GameSuppliers.pg]: pgCardImg,
        [GameSuppliers.cq9]: cq9CardImg,
        [GameSuppliers.jdb]: jdbCardImg,
    },
    [GameTypes.fishhunter]: {
        [GameSuppliers.ag]: fishHunterCardImg,
    },
    [GameTypes.lottery]: {
        [GameSuppliers.loto]: lotteryCardImg,
    },
    [GameTypes.boardgame]: {
        [GameSuppliers.ky]: kyCardImg,
    },
    [GameTypes.esport]: {
        [GameSuppliers.avia]: esportCardImg,
    },
    [GameTypes.sport]: {
        [GameSuppliers.sport]: sportCardImg,
    },
}

const supplierMaintenanceImg: Record<GameTypes, Record<string, string>> = {
    [GameTypes.livecasino]: {
        [GameSuppliers.ag]: agMaintenanceCardImg,
        [GameSuppliers.bg]: bgMaintenanceCardImg,
    },
    [GameTypes.slotmachine]: {
        [GameSuppliers.dt]: dtMaintenanceCardImg,
        [GameSuppliers.mg]: mgMaintenanceCardImg,
        [GameSuppliers.pt]: ptMaintenanceCardImg,
        [GameSuppliers.pg]: pgMaintenanceCardImg,
        [GameSuppliers.cq9]: cq9MaintenanceCardImg,
        [GameSuppliers.jdb]: jdbMaintenanceCardImg,
    },
    [GameTypes.fishhunter]: {
        [GameSuppliers.ag]: fishHunterMaintenanceCardImg,
    },
    [GameTypes.lottery]: {
        [GameSuppliers.loto]: lotteryMaintenanceCardImg,
    },
    [GameTypes.boardgame]: {
        [GameSuppliers.ky]: kyMaintenanceCardImg,
    },
    [GameTypes.esport]: {
        [GameSuppliers.avia]: esportMaintenanceCardImg,
    },
    [GameTypes.sport]: {
        [GameSuppliers.sport]: sportMaintenanceCardImg,
    },
}

const GameSection: React.FC<IGameSectionProps> = ({ gameType, itemPerRow = 1, spaceBetweenItem = 0 }) => {
    const t = useTranslation()
    const gameMaintenanceState = useSelector((state) => state.app.gamesMaintenance)
    const maintenanceState = gameMaintenanceState[gameType]

    return (
        <Section
            gameType={gameType}
            mainTitle={t(`general.game.${gameType}.title`)}
            subTitle={t(`general.game.${gameType}.subTitle`).toUpperCase()}>
            <AutoWrapContainer itemPerRow={itemPerRow} spaceBetweenItem={spaceBetweenItem}>
                {GameTypeSupplierMap[gameType].map((supplier) => (
                    <SectionCard
                        id={`btn${gameType}${supplier}`}
                        key={`game-section-${gameType}-${supplier}`}
                        isMaintenance={
                            maintenanceState
                                ? maintenanceState.providers
                                    ? maintenanceState.providers![supplier].isMaintenance
                                    : maintenanceState.isMaintenance
                                : false
                        }
                        onClick={getSupplierRedirectFunc(supplier, gameType)}
                        title={itemPerRow > 1 ? t(`general.suppliers.${gameType}.${supplier}`) : undefined}
                        img={supplierGameImg[gameType][supplier]}
                        maintenanceImg={supplierMaintenanceImg[gameType][supplier]}
                    />
                ))}
            </AutoWrapContainer>
        </Section>
    )
}

const HomePage: React.FC<{}> = () => {
    const t = useTranslation()
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

    return (
        <SHomePage>
            <ContentWrapper>
                {isLoggedIn ? <Avatar /> : <SizeBox />}
                <JetsoSlides />
                <Sections>
                    <SectionContainer>
                        <GameSection gameType={GameTypes.sport} itemPerRow={2} />
                        <GameSection gameType={GameTypes.livecasino} itemPerRow={2} spaceBetweenItem={15} />
                        <GameSection gameType={GameTypes.esport} />
                        <GameSection gameType={GameTypes.boardgame} itemPerRow={2} />
                        <GameSection gameType={GameTypes.slotmachine} itemPerRow={3} spaceBetweenItem={10} />
                        <GameSection gameType={GameTypes.lottery} />
                        <GameSection gameType={GameTypes.fishhunter} />
                    </SectionContainer>
                    <JetsoDetailCard onClick={directToJetso}>{t('home.jetsoDetailBanner')}</JetsoDetailCard>
                </Sections>
            </ContentWrapper>
        </SHomePage>
    )
}

export default HomePage
