export const FETCH_MENU = 'PLAYER/FETCH_MENU'

export type RouteSportType = 'football' | 'basketball' | 'baseball' | 'tennis'
export type DateType = 'Today' | 'Pre' | 'Live' | 'Parlay' | 'Or' | 'UpComingInplay' | 'parlay-Live' | 'parlay-Today'
export type RouteDateType =
    | 'today'
    | 'all'
    | 'inplay'
    | 'parlay'
    | 'future'
    | 'upcoming'
    | 'outright'
    | 'parlay-Live'
    | 'parlay-Today'
export type RouteMarketType = 'am' | 'had' | 'oe' | 'tg' | 'htft' | 'cs' | 'or' | 'ml'

export type DRouteDateType = Exclude<RouteDateType, 'future' | 'upcoming' | 'outright'>
export type MRouteDateType = Exclude<RouteDateType, 'parlay-Live' | 'parlay-Today'>

export interface ParamsType {
    date?: RouteDateType
    sports?: RouteSportType
    market?: RouteMarketType
    fixtureId?: string
    page?: string
    source?: string
    leagueId?: string
    matchsStatus?: string
}

export interface CustomParamsType extends ParamsType {
    isBetMatch?: boolean
    isHomePage?: boolean
    isBetRecord?: boolean
    isDetailPage?: boolean
    isOutrightPage?: boolean
    isSelectCompetition?: boolean
}

export const dateLookup: Record<
    Exclude<DRouteDateType, 'parlay-Today' | 'parlay-Live'>,
    Exclude<DateType, 'Or' | 'UpComingInplay' | 'parlay-Live' | 'parlay-Today'>
> = {
    today: 'Today',
    all: 'Pre',
    inplay: 'Live',
    parlay: 'Parlay',
}

export const mobileDateLookup: Record<
    Exclude<MRouteDateType, 'parlayLive' | 'parlayToday'>,
    Exclude<DateType, 'parlay-Live' | 'parlay-Today'>
> = {
    today: 'Today',
    all: 'Pre',
    future: 'Pre',
    inplay: 'Live',
    parlay: 'Parlay',
    outright: 'Or',
    upcoming: 'UpComingInplay',
}

export type DataInfo = Record<Exclude<DateType, 'parlay-Live' | 'parlay-Today'>, number>

export type SportItem = Record<RouteSportType, DataInfo>

export interface MenuState {
    success: boolean
    data: SportItem
}

export interface GetMenuAction {
    type: typeof FETCH_MENU
    payload: MenuState
}

export type MenuActionTypes = GetMenuAction
