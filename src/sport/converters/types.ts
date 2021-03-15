import { CombinedID } from '@services/sportBet/types'
import { DataStatus, Event, MatchInfo, NewCompetitors, NewMarket, Outcome, SeasonInfo } from '@services/sportData/types'

export type AMTableConverter<T> = Record<DataStatus, T[]>

export type ConvertedTableData<T = ConvertedSeason, K = 'default'> = T extends 'am'
    ? AMTableConverter<ConvertedSeason>
    : K extends 'am'
    ? AMTableConverter<T>
    : T[]

export interface ConvertedSeason {
    key: string
    info: SeasonInfo
    matchs: ConvertedMatches[]
}

export interface ConvertedMatches {
    key: string
    info: ConvertedMatchInfo
    evnetsKey: string[]
    events: ConvertedEvent[]
}

export interface ConvertedMatchInfo extends MatchInfo {
    competitors: NewCompetitors
}

export interface ConvertedEvent extends Omit<Event, 'markets'> {
    markets: ConvertedMarket[]
}

export interface ConvertedMarket extends Omit<NewMarket, 'outcomes'> {
    key: string
    outcomes: ConvertedOutcomes
}

export type ConvertedOutcomes = Record<string, ConvertedOutcome>

export interface ConvertedOutcome extends Outcome {
    key: string
    combinedID: CombinedID
    rulesActiveKey: string
}

export interface ConvertedCompetitor {
    name: string
    country: string
    key: string
}

export interface CSConvertedOutcomes {
    home: ConvertedOutcome[]
    away: ConvertedOutcome[]
    draw: ConvertedOutcome[]
    other: ConvertedOutcome[]
}
