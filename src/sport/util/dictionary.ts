import { InfoIcon3Outline, WarningIcon } from '@sport/components/icons'
import i18n from '@sport/locale/i18n'
import { BetData } from '@services/sportBet/types'
import { Competitors, NewCompetitors, Outcome } from '@services/sportData/types'
import { useHyphenCtid } from './constant'
import { checkIsCtidMarketCode, getCompetitorTeamName, getSpCtidTeamName } from './dataProcess'

const t = i18n.t.bind(i18n)

export type Dictionary<T> = {
    [key in string | number]: T
}

export interface BetMessage {
    message: string
    icon?: React.FC<React.SVGProps<SVGSVGElement>>
    color?: string
}

export const betMessageMap: Dictionary<BetMessage> = {
    oddsUpdated: {
        message: 'betList.betChanged',
        icon: InfoIcon3Outline,
        color: '#4caf50',
    },
    betClosed: {
        message: 'betList.betClosed',
        icon: WarningIcon,
        color: '#aa4848',
    },
}

export const marketCodeMap = (sportType: string = 'football', marketCode: string, fixtureId?: string) => {
    // const tennisMap =
    //     sportType === 'tennis' && fixtureId
    //         ? tennisMarketCodeMap
    //         : { ...tennisMarketCodeMap, ...tennisInplayMarketCodeMap };

    const sportMarketCode: Dictionary<string> = {
        football: footballMarketCodeMap[marketCode],
        soccer: footballMarketCodeMap[marketCode],
        basketball: basketballMarketCodeMap[marketCode],
        tennis: { ...tennisMarketCodeMap, ...tennisInplayMarketCodeMap }[marketCode],
        baseball: baseballMarketCodeMap[marketCode],
    }

    return sportMarketCode[sportType]
}

export const liveSectionCodeMap = (sportType: string = 'football', liveStatus: string) => {
    const sportSectionMap: Dictionary<string> = {
        football: footballSectionMap[liveStatus],
        basketball: basketballSectionMap[liveStatus],
        tennis: tennisSectionMap[liveStatus],
        baseball: baseballSectionMap[liveStatus],
    }
    return sportSectionMap[sportType]
}

export const headerMarketCodeMap = (
    betData: Pick<BetData, 'ctid' | 'competitors' | 'marketCode' | 'marketName' | 'fixtureId' | 'sportType'>,
    isDetailPage?: boolean,
) => {
    const { ctid, competitors, marketCode, marketName, fixtureId, sportType } = betData
    const isSp = marketCode === 'sp'
    const qualifier = ctidCompetitorQualifierMap[ctid] || ''
    const teamName =
        !isSp && qualifier.length > 0 ? getSpCtidTeamName(ctid, getCompetitorTeamName(competitors, qualifier)) : ''

    const newMarketCode = checkIsCtidMarketCode(ctid, marketCode, isDetailPage)
    const tempMarket = marketCodeMap(sportType.toLowerCase(), newMarketCode, fixtureId)
    const normalMarket = tempMarket && t(tempMarket) !== tempMarket ? tempMarket : ''

    const market = t(normalMarket) || marketName
    const ctidName = !isSp && ctid > 0 ? t(ctidMap[ctid]) : ''

    // const combinedMarketCode = `${ctid === 0 ? '' : ctid}${qualifier}${marketCode}`;
    const combinedMarketName = `${ctidName}${ctidName.length > 0 ? ' - ' : ''}${teamName}${
        useHyphenCtid.includes(ctid) ? ' - ' : ''
    }${market}`
    return combinedMarketName
}

const ctidCompetitorQualifierMap: Dictionary<'home' | 'away'> = {
    // 12	球队进球数	home
    // 13	球队进球数	away
    // 41	球队得分	home
    // 42	球队得分	away
    12: 'home',
    13: 'away',
    41: 'home',
    42: 'away',
    208: 'home',
    209: 'away',
}

