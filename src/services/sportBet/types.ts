import { Competitors, FixtureStatus, NewCompetitors, Score } from '@services/sportData/types'
import { Dictionary } from '@sport/util/dictionary'

export const UPDATE_BET_LIST = 'BET/UPDATE_LIST'
export const ADD_TO_BET_LIST = 'BET/ADD_TO_LIST'
export const REMOVE_FROM_BET_LIST = 'BET/REMOVE_FROM_LIST'
// eslint-disable-next-line import/no-unused-modules
export const SUBMIT_BET = 'BET/SUBMIT'
export const CLEAR_STAKE = 'BET/CLEAR_STAKE'
export const REMOVE_SUCCESS_BET = 'BET/REMOVE_SUCCESS_BET'
export const REMOVE_ALL_BET_LIST = 'BET/REMOVE_ALL_LIST'
export const SET_BET_FORCE_ID = 'BET/BET_FORCE_ID'
export const UPDATE_BET_DATA_FROM_BET_LIST = 'BET/UPDATE_DATA_FROM_LIST'
export const UPDATE_BET_DATA_FROM_MERGED_DATA = 'BET/UPDATE_DATA_FROM_MERGED_DATA'
export const UPDATE_BET_LIST_STATUS = 'BET/UPDATE_BET_LIST_STATUS'
export const UPDATE_ACCEPTANCE = 'BET/UPDATE_ACCEPTANCE'
export const UPDATE_TO_WIN = 'BET/UPDATE_TO_WIN'
export const TOGGLE_SHOW_CONFIRMATION_PAGES = 'BET/TOGGLE_SHOW_CONFIRMATION_PAGES'
export const TOGGLE_KEEP_BET_LIST = 'BET/TOGGLE_KEEP_BET_LIST'
export const UPDATE_COMPETITION_FILTER_IDS = 'BET/UPDATE_COMPETITION_FILTER_IDS'
export const UPDATE_BET_RECORD = 'BET/UPDATE_BET_RECORD'
export const UPDATE_ODDS_TYPE = 'BET/UPDATE_ODDS_TYPE'
export const SAVE_SUBMIT_BET_RESULT = 'BET/SAVE_SUBMIT_RESULT'
export const SYNC_BETLIST_FROM_BETDATA = 'BET/SYNC_LIST_FROM_DATA'
export const UPDATE_UID_MAP = 'BET/UPDATE_UID_MAP'
export const RESET_BET = 'BET/RESET'
export const REMOVE_INTERVAL = 'BET/REMOVE_BET_UPDATE_INTERVAL'
export const REMOVE_ALL_INTERVAL = 'BET/REMOVE_ALL_BET_UPDATE_INTERVAL'
export const ADD_INTERVAL = 'BET/ADD_BET_UPDATE_INTERVAL'

export interface BetState {
    list: string[]
    stake: {
        single: Dictionary<Stake>
        parlay: Dictionary<Stake>
    }
    data: Dictionary<BetData>
    betForceId?: string
    acceptance: Acceptance
    oddsType: OddsType
    betListStatus: BetListStatus
    showConfirmationPages: boolean
    keepBetList: boolean
    sameMatchList: string[]
    orSameSeasonList: string[]
    filter: {
        fromMenu: boolean
        competitionIds: string[]
    }
    records: {
        paging: {
            unsettled?: Paging
            settled?: Paging
        }
        unsettled: BetRecord[]
        settled: BetRecord[]
    }
    submitBetResult?: SubmitBetResult
    uidMap: UidMap
    betIntervalList: Array<{
        outcomeUid: string
        intervalId: number
    }>
}

export interface Paging {
    totalElements: number
    currentPage: number
    totolPages: number
    totalEffectiveAnte?: number
    totalPayoutAmount?: number
}

interface UpdateBetListAction {
    type: typeof UPDATE_BET_LIST
    payload: BetState['stake']
}

interface AddToBetListAction {
    type: typeof ADD_TO_BET_LIST
    payload: BetState
}

interface RemoveFromBetListAction {
    type: typeof REMOVE_FROM_BET_LIST
    payload: BetState
}

interface RemoveSuccessBetAction {
    type: typeof REMOVE_SUCCESS_BET
    payload: BetState
}

