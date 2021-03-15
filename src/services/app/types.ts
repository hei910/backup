import Locale from '@constants/locales'
import GameTypes from '@constants/gameTypes'
import gameSuppliers from '@constants/gameSuppliers'
import GameContainerModes from '@constants/gameContainerMode'

export interface AppState {
    locale: Locale
    loadingList: string[]
    appInfo: AppInfo
    brandInfo: BrandInfo
    isAppMaintenance: boolean
    gamesMaintenance: GamesMaintenance
    banners: Banner[]
    betRecordPage: string
    disableAppScrollList: string[]
}

export interface AppInfo {
    ios: string
    iosType: string
    android: string
    iosComingSoon: boolean
    androidComingSoon: boolean
}

export interface BrandInfo {
    complaintPhone: string
    csPhone: string
    csLink: string
    webEmail: string
    csQq: string
    brandCode: string
    brandName: string
    clickRateBrandCode: string
    csQqLink: string
    csWxLink: string
    appMainDomain: string
}

export interface MaintenanceGames {
    name: gameSuppliers | string
    isMaintenance: boolean
    notice: string
    enterGameMethod: GameContainerModes
    providers?: ProviderMaintenance
}

export interface ProviderMaintenance {
    [key: string]: MaintenanceCommonField
}

export interface MaintenanceCommonField {
    isMaintenance: boolean
    notice: string
}

export interface MaintenanceRes extends MaintenanceCommonField {
    games: Array<MaintenanceGames>
    time: string
}

export interface GamesMaintenance {
    [GameTypes.boardgame]: MaintenanceGames
    [GameTypes.slotmachine]: MaintenanceGames
    [GameTypes.livecasino]: MaintenanceGames
    [GameTypes.fishhunter]: MaintenanceGames
    [GameTypes.lottery]: MaintenanceGames
    [GameTypes.sport]: MaintenanceGames
    [GameTypes.esport]: MaintenanceGames
}

export interface Banner {
    articleId: number
    bannerUrl: string
    createdBy: string
    createdDt: string
    description: string
    eventId: string
    isActive: boolean
    isDeleted: boolean
    lastModifiedBy: string
    lastModifiedDt: string
    link: string
    postDate: string
    rank: number
    rowId: number
    title: string
    contentPath: string
}

export interface MobileAppBanner {
    articleId: string
    bannerUrl: string
    created: string
    description: string
    id: number
    link: string
    publishDate: string
    state: number
    title: string
}
