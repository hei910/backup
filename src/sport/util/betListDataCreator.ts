import { BetListData, Competitor, Competitors, MergedData, NewCompetitors } from '@services/sportData/types'
import { LiveScoreInfo } from '@services/sportLive/types'

export const sIdToBetSportTypeMap: { [key: string]: string } = {
    '1': 'Soccer',
    '2': 'Basketball',
    '3': 'Tennis',
    '4': 'Baseball',
}

export const convertCompetitorsFromObjectToArray = (objectData: NewCompetitors): Competitors[] => {
    const arrayCompetitors: Competitors[] = []

    const elementConverter = (competitor: Competitor, qualifier: string): Competitors => {
        return {
            name: competitor?.name,
            country: competitor?.country,
            qualifier,
        }
    }

    arrayCompetitors[0] = elementConverter(objectData['home'], 'home')
    arrayCompetitors[1] = elementConverter(objectData['away'], 'away')

    return arrayCompetitors
}

const betListDataCreator = (
    mergedData: MergedData,
    sId: string = '',
    isOr: boolean = false,
): [BetListData, Record<string, LiveScoreInfo>] => {
    const timeNow = +new Date()

    const { data } = mergedData
    const betListData = {} as BetListData
    const liveScoreInfo: Record<string, LiveScoreInfo> = {}

    Object.entries(data).forEach(([key, date]) => {
        Object.values(date).forEach((season) => {
            Object.values(season.match).forEach((match) => {
                Object.values(match.events).forEach((event) => {
                    if (key === 'iot' && event.ctid === 0) {
                        liveScoreInfo[event.fixtureId] = {
                            fixtureId: event.fixtureId,
                            matchId: match.info.matchId,
                            competitors: event.competitors,
                            scoreBarInfo: match.info.scoreBarInfo,
                            score: event.score,
                            clock: match.info.clock,
                            liveStatus: match.info.liveStatus,
                        }
                    }

                    Object.values(event.markets).forEach((market) => {
                        Object.values(market.outcomes).forEach((outcome) => {
                            const formattedSpecifiers = () => {
                                if (market.marketCode === 'eps') {
                                    return ''
                                }

                                switch (outcome.specifier) {
                                    case 'a':
                                    case 'h':
                                        return ''
                                    default:
                                        return outcome.specifier
                                }
                            }

                            betListData[outcome.uid] = {
                                active: outcome.active,
                                clock: match.info.clock,
                                competitors: convertCompetitorsFromObjectToArray(event.competitors),
                                ctid: event.ctid,
                                description: event.description,
                                ename: market.ename || '',
                                euOdds: outcome.euOdds,
                                fixtureId: event.fixtureId,
                                hasParlay: match.info.hasParlay,
                                header: market.header,
                                isNeutral: match.info.isNeutral,
                                isOr,
                                live: key === 'iot' ? true : false,
                                marketCode: market.marketCode,
                                marketId: market.market_id,
                                marketName: market.name || market.ename || '',
                                matchId: match.info.matchId,
                                matchStatus: match.info.status,
                                odds: outcome.odds,
                                outcomeCode: outcome.outcomeCode,
                                outcomeId: outcome.id,
                                outcomeName: outcome.name,
                                round: match.info.round,
                                score: event.score,
                                seasonId: season.info.seasonId,
                                seasonName: season.info.name,
                                sid: parseInt(sId),
                                source: match.info.source,
                                specifiers: formattedSpecifiers(),
                                sportType: Object.prototype.hasOwnProperty.call(sIdToBetSportTypeMap, sId)
                                    ? sIdToBetSportTypeMap[sId]
                                    : sIdToBetSportTypeMap['1'],
                                status: match.info.status,
                                startTime: match.info.startTime,
                                uid: outcome.uid,
                                updateTime: timeNow,
                            }
                        })
                    })
                })
            })
        })
    })

    return [betListData, liveScoreInfo]
}

export default betListDataCreator