interface SetBetForceIdAction {
    type: typeof SET_BET_FORCE_ID
    betForceId: string
}

interface SubmitSingleBetAction {
    type: typeof SUBMIT_BET
    payload: Betslip
}

interface ClearStakeAction {
    type: typeof CLEAR_STAKE
}

interface RemoveAllBetListAction {
    type: typeof REMOVE_ALL_BET_LIST
}

interface UpdateDataFromBetListAction {
    type: typeof UPDATE_BET_DATA_FROM_BET_LIST
    payload: Dictionary<BetData>
}

interface UpdateBetListStatusAction {
    type: typeof UPDATE_BET_LIST_STATUS
    payload: BetListStatus
}

interface UpdateAcceptanceAction {
    type: typeof UPDATE_ACCEPTANCE
    payload?: Acceptance
}

interface UpdateToWinAction {
    type: typeof UPDATE_TO_WIN
    payload: {
        single?: Dictionary<Stake>
        parlay?: Dictionary<Stake>
    }
}

interface ToggleShowConfirmationPagesAction {
    type: typeof TOGGLE_SHOW_CONFIRMATION_PAGES
}

interface ToggleKeepBetListAction {
    type: typeof TOGGLE_KEEP_BET_LIST
}

interface UpdateFilterListAction {
    type: typeof UPDATE_COMPETITION_FILTER_IDS
    payload: {
        ids: string[]
        fromMenu?: boolean
    }
}

interface UpdateOddsType {
    type: typeof UPDATE_ODDS_TYPE
    payload: OddsType
}

interface UpdateBetRecordAction {
    type: typeof UPDATE_BET_RECORD
    payload: {
        settled: BetRecord[]
        unsettled: BetRecord[]
        paging: {
            settled: Paging
            unsettled: Paging
        }
    }
}

interface UpdateBetDataFromMergedData {
    type: typeof UPDATE_BET_DATA_FROM_MERGED_DATA
    payload: Dictionary<BetData>
}

interface SaveSubmitBetResultAction {
    type: typeof SAVE_SUBMIT_BET_RESULT
    payload: SubmitBetResult
}

interface SyncBetListFromBetDataAction {
    type: typeof SYNC_BETLIST_FROM_BETDATA
    payload: string[]
}

interface UpdateUidMapAction {
    type: typeof UPDATE_UID_MAP
    payload: UidMap
}

interface ResetBetAction {
    type: typeof RESET_BET
}

interface RemoveBetIntervalAction {
    type: typeof REMOVE_INTERVAL
    payload: {
        outcomeUid: string
    }
}

interface RemoveAllBetIntervalAction {
    type: typeof REMOVE_ALL_INTERVAL
    payload: number
}

interface AddBetIntervalAction {
    type: typeof ADD_INTERVAL
    payload: {
        outcomeUid: string
        intervalId: number
    }
}

export type BetActionTypes =
    | UpdateBetListAction
    | AddToBetListAction
    | RemoveFromBetListAction
    | SubmitSingleBetAction
    | ClearStakeAction
    | RemoveAllBetListAction
    | SetBetForceIdAction
    | UpdateDataFromBetListAction
    | UpdateBetListStatusAction
    | UpdateAcceptanceAction
    | UpdateToWinAction
    | ToggleShowConfirmationPagesAction
    | ToggleKeepBetListAction
    | UpdateFilterListAction
    | UpdateBetRecordAction
    | UpdateOddsType
    | RemoveSuccessBetAction
    | UpdateBetDataFromMergedData
    | SaveSubmitBetResultAction
    | SyncBetListFromBetDataAction
    | UpdateUidMapAction
    | ResetBetAction
    | RemoveBetIntervalAction
    | AddBetIntervalAction
    | RemoveAllBetIntervalAction

export interface SubmitBetResult {
    single: {
        [key: string]: SubmitBetResultSingle
    }
    parlay: {
        [key: string]: SubmitBetResultParlay
    }
    confirm: boolean
}

export interface SubmitBetResultSingle {
    estimatedWinnings?: number
    item?: string
    resultOdds: number
    title?: string
    type?: string
    unitAnte?: number
    uuid?: string
    homeTeam?: string
    awayTeam?: string
    marketId?: string
    outcomeCode?: string
    ename?: string
    ctid?: number
    fixtureId?: number
    outcomeId?: string
}

