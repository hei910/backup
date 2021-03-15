import Interval from '@constants/intervals'

export interface IConvertedData {
    cancelled: boolean | null
    betAmount: number
    betDateTime: null | string
    betRecordId: string
    comboGamePlayName: string | null
    gameCode: null | string
    gamePlayName: null | string
    gameSupplier: string
    gameTypeName: null | string
    mobileParlayTitle: string | null
    netProfit: number
    payoutAmount: number
    processed: boolean | null
    sportsData?: {
        estimatedWinnings: number
        normalSettleTBC?: boolean
        masterId?: number
        rowId?: number //
        allowEarlySettle: boolean // early settle
        sportsDetail: IConvertedSportsData[]
    } | null
    validBetAmount: number
    gameDetail?: IGameDetail | IV1GameDetail | null | IEsportDetail
}
export interface IConvertedSportsData {
    homeTeam: string
    awayTeam: string
    match?: string
    score: {
        homeScore: number
        awayScore: number
        hRedCard: number
        aRedCard: number
    }
    startTime: string
    specifier: string
    odds: number
    seasonName: string
    marketName: string
    outcomeName: string
    status: string
    sportType: string
    cancelReason?: string
    winLoseStatus?: string | null
    isOr?: boolean
}

export interface IResponseData {
    hasNextPage: boolean
    result: IData[]
    sumBetAmount: number
    sumPayoutAmount: number
    sumProfit: number
    sumValidBetAmount: number
    total: number
}

export interface IData {
    cancelled?: boolean
    betAmount: number
    betDateTime: null | string
    betRecordId: string
    gameCode: null | string
    gamePlayName: null | string
    gameSupplier: string
    gameTypeName: null | string
    payoutAmount: number
    username: string
    processed?: boolean
    validBetAmount: number
    gameDetail?: IGameDetail | IV1GameDetail | null | IEsportDetail
    netProfit?: number
}

export interface IEsportDetail extends IGameDetail {
    gameCombo: string
    items: IItems[]
}
export interface IItems {
    status: string
    oddsType: string
    content: string
    result: string
    odds: number
    betId: number
    bet: string
    matchId: number
    match: string
    leagueId: number
    league: string
    category: string
    cateId: number
    startAt: string | number
    endAt: string | number
    resultAt: string | number
    detailId?: number
    orderId?: number
}

export interface IGameDetail {
    estimatedWinnings?: number
    betData?: IBetData[] | any[]
    betDetail?: any[]
    orDetail?: any[]
    numCombination?: number
    numMatch?: number
    composition?: number[]
    betSportDetailEntities?: any[] // v1
    betSportOrDetailEntities?: any[] // v1
    betSportDetails?: any[]
    betSportOrDetails?: any[]
    mCount?: number // v1
    matchCount?: number // v1
    rowId?: number // early settle
    masterId: number // early settle
    items?: IItems[] // esport
    gameCombo?: string //esport
    odds1?: any
    odds2?: any
    live?: boolean
    stype?: any
    sid?: any
    stype2?: any
    profit?: any
    draw?: any
    noProfit?: any
    containWorldCup?: any
    oddsListFromDetails: any
}

export interface IV1GameDetail extends IGameDetail {
    ante: number
    betAllowEarlySettle: boolean
    betDt: number | string
    betsDetails: any
    cCount: number
    earlySettleTBC: boolean
    effectiveTotalAnte: number
    label: String
    mCount: number
    masterId: number
    matchCount: number
    normalSettleTbc: boolean
    orBetDetails: any
    paid: boolean | number
    payout: number
    payoutDt: number | null | string
    processed: boolean | number
    totalAnte: number
    unitCount: number
    uuId: string
    platform: string
    betDateTime: string
    payoutAmount: number
    netProfit: number
    balanceAfterBet: number
    lastKickOffDt: string
}

export interface IBetData {
    id?: number
    fixtureId?: string
    marketId?: string
    outcomeId?: string
    resultOddsNumerator: number | null
    resultOddsDenominator: number | null
    isEnded: boolean
    source?: string
    sportType: string
    metadata: IMetaData[] | string
    voidReason?: null | string
    status: string
    matchResult: IMatchResult | null
    seasonName: string
    marketName: string
    outcomeName: string
    homeTeam: string
    awayTeam: string
    specifier: string
    startTime: string
    odds: number
    marketCode: string
    outcomeCode: string
    description: string
    ctid: number
    score: {
        homeScore: number
        awayScore: number
        hRedCard: number
        aRedCard: number
    }
    live: boolean
    liveScore: null | any
    winLoseStatus?: string | null
}

export interface IMatchResult {
    score: IScore
}

export interface IScore {
    homeScore: string
    awayScore: string
}

export interface IMetaData {
    fixtureId?: string
    marketId?: string
    outcomeId?: string
    source?: string
    seasonId?: string
    seasonName?: string
    marketName?: string
    outcomeName?: string
    homeTeam?: string
    awayTeam?: string
    startTime?: string
    specifier?: string
    odds?: number
    numerator?: number
    denominator?: number
    euroNumerator?: number
    euroDenominator?: number
    outcomeStatus?: string
    marketStatus?: string
    oddsType?: string
    marketCode?: string
    outcomeCode: string
    sportType?: string
    description?: string
    ctid?: number
    score?: {
        homeScore?: number
        awayScore?: number
        hRedCard?: number
        aRedCard?: number
    }
    hasParlay?: boolean
    header?: string
    matchId?: string
    clock?: string
    liveStatus?: string
    live?: true
}

export interface IParams {
    startDate: Date
    endDate: Date
    suppliers: string
    gameType: string
    page?: number
    size?: number
    sort?: string
    status?: string
}

export interface IIntervalSelection {
    [Interval.TODAY]: IIntervalOption
    [Interval.TOMORROW]: IIntervalOption
    [Interval.YESTERDAY]: IIntervalOption
    [Interval.WEEK]: IIntervalOption
    [Interval.MONTH]: IIntervalOption
}

export interface IIntervalOption {
    start: Date
    end: Date
}
export interface IEarlySettleParams {
    rowId: any
    masterId: any
}