const ctidMap: Dictionary<string> = {
    // 7	会晋级
    // 1	角球
    // 2	罚牌数
    // 12	球队进球数	home
    // 13	球队进球数	away
    // 16	15 分钟进球数: 开场 - 14:59 分钟
    // 17	15 分钟进球数: 15:00 - 29:59 分钟
    // 18	15 分钟进球数: 30:00 分钟 - 半场
    // 19	15 分钟进球数: 下半场开始 - 59:59 分钟
    // 20	15 分钟进球数: 60:00 - 74:59 分钟
    // 21	15 分钟进球数: 75:00 分钟 - 全场
    // 41	球队得分	home
    // 42	球队得分	away

    7: 'markets.ctid.willAdvance',
    1: 'markets.ctid.cornerBall',
    2: 'markets.ctid.penalty',
    12: 'markets.ctid.teamGoal',
    13: 'markets.ctid.teamGoal',
    16: 'markets.ctid.fifteenStart',
    17: 'markets.ctid.fifteen15',
    18: 'markets.ctid.fifteen30',
    19: 'markets.ctid.fifteenHalf',
    20: 'markets.ctid.fifteen60',
    21: 'markets.ctid.fifteen75',
    41: 'markets.ctid.teamScore',
    42: 'markets.ctid.teamScore',
    208: 'markets.ctid.teamScore',
    209: 'markets.ctid.teamScore',
}

export const footballSectionMap: Dictionary<string> = {
    '1h': 'liveStatus.football.1h',
    '1H': 'liveStatus.football.1h',
    '2h': 'liveStatus.football.2h',
    '2H': 'liveStatus.football.2h',
    ht: 'liveStatus.football.ht',
    HT: 'liveStatus.football.ht',
    FT: 'liveStatus.football.ot',
    ot: 'liveStatus.football.ot',
    bfpk: 'liveStatus.football.bfpk',
    pk: 'liveStatus.football.pk',
    atpk: 'liveStatus.football.atpk',
    //Source C liveStatus
    FirstHalf: 'liveStatus.football.1h',
    HalfTime: 'liveStatus.football.ht',
    SecondHalf: 'liveStatus.football.2h',
    FullTimeNormalTime: 'liveStatus.football.h2nt',
    ExtraTimeFirstHalf: 'liveStatus.football.ot',
    ExtraTimeHalfTime: 'liveStatus.football.ot',
    ExtraTimeSecondHalf: 'liveStatus.football.ot',
    FullTimeExtraTime: 'liveStatus.football.ot',
    Penalties: 'liveStatus.football.pk',
    end: 'liveStatus.football.end',
}

export const basketballSectionMap: Dictionary<string> = {
    'First Quarter': 'liveStatus.basketball.q1',
    'Second Quarter': 'liveStatus.basketball.q2',
    'Third Quarter': 'liveStatus.basketball.q3',
    'Fourth Quarter': 'liveStatus.basketball.q4',
    'First Half': 'liveStatus.basketball.1h',
    'Second Half': 'liveStatus.basketball.2h',
    'Half Time': 'liveStatus.basketball.2h',
    'Over Time': 'liveStatus.basketball.ot',
    '2H': 'liveStatus.basketball.1h',
    '1H': 'liveStatus.basketball.2h',
    '2h': 'liveStatus.basketball.2h',
    '1h': 'liveStatus.basketball.1h',
    q1: 'liveStatus.basketball.q1',
    q2: 'liveStatus.basketball.q2',
    q3: 'liveStatus.basketball.q3',
    q4: 'liveStatus.basketball.q4',
    ot: 'liveStatus.basketball.ot',
    b1: 'liveStatus.basketball.b1',
    b2: 'liveStatus.basketball.b2',
    b3: 'liveStatus.basketball.b3',
    pre: 'liveStatus.basketball.pre',
    pause: 'liveStatus.basketball.pause',
    //Source C liveStatus
    RegularTime: 'liveStatus.basketball.regularTime',
    BeforeOvertime: 'liveStatus.basketball.beforeOvertime',
    Overtime: 'liveStatus.basketball.ot',
    FirstQuarter: 'liveStatus.basketball.q1',
    BeforeSecondQuarter: 'liveStatus.basketball.q2',
    SecondQuarter: 'liveStatus.basketball.q2',
    ThirdQuarter: 'liveStatus.basketball.q3',
    BeforeFourthQuarter: 'liveStatus.basketball.q4',
    FourthQuarter: 'liveStatus.basketball.q4',
    BeforeOverTime: 'liveStatus.basketball.ot',
}

