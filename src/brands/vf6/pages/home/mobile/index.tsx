import { useRef, useMemo } from 'react'
import styled from 'styled-components/macro'
import { useSelector } from '@redux'
import sportCardImg from '@brand/assets/images/home/mobile/sport.png'
import kyCardImg from '@brand/assets/images/home/mobile/board-game-ky.png'
import agCardImg from '@brand/assets/images/home/mobile/ag.png'
import bgCardImg from '@brand/assets/images/home/mobile/bg.png'
import lotteryCardImg from '@brand/assets/images/home/mobile/lottery.png'
import dtCardImg from '@brand/assets/images/home/mobile/dt.png'
import mgCardImg from '@brand/assets/images/home/mobile/mg.png'
import ptCardImg from '@brand/assets/images/home/mobile/pt.png'
import pgCardImg from '@brand/assets/images/home/mobile/pg.png'
import cq9CardImg from '@brand/assets/images/home/mobile/cq9.png'
import jdbCardImg from '@brand/assets/images/home/mobile/jdb.png'
import esportCardImg from '@brand/assets/images/home/mobile/esport.png'
import fishHunterCardImg from '@brand/assets/images/home/mobile/fish-hunter.png'
import sportMaintenanceCardImg from '@brand/assets/images/home/mobile/sport-disable.png'
import lotteryMaintenanceCardImg from '@brand/assets/images/home/mobile/lottery-disable.png'
import esportMaintenanceCardImg from '@brand/assets/images/home/mobile/esport-disable.png'
import kyMaintenanceCardImg from '@brand/assets/images/home/mobile/board-game-ky-disable.png'
import agMaintenanceCardImg from '@brand/assets/images/home/mobile/ag-disable.png'
import bgMaintenanceCardImg from '@brand/assets/images/home/mobile/bg-disable.png'
import fishHunterMaintenanceCardImg from '@brand/assets/images/home/mobile/fish-hunter-disable.png'
import dtMaintenanceCardImg from '@brand/assets/images/home/mobile/dt-disable.png'
import mgMaintenanceCardImg from '@brand/assets/images/home/mobile/mg-disable.png'
import ptMaintenanceCardImg from '@brand/assets/images/home/mobile/pt-disable.png'
import pgMaintenanceCardImg from '@brand/assets/images/home/mobile/pg-disable.png'
import cq9MaintenanceCardImg from '@brand/assets/images/home/mobile/cq9-disable.png'
import jdbMaintenanceCardImg from '@brand/assets/images/home/mobile/jdb-disable.png'
import Navigator from './navigator'
import Section from './section'
import SectionCard from './sectionCard'
import JetsoSlides from './jetsoSlides'
import { IGameSectionProps } from './types'
import {
    directToSport,
    getSupplierRedirectFunc,
    // directToDownloadApp,
} from '@utils/v1Functions'
import GameTypes, { GameTypeSupplierMap } from '@constants/gameTypes'
import useTranslation from '@hooks/useTranslation'

import bgImg from '@mixins/backgroundImg'
import { ratioHeightForMobile } from '@mixins/ratioLength'
import GameSuppliers from '@constants/gameSuppliers'
import AutoWrapContainer from '@components/common/autoWrapContainer'

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

const SHomePage = styled.div`
    width: 100%;
    background-color: #ffffff;
    padding-bottom: 30px;
`

const SectionContainer = styled.div`
    width: 100%;
`

const SportCard = styled.div`
    ${bgImg(sportCardImg)}
    ${ratioHeightForMobile(170)}
    border-radius: 10px;
    box-shadow: 0px 2px 6px 0 rgba(0, 0, 0, 0.1);
    width: 100%;
    margin-top: 12px;
`

const SportCardImgPlaceHolder = styled.div`
    ${ratioHeightForMobile(130)}
    width: 100%;
    background-color: transparent;
`

const SportCardBtns = styled.div`
    ${ratioHeightForMobile(40)}
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`

