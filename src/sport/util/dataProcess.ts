import {
    ConvertedEvent,
    ConvertedMarket,
    ConvertedMatches,
    ConvertedOutcome,
    ConvertedOutcomes,
    ConvertedSeason,
} from '@sport/converters/types'
import {
    Competitiors,
    Competitors,
    CountryCompetitionInfoWithType,
    MatchesDate,
    NewCompetitors,
    Outcome,
    Points,
    Score,
} from '@services/sportData/types'
import {
    DataInfo,
    DateType,
    mobileDateLookup,
    MRouteDateType,
    RouteDateType,
    SportItem,
} from '@services/sportMenu/types'
import { NotificationData } from '@services/sportNotification/types'
import { useSpMarketCodeCtid } from './constant'
import { Dictionary } from './dictionary'

export const getLastestNotificationDate = (notifications: NotificationData[]) => {
    let date = ''

    notifications.forEach((notification) => {
        if (!date) {
            date = notification.updatedDate
        } else {
            if (new Date(date) < new Date(notification.updatedDate)) {
                date = notification.updatedDate
            }
        }
    })

    return date
}

export const isNewEPSExist = (event?: ConvertedEvent) => {
    if (!event) {
        return false
    }

    return event.markets.some((market) => {
        return market.marketCode === 'eps'
    })
}

export const isEPSMarketExist = (event: undefined | ConvertedEvent) => {
    if (!event) {
        return false
    }

    return event?.markets?.some((market: ConvertedMarket) => {
        return market.marketCode === 'eps'
    })
}

export const getHomeAwayDrawOutcomes = (outcomes: ConvertedOutcomes) => {
    const home: any[] = []
    const away: any[] = []
    const draw: any[] = []
    const other: any[] = []

    Object.entries(outcomes).forEach(([key, outcome]) => {
        const score = outcome.outcomeCode.replace(/([-:.\s])/, '').split('')

        let homeScore = 0
        let awayScore = 0

        try {
            homeScore = parseInt(score[0])
            awayScore = parseInt(score[1])
        } catch (error) {
            // Do nothing
        }

        if (homeScore - awayScore > 0) {
            home.push(outcome)
        } else if (homeScore - awayScore < 0) {
            away.push(outcome)
        } else {
            outcome.outcomeCode === 'other' ? other.push(outcome) : draw.push(outcome)
        }
    })

    return { home, away, draw, other }
}

export const getUniqueMarketCode = (marketCodes: string[], optionalCode: string = '', vaildKey?: string) =>
    marketCodes.filter((markeCode, i, arr) => {
        const isVaildCode = vaildKey
            ? isValidAMMarketCode(markeCode, optionalCode, vaildKey) &&
              getAMSessionCode(markeCode, optionalCode, vaildKey).includes(optionalCode)
            : true
        return isVaildCode && arr.indexOf(markeCode) === i
    })

const filterBasketballAMUniqueKey = (marketCodes: string[], optionalCode: string = '') =>
    marketCodes.filter(
        (marketCode, index) =>
            isValidBasketballAMMarketCode(marketCode) &&
            getAMOptionsCode(marketCode).includes(optionalCode) &&
            marketCodes.indexOf(marketCode) === index,
    )

const getAMOptionsCode = (marketCode: string) => {
    const regex = /\w?(ml|ou|ah|t1ou|t2ou)(\w+)/gm
    const match = regex.exec(marketCode)
    return match ? match[2] : ''
}

const isValidBasketballAMMarketCode = (marketCode: string) => {
    const regex = /^(ml|ou|ah|t1ou|t2ou)(\w{2,3})?$/gm
    return regex.test(marketCode)
}

export const getAMSessionCode = (marketCode: string, optionalCode: string = '', vaildMarketCodes: string) => {
    // const regex = /\w?(ml|ou|ah|t1ou|t2ou)(\w+)/gm;
    const regex = new RegExp(`\\w?(${vaildMarketCodes})${optionalCode.length > 0 ? `((${optionalCode}\\w+))` : ''}`)
    const match = regex.exec(marketCode)

    return match ? match[optionalCode.length > 0 ? 2 : 1] : ''
}