export const tennisSectionMap: Dictionary<string> = {
    s1: 'liveStatus.tennis.s1',
    s2: 'liveStatus.tennis.s2',
    s3: 'liveStatus.tennis.s3',
    s4: 'liveStatus.tennis.s4',
    s5: 'liveStatus.tennis.s5',
    mobiles1: 'liveStatus.tennis.mobile.s1',
    mobiles2: 'liveStatus.tennis.mobile.s2',
    mobiles3: 'liveStatus.tennis.mobile.s3',
    mobiles4: 'liveStatus.tennis.mobile.s4',
    mobiles5: 'liveStatus.tennis.mobile.s5',
    delay: 'liveStatus.tennis.delay',
    walkover_1won: 'liveStatus.tennis.1won',
    walkover_2won: 'liveStatus.tennis.2won',
    retired_1won: 'liveStatus.tennis.1won',
    retired_2won: 'liveStatus.tennis.2won',
    end: 'liveStatus.tennis.end',
    //Source C liveStatus
    OnCourt: 'liveStatus.tennis.onCourt',
    WarmingUp: 'liveStatus.tennis.warmingUp',
    BetweenPoints: 'liveStatus.tennis.betweenPoints',
    PointInProgress: 'liveStatus.tennis.pointInProgress',
    Challenge: 'liveStatus.tennis.challenge',
    PlaySuspended: 'liveStatus.tennis.playSuspended',
    ShortDelay: 'liveStatus.tennis.shortDelay',
}

const baseballSectionMap: Dictionary<string> = {
    i1: 'liveStatus.baseball.i1',
    i2: 'liveStatus.baseball.i2',
    i3: 'liveStatus.baseball.i3',
    i4: 'liveStatus.baseball.i4',
    i5: 'liveStatus.baseball.i5',
    i6: 'liveStatus.baseball.i6',
    i7: 'liveStatus.baseball.i7',
    i8: 'liveStatus.baseball.i8',
    i9: 'liveStatus.baseball.i9',
    '1intop': 'liveStatus.baseball.1intop',
    '1inbottom': 'liveStatus.baseball.1inbottom',
    '2intop': 'liveStatus.baseball.2intop',
    '2inbottom': 'liveStatus.baseball.2inbottom',
    '3intop': 'liveStatus.baseball.3intop',
    '3inbottom': 'liveStatus.baseball.3inbottom',
    '4intop': 'liveStatus.baseball.4intop',
    '4inbottom': 'liveStatus.baseball.4inbottom',
    '5intop': 'liveStatus.baseball.5intop',
    '5inbottom': 'liveStatus.baseball.5inbottom',
    '6intop': 'liveStatus.baseball.6intop',
    '6inbottom': 'liveStatus.baseball.6inbottom',
    '7intop': 'liveStatus.baseball.7intop',
    '7inbottom': 'liveStatus.baseball.7inbottom',
    '8intop': 'liveStatus.baseball.8intop',
    '8inbottom': 'liveStatus.baseball.8inbottom',
    '9intop': 'liveStatus.baseball.9intop',
    '9inbottom': 'liveStatus.baseball.9inbottom',
    exintop: 'liveStatus.baseball.exintop',
    exinbottom: 'liveStatus.baseball.exinbottom',
    bt1bottom1: 'liveStatus.baseball.bt1bottom1',
    bt2bottom1: 'liveStatus.baseball.bt2bottom1',
    bt2bottom2: 'liveStatus.baseball.bt2bottom2',
    bt3bottom2: 'liveStatus.baseball.bt3bottom2',
    bt3bottom3: 'liveStatus.baseball.bt3bottom3',
    bt4bottom3: 'liveStatus.baseball.bt4bottom3',
    bt4bottom4: 'liveStatus.baseball.bt4bottom4',
    bt5bottom4: 'liveStatus.baseball.bt5bottom4',
    bt5bottom5: 'liveStatus.baseball.bt5bottom5',
    bt6bottom5: 'liveStatus.baseball.bt6bottom5',
    bt6bottom6: 'liveStatus.baseball.bt6bottom6',
    bt7bottom6: 'liveStatus.baseball.bt7bottom6',
    bt7bottom7: 'liveStatus.baseball.bt7bottom7',
    bt8bottom7: 'liveStatus.baseball.bt8bottom7',
    bt8bottom8: 'liveStatus.baseball.bt8bottom8',
    bt9bottom8: 'liveStatus.baseball.bt9bottom8',
    bt9bottom9: 'liveStatus.baseball.bt9bottom9',
    btEIbottom9: 'liveStatus.baseball.btEIbottom9',
    btEIbottomEI: 'liveStatus.baseball.btEIbottomEI',
    ot: 'liveStatus.baseball.exintop',
    //Source C liveStatus
    InProgress: 'liveStatus.baseball.InProgress',
    Suspended: 'liveStatus.baseball.suspended',
    pause: 'liveStatus.baseball.pause',
    end: 'liveStatus.baseball.end',
}

