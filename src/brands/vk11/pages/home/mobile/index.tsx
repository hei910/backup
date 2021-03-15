import styled from 'styled-components/macro'
import { useSelector } from '@redux'

import sportCardImg from '@brand/assets/images/home/mobile/sport.png'
import esportCardImg from '@brand/assets/images/home/mobile/esport.png'
import nnCardImg from '@brand/assets/images/home/mobile/nn.png'
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
import fishHunterCardImg from '@brand/assets/images/home/mobile/fish-hunter.png'

import sportBarImg from '@brand/assets/images/home/mobile/sport-bar.png'
import casinoLiveBarImg from '@brand/assets/images/home/mobile/casino-live-bar.png'
import esportBarImg from '@brand/assets/images/home/mobile/esport-bar.png'
import fishHunterBarImg from '@brand/assets/images/home/mobile/fish-hunter-bar.png'
import slotMachineBarImg from '@brand/assets/images/home/mobile/slot-games-bar.png'
import boardGameBarImg from '@brand/assets/images/home/mobile/board-game-bar.png'
import lotteryBarImg from '@brand/assets/images/home/mobile/lottery-bar.png'

import kyMaintenanceCardImg from '@brand/assets/images/home/mobile/ky-disable.png'
import nnMaintenanceCardImg from '@brand/assets/images/home/mobile/nn-disable.png'
import agMaintenanceCardImg from '@brand/assets/images/home/mobile/ag-disable.png'
import bgMaintenanceCardImg from '@brand/assets/images/home/mobile/bg-disable.png'
import dtMaintenanceCardImg from '@brand/assets/images/home/mobile/dt-disable.png'
import fishHunterMaintenanceCardImg from '@brand/assets/images/home/mobile/fish-hunter-disable.png'
import esportMaintenanceCardImg from '@brand/assets/images/home/mobile/esport-disable.png'
import lotteryMaintenanceCardImg from '@brand/assets/images/home/mobile/lottery-disable.png'
import sportMaintenanceCardImg from '@brand/assets/images/home/mobile/sport-disable.png'

import mgMaintenanceCardImg from '@brand/assets/images/home/mobile/mg-disable.png'
import ptMaintenanceCardImg from '@brand/assets/images/home/mobile/pt-disable.png'
import pgMaintenanceCardImg from '@brand/assets/images/home/mobile/pg-disable.png'
import cq9MaintenanceCardImg from '@brand/assets/images/home/mobile/cq9-disable.png'
import jdbMaintenanceCardImg from '@brand/assets/images/home/mobile/jdb-disable.png'

import Section from './section'
import SectionCard from './sectionCard'
import JetsoSlides from './jetsoSlides'
import Avatar from './avatar'
import { IGameSectionProps } from './types'

import { directToJetso, getSupplierRedirectFunc } from '@utils/v1Functions'
import useTranslation from '@hooks/useTranslation'
import jetsoDetailImg from '@brand/assets/images/home/mobile/jetso-detail.png'
import bgImg from '@mixins/backgroundImg'
import { ratioHeightForMobile } from '@mixins/ratioLength'
import GameSuppliers from '@constants/gameSuppliers'
import AutoWrapContainer, { AutoWrapItem } from '@components/common/autoWrapContainer'
import GameTypes, { GameTypeSupplierMap } from '@constants/gameTypes'
import { IGameCardProps } from './types'

interface ImgInfo {
    img: string
    id: string
}

const supplierGameHeaderImg: Record<GameTypes, string> = {
    [GameTypes.sport]: sportBarImg,
    [GameTypes.livecasino]: casinoLiveBarImg,
    [GameTypes.esport]: esportBarImg,
    [GameTypes.fishhunter]: fishHunterBarImg,
    [GameTypes.slotmachine]: slotMachineBarImg,
    [GameTypes.boardgame]: boardGameBarImg,
    [GameTypes.lottery]: lotteryBarImg,
}