const isValidAMMarketCode = (marketCode: string, optionalCode: string = '', vaildMarketCodes: string) => {
    // const regex = /^(ml|ou|ah|t1ou|t2ou)(\w{2,3})?$/gm;
    const regex = new RegExp(`^(${vaildMarketCodes})${optionalCode.length > 0 ? `((${optionalCode}\\w+))` : ''}$`)

    return regex.test(marketCode)
}

export const filterSessionAMData = (markets: ConvertedMarket[], optionalCode: string = '', vaildKey?: string) => {
    let rowNum = 0
    const marketCodes = markets.map((v) => v.marketCode)
    const uniqueKey = getUniqueMarketCode(marketCodes, optionalCode, vaildKey)

    const marketsArray = uniqueKey.reduce((a, b) => {
        a[b] = markets.filter((v) => v.marketCode === b)
        rowNum = a[b].length > rowNum ? a[b].length : rowNum
        return a
    }, {} as Dictionary<ConvertedMarket[]>)

    return { markets: marketsArray, rowNum, uniqueKey }
}

export const filterBasketballAMData = (markets: ConvertedMarket[], optionalCode: string = '') => {
    let rowNum = 0
    const marketCodes = markets.map((v) => v.marketCode)
    const uniqueKey = filterBasketballAMUniqueKey(marketCodes, optionalCode)

    const marketsArray = uniqueKey.reduce((a, b) => {
        a[b] = markets.filter((v) => v.marketCode === b)
        rowNum = a[b].length > rowNum ? a[b].length : rowNum
        return a
    }, {} as Dictionary<ConvertedMarket[]>)

    return { markets: marketsArray, rowNum, uniqueKey }
}

export const sortByMarketCode = (markets: ConvertedMarket[], uniqueKey: string[]) => {
    let rowNum = 0

    const marketsArray = uniqueKey.reduce((a, b) => {
        a[b] = markets.filter((v) => v.marketCode === b)
        rowNum = a[b].length > rowNum ? a[b].length : rowNum
        return a
    }, {} as Dictionary<ConvertedMarket[]>)

    return { markets: marketsArray, rowNum, uniqueKey }
}

export const filterSeasonData = (data: CountryCompetitionInfoWithType[], searchKeyword: string) => {
    const filterCountryList = data?.reduce((result, country) => {
        const matchCompetitions = country.competitions.filter((competition) =>
            competition.name.toLowerCase().includes(searchKeyword.toLowerCase()),
        )

        matchCompetitions.length > 0 && result.push({ ...country, competitions: matchCompetitions })

        return result
    }, [] as CountryCompetitionInfoWithType[])

    return filterCountryList
}

export const getDefaultDate = (dateList: MatchesDate[], date: RouteDateType, matchsStatus: string) => {
    const isParlayPre = date === 'parlay' && matchsStatus === 'Pre'

    switch (date) {
        case 'today':
            return 'Today'
        case 'future':
            return dateList.some((matchDate) => matchDate.matchsDate === matchsStatus)
                ? matchsStatus
                : (dateList.find((matchDate) => /\d{4}-\d{2}-\d{2}/gm.test(matchDate.date))?.matchsDate ??
                      dateList[0]?.matchsDate) ||
                      'Pre'
        default:
            return isParlayPre ? `parlay-${matchsStatus}` : matchsStatus || 'Pre'
    }
}

export const getTotalCount = (menuData: SportItem, date: DateType) =>
    Object.values(menuData).reduce((total: number, current: DataInfo) => {
        if ((date as any) === 'home') {
            return total + Object.values(current).reduce((totalCount, dateCount) => totalCount + dateCount, 0)
        } else {
            return total + (current[mobileDateLookup[date as MRouteDateType]] ?? 0)
        }
    }, 0)

// export const checkSeasonName = (data: Fixture[]) => {
//     const newFilteredData: {
//         seasonName: string;
//         gameInfo: Fixture[];
//     }[] = [];

//     data.forEach((matchList, index) => {
//         if (matchList) {
//             const prevSeasonName = data?.[index - 1]?.seasonName;
//             if (prevSeasonName !== matchList.seasonName) {
//                 newFilteredData.push({ seasonName: matchList.seasonName, gameInfo: [matchList] });
//             } else {
//                 newFilteredData[newFilteredData.length - 1].gameInfo.push(matchList);
//             }
//         }
//     });

