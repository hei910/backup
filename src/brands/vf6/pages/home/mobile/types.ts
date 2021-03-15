import GameTypes from '@constants/gameTypes'

export interface ISectionProps {
    mainTitle: string
    subTitle: string
    sectionRef: React.RefObject<HTMLDivElement>
    gameType: GameTypes
}

export interface ISectionCardProps {
    img: string
    title: string
    onClick: () => void
    className?: string
    maintenanceImg: string
    isMaintenance: boolean
    id: string
}

export interface INavigatorItem {
    img: string
    activeImg: string
    isActive: boolean
    onClick: () => void
}

export interface INavigatorProps {
    refs: React.RefObject<HTMLDivElement>[]
    pageRef: React.RefObject<HTMLDivElement>
}

export interface ISectionCardsProps {
    cards: ISectionCardProps[]
}

export interface IGameSectionProps {
    sectionRef: React.RefObject<HTMLDivElement>
    gameType: GameTypes
    itemPerRow?: number
    spaceBetweenItem?: number
}