const supplierGameContentImgInfo: Record<GameTypes, Record<string, ImgInfo>> = {
    [GameTypes.livecasino]: {
        [GameSuppliers.ag]: { img: agCardImg, id: 'imgLiveCasinoAg' },
        [GameSuppliers.bg]: { img: bgCardImg, id: 'imgLiveCasinoBg' },
    },
    [GameTypes.slotmachine]: {
        [GameSuppliers.mg]: { img: mgCardImg, id: 'imgSlotMachineMg' },
        [GameSuppliers.dt]: { img: dtCardImg, id: 'imgSlotMachineDt' },
        [GameSuppliers.pt]: { img: ptCardImg, id: 'imgSlotMachinePt' },
        [GameSuppliers.pg]: { img: pgCardImg, id: 'imgSlotMachinePg' },
        [GameSuppliers.cq9]: { img: cq9CardImg, id: 'imgSlotMachineCq9' },
        [GameSuppliers.jdb]: { img: jdbCardImg, id: 'imgSlotMachineJdb' },
    },
    [GameTypes.fishhunter]: {
        [GameSuppliers.ag]: { img: fishHunterCardImg, id: 'imgFishHunterAg' },
    },
    [GameTypes.lottery]: {
        [GameSuppliers.loto]: { img: lotteryCardImg, id: 'imgLotteryLoto' },
    },
    [GameTypes.boardgame]: {
        [GameSuppliers.nn]: { img: nnCardImg, id: 'imgBoardGameNn' },
        [GameSuppliers.ky]: { img: kyCardImg, id: 'imgBoardGameKy' },
    },
    [GameTypes.esport]: {
        [GameSuppliers.avia]: { img: esportCardImg, id: 'imgEsportAvia' },
    },
    [GameTypes.sport]: {
        [GameSuppliers.sport]: { img: sportCardImg, id: 'imgSport' },
    },
}

const supplierMaintenanceImgInfo: Record<GameTypes, Record<string, ImgInfo>> = {
    [GameTypes.livecasino]: {
        [GameSuppliers.ag]: { img: agMaintenanceCardImg, id: 'imgLiveCasinoAg_maintenance' },
        [GameSuppliers.bg]: { img: bgMaintenanceCardImg, id: 'imgLiveCasinoBg_maintenance' },
    },
    [GameTypes.slotmachine]: {
        [GameSuppliers.mg]: { img: mgMaintenanceCardImg, id: 'imgSlotMachineMg_maintenance' },
        [GameSuppliers.dt]: { img: dtMaintenanceCardImg, id: 'imgSlotMachineDt_maintenance' },
        [GameSuppliers.pt]: { img: ptMaintenanceCardImg, id: 'imgSlotMachinePt_maintenance' },
        [GameSuppliers.pg]: { img: pgMaintenanceCardImg, id: 'imgSlotMachinePg_maintenance' },
        [GameSuppliers.cq9]: { img: cq9MaintenanceCardImg, id: 'imgSlotMachineCq9_maintenance' },
        [GameSuppliers.jdb]: { img: jdbMaintenanceCardImg, id: 'imgSlotMachineJdb_maintenance' },
    },
    [GameTypes.fishhunter]: {
        [GameSuppliers.ag]: { img: fishHunterMaintenanceCardImg, id: 'imgFishHunterAg_maintenance' },
    },
    [GameTypes.lottery]: {
        [GameSuppliers.loto]: { img: lotteryMaintenanceCardImg, id: 'imgLotteryLoto_maintenance' },
    },
    [GameTypes.boardgame]: {
        [GameSuppliers.nn]: { img: nnMaintenanceCardImg, id: 'imgBoardGameNn_maintenance' },
        [GameSuppliers.ky]: { img: kyMaintenanceCardImg, id: 'imgBoardGameKy_maintenance' },
    },
    [GameTypes.esport]: {
        [GameSuppliers.avia]: { img: esportMaintenanceCardImg, id: 'imgEsportAvia_maintenance' },
    },
    [GameTypes.sport]: {
        [GameSuppliers.sport]: { img: sportMaintenanceCardImg, id: 'imgSport_maintenance' },
    },
}

const SAutomationWrapper = styled(AutoWrapContainer)`
    padding: 15px 15px 0px;
    margin: 0px;

    > ${AutoWrapItem} {
        margin: 4px;
    }
`

const SHomePage = styled.div`
    width: 100%;
    background-color: #0c186c;
`

const ContentWrapper = styled.div`
    width: 100%;
    background-color: #f5f5f5;
`
const SizeBox = styled.div`
    width: 100%;
    height: 20px;
`