export interface SubmitBetResultParlay {
    n: number
    c: number
    r: number
    odds: number
    unitAnte: number
    estimatedWinnings: number
    uuid: string
}

export interface Stake {
    bet: number
    toWin: number
}

export enum BetListStatus {
    WAITING = 'WAITING',
    BETTING = 'BETTING',
    CONFIRMING = 'CONFIRMING',
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
}

export enum OddsType {
    HONG_KONG = 'HONG_KONG',
    MALAY = 'MALAY',
    INDO = 'INDO',
    EURO = 'EURO',
}

export enum SportType {
    Soccer = 'Soccer',
    Basketball = 'Basketball',
    Tennis = 'Tennis',
    Baseball = 'Baseball',
}

export enum Acceptance {
    ANY = 'ANY',
    BETTER = 'BETTER',
    NEVER = 'NEVER',
}

export enum Platform {
    DESKTOP = 'DESKTOP',
    MOBILE = 'MOBILE',
}

export interface CombinedID {
    fixtureId?: string
    marketId?: string
    outcomeUId?: string
    ctId?: string | number
}

export interface Outcomes {
    fixtureId: string
    ctid: number
    marketId: string
    marketCode: string
    outcomeId: string
    matchStatus: FixtureStatus
    odds: string
    source: string
    sportType: string
    stake?: number
}

export interface Units {
    leg: number
    stake: number
}

export interface SubmitBetV2Request {
    betDto: BetTickets
}

export interface BetTickets {
    acceptOddsChange: boolean
    tickets: BetTicketsTicket[]
}

export interface BetTicketsTicket {
    combination: number
    details?: BetTicketsDetails[]
    matchSize: number
    orDetails?: BetTicketsORDetails[]
    unitAnte: number
}

export interface BetTicketsDetails {
    ctid: number
    ename: string
    fixtureId: number
    live: boolean
    marketId: String
    matchId: number
    odds: number
    outcomeCode: string
    outcomeId: string
    sid: number
}

export interface BetTicketsORDetails {
    seasonId: number
    odds: number
    outcomeCode: string
    sid: number
}

export interface BetTicketsResponse {
    success: boolean
    reason: string
    data: {
        masterResult: MasterResult[]
    }
}

export interface MasterResult {
    combination: number
    detailResultList?: DetailResultList[] | null
    estimatedWinnings: number
    matchCount: number
    matchSize: number
    orDetailResultList?: OrDetailResultList[] | null
    unitAnte: number
    uuid: string
}

interface DetailResultList {
    awayTeam: string
    ctid: number
    fixtureId: number
    homeTeam: string
    live: boolean
    marketId: string
    outcomeCode: string
    outcomeId: string
    ename: string
    resultOdds: number
}

interface OrDetailResultList {
    title: string
    type: string
    item: string
    resultOdds: number
}

export interface Betslip {
    acceptance: Acceptance
    oddsType: OddsType
    outcomes: Outcomes[]
    platform: Platform
    units?: Units[]
}

export interface BetData {
    active: number
    clock: string
    competitors: Competitors[] | NewCompetitors
    ctid: number
    description: string
    ename: string
    euOdds: string
    fixtureId: string
    hasParlay: boolean
    header: string
    isNeutral: boolean
    isOr: boolean
    live: boolean
    marketCode: string
    marketId: string
    marketName: string
    matchId: string
    matchStatus: string
    odds: string
    outcomeCode: string
    outcomeId: string
    outcomeName: string
    round: string
    score: Score
    seasonId: string
    seasonName: string
    sid: number
    source: string
    specifiers: string
    sportType: string
    startTime: string
    status: FixtureStatus
    updateTime: number
    uid: string
}

export interface BetListInfo {
    headerTitle: string
    teamName: string
    isDetailPage?: boolean
}

export interface SubmitBetResponse {
    success: boolean
    msg: string | null
    data: SubmitBetResponseData[]
}