const baseballMarketCodeMap: Dictionary<string> = {
    ml: 'markets.baseball.ml',
    ah: 'markets.baseball.ah',
    t1ouctid: 'markets.baseball.t1ouctid',
    t2ouctid: 'markets.baseball.t2ouctid',
    ouctid: 'markets.baseball.t1ouctid',
    oufin: 'markets.baseball.oufin',
    ou: 'markets.baseball.ou',
    oe: 'markets.baseball.oe',
    '1x2': 'markets.baseball.1x2',
    ahf5in: 'markets.baseball.ahf5in',
    ouf5in: 'markets.baseball.ouf5in',
}

const footballMarketCodeMap: Dictionary<string> = {
    '1x2': 'markets.soccer.1x2',
    '1x21st': 'markets.soccer.1x21st',
    '1x22nd': 'markets.soccer.1x22nd',
    '1x2ctid': 'markets.soccer.1x2ctid',
    '1x21stctid': 'markets.soccer.1x21stctid',
    '1000882': 'markets.soccer.1000882',
    ou: 'markets.soccer.ou',
    ou1st: 'markets.soccer.ou1st',
    ouctid: 'markets.soccer.ouctid',
    ou1stctid: 'markets.soccer.ou1stctid',
    bts: 'markets.soccer.bts',
    ah: 'markets.soccer.ah',
    ah1st: 'markets.soccer.ah1st',
    ah2nd: 'markets.soccer.ah2nd',
    ahctid: 'markets.soccer.ah',
    ah1stctid: 'markets.soccer.ah1st',
    oe: 'markets.soccer.oe',
    oectid: 'markets.soccer.oectid',
    oe1st: 'markets.soccer.oe1st',
    oe1stctid: 'markets.soccer.oe1stctid',
    tg: 'markets.soccer.tg',
    tg1st: 'markets.soccer.tg1st',
    tgctid: 'markets.soccer.tgctid',
    tg1stctid: 'markets.soccer.tg1stctid',
    cs: 'markets.soccer.cs',
    cs1st: 'markets.soccer.cs1st',
    hf: 'markets.soccer.hf',
    scoant: 'markets.soccer.scoant',
    sco1st: 'markets.soccer.sco1st',
    scolast: 'markets.soccer.scolast',
    tts1st: 'markets.soccer.tts1st',
    ttslast: 'markets.soccer.ttslast',
    eps: 'markets.soccer.eps',
    or: 'markets.soccer.or',
}

const tennisMarketCodeMap: Dictionary<string> = {
    ml: 'markets.tennis.ml',
    mls1: 'markets.tennis.mls1',
    mls2: 'markets.tennis.mls2',
    oufts: 'markets.tennis.oufts',
    ous1: 'markets.tennis.ous1',
    ous2: 'markets.tennis.ous2',
    ah: 'markets.tennis.ah',
    ahs2: 'markets.tennis.ahs2',
    ahs1: 'markets.tennis.ahs1',
    ahfts: 'markets.tennis.ahfts',
    oefts: 'markets.tennis.oefts',
}

const tennisInplayMarketCodeMap: Dictionary<string> = {
    ml: 'markets.tennis.inplay.ml',
    mls1: 'markets.tennis.inplay.mls1',
    mls2: 'markets.tennis.inplay.mls2',
}