//     return newFilteredData;
// };

// export const homeOutcomesHandler = (outcomes: Outcome[]) => {
//     return outcomes.filter((outcome) => outcome.outcomeCode === 'h');
// };

// export const awayOutcomesHandler = (outcomes: Outcome[]) => {
//     return outcomes.filter((outcome) => outcome.outcomeCode === 'a');
// };

// export const overOutcomesHandler = (outcomes: Outcome[]) => {
//     return outcomes.filter((outcome) => outcome.outcomeCode === 'ov');
// };

// export const underOutcomesHandler = (outcomes: Outcome[]) => {
//     return outcomes.filter((outcome) => outcome.outcomeCode === 'un');
// };

export const overOrUnderSpecifier = (outcome: Outcome | ConvertedOutcome) => {
    if (outcome?.outcomeCode === 'ov') {
        const specifier = `O ${outcome?.specifier}`
        return specifier
    } else if (outcome?.outcomeCode === 'un') {
        const specifier = `U ${outcome?.specifier}`
        return specifier
    } else if (outcome?.outcomeCode === 'h' || outcome?.outcomeCode === 'a') {
        return `${outcome?.specifier}`
    } else {
        return ''
    }
}

export const yesOrNoHandler = (name: string) => {
    const outcome = name.split('&')[1] ?? ''
    if (outcome.includes('不是') || outcome.includes('否')) {
        return '不是'
    } else if (outcome.includes('是')) {
        return '是'
    } else if (outcome.includes('高于') || outcome.includes('大')) {
        return outcome
    } else if (outcome.includes('低于') || outcome.includes('小')) {
        return outcome
    } else if (outcome.includes('单') || outcome.includes('奇数')) {
        return '单'
    } else if (outcome.includes('双') || outcome.includes('偶数')) {
        return '双'
    } else {
        return outcome
    }
    // return name.split('&')[1];
}

export const newOtherDetailGames = (data: ConvertedEvent[], id: number) => {
    return data.filter((value) => value.ctid === id)
}
export const splitCompetitors = (competitor: string, ctid: number | undefined) => {
    switch (ctid) {
        case 16:
            return competitor.includes('上') ? competitor.split('上')[0] : competitor.split('1')[0]
        case 17:
            return competitor.split('1')[0]
        case 18:
            return competitor.split('3')[0]
        case 19:
            return competitor.includes('下') ? competitor.split('下')[0] : competitor.split('2')[0]
        case 20:
            return competitor.split('6')[0]
        case 21:
            return competitor.split('7')[0]
    }
}

export const newDetailCtid = (data: ConvertedEvent[]) => {
    if (data === undefined) {
        return []
    }
    const ctidArr: number[] = []
    data.forEach((arr) => {
        if (arr.ctid !== 0) ctidArr.push(arr.ctid)
    })
    return ctidArr
}

export const newFirstHalfCtid = (data: ConvertedEvent[]) => {
    if (data === undefined) {
        return []
    }
    const ctidArr: number[] = []
    data.forEach((arr) => {
        if (arr.ctid === 1 || arr.ctid === 2) {
            ctidArr.push(arr.ctid)
        } else if (arr.ctid === 12 || arr.ctid === 13) {
            if (arr.markets.filter((market) => market.marketCode === 'ou1st').length > 0) {
                ctidArr.push(arr.ctid)
            }
        }
    })
    return ctidArr
}

export const newCornerBallMarketCode = (data: ConvertedEvent) => {
    const marketCodeArr: string[] = []
    data.markets.forEach((market) => {
        marketCodeArr.push(market.marketCode)
    })
    return marketCodeArr
}

export const newAhOuMarketCode = (data: ConvertedEvent[]) => {
    if (data === undefined) {
        return []
    }
    const matchList = data.filter((data) => data.ctid === 0)[0]
    const marketCodeArr: string[] = []
    matchList?.markets.forEach((market) => {
        if (marketCodeArr.includes(market?.marketCode) === false) {
            switch (market?.marketCode) {
                case 'ah':
                case 'ah1st':
                case 'ah2nd':
                case 'ou':
                case 'ou1st':
                case 'ousp':
                    marketCodeArr.push(market?.marketCode)
            }
        }
    })
    return marketCodeArr
}

