import { AxiosResponse } from 'axios'
import { BetData, OddsType } from '@services/sportBet/types'
import { Language } from '@services/sportGlobal/types'

export const FETCH_SEARCH_MATCHES = 'DATA/SEARCH_MATCHES'
export const FETCH_MATCHES_DATE_LIST = 'DATA/FETCH_MATCHES_DATE_LIST'
export const FETCH_TOP_PAGE_DATA = 'DATA/FETCH_TOP_PAGE_DATA'
export const FETCH_SEASON_LIST = 'DATA/FETCH_SEASON_LIST'
export const FETCH_SEASON_GAME_LIST = 'DATA/FETCH_SEASON_GAME_LIST'
export const TOGGLE_SAMPLE = 'DATA/TOGGLE_SAMPLE'
export const SAVE_RAW_DATA = 'DATA/SAVE_RAW'
export const SAVE_MERGED_DATA = 'DATA/SAVE_MERGED'
export const IMPORT_DATA = 'DATA/IMPORT'
export const LOAD_DATA_FROM_CACHES = 'DATA/LOAD_FROM_CACHES'
export const SAVE_BETLIST_DATA = 'DATA/SAVE_BETLIST'
export const SET_USE_CACHE = 'DATA/SET_USE_CACHE'

export const UPDATE_API_STATUS = 'DATA/UPDATE_API_STATUS'
export const API_CANCELLATION = 'DATA/API_CANCELLATION'
export const SET_FETCHING = 'DATA/SET_FETCHING'
export const SET_LAST_UPDATE = 'DATA/SET_LAST_UPDATE'

export interface DataState {
    lastUpdate?: {
        time: Date
        params: SearchMatchesParams
    }
    raw?: Raw
    merged?: Merge
    seasonGameData?: SeasonGame
    topRaw?: MobileMainMatchesData
    seasonList?: SeasonListResponse
    dateList?: MatchesDate[]
    sampleData?: boolean
    importedData?: MergedData
    betList: BetListData
    apiStatus: ApiStatus
    fetching: boolean
    cacheData: boolean
}

export interface RawData {
    base: MatchesResponseData
    update?: MatchesResponseData[]
    pageData: MatchesResponsePageData
    dataTime: number
    lastUpdateTime: number
}

interface CurrentData<T> {
    current?: T
}

export type Raw = CurrentData<RawData> & Record<string, RawData>

export interface MergedData {
    data: MatchesResponseData
    dataTime: number
    pageData: MatchesResponsePageData
    lastUpdateTime: number
}

export type Merge = CurrentData<MergedData> & Record<string, MergedData>

export type SeasonGame = Record<DataStatus, Record<string, Season>>

export interface ConvertedData {
    data: any
    dataTime: number
    lastUpdateTime: number
}

export type Converted = CurrentData<ConvertedData> & Record<string, ConvertedData>

export interface FetchSearchMatchesAction {
    type: typeof FETCH_SEARCH_MATCHES
    payload: DataState
}

export interface FetchSeasonListAction {
    type: typeof FETCH_SEASON_LIST
    payload: DataState
}

export interface FetchSeasonGameListAction {
    type: typeof FETCH_SEASON_GAME_LIST
    payload: DataState
}

export interface SetLastUpdateAction {
    type: typeof SET_LAST_UPDATE
    payload: DataState
}

export interface FetchMatchesDateListAction {
    type: typeof FETCH_MATCHES_DATE_LIST
    payload: MatchesDate[]
}

export interface FetchTopPageDataAction {
    type: typeof FETCH_TOP_PAGE_DATA
    payload: DataState
}

export interface ToggleSampleAction {
    type: typeof TOGGLE_SAMPLE
}

export interface UpdateApiStatusAction {
    type: typeof UPDATE_API_STATUS
    payload: ApiStatus
}

export interface ApiCancellAction {
    type: typeof API_CANCELLATION
}

export interface SetFetchingAction {
    type: typeof SET_FETCHING
    payload: boolean
}

export interface SaveRawData {
    type: typeof SAVE_RAW_DATA
    payload: { key: string; data: RawData }
}

export interface SaveMergedData {
    type: typeof SAVE_MERGED_DATA
    payload: { key: string; data: MergedData }
}

export interface LoadDataFromCaches {
    type: typeof LOAD_DATA_FROM_CACHES
    payload: string
}

export interface SaveBetListData {
    type: typeof SAVE_BETLIST_DATA
    payload: BetListData
}