const basketballMarketCodeMap: Dictionary<string> = {
    ml: 'markets.basketball.ml',
    ml1st: 'markets.basketball.ml1st',
    mlh2: 'markets.basketball.mlh2',
    mlq1: 'markets.basketball.mlq1',
    mlq2: 'markets.basketball.mlq2',
    mlq3: 'markets.basketball.mlq3',
    mlq4: 'markets.basketball.mlq4',
    ah: 'markets.basketball.ah',
    ahh2: 'markets.basketball.ahh2',
    ah1st: 'markets.basketball.ah1st',
    ahq1: 'markets.basketball.ahq1',
    ahq2: 'markets.basketball.ahq2',
    ahq3: 'markets.basketball.ahq3',
    ahq4: 'markets.basketball.ahq4',
    ou: 'markets.basketball.ou',
    ouctid: 'markets.basketball.ouctid',
    ouh2: 'markets.basketball.ouh2',
    ouh2ctid: 'markets.basketball.ouh2',
    ou1st: 'markets.basketball.ou1st',
    ouq1: 'markets.basketball.ouq1',
    ouq1ctid: 'markets.basketball.ouq1',
    ouq2: 'markets.basketball.ouq2',
    ouq2ctid: 'markets.basketball.ouq2',
    ouq3: 'markets.basketball.ouq3',
    ouq3ctid: 'markets.basketball.ouq3',
    ouq4: 'markets.basketball.ouq4',
    ouq4ctid: 'markets.basketball.ouq4',
    t1ouctid: 'markets.basketball.t1ouctid',
    t2ouctid: 'markets.basketball.t2ouctid',
    oe: 'markets.basketball.oe',
    oectid: 'markets.basketball.oe',
    oe1st: 'markets.basketball.oe1st',
    oe1stctid: 'markets.basketball.oe1st',
    oeh2: 'markets.basketball.oeh2',
    oeh2ctid: 'markets.basketball.oeh2',
    oeq1: 'markets.basketball.oeq1',
    oeq1ctid: 'markets.basketball.oeq1',
    oeq2: 'markets.basketball.oeq2',
    oeq2ctid: 'markets.basketball.oeq2',
    oeq3: 'markets.basketball.oeq3',
    oeq3ctid: 'markets.basketball.oeq3',
    oeq4: 'markets.basketball.oeq4',
    oeq4ctid: 'markets.basketball.oeq4',
    t1ou: 'markets.basketball.ouctid',
    t2ou: 'markets.basketball.ouctid',
}

export const matchStatusMap: Dictionary<string> = {
    Live: 'matchStatus.live',
}

export const outcomeCodeMap: Dictionary<string> = {
    ov: 'outcomes.ov',
    un: 'outcomes.un',
    d: 'outcomes.d',
    od: 'outcomes.od',
    ev: 'outcomes.ev',
    other: 'outcomes.other',
    yes: 'outcomes.yes',
    no: 'outcomes.no',
}

const translationMap = (map: Dictionary<string>): Dictionary<string> => {
    const nextMap: Dictionary<string> = {}
    Object.keys(map).forEach((key) => (nextMap[key] = t(map[key])))
    return nextMap
}

/* teamMap needs editing*/
export const teamMap = (outcomeCode?: string, competitors?: Competitors[] | NewCompetitors) => {
    if (Array.isArray(competitors)) {
        if (!outcomeCode || !competitors || competitors.length === 0) {
            return ''
        }

        const combinedOutCome: Dictionary<string> = translationMap(outcomeCodeMap)

        competitors.forEach((item) => {
            combinedOutCome[item.qualifier.substring(0, 1)] = item.name
        })

        return combinedOutCome[outcomeCode]
    } else {
        if (!outcomeCode || !competitors) {
            return ''
        }
        const combinedOutCome: Dictionary<string> = translationMap(outcomeCodeMap)
        const competitorArray = Object.entries(competitors).map(([key, competitor]) => ({
            key,
            ...competitor,
        }))
        competitorArray.forEach((item) => {
            combinedOutCome[item.key.substring(0, 1)] = item.name
        })
        return combinedOutCome[outcomeCode]
    }
}