export const newAhOuCtid = (data: ConvertedEvent[]) => {
    if (data === undefined) {
        return []
    }
    const ctidArr: number[] = []
    data.forEach((arr) => {
        if (arr.ctid === 12 || arr.ctid === 13 || arr.ctid === 41 || arr.ctid === 42) {
            if (arr.markets.filter((market) => market.marketCode.includes('ou')).length > 0) {
                ctidArr.push(arr.ctid)
            }
        }
    })
    return ctidArr
}

export const newPopularCtid = (data: ConvertedEvent[]) => {
    if (data === undefined) {
        return []
    }
    const ctidArr: number[] = []
    data.forEach((fixture) => {
        switch (fixture.ctid) {
            case 12:
            case 13:
            case 41:
            case 42:
                ctidArr.push(fixture.ctid)
        }
    })
    return ctidArr
}

export const newOuMarketCode = (data: ConvertedEvent[]) => {
    if (data === undefined) {
        return []
    }
    const matchList = data.filter((data) => data?.ctid === 0)[0]
    const marketCodeArr: string[] = []
    matchList?.markets.forEach((market) => {
        if (marketCodeArr.includes(market?.marketCode) === false) {
            switch (market?.marketCode) {
                case 'ou':
                case 'ou1st':
                case 'ousp':
                case 'cs':
                case 'cs1st':
                case 'tg':
                case 'tg1st':
                case 'tgsp':
                case 'oe':
                case 'oe1st':
                    marketCodeArr.push(market?.marketCode)
            }
        }
    })
    return marketCodeArr
}

export const newFirstHalfMarketCode = (data: ConvertedEvent[]) => {
    if (data === undefined) {
        return []
    }
    const matchList = data.filter((data) => data?.ctid === 0)[0]
    const marketCodeArr: string[] = []
    matchList?.markets.forEach((market) => {
        if (marketCodeArr.includes(market?.marketCode) === false) {
            switch (market?.marketCode) {
                case '1x21st':
                case 'ah1st':
                case 'ou1st':
                case 'cs1st':
                case 'tg1st':
                case 'oe1st':
                case 'hf':
                    marketCodeArr.push(market?.marketCode)
            }
        }
    })
    return marketCodeArr
}

export const firstHalfCtidMarketCode = (data: ConvertedEvent) => {
    const marketCodeArr: string[] = []
    data?.markets.forEach((market) => {
        if (marketCodeArr.includes(market?.marketCode) === false) {
            switch (market?.marketCode) {
                case '1x21st':
                case 'ah1st':
                case 'ou1st':
                case 'cs1st':
                case 'tg1st':
                case 'oe1st':
                case 'hf':
                    marketCodeArr.push(market?.marketCode)
            }
        }
    })
    return marketCodeArr
}

export const newPopularMarketCode = (datas: ConvertedEvent[]) => {
    if (datas === undefined) {
        return []
    }
    const matchList = datas.filter((data) => data?.ctid === 0)[0]
    const marketCodeArr: string[] = []
    matchList?.markets.forEach((market) => {
        if (marketCodeArr.includes(market.marketCode) === false) {
            switch (market.marketCode) {
                case '1x2':
                case '1x21st':
                case 'ah':
                case 'ah1st':
                case 'ou':
                case 'ou1st':
                case 'cs':
                case 'cs1st':
                case 'cssp':
                case 'tg':
                case 'tg1st':
                case 'oe':
                case 'oe1st':
                case 'hf':
                case 'scoant':
                    marketCodeArr.push(market.marketCode)
            }
        }
    })
    return marketCodeArr
}

export const newFifteenMinCtid = (data: ConvertedEvent[]) => {
    if (data === undefined) {
        return []
    }
    const ctidArr: number[] = []
    data.forEach((arr) => {
        switch (arr.ctid) {
            case 16:
            case 17:
            case 18:
            case 19:
            case 20:
            case 21:
                ctidArr.push(arr.ctid)
        }
    })
    return ctidArr
}

export const newCornerCtid = (data: ConvertedEvent[]) => {
    if (data === undefined) {
        return []
    }
    const ctidArr: number[] = []
    data.forEach((arr) => {
        switch (arr.ctid) {
            case 1:
                ctidArr.push(arr.ctid)
        }
    })
    return ctidArr
}