export interface ImportDataAction {
    type: typeof IMPORT_DATA
    payload: any
}

export interface SetUseCacheAction {
    type: typeof SET_USE_CACHE
    payload: boolean
}

export type DataActionTypes =
    | FetchSearchMatchesAction
    | FetchMatchesDateListAction
    | ToggleSampleAction
    | UpdateApiStatusAction
    | ApiCancellAction
    | SetFetchingAction
    | SetLastUpdateAction
    | FetchTopPageDataAction
    | SaveRawData
    | SaveMergedData
    | LoadDataFromCaches
    | SaveBetListData
    | FetchSeasonListAction
    | ImportDataAction
    | FetchSeasonGameListAction
    | SetUseCacheAction

export enum ApiStatus {
    Error = 'error',
    Loading = 'loading',
    Ready = 'ready',
    Cancelled = 'cancelled',
}

export enum MarketGroup {
    am = 'am',
    had = 'had',
    oe = 'oe',
    tg = 'tg',
    htft = 'htft',
    cs = 'cs',
    fglg = 'fglg',
    or = 'or',
}

export enum Source {
    A = 'a',
    B = 'b',
    C = 'c',
    M = 'm',
}

export enum FixtureStatus {
    Pre = 'Pre',
    Live = 'Live',
}

export enum RequestFixtureStatus {
    Live = 'Live',
    ParlayEarly = 'parlay-Early',
    Pre = 'Pre',
    Today = 'Today',
    UpComingInplay = 'UpComingInplay',
    ParlayLive = 'parlay-Live',
    ParlayToday = 'parlay-Today',
}

export enum RequestOrderBy {
    league = 'league',
    time = 'time',
}

export type Qualifier = 'home' | 'away'

export type MatchApiSportType = 'football' | 'basketball' | 'tennis' | 'baseball'

export type ApiSportType = 'Soccer' | 'Basketball' | 'Baseball' | 'Tennis'

export interface DataParams {
    fixtureId?: string
    date?: string
    sports?: string
    market?: string
    page?: string
}

export interface SearchMatchesParams {
    fixtureId?: string
    lang: Language | string
    marketGroup?: string
    page?: number | string
    pageSize?: number
    sId?: string
    orderBy?: RequestOrderBy
    source: string
    matchStatus?: RequestFixtureStatus | string
    timezone: number
    withinDay?: number
    withoutDay?: number
    oddsType: OddsType
    searchKeyword?: string
    competitionIds?: string[]
    simpleMarket?: number // used in mobile to filter unused matches
    parlayOnly?: boolean
    options?: {
        enable: boolean
        checkHeartbeat: boolean
    }
    lastTimestamp?: number
    forceUpdate?: boolean
    isDetail?: boolean
}

export interface RequestStatus {
    isCancelled: boolean
}

export interface MatchesDateResponse extends AxiosResponse {
    success: boolean
    data: RawMatchesDate[]
}

export interface MobileMainMatchesDataResponse extends AxiosResponse {
    success: boolean
    data: MobileMainMatchesData
    pageData?: PageData
    reason?: string
}

// export interface MobileMainMatchesData {
//     matchCount: Record<MatchApiSportType, MatchCount>;
//     special: Record<MatchApiSportType, Fixture[][]>;
//     live: Record<MatchApiSportType, Fixture[][]>;
//     sport: Record<MatchApiSportType, Fixture[][]>;
// }

export interface MobileMainMatchesData {
    matchCount: Record<MatchApiSportType, MatchCount>
    special: Record<MatchApiSportType, MatchesResponseData>
    live: Record<MatchApiSportType, MatchesResponseData>
    sport: Record<MatchApiSportType, MatchesResponseData>
}

export interface MatchCount {
    todayCount: number
    tomorrowCount: number
    leagues: Leagues[]
    allCount: number
    liveCount: number
}

export interface Leagues extends Competition {
    competitionIds: number
}

export interface RawMatchesDate {
    date: string
}

export interface MatchesDate extends RawMatchesDate {
    matchsDate: string
}

export interface PageData {
    lang: string
    page: number
    pageSize: number
    totalPages: number
    totalRecords: number
}

export interface ScoreBarInfo {
    countTime: string
    points: Points[]
    currentInning: string
    period: string
    turn: number
    outsNumber: number
    firstBase: number
    secondBase: number
    thirdBase: number
    topBottomInning: number
}

export interface Points {
    period: string
    homeScore: number
    awayScore: number
}

