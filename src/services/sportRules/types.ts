import { Platform, SportType } from '@services/sportBet/types'
import { ApiSportType, Source } from '@services/sportData/types'

export const FETCH_BET_ACTIVE = 'RULES/FETCH_BET_ACTIVE'
export const FETCH_BET_LIMITS = 'RULES/FETCH_BET_LIMITS'
export const FETCH_CTID_RULES = 'RULES/FETCH_CTID_RULES'

export interface RulesState {
    active: PlayerBetActiveTable
    limits: PlayerBetLimitsTable
    ctid: BetCtidBlockRules
}

export interface PlayerBetActiveResponse {
    success: boolean
    msg: string | null
    data: PlayerBetActiveResponseData[]
}

export interface PlayerBetActiveResponseData {
    name: string
    source: Source
    sport: SportType
    marketCode: string
    platform: Platform
    isActive: boolean
}

export interface PlayerBetLimitsResponse {
    success: boolean
    msg: string | null
    data: PlayerBetLimitsResponseData
}

export interface IBetLimitContent {
    minBetAmount: number
    singleBetLimit: number
    maxPayout: number
}

export interface IBetLimit {
    nonLive: Record<string, IBetLimitContent>
    isLive: Record<string, IBetLimitContent>
}

export interface PlayerBetLimitsResponseData {
    soccerLimit: IBetLimit
    basketballLimit: IBetLimit
    tennisLimit: IBetLimit
    baseballLimit: IBetLimit
    esportLimit: IBetLimit
    esportSoccerLimit: IBetLimit
    esportBasketballLimit: IBetLimit
    parlayLimit: {
        minBetAmount: number
        singleBetLimit: number
        maxPayout: number
    }
}

export interface PlayerBetActiveTable {
    [key: string]: boolean
}

export interface PlayerBetLimitsTable {
    [key: string]: PlayerBetLimitsTableElement
}

export interface PlayerBetLimitsTableElement {
    // minOdds: number
    minAnte: number
    // singleMatchLimit: number
    singleAnteLimit: number
    maxPayout: number
}

export interface GetBetActiveAction {
    type: typeof FETCH_BET_ACTIVE
    payload: PlayerBetActiveTable
}

export interface GetBetLimitsAction {
    type: typeof FETCH_BET_LIMITS
    payload: PlayerBetLimitsTable
}

export type BetCtidBlockRules = Record<ApiSportType, Array<number>>

export interface BetCtidBlockRulesResopnse {
    success: boolean
    data: BetCtidBlockRules
}

export interface GetCtidBlockRulesAction {
    type: typeof FETCH_CTID_RULES
    payload: BetCtidBlockRules
}

export type RulesActionTypes = GetBetActiveAction | GetBetLimitsAction | GetCtidBlockRulesAction