export const newSpecialMarketCode = (data: ConvertedEvent[]) => {
    if (data === undefined) {
        return []
    }
    const matchList = data.filter((data) => data?.ctid === 0)[0]
    const marketCodeArr: string[] = []
    matchList?.markets.forEach((arr) => {
        switch (arr.ename) {
            case 'RedCard_Player':
            case 'PenaltyAwarded':
                marketCodeArr.push(arr?.ename)
        }
    })
    return marketCodeArr
}

export const newOtherMarketCode = (data: ConvertedEvent[]) => {
    if (data === undefined) {
        return []
    }
    const matchList = data.filter((data) => data?.ctid === 0)[0]
    const marketCodeArr: string[] = []
    matchList?.markets.forEach((arr) => {
        if (arr?.ename === 'PenaltyAwarded') {
            marketCodeArr.push(arr?.ename)
        }
    })
    return marketCodeArr
}

export const getCompetitorTeamName = (competitors: Competitors[] | NewCompetitors, qualifier: Competitiors) => {
    if (Array.isArray(competitors)) {
        const result = competitors
            .filter((competitor) => competitor.qualifier === qualifier)
            .map((competitor) => competitor.name)
        return result.length > 0 ? result[0] : ''
    } else {
        return competitors[qualifier].name as string
    }
}

export const getScore = (s: Score) => ({
    home: s.home ?? s.homeScore,
    away: s.away ?? s.awayScore,
})

export const checkIsCtidMarketCode = (ctid: number, marketCode: string, isDetailPage?: boolean) => {
    const rule = isDetailPage && marketCode.includes('oe')
    return `${marketCode}${useSpMarketCodeCtid.includes(ctid) || rule ? 'ctid' : ''}`
}

export const getSpCtidTeamName = (ctid: number, teamName: string) => {
    const isSpCtid = useSpMarketCodeCtid.includes(ctid)
    const splitTeamName = teamName.split('-')
    return isSpCtid && splitTeamName.length > 0 ? splitTeamName[0] : teamName
}

export const getOvUnTitle = (index: number) => {
    return index === 0 ? 'outcomes.ov' : 'outcomes.un'
}

export const getOdEvTitle = (index: number) => {
    return index === 0 ? 'outcomes.od' : 'outcomes.ev'
}

export const getOvUnOutcome = (outcomes: ConvertedOutcome[], index: number) => {
    return index === 0
        ? outcomes.filter((outcome) => outcome?.outcomeCode === 'ov')
        : outcomes.filter((outcome) => outcome?.outcomeCode === 'un')
}

export const getOdEvOutcome = (outcomes: ConvertedOutcome[], index: number) => {
    return index === 0
        ? outcomes.filter((outcome) => outcome?.outcomeCode === 'od')
        : outcomes.filter((outcome) => outcome?.outcomeCode === 'ev')
}

export const newDetailMarketCode = (datas: ConvertedEvent[]) => {
    if (datas === undefined) {
        return []
    }
    const matchList = datas.filter((data: ConvertedEvent) => data.ctid === 0)[0]
    const marketCodeArr: (string | undefined)[] = []
    matchList?.markets?.forEach((market) => {
        if (marketCodeArr.includes(market?.marketCode) === false) {
            if (market?.marketCode === 'sp') {
                if (marketCodeArr.includes(market?.ename) === false) {
                    marketCodeArr.push(market?.ename)
                }
            } else {
                marketCodeArr.push(market?.marketCode)
            }
        }
    })
    return marketCodeArr
}

export const ctidMarketCode = (data: ConvertedEvent) => {
    const marketCodeArr: string[] = []
    data?.markets?.forEach((market) => {
        if (marketCodeArr.includes(market?.marketCode) === false) {
            marketCodeArr.push(market?.marketCode)
        }
    })
    return marketCodeArr
}

const newSetInitial = (popularItem: any, detailItem: any, sports?: string, date?: string, data?: ConvertedEvent[]) => {
    if (data !== undefined && date !== undefined && sports !== undefined) {
        if (sports === 'football' && date !== 'inplay') {
            return newPopularMarketCode(data).length > 0 || newPopularCtid(data).length > 0 ? popularItem : detailItem
        } else {
            return detailItem
        }
    } else {
        return detailItem
    }
}

