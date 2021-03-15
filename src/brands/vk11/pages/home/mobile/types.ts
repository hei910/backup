import GameTypes from '@constants/gameTypes'

export interface ISectionProps {
    mainTitle: string
    subTitle?: string
    topHeaderBg: string
    gameType: GameTypes
}

export interface ISectionCardProps {
    img: string
    title?: string
    onClick: () => void
    className?: string
    isMaintenance: boolean
    wrapperAutomationId: string
    imgAutomationId?: string
}

export interface INavigatorItem {
    img: string
    activeImg: string
    isActive: boolean
    onClick: () => void
}

export interface IGameSectionProps {
    gameType: GameTypes
    itemPerRow?: number
    spaceBetweenItem?: number
}
export interface IGameCardProps extends ISectionCardProps {
    maintenanceImg: string
    automationId: string
    maintenanceAutomationId: string
    wrapperAutomationId: string
}

// export interface INavigatorProps {
//     refs: React.RefObject<HTMLDivElement>[]
//     sectionContainerRef: React.RefObject<HTMLDivElement>
//     pageRef: React.RefObject<HTMLDivElement>
// }

export interface ISectionCardsProps {
    cards: ISectionCardProps[]
}
