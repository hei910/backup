import GameSuppliers from '@constants/gameSuppliers'

export interface GameListResponse {
    totalPage: number
    gameList: GameListItem[]
}
export interface LotoGameListResponse {
    totalPage: number
    gameList: LotoGameListItem[]
}

export interface GameListItem {
    score?: number
    id: string
    name: string
    type: string
    supplier: GameSuppliers
    imgUrl: string
}

export interface LotoGameListItem {
    orderId?: number
    code: number
    name: string
    iconUrl: string
    codeName?: string
    desktopIconUrl?: null | string
    description: string
    feData?: boolean
    isNew?: boolean
    isShow?: boolean,
    desktopIntroduction?: string,
    englishName?: string,
    type?: string,
}

export interface PreviewGameListResponse {
    previewList: PreviewGameList[]
}

export interface PreviewGameList {
    supplier: string
    gameList: GameListItem[]
}

export interface DepositReminderRes {
    depositReminder: number
}

export interface GameBalanceRes {
    balance: string
}