export const newSetInitialMarketCode = (data: ConvertedEvent[], sports?: string, date?: string) => {
    return newSetInitial(newPopularMarketCode(data), newDetailMarketCode(data), sports, date, data)
}

export const newSetInitialCtid = (data: ConvertedEvent[], sports?: string, date?: string) => {
    return newSetInitial(newPopularCtid(data), newDetailCtid(data), sports, date, data)
}

export const newSetInitialTitle = (data: ConvertedEvent[], sports?: string, date?: string) => {
    return newSetInitial('popular', 'all', sports, date, data)
}

export const convertOutcome = (market: ConvertedMarket) => {
    return Object.entries(market.outcomes).map(([key, outcome]) => ({ ...outcome }))
}

export const filterMarket = (markets: ConvertedMarket[], marketCode: string) => {
    return markets.filter((market) => market?.ename === marketCode).length > 0
        ? markets.filter((market) => market?.ename === marketCode)
        : markets.filter((market) => market?.marketCode === marketCode)
}

export const filterSpecifier = (market: ConvertedMarket, team: string) => {
    if (market === undefined) {
        return []
    }
    const outcomesArray = convertOutcome(market) ?? []
    const newOutcomesArray = outcomesArray.length > 0 ? outcomesArray.filter((outcome) => outcome?.team === team) : []
    const emptySpecifierOutcomesArray =
        outcomesArray.length > 0 ? outcomesArray.filter((outcome) => outcome?.team === '') : []
    return newOutcomesArray.concat(emptySpecifierOutcomesArray) ?? []
}

export const mobileSportsCount = (data: ConvertedSeason[]) => {
    if (!data) {
        return 0
    }
    let count = 0
    data.forEach((season) => {
        season.matchs.forEach((match) => {
            match.events.forEach((event) => {
                count++
            })
        })
    })
    return count
}

export const allCounts = (
    footballCount: number,
    basketballCount: number,
    tennisCount: number,
    baseballCount: number,
) => {
    return footballCount + basketballCount + tennisCount + baseballCount
}

//for basketball scorebarinfo
export const ftTotal = (points?: Points[]) => {
    if (points !== undefined) {
        return (
            points.filter((point) => point?.period === 'ft')[0]?.homeScore +
            points.filter((point) => point?.period === 'ft')[0]?.awayScore
        )
    } else {
        return 0
    }
}
//for basketball scorebarinfo
export const sectionTotal = (points?: Points[], secondHalf?: boolean) => {
    if (points === undefined) {
        return 0
    }
    let count = 0
    points.forEach((point) => {
        if (!secondHalf) {
            if (point?.period === 'q1' || point?.period === 'q2' || point?.period === 'q3' || point?.period === 'q4') {
                count = count + point?.homeScore + point?.awayScore
            }
        } else {
            if (point?.period === 'q3' || point.period === 'q4') {
                count = count + point?.homeScore + point?.awayScore
            }
        }
    })
    return count
}
//for basketball scorebarinfo
export const sectionMapRight = (ncaa: boolean, header: boolean) => {
    if (header) {
        return ncaa ? ['1h', '2h', 'ot', 'ft'] : ['1h', '2h', 'ft']
    } else {
        return ncaa ? ['1h', '2h', 'ot'] : ['1h', '2h']
    }
}

//for basketball scorebarinfo
export const isNcaa = (convertedData: ConvertedMatches) => {
    if (
        (sectionTotal(convertedData?.info?.scoreBarInfo?.points, false) === 0 &&
            ftTotal(convertedData?.info?.scoreBarInfo?.points) > 0) ||
        convertedData?.info?.scoreBarInfo?.period.toLowerCase() === '1h' ||
        convertedData?.info?.scoreBarInfo?.period.toLowerCase() === '2h' ||
        convertedData?.info?.round === '2'
    ) {
        return true
    } else if (
        (sectionTotal(convertedData?.info?.scoreBarInfo?.points, false) > 0 &&
            ftTotal(convertedData?.info?.scoreBarInfo?.points) > 0) ||
        convertedData?.info?.round === '4'
    ) {
        return false
    } else {
        return false
    }
}