// interface SubmitBetResponseData {
//     id: number;
//     betTypeDescription: string;
//     lastKickoffTime: string;
//     lastSettleTime: string | null;
//     totalStake: number;
//     totalAnte: number;
//     totalEffectiveAnte: number;
//     totalPayoutAmount: number;
//     numMatch: number;
//     numCombination: number;
//     metadata: string;
//     tags: null;
//     createTime: string;
//     updateTime: string | null;
//     platform: Platform;
//     actype: number;
//     uuid: string;
//     betPayouts: SubmitBetResponseBetPayout[];
//     betData: SubmitBetResponseBetData[];
//     player: SubmitBetResponsePlayer;
// }

interface SubmitBetResponseData {
    betData: []
    confirmStatus: string
    createTime: string
    estimatedWinnings: number
    id: number
    isCancelled: boolean
    label: string
    lastKickoffTime: string
    lastSettleTime: string | null
    metadata: string
    metadataJson: SubmitBetResponseDataMetaData
    multiples: boolean
    numCombination: number
    numMatch: number
    platform: string
    tags: null
    totalAnte: number
    totalEffectiveAnte: number
    totalPayoutAmount: number
    totalStake: number
    updateTime: string
    username: string
    uuid: string
}

export interface SubmitBetResponseDataMetaData {
    composition: number[]
    estimatedWinnings: number
    metadata: SubmitBetResponseBetDataMetaData[]
}

export interface SubmitBetResponseBetDataMetaData {
    awayTeam: string
    clock: string
    ctid: number
    denominator: number
    description: string
    euroDenominator: number
    euroNumerator: number
    fixtureId: string
    hasParlay: boolean
    header: string
    homeTeam: string
    live: boolean
    liveStatus: string
    marketCode: string
    marketId: string
    marketName: string
    marketStatus: string
    matchId: string
    numerator: number
    odds: number
    oddsType: string
    outcomeCode: string
    outcomeId: string
    outcomeName: string
    outcomeStatus: string
    score: string
    seasonId: string
    seasonName: string
    source: string
    specifier: string
    sportType: string
    startTime: string
}

export interface BetRecordRequestParams {
    lastSettleTime?: boolean
    pageSize?: number
    page?: number
    gte?: string
    lte?: string
}

export interface BetRecordBetData {
    fixtureId: string
    isEnded: boolean
    matchResult: string | null
    resultOddsNumerator: number
    resultOddsDenominator: number
    winLoseStatus: string | null
    voidReason: string | null
    status: string
    metadata: string
    marketId: string
}

export interface BetRecordMetadataJson {
    estimatedWinnings: number
    metadata: BetRecordDetail | BetRecordDetail[]
    composition: number[]
}
export interface BetRecord {
    id: number
    uuid: string
    label: string
    multiples: boolean
    lastSettleTime: string
    totalStake: number
    totalAnte: number
    totalEffectiveAnte: number
    totalPayoutAmount: number
    estimatedWinnings: number
    numMatch: number
    numCombination: number
    metadata: string
    metadataJson: BetRecordMetadataJson
    tags: string | null
    platform: string
    createTime: string
    isCancelled: boolean
    confirmStatus: string
    betData: BetRecordBetData[]
}

interface BetRecordResponseData {
    content: BetRecord[]
    customData: {
        totalEffectiveAnte: number
        totalPayoutAmount: number
    }
    empty: boolean
    first: boolean
    last: boolean
    number: number
    numberOfElements: number
    pageable: {
        offset: number
        pageNumber: number
        pageSize: number
        paged: boolean
        sort: {
            empty: boolean
            sorted: boolean
            unsorted: boolean
        }
        unpaged: boolean
    }
    size: number
    sort: {
        empty: boolean
        sorted: boolean
        unsorted: boolean
    }
    totalElements: number
    totalPages: number
}

export interface BetRecordsResponse {
    success: boolean
    msg: string | null
    data: BetRecordResponseData
}

export interface BetRecordDetail {
    awayTeam: string
    ctid?: number
    denominator: number
    description: string
    euroDenominator: number
    euroNumerator: number
    fixtureId: string
    homeTeam: string
    live: boolean
    marketCode: string
    marketId: string
    marketName: string
    marketStatus: string
    numerator: number
    odds: number
    oddsType: string
    outcomeCode: string
    outcomeId: string
    outcomeName: string
    outcomeStatus: string
    seasonName: string
    source: string
    specifier: string
    sportType: string
    startTime: string
    score: string
    header?: string
}

export interface UidMap {
    [key: string]: string
}