export const htftMap = (outcomeCode?: string, competitors?: Competitors[] | NewCompetitors) => {
    if (Array.isArray(competitors)) {
        if (!outcomeCode || !competitors || competitors.length === 0) {
            return ''
        }
        const qualifierArray = outcomeCode.split('')
        return `${teamMap(qualifierArray[0], competitors)}/${teamMap(qualifierArray[1], competitors)}`
    } else {
        if (!outcomeCode || !competitors) {
            return ''
        }
        const qualifierArray = outcomeCode.split('')
        return `${teamMap(qualifierArray[0], competitors)}/${teamMap(qualifierArray[1], competitors)}`
    }
}

export const tgMap = (outcomeCode?: string, maxNumber?: string, outcome?: Outcome) => {
    if (!outcomeCode) {
        return ''
    }

    const outcomeArray = outcomeCode.split('')
    const outcomeType = outcomeArray[0]

    if (outcomeType === 'f') {
        if (outcomeArray.length > 2) {
            return `${outcomeArray[1]} - ${outcomeArray[2]}`
        } else if (outcomeArray[1] === '7') {
            return `${outcomeArray[1]}或以上`
        } else {
            return `${outcomeCode}`
        }
    } else if (outcomeType === 'h') {
        if (outcomeArray[1] === maxNumber || outcomeArray[1] === '3') {
            return `${outcomeArray[1]}或以上`
        } else {
            return `${outcomeArray[1]}`
        }
    } else if (outcomeType === 'b') {
        return outcomeArray[1] === maxNumber ? `${outcomeArray[1]}或以上` : `${outcomeArray[1]}`
    } else {
        if (outcomeCode.includes('+')) {
            return `${outcomeCode.split('+')[0]}或以上`
        } else {
            return `${outcome?.name}`
        }
    }
}

// const outcomeCodeToTeam = (
//     marketCode: string,
//     outcomeCode: string,
//     outcomeName: string,
//     competitors: Competitors[] | NewCompetitors,
// ) => {
//     if (Array.isArray(competitors)) {
//         if (!marketCode || !outcomeCode || !competitors || competitors.length === 0) {
//             return '';
//         }

//         const marketMap: Dictionary<string> = {
//             hf: htftMap(outcomeCode, competitors),
//             tg: tgMap(outcomeCode),
//             tg1st: tgMap(outcomeCode),
//         };

//         const outcomeMap: Dictionary<string> = {
//             ...translationMap(outcomeCodeMap),
//             h: teamMap(outcomeCode, competitors),
//             a: teamMap(outcomeCode, competitors),
//             ht: teamMap(outcomeCode.substring(0, 1), competitors),
//             at: teamMap(outcomeCode.substring(0, 1), competitors),
//         };

//         const isEmpty = (code: string) => {
//             return code?.length > 0 ? code : undefined;
//         };

//         return isEmpty(t(marketMap[marketCode])) ?? isEmpty(outcomeMap[outcomeCode]) ?? outcomeName;
//     } else {
//         return '';
//     }
// };

export const basketballMarketSectionMap: Dictionary<string> = {
    '1st': 'scoreBarInfo.points.basketball.1h',
    '1h': 'scoreBarInfo.points.basketball.1h',
    '2h': 'scoreBarInfo.points.basketball.2h',
    q1: 'scoreBarInfo.points.basketball.q1',
    q2: 'scoreBarInfo.points.basketball.q2',
    q3: 'scoreBarInfo.points.basketball.q3',
    q4: 'scoreBarInfo.points.basketball.q4',
    ot: 'scoreBarInfo.points.basketball.ot',
    ft: 'scoreBarInfo.points.basketball.ft',
}

export const tennisMarketSectionMap: Dictionary<string> = {
    ftg: 'scoreBarInfo.points.tennis.ftg',
    s1: 'scoreBarInfo.points.tennis.s1',
    s2: 'scoreBarInfo.points.tennis.s2',
    s3: 'scoreBarInfo.points.tennis.s3',
    s4: 'scoreBarInfo.points.tennis.s4',
    s5: 'scoreBarInfo.points.tennis.s5',
    ft: 'scoreBarInfo.points.tennis.ft',
    p: 'scoreBarInfo.points.tennis.p',
    set: 'scoreBarInfo.points.tennis.set',
    fts: 'scoreBarInfo.points.tennis.fts',
}