const JetsoDetailCardWrapper = styled.div`
    padding: 4px 16px 12px 16px;
`

const JetsoDetailCard = styled.div`
    ${(props) => props.theme.typography.H3Headline}
    ${bgImg(jetsoDetailImg, 'contain')}
    ${ratioHeightForMobile(150)};
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    width: 100%;
`

const handleAutomationIdPrefix = (gameType: string) => {
    switch (gameType) {
        case 'boardgame':
            return 'boardgame'
        case 'slotmachine':
            return 'slotmachine'
        case 'livecasino':
            return 'livecasino'
        case 'fishhunter':
            return 'fishhunter'
        case 'lottery':
            return 'lottery'
        case 'sport':
            return ''
        case 'esport':
            return 'esport'
    }
}

const CardSection: React.FC<IGameCardProps> = ({ wrapperAutomationId, title, img, maintenanceImg, onClick, isMaintenance, automationId, maintenanceAutomationId }) => {
    return (
        <SectionCard
            wrapperAutomationId={wrapperAutomationId}
            onClick={onClick}
            title={title}
            img={isMaintenance ? maintenanceImg : img}
            imgAutomationId={(isMaintenance ? maintenanceAutomationId : automationId) || ''}
            isMaintenance={isMaintenance}
        />
    )
}

const GameSection: React.FC<IGameSectionProps> = ({ gameType, itemPerRow = 1, spaceBetweenItem = 0 }) => {
    const t = useTranslation()
    const gameMaintenanceState = useSelector((state) => state.app.gamesMaintenance)
    const brandName = useSelector((state) => state.app.brandInfo.brandName)
    const maintenanceState = gameMaintenanceState[gameType] || {}

    return (
        <Section topHeaderBg={supplierGameHeaderImg[gameType]} gameType={gameType} mainTitle={t(`general.game.${gameType}.title`)} subTitle={t(`general.game.${gameType}.subTitle`).toUpperCase()}>
            <SAutomationWrapper itemPerRow={itemPerRow} spaceBetweenItem={spaceBetweenItem}>
                {GameTypeSupplierMap[gameType].map((supplier) => {
                    const { img: maintenanceImg, id: maintenanceAutomationId } = supplierMaintenanceImgInfo[gameType][supplier]
                    const { img, id: automationId } = supplierGameContentImgInfo[gameType][supplier]

                    return (
                        <CardSection
                            key={`game-section-${gameType}-${supplier}`}
                            isMaintenance={maintenanceState.providers ? maintenanceState.providers![supplier].isMaintenance : maintenanceState.isMaintenance}
                            onClick={getSupplierRedirectFunc(supplier, gameType)}
                            title={
                                gameType === GameTypes.sport || gameType === GameTypes.esport ? t(`home.sections.${gameType}.cardTitle`, { brandName }) : t(`general.suppliers.${gameType}.${supplier}`)
                            }
                            wrapperAutomationId={`${handleAutomationIdPrefix(gameType)}${supplier}`}
                            img={img}
                            automationId={automationId}
                            maintenanceImg={maintenanceImg}
                            maintenanceAutomationId={maintenanceAutomationId}
                        />
                    )
                })}
            </SAutomationWrapper>
        </Section>
    )
}

const HomePage: React.FC<{}> = () => {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

    return (
        <SHomePage>
            <ContentWrapper>
                <SizeBox />
                <JetsoSlides />

                {isLoggedIn ? <Avatar /> : null}

                <GameSection gameType={GameTypes.sport} spaceBetweenItem={0}></GameSection>
                <GameSection gameType={GameTypes.livecasino} itemPerRow={2} spaceBetweenItem={15} />
                <GameSection gameType={GameTypes.esport} />
                <GameSection gameType={GameTypes.slotmachine} itemPerRow={2} spaceBetweenItem={15} />
                <GameSection gameType={GameTypes.boardgame} itemPerRow={2} spaceBetweenItem={15} />
                <GameSection gameType={GameTypes.lottery} />
                <GameSection gameType={GameTypes.fishhunter} />

                <JetsoDetailCardWrapper data-qa='btnMoreJetso'>
                    <JetsoDetailCard onClick={directToJetso} />
                </JetsoDetailCardWrapper>
            </ContentWrapper>
        </SHomePage>
    )
}

export default HomePage
