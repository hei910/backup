// import store from '@redux'
import { ApiSportType, Markets, Match, Matches, NewMarket, Outcomes, Seasons } from '@services/sportData/types'
import { Platform } from '@services/sportGlobal/types'
import {
    ConvertedEvent,
    ConvertedMarket,
    ConvertedMatches,
    ConvertedMatchInfo,
    ConvertedOutcomes,
    ConvertedSeason,
} from './types'

type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]

export type ConverterFunctionNames = Exclude<FunctionPropertyNames<IConverter>, 'getData'>

export type IPartialConverter<T extends ConverterFunctionNames> = new (data: Seasons, sport: string) => {
    [P in Exclude<keyof Converter, T>]: Converter[P]
}

export interface IConverter {
    data: Seasons
    sport: ApiSportType
    convertSeasons: (seasons: Seasons) => ConvertedSeason[]
    convertMatchsToArray: (matchs: Matches) => ConvertedMatches[]
    convertMatchInfo: (match: Match) => ConvertedMatchInfo
    convertMatchEvent: (match: Match) => ConvertedEvent[]
    convertMarket: (markets: Markets) => ConvertedMarket[]
    convertOutcome: (outcomes: Outcomes) => any
    getData: () => any
}

class Converter {
    protected data: Seasons
    protected sport: ApiSportType
    protected platform: Platform = (process.env.REACT_APP_PLATFORM as Platform) ?? 'desktop'

    constructor(data: Seasons, sport: ApiSportType) {
        this.data = data
        this.sport = sport
    }

    protected convertSeasons = (seasons: Seasons): ConvertedSeason[] => {
        return Object.entries(seasons).map(([key, season]) => ({
            key,
            info: season.info,
            matchs: this.convertMatchsToArray(season.match),
        }))
    }

    protected convertMatchsToArray = (matchs: Matches): ConvertedMatches[] => {
        return Object.entries(matchs).map(([key, match]) => ({
            key,
            info: this.convertMatchInfo(match),
            evnetsKey: Object.keys(match.events),
            events: this.convertMatchEvent(match),
        }))
    }

    protected convertMatchInfo = (match: Match): ConvertedMatchInfo => {
        const { info, events } = match
        const competitors = events['0']?.competitors ?? Object.values(events)[0]?.competitors ?? {}

        return { ...info, competitors }
    }

    protected convertMatchEvent = (match: Match): ConvertedEvent[] => {
        // const ctidRules = store.getState().sportRules.ctid

        const convertedEvent = Object.values(match.events)
            // .filter((event) => (ctidRules[this.sport]?.length ? !ctidRules[this.sport].includes(event.ctid) : true))
            .map((event) => ({
                ...event,
                markets: this.convertMarket(event.markets, event.fixtureId, event.ctid, match.info.source),
            }))

        // return Object.values(match.events).map((event) => ({
        //     ...event,
        //     markets: this.convertMarket(event.markets, event.fixtureId, event.ctid, match.info.source),
        // }));

        return convertedEvent
    }

    protected convertMarket = (
        markets: Markets,
        fixtureId: string,
        ctId: number,
        source: string,
    ): ConvertedMarket[] => {
        return Object.entries(markets).map(([key, market]) => ({
            ...market,
            key,
            outcomes: this.convertOutcome(market, fixtureId, ctId, source),
        }))
    }

    protected convertOutcome = (
        market: NewMarket,
        fixtureId: string,
        ctId: number,
        source: string,
    ): ConvertedOutcomes => {
        return Object.entries(market.outcomes).reduce((convertedOutcomes, [key, outcome]) => {
            const rulesActiveKey = `${this.platform}.${source}.${this.sport}.${market.marketCode}`

            convertedOutcomes[key] = {
                ...outcome,
                key,
                combinedID: {
                    fixtureId,
                    marketId: market.market_id,
                    outcomeUId: outcome.uid,
                    ctId,
                },
                rulesActiveKey,
            }
            return convertedOutcomes
        }, {} as ConvertedOutcomes)
    }

    public getData = () => {
        return this.convertSeasons(this.data)
    }
}

export default Converter