const SportCardBtn = styled.div<{ isActive?: boolean }>`
    ${(props) => props.theme.typography.Subtitle4}
    color: ${(props) => (props.isActive ? '#3d7eeb' : '#666666')};
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`

const GameSection: React.FC<IGameSectionProps> = ({ sectionRef, gameType, itemPerRow = 1, spaceBetweenItem = 0 }) => {
    const t = useTranslation()
    const gameMaintenanceState = useSelector((state) => state.app.gamesMaintenance)
    const maintenanceState = gameMaintenanceState[gameType]

    return (
        <Section sectionRef={sectionRef} gameType={gameType} mainTitle={t(`general.game.${gameType}.title`)} subTitle={t(`general.game.${gameType}.subTitle`).toUpperCase()}>
            <AutoWrapContainer itemPerRow={itemPerRow} spaceBetweenItem={spaceBetweenItem}>
                {GameTypeSupplierMap[gameType].map((supplier) => (
                    <SectionCard
                        id={`btn${gameType}${supplier}`}
                        key={`game-section-${gameType}-${supplier}`}
                        isMaintenance={maintenanceState ? (maintenanceState.providers ? maintenanceState.providers![supplier].isMaintenance : maintenanceState.isMaintenance) : false}
                        onClick={getSupplierRedirectFunc(supplier, gameType)}
                        title={t(`general.suppliers.${gameType}.${supplier}`)}
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
    // const { slotmachine } = useSelector((state) => state.app.gamesMaintenance)
    const pageRef = useRef<HTMLDivElement>(null)
    const sportRef = useRef<HTMLDivElement>(null)
    const liveCasinoRef = useRef<HTMLDivElement>(null)
    const esportRef = useRef<HTMLDivElement>(null)
    const lotteryRef = useRef<HTMLDivElement>(null)
    const boardGameRef = useRef<HTMLDivElement>(null)
    const casinoRef = useRef<HTMLDivElement>(null)
    const fishHunterRef = useRef<HTMLDivElement>(null)

    const sectionsRef = useMemo(() => [sportRef, liveCasinoRef, esportRef, lotteryRef, boardGameRef, casinoRef, fishHunterRef], [])

    return (
        <SHomePage ref={pageRef}>
            <JetsoSlides />
            <Navigator refs={sectionsRef} pageRef={pageRef} />
            <SectionContainer>
                <Section sectionRef={sportRef} gameType={GameTypes.sport} mainTitle={t('general.game.sport.title')} subTitle={t('general.game.sport.subTitle').toUpperCase()}>
                    <SportCard>
                        <SportCardImgPlaceHolder onClick={directToSport} />
                        <SportCardBtns>
                            <SportCardBtn isActive onClick={directToSport} data-qa='btnSportApp'>
                                {t('home.sections.sport.cardTitle1')}
                            </SportCardBtn>
                            <SportCardBtn onClick={directToSport} data-qa='btnSportWap'>
                                {t('home.sections.sport.cardTitle2')}
                            </SportCardBtn>
                        </SportCardBtns>
                    </SportCard>
                </Section>
                <GameSection gameType={GameTypes.livecasino} sectionRef={liveCasinoRef} itemPerRow={2} spaceBetweenItem={15} />
                <GameSection gameType={GameTypes.esport} sectionRef={esportRef} />
                <GameSection gameType={GameTypes.lottery} sectionRef={lotteryRef} />
                <GameSection gameType={GameTypes.boardgame} sectionRef={boardGameRef} itemPerRow={2} spaceBetweenItem={15} />
                <GameSection gameType={GameTypes.slotmachine} sectionRef={casinoRef} itemPerRow={3} spaceBetweenItem={10} />
                <GameSection gameType={GameTypes.fishhunter} sectionRef={fishHunterRef} />
            </SectionContainer>
        </SHomePage>
    )
}

export default HomePage