export interface Score {
    homeScore: number
    awayScore: number
    home?: number // to be delete
    away?: number // to be delete
    hRedCard: number
    aRedCard: number
}

export interface Competitors {
    name: string
    country: string
    qualifier: string
}

export interface Outcome {
    active: number
    euOdds: string
    id: string
    name: string
    odds: string
    outcomeCode: string
    specifier: string
    uid: string
    team?: string
}

export interface SeasonGameInfoResponse {
    success: boolean
    data: MatchesResponseData
    pageData: MatchesResponsePageData
}

export interface RawSeasonListResponse {
    success: boolean
    data: SeasonListResponse
}

export interface RawOrSeasonListResponse {
    success: boolean
    data: Pick<SeasonListResponse, 'popular' | 'country'>
}

export interface SeasonListResponse {
    menu: CompetitionInfo[]
    popular: CountryCompetitionInfo[]
    country: CountryCompetitionInfo[]
}

export interface CountryCompetitionInfo {
    name: string
    competitions: CompetitionInfo[]
}

export interface CountryCompetitionInfoWithType {
    name: string
    type: string
    competitions: CompetitionInfo[]
}

export interface CompetitionInfo extends Competition {
    competitionId?: string[]
    competitionIds?: string[]
    matchStatus?: string
}

interface Competition {
    name: string
    count: number
}

//#region Object Data Structure

export interface MatchesResponse {
    success: boolean
    data: MatchesResponseData
    pageData: MatchesResponsePageData
}

export interface MatchesResponsePageData {
    lang: string
    page: number
    pageSize: number
    pageRecordCount: number
    timezone: number
    totalPages: number
    totalRecords: number
}

export type DataStatus = 'iot' | 'not'

export type MatchesResponseData = Record<DataStatus, Seasons>

export type Seasons = Record<string, Season>

export interface Season {
    info: SeasonInfo
    match: Matches
}

export interface SeasonInfo {
    zh: string
    en: string
    name: string
    seasonId: string
    firstStart: string
}

export type Matches = Record<string, Match>

export interface Match {
    info: MatchInfo
    events: Events
}

export interface MatchInfo {
    // scoreBarInfo: ScoreBarInfo | string;
    clock: string
    hasParlay: boolean
    haveLiveMatch: boolean
    isNeutral: boolean
    liveStatus: string
    matchId: string
    round: string
    scoreBarInfo?: ScoreBarInfo
    source: Source
    startTime: string
    status: FixtureStatus
    totalMarkets: string
    upComingInplay: boolean
    competitors: NewCompetitors
    game?: string | number
}

export type Events = Record<string, Event>

export interface Event {
    competitors: NewCompetitors
    ctid: number
    description: string
    fixtureId: string
    markets: Markets
    remark: object
    score: Score
    hasHeadToHead: boolean
    liveStatusText: string
}

export type Competitiors = 'home' | 'away'

export type MarketCodeType =
    | 'ah'
    | 'ah1st'
    | '1x2'
    | '1x21st'
    | 'had'
    | 'had1st'
    | 'bts'
    | 'ou'
    | 'ou1st'
    | 'oe'
    | 'ml'
    | 'ml1st'
    | 'tg'
    | 'tg1st'
    | 'htft'
    | 'cs'
    | 'or'
    | 'ahfts'
    | 'oufts'

export interface Competitor {
    name: string
    country: string
}

export type NewCompetitors = Record<Competitiors, Competitor>

export type Markets = Record<string, NewMarket>

export interface NewMarket {
    marketCode: string
    ename?: string
    market_id: string
    outcomes: Outcomes
    name?: string
    placeFraction?: number
    placeTop?: number
    header: string
}

export interface Outcomes {
    [key: string]: Outcome
}

export type BetListData = Record<string, Omit<BetData, 'betListInfo'>>

//#endregion Object Data Structure

//#region getOneOdds
export interface GetOneOddsParams {
    source: string
    sId: string
    matchId: string
    fixtureId: string
    marketId: string
    outcomeId: string
}

export interface GetOneOddsResponse {
    success: boolean
    data: {
        score: {
            homeScore: number
            awayScore: number
            hRedCard: number
            aRedCard: number
        }
        clock: string
        status: FixtureStatus
        liveStatus: string
        outcome: {
            active: number
            odds: string
        }
    }
}

export interface BetItemOddsResponse {
    success: boolean
    data: MatchesResponseData
    pageData: MatchesResponsePageData
}

//#endregion getOneOdds
