import { ReactNode } from 'react'
import { IConvertedData, IConvertedSportsData, IIntervalOption } from '../types'

export interface ITabs {
    label: string
    value: IIntervalOption | string
    isActive: boolean
}

export interface ITabIndex {
    item: ITabs
}

export interface ITabsProps {
    tabs: ITabs[]
    onTabClick: (item: ITabs) => void
}

export interface IRecordProps {
    cardData: IConvertedData[]
    loadMore: () => void
    hasMore: boolean
    totalRecord: number
    totalWinAmount: number
    totalValidBetAmount: number
}

export interface IRecordCardProps {
    cardData: IConvertedData
}

export interface IExpandedRecordProps {
    expandCardData: IConvertedData
    gameType?: string
    getStatus: (status?: string | null) => string
}

export interface ILazyLoadInfo {
    recordItems: IConvertedData[]
    hasMore: boolean
    nextPage: number
}
export interface ITotals {
    sumProfit: number
    sumValidBetAmount: number
    totalRecord: number
}

export interface IExpandedGames {
    title: string
    gameCode: string
    date: string
}

export interface IExpandedSportGames {
    teams: string
    seasonName: string
    marketName: string
    outcomeNameNSpecifier: string
    odds: number
    matchStatus: string
    startTime: string
    betDateTime: string | null
    sportCodeText: string
    betRecordId: string
    gameSupplier: string
    processed: boolean | null
    normalSettleTBC?: boolean
    isParlay: boolean
    getStatus: (status?: string | null) => string
    isOr?: boolean
}

export interface ISportGames {
    title: string | null
    team?: string
    betAmount: number
    processed: boolean | null
    cancelled: boolean | null
    estimatedWinnings: number
    sportsDetail: IConvertedSportsData[]
    gameSupplier: string
    oldStatus?: string
    status: string
    isOr?: boolean
    winLose: string
    isParlay: boolean
}

export interface IGames {
    title: string | null
    winLose: string
    cancelled: boolean | null
    children: ReactNode
}