export const baseballMarketSectionMap: Dictionary<string> = {
    i1: 'scoreBarInfo.points.baseball.i1',
    i2: 'scoreBarInfo.points.baseball.i2',
    i3: 'scoreBarInfo.points.baseball.i3',
    i4: 'scoreBarInfo.points.baseball.i4',
    i5: 'scoreBarInfo.points.baseball.i5',
    i6: 'scoreBarInfo.points.baseball.i6',
    i7: 'scoreBarInfo.points.baseball.i7',
    i8: 'scoreBarInfo.points.baseball.i8',
    i9: 'scoreBarInfo.points.baseball.i9',
    ot: 'scoreBarInfo.points.baseball.ot',
    ft: 'scoreBarInfo.points.baseball.ft',
}

// export const tennisPeriodMap: Dictionary<string> = {
//     s1: 'scoreBarInfo.period.s1',
//     s2: 'scoreBarInfo.period.s2',
//     s3: 'scoreBarInfo.period.s3',
//     s4: 'scoreBarInfo.period.s4',
//     s5: 'scoreBarInfo.period.s5',
// };

export const tennisRoundMap: Dictionary<string> = {
    '3': 'scoreBarInfo.round.3',
    '5': 'scoreBarInfo.round.5',
}

export const sportTypeToBetSportTypeMap: Dictionary<string> = {
    football: 'Soccer',
    basketball: 'Basketball',
    tennis: 'Tennis',
    baseball: 'Baseball',
}

export const sportTypeCodeMap: Dictionary<string> = {
    football: 'sports.soccer',
    basketball: 'sports.basketball',
    tennis: 'sports.tennis',
    baseball: 'sports.baseball',
}

export const betErrorCodeMap: Dictionary<string> = {
    // UNKNOWN_EXCEPTION("UNKNOWN_EXCEPTION", "BE0000"),
    // BAD_REQUEST("Bad request", "BE0001"),
    // UNIT_DUPLICATED("Unit duplicated", "BE0002"),
    // LEG_INVALID("Leg greater than outcomes size or equal to 1", "BE0003"),
    // FIXTURE_DUPLICATED("FixtureId duplicated", "BE0004"),
    // PLAYER_NOT_EXIST("Player not exist", "BE0005"),
    // BALANCE_NOT_ENOUGH("", "BE0006"),
    // INVALID_OUTCOME("Invalid outcome", "BE0007"),
    // ODDSINFO_ERROR("Error to get OddsInfo", "BE0008"),
    // INVALID_BET("", "BE0009"),
    // OUT_OF_SELECTION("Out of selection", "BE010"),
    // INVALID_ODDS("", "BE0011"),
    // INVALID_STAKE("", "BE0012")
    'NBE-0001': 'error.contactCustomerService',
    'NBE-0002': 'error.betClosed',
    'NBE-0003': 'error.invalidOdds2',
    'NBE-0004': 'error.notAllowParlay',
    1002: 'error.balanceNotEnough2',
    1004: 'error.userNotAllowed',
    1005: 'error.anteLessThanMin',
    1006: 'error.anteOverLimit',
    15003: 'error.networkException',
    401: 'error.unauthorized',
    404: 'error.networkException',
    500: 'error.networkException',
    999: 'error.unknownException',
    BE0000: 'error.betFail',
    BE0001: 'error.networkException',
    BE0002: 'error.unitDuplicated',
    BE0003: 'error.legInvalid',
    BE0004: 'error.fixtureDuplicated',
    BE0005: 'error.unauthorized',
    BE0006: 'error.balanceNotEnough',
    BE0007: 'error.betClosed',
    BE0008: 'error.betClosed',
    BE0009: 'error.invalidBet',
    BE0010: 'error.outOfSelection',
    BE0011: 'error.invalidOdds',
    BE0012: 'error.invalidStake',
    BE0013: 'error.unknown13',
    BE0014: 'error.unknown14',
    BE0015: 'error.unknown15',
    BE0016: 'error.unknown16',
    BE0017: 'error.unknown17',
    BE0019: 'error.unknown19',
    BE0021: 'error.unknown21',
}
