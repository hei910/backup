import { apiBet } from '@sport/api/apiBet'
import { apiMatch } from '@sport/api/apiMatch'
import { AxiosResponse } from 'axios'
import _ from 'lodash'
import {
    Acceptance,
    ADD_INTERVAL,
    ADD_TO_BET_LIST,
    BetActionTypes,
    BetData,
    BetListStatus,
    BetRecord,
    BetState,
    BetTicketsTicket,
    CombinedID,
    OddsType,
    Paging,
    REMOVE_ALL_BET_LIST,
    REMOVE_ALL_INTERVAL,
    REMOVE_FROM_BET_LIST,
    REMOVE_INTERVAL,
    RESET_BET,
    SAVE_SUBMIT_BET_RESULT,
    SET_BET_FORCE_ID,
    Stake,
    SubmitBetResult,
    SYNC_BETLIST_FROM_BETDATA,
    TOGGLE_KEEP_BET_LIST,
    TOGGLE_SHOW_CONFIRMATION_PAGES,
    UidMap,
    UPDATE_ACCEPTANCE,
    UPDATE_BET_DATA_FROM_MERGED_DATA,
    UPDATE_BET_LIST,
    UPDATE_BET_LIST_STATUS,
    UPDATE_BET_RECORD,
    UPDATE_COMPETITION_FILTER_IDS,
    UPDATE_ODDS_TYPE,
    UPDATE_TO_WIN,
    UPDATE_UID_MAP,
} from '@services/sportBet/types'
import { saveBetListData, saveRawData } from '@services/sportData/actions'
import { BetListData, FixtureStatus, MarketGroup, MatchesResponse, RawData, Seasons } from '@services/sportData/types'
import { setBetListLoading, setV1Loading, toggleBetList, toggleSportMenu } from '@services/sportGlobal/actions'
import { updateLiveScore } from '@services/sportLive/actions'
import { updateBalance } from '@services/sportPlayer/actions'
import { ThunkResult } from '@sport/stores'
import { calculateParlayToWin, calculateSingleToWin, totalCombination } from '@sport/util/betCalculate'
import betListDataCreator, {
    convertCompetitorsFromObjectToArray,
    sIdToBetSportTypeMap,
} from '@sport/util/betListDataCreator'
import { Dictionary, sportTypeToBetSportTypeMap } from '@sport/util/dictionary'
import { isEmptyObject } from '@sport/util/general'
import getBetListDataFromData from '@sport/util/getBetListDataFromData'
import matchesDataMerger from '@sport/util/matchesDataMerger'
import paramsPathToParamsObject from '@sport/util/paramsPathToParamsObject'
import { getSingleBetLimit } from '@sport/util/getBetLimit'

const maxItemsInBetList = 10
export const serializeJoinCharacter = ','

export const setBetForceId = (betForceId: string): BetActionTypes => ({
    type: SET_BET_FORCE_ID,
    betForceId,
})

const updateBetListStatus = (payload: BetListStatus): BetActionTypes => ({
    type: UPDATE_BET_LIST_STATUS,
    payload,
})

export const updateAcceptance = (payload?: Acceptance): BetActionTypes => ({
    type: UPDATE_ACCEPTANCE,
    payload,
})

export const toggleShowConfirmationPages = (): BetActionTypes => ({
    type: TOGGLE_SHOW_CONFIRMATION_PAGES,
})

export const toggleKeepBetList = (): BetActionTypes => ({
    type: TOGGLE_KEEP_BET_LIST,
})

export const changeOddsType = (payload: OddsType): BetActionTypes => ({
    type: UPDATE_ODDS_TYPE,
    payload,
})

export const resetBet = (): BetActionTypes => ({ type: RESET_BET })

export const combinedIDToSerializedID = (combinedID: CombinedID): string => {
    const {
        // fixtureId,
        // ctId,
        // marketId,
        outcomeUId = '',
    } = combinedID || {}
    // return [fixtureId, ctId, marketId, outcomeUId].join(serializeJoinCharacter)
    return outcomeUId
}

const orSameSeasonList = (list: string[], betData: Dictionary<BetData>): string[] => {
    const seasonIdList: string[] = []
    const firstIDInSeason: { [key: string]: string } = {}
    const sameSeasonList: string[] = []

    for (const serializedCombinedID of list) {
        const isOr = betData[serializedCombinedID]?.isOr

        if (!isOr) {
            continue
        }

        const seasonId = betData[serializedCombinedID]?.seasonId ?? betData[serializedCombinedID]?.fixtureId
        if (seasonIdList.includes(seasonId)) {
            if (!sameSeasonList.includes(seasonId)) {
                sameSeasonList.push(firstIDInSeason[seasonId])
            }
            sameSeasonList.push(serializedCombinedID)
        } else {
            seasonIdList.push(seasonId)
            firstIDInSeason[seasonId] = serializedCombinedID
        }
    }

    return sameSeasonList
}

const sameMatchList = (list: string[], betData: Dictionary<BetData>): string[] => {
    const matchIdList: string[] = []
    const firstIDInMatch: { [key: string]: string } = {}
    const sameMatchList: string[] = []

    for (const serializedCombinedID of list) {
        const matchId = betData[serializedCombinedID]?.matchId ?? betData[serializedCombinedID]?.fixtureId
        if (matchIdList.includes(matchId)) {
            if (!sameMatchList.includes(matchId)) {
                sameMatchList.push(firstIDInMatch[matchId])
            }
            sameMatchList.push(serializedCombinedID)
        } else {
            matchIdList.push(matchId)
            firstIDInMatch[matchId] = serializedCombinedID
        }
    }

    return sameMatchList
}

const filterSuccessBet = (list: Array<string>, stake: Dictionary<Stake>) => list.filter((id) => !stake[id])

const filterSuccessBetStake = (list: Array<string>, stake: Dictionary<Stake>) =>
    Object.entries(stake).reduce((current, nextStake) => {
        const [key, value] = nextStake
        if (list.includes(key)) current[key] = value
        return current
    }, {} as Dictionary<Stake>)

export const changeBetListStatus = (payload: BetListStatus): ThunkResult<void> => (dispatch, getState) => {
    const { betListStatus, keepBetList } = getState().sportBet
    betListStatus === BetListStatus.SUCCESS && !keepBetList && dispatch(removeAllBet())
    dispatch(updateBetListStatus(payload))
}

const addToBetList = (combinedID: CombinedID, sportType: string, isParlay: boolean = false): ThunkResult<void> => (
    dispatch,
    getState,
) => {
    const {
        sportBet: {
            list: previousList,
            stake: { single: previousSingle },
            data: previousData,
        },
        sportData: { betList, merged },
    } = getState()

    const { fixtureId, outcomeUId = '' } = combinedID

    let nextList = [...previousList]
    let nextSingle = { ...previousSingle }
    let nextData = { ...previousData }

    getBetListDataFromData([outcomeUId], merged?.current?.data)

    if (isParlay) {
        nextList = nextList.filter((outcomeUId) => {
            const [fixtureIdFromList] = outcomeUId.split(serializeJoinCharacter)

            if (fixtureId?.toString() === fixtureIdFromList) {
                const { [outcomeUId]: removedNextSingle, ...nextSingleAfterRemoved } = nextSingle
                nextSingle = nextSingleAfterRemoved
                const { [outcomeUId]: removedNextData, ...nextDataAfterRemoved } = nextData
                nextData = nextDataAfterRemoved
                return false
            }

            return true
        })
    }

    if (!previousList.includes(outcomeUId)) {
        nextList.push(outcomeUId)

        if (betList[outcomeUId]) {
            const newBetItem = {
                ...betList[outcomeUId],
                sportType: sportTypeToBetSportTypeMap[sportType] || sportType,
            }

            nextData[outcomeUId] = newBetItem
        }
    }

    if (nextList.length <= maxItemsInBetList) {
        const betItemData = nextData[outcomeUId]

        dispatch(
            addBetItemOddsUpdateInterval(
                betItemData.sid,
                betItemData.matchStatus,
                betItemData.fixtureId,
                betItemData.marketId,
                outcomeUId,
                betItemData.seasonId,
            ),
        )
        dispatch({
            type: ADD_TO_BET_LIST,
            payload: {
                list: nextList,
                stake: { single: nextSingle, parlay: {} },
                data: nextData,
                betForceId: outcomeUId,
                sameMatchList: sameMatchList(nextList, nextData),
                orSameSeasonList: orSameSeasonList(nextList, nextData),
            },
        })
    }
}

export const removeFromBetList = (serializedCombinedID: string): ThunkResult<void> => (dispatch, getState) => {
    const {
        sportBet: {
            list: previousList,
            stake: { single: previousSingle },
            data: previousData,
            betIntervalList,
        },
    } = getState()

    if (previousList.includes(serializedCombinedID)) {
        const newList = previousList.filter((id) => {
            return id !== serializedCombinedID
        })

        const nextSingle: Dictionary<Stake> = {}
        const nextData: Dictionary<BetData> = {}

        for (const id of newList) {
            if (previousSingle[id]) {
                nextSingle[id] = previousSingle[id]
            }
            nextData[id] = previousData[id]
        }

        const targetIntervalInfo = betIntervalList.filter(
            (intervalInfo) => intervalInfo.outcomeUid === serializedCombinedID,
        )[0]

        if (targetIntervalInfo) {
            clearInterval(targetIntervalInfo.intervalId)
            dispatch({
                type: REMOVE_INTERVAL,
                payload: {
                    outcomeUid: serializedCombinedID,
                },
            })
        }

        dispatch({
            type: REMOVE_FROM_BET_LIST,
            payload: {
                list: newList,
                stake: { single: nextSingle, parlay: {} },
                data: nextData,
                sameMatchList: sameMatchList(newList, nextData),
                orSameSeasonList: orSameSeasonList(newList, nextData),
            },
        })
    }
}

export const addOrRemoveFromBetList = (
    combinedID: CombinedID | string,
    sportType: string,
    inParlay: boolean = false,
): ThunkResult<void> => (dispatch, getState) => {
    const {
        sportBet: { list: previousList },
        sportGlobal: { platform },
    } = getState()

    dispatch(changeBetListStatus(BetListStatus.BETTING))

    const serializedCombinedID = typeof combinedID === 'string' ? combinedID : combinedIDToSerializedID(combinedID)

    if (previousList.includes(serializedCombinedID)) {
        if (platform === 'desktop') {
            dispatch(toggleSportMenu(true))
        }
        dispatch(removeFromBetList(serializedCombinedID))
    } else {
        dispatch(addToBetList(combinedID as CombinedID, sportType, inParlay))
        if (platform === 'desktop' || previousList.length === 0) {
            dispatch(toggleBetList(true))
        }
    }
}

export const updateSingleToWin = (combinedID: CombinedID | string): ThunkResult<void> => (dispatch, getState) => {
    const serializedCombinedID = typeof combinedID === 'string' ? combinedID : combinedIDToSerializedID(combinedID)

    const {
        sportBet: {
            stake: { single: previousSingleStake },
        },
    } = getState()

    const data = getState().sportBet.data[serializedCombinedID]

    const nextSingleStake = { ...previousSingleStake }
    const currentStake = nextSingleStake[serializedCombinedID]

    if (currentStake) {
        const nextStake = {
            ...currentStake,
            toWin: calculateSingleToWin(
                currentStake.bet,
                data.odds[0] === '-' ? data.odds : data.euOdds,
                data.marketCode,
            ),
        }

        nextSingleStake[serializedCombinedID] = nextStake

        dispatch({
            type: UPDATE_TO_WIN,
            payload: { single: nextSingleStake },
        })
    }
}

export const addBetItemOddsUpdateInterval = (
    sId: number,
    matchStatus: string,
    fixtureId: string,
    marketId: string,
    outcomeUid: string,
    competitionIds?: string,
): ThunkResult<void> => (dispatch, getState) => {
    const isInplay = matchStatus === FixtureStatus.Live
    const intervalId = setInterval(
        () => {
            apiMatch.getBetItemOdds(sId, matchStatus, fixtureId, marketId, competitionIds).then((res) => {
                const seasonData: Seasons = res.data[isInplay ? 'iot' : 'not']
                const season = Object.values(seasonData)?.[0]
                const match = Object.values(season?.match ?? {})?.[0]
                const event = Object.values(match?.events ?? {})?.[0]
                const market = Object.values(event?.markets ?? {}).filter(
                    (market) =>
                        Object.values(market.outcomes).filter((outcome) => outcome.uid === outcomeUid).length > 0,
                )[0]
                const outcome = Object.values(market?.outcomes ?? {})?.filter(
                    (outcomeInfo) => outcomeInfo.uid === outcomeUid,
                )[0]

                if (!outcome) {
                    return
                }
                const betData = getState().sportBet.data[outcome.uid]
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

                const convertedData = _.pickBy(
                    {
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
                        live: isInplay,
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
                        sid: sId,
                        specifiers: formattedSpecifiers(),
                        sportType: Object.prototype.hasOwnProperty.call(sIdToBetSportTypeMap, sId)
                            ? sIdToBetSportTypeMap[sId]
                            : sIdToBetSportTypeMap['1'],
                        status: match.info.status,
                        startTime: match.info.startTime,
                        uid: outcome.uid,
                    },
                    (value) => value !== undefined && value !== null,
                )

                const convertedBetListData = {
                    [outcome.uid]: {
                        ...betData,
                        ...convertedData,
                    },
                }
                dispatch(updateBetDataFromMergedData(convertedBetListData))
            })
        },
        isInplay ? 10000 : 30000,
    )

    dispatch({
        type: ADD_INTERVAL,
        payload: {
            intervalId,
            outcomeUid,
        },
    })
}

export const updateBetListOdds = (delay: number): ThunkResult<void> => (dispatch, getState) => {
    const {
        sportBet: { list, data, oddsType },
        sportGlobal: { language },
    } = getState()

    const timeNow = +new Date()
    // const serializedIDList: string[] = []
    const fixtureIDList: string[] = []
    const axiosPromiseList: Promise<AxiosResponse<MatchesResponse>>[] = []
    const timezone = getState().sportGlobal.timezone

    for (const serializedID of list) {
        if (data[serializedID]?.updateTime + delay < timeNow) {
            const { fixtureId } = data[serializedID]
            // serializedIDList.push(serializedID)
            if (!fixtureIDList.includes(fixtureId)) {
                fixtureIDList.push(fixtureId)
                axiosPromiseList.push(
                    apiMatch.getMatches({
                        fixtureId,
                        lang: language,
                        source: data[serializedID].source,
                        oddsType,
                        timezone: parseInt(timezone),
                    }),
                )
            }
        }
    }

    let betData: BetListData = {}

    Promise.all(axiosPromiseList).then((responses) => {
        const {
            sportData: { raw: previousRaw = {} },
        } = getState()

        for (const response of responses) {
            const {
                config: { url = '' },
                data: { data },
            } = response
            const params = paramsPathToParamsObject(url)
            const { lastTimestamp, ...paramsWithoutTimeStamp } = params
            const dataKey = JSON.stringify(paramsWithoutTimeStamp)

            const newRawData = {} as RawData

            if (previousRaw[dataKey] && lastTimestamp) {
                newRawData.base = previousRaw[dataKey].base
                newRawData.update = [...(previousRaw[dataKey].update || []), data]
            } else {
                newRawData.base = data
                newRawData.update = []
            }

            const mergedData = matchesDataMerger(newRawData)

            dispatch(saveRawData(dataKey, newRawData))

            const [betListData, liveScore] = betListDataCreator(
                mergedData,
                params.sId,
                params.marketGroup === MarketGroup.or,
            )
            betData = { ...betData, ...betListData }

            dispatch(updateLiveScore(liveScore))
        }
    })

    dispatch(saveBetListData(betData))
    dispatch(updateBetDataFromMergedData(betData))
}

export const changeSingleStake = (combinedID: CombinedID | string, stake: number): ThunkResult<void> => (
    dispatch,
    getState,
) => {
    const {
        sportBet: {
            stake: { single: previousSingleStake, parlay: previousParlayStake },
        },
    } = getState()

    const serializedCombinedID = typeof combinedID === 'string' ? combinedID : combinedIDToSerializedID(combinedID)
    const data = getState().sportBet.data[serializedCombinedID]

    const { matchStatus, marketCode } = data
    let { sportType } = data

    sportType = sportType.toLowerCase()

    const limit = getSingleBetLimit(getState().sportRules, matchStatus, sportType, marketCode)

    const newStake = {
        bet: stake,
        toWin: calculateSingleToWin(stake, data.odds[0] === '-' ? data.odds : data.euOdds, data.marketCode),
    }

    const nextSingleStake = { ...previousSingleStake }

    if (newStake.bet > 0) {
        if (limit && newStake.bet > limit) {
            newStake.bet = limit
            newStake.toWin = calculateSingleToWin(
                limit,
                data.odds[0] === '-' ? data.odds : data.euOdds,
                data.marketCode,
            )
        }
        nextSingleStake[serializedCombinedID] = newStake
    } else {
        delete nextSingleStake[serializedCombinedID]
    }

    dispatch({
        type: UPDATE_BET_LIST,
        payload: {
            single: nextSingleStake,
            parlay: previousParlayStake,
        },
    })
}

export const changeAllSingleStake = (stake: number): ThunkResult<void> => (dispatch, getState) => {
    const {
        sportBet: {
            list,
            stake: { parlay: parlayStake },
        },
    } = getState()

    if (stake <= 0) {
        dispatch({
            type: UPDATE_BET_LIST,
            payload: {
                single: {},
                parlay: parlayStake,
            },
        })
    } else {
        for (const id of list) {
            dispatch(changeSingleStake(id, stake))
        }
    }
}

export const changeParlayStake = (combination: string, stake: number, parlayOdds: number): ThunkResult<void> => (
    dispatch,
    getState,
) => {
    const {
        sportBet: {
            stake: { single: previousSingleStake, parlay: previousParlayStake },
        },
        sportRules,
    } = getState()

    let maxBetLimit = sportRules.parlayLimit.singleBetLimit

    if (maxBetLimit && stake > maxBetLimit) {
        stake = maxBetLimit
    }

    const nextParlayStake = { ...previousParlayStake }

    const newStake = {
        bet: stake,
        toWin: calculateParlayToWin(stake, parlayOdds, sportRules?.parlayLimit?.maxPayout ?? 0),
        // toWin: calculateParlayToWin(stake, parlayOdds, 100000),
    }

    if (newStake.bet > 0) {
        nextParlayStake[combination] = newStake
    } else {
        delete nextParlayStake[combination]
    }

    dispatch({
        type: UPDATE_BET_LIST,
        payload: {
            single: previousSingleStake,
            parlay: nextParlayStake,
        },
    })
}

export const removeAllBet = (): ThunkResult<void> => (dispatch, getState) => {
    getState().sportBet.betIntervalList.forEach((intervalInfo) => {
        clearInterval(intervalInfo.intervalId)
    })
    dispatch({
        type: REMOVE_ALL_INTERVAL,
    })
    dispatch({
        type: REMOVE_ALL_BET_LIST,
    })
}

export const submitBet = (
    platform: string,
    setErrorMessage?: (error: { code: string; message?: string }) => void,
): ThunkResult<void> => async (dispatch, getState) => {
    const {
        sportBet: {
            list,
            stake: { single, parlay },
            data: betData,
            acceptance,
            keepBetList,
        },
    } = getState()

    //#region submitBetV2
    const betTickets: BetTicketsTicket[] = []

    const uidMap: UidMap = {}

    const parlayDetails: Pick<BetTicketsTicket, 'details' | 'orDetails'> = {}

    const hasParlay = !isEmptyObject(parlay)

    list.forEach((serializedID) => {
        const {
            fixtureId,
            marketId,
            matchId,
            outcomeCode,
            outcomeId,
            uid,
            ename,
            odds,
            isOr,
            seasonId,
            sid,
            live,
            ctid,
        } = betData[serializedID]
        const stake = single[serializedID]?.bet || 0
        uidMap[`${ctid}.${fixtureId}.${marketId}.${outcomeCode}.${outcomeId}.${ename}`] = uid

        if (stake > 0) {
            if (isOr) {
                betTickets.push({
                    combination: 1,
                    matchSize: 1,
                    orDetails: [
                        {
                            seasonId: parseInt(seasonId),
                            odds: parseFloat(odds),
                            outcomeCode,
                            sid,
                        },
                    ],
                    unitAnte: stake,
                })
            } else {
                betTickets.push({
                    combination: 1,
                    details: [
                        {
                            ctid,
                            ename,
                            fixtureId: parseInt(fixtureId),
                            live,
                            marketId: marketId,
                            matchId: parseInt(matchId),
                            odds: parseFloat(odds),
                            outcomeCode,
                            outcomeId,
                            sid,
                        },
                    ],
                    matchSize: 1,
                    unitAnte: stake,
                })
            }
        }

        if (hasParlay) {
            if (isOr) {
                const newOrDetailsItem = {
                    seasonId: parseInt(seasonId),
                    odds: parseFloat(odds),
                    outcomeCode,
                    sid,
                }

                if (parlayDetails.orDetails) {
                    parlayDetails.orDetails.push(newOrDetailsItem)
                } else {
                    parlayDetails.orDetails = [newOrDetailsItem]
                }
            } else {
                const newDetails = {
                    ctid,
                    ename,
                    fixtureId: parseInt(fixtureId),
                    live,
                    marketId,
                    matchId: parseInt(matchId),
                    odds: parseFloat(odds),
                    outcomeCode,
                    outcomeId,
                    sid,
                }

                if (parlayDetails.details) {
                    parlayDetails.details.push(newDetails)
                } else {
                    parlayDetails.details = [newDetails]
                }
            }
        }
    })

    dispatch(updateUidMap(uidMap))

    Object.entries(parlay).forEach(([r, stake]) => {
        const n = list.length
        const combination = r === '0' ? totalCombination(n) : 1

        if (stake.bet > 0) {
            betTickets.push({
                combination,
                matchSize: r === '0' ? n : parseInt(r),
                unitAnte: stake.bet,
                ...parlayDetails,
            })
        }
    })
    //#endregion submitBetV2

    dispatch(setV1Loading(true))

    try {
        dispatch(updateBetListStatus(BetListStatus.WAITING))

        //#region submitBetV2
        const responseV2 = await apiBet.submitV2(
            {
                acceptOddsChange: acceptance !== 'NEVER',
                tickets: betTickets,
            },
            platform,
        )

        const {
            data: { success: successV2, reason },
        } = responseV2

        if (!successV2) {
            setErrorMessage && setErrorMessage({ code: reason || '' })
            dispatch(updateBetListStatus(BetListStatus.FAILED))
            dispatch(setV1Loading(false))
            return
        }

        dispatch(updateBetListStatus(BetListStatus.SUCCESS))
        dispatch(updateBalance())

        const submitBetResultV2: SubmitBetResult = {
            single: {},
            parlay: {},
            confirm: true,
        }

        const {
            data: {
                data: { masterResult },
            },
        } = responseV2

        for (const result of masterResult) {
            const {
                combination,
                detailResultList,
                estimatedWinnings,
                matchCount,
                matchSize,
                orDetailResultList,
                unitAnte,
                uuid,
            } = result

            if (detailResultList) {
                for (const detailResult of detailResultList) {
                    const {
                        awayTeam,
                        ctid,
                        ename,
                        fixtureId,
                        homeTeam,
                        live,
                        marketId,
                        outcomeCode,
                        outcomeId,
                        resultOdds,
                    } = detailResult

                    const id = `${fixtureId}${serializeJoinCharacter}${ctid}${serializeJoinCharacter}${marketId}${serializeJoinCharacter}${outcomeId}`

                    if (live) {
                        submitBetResultV2.confirm = false
                    }

                    if (!submitBetResultV2.single[id]) {
                        submitBetResultV2.single[id] = {
                            ctid,
                            fixtureId,
                            homeTeam,
                            awayTeam,
                            outcomeCode,
                            ename,
                            marketId,
                            outcomeId,
                            resultOdds,
                        }
                    }

                    if (matchCount === 1) {
                        submitBetResultV2.single[id].unitAnte = unitAnte
                        submitBetResultV2.single[id].estimatedWinnings = estimatedWinnings
                        submitBetResultV2.single[id].uuid = uuid
                    }
                }
            }

            if (orDetailResultList) {
                for (const orDetailResult of orDetailResultList) {
                    const { title, type, item, resultOdds } = orDetailResult
                    const id = `${title}${serializeJoinCharacter}${type}${serializeJoinCharacter}${item}${serializeJoinCharacter}${resultOdds}`
                    if (!submitBetResultV2.single[id]) {
                        submitBetResultV2.single[id] = { title, type, item, resultOdds }
                    }

                    if (matchCount === 1) {
                        submitBetResultV2.single[id].unitAnte = unitAnte
                        submitBetResultV2.single[id].estimatedWinnings = estimatedWinnings
                        submitBetResultV2.single[id].uuid = uuid
                    }
                }
            }

            const n = matchCount

            if (n > 1) {
                const c = combination
                const r = matchSize === matchCount && combination > 1 ? 0 : matchSize

                submitBetResultV2.parlay[r] = {
                    n,
                    c,
                    r,
                    odds: estimatedWinnings / unitAnte,
                    unitAnte,
                    estimatedWinnings,
                    uuid,
                }
            }
        }

        dispatch({
            type: SAVE_SUBMIT_BET_RESULT,
            payload: submitBetResultV2,
        })
        //#endregion submitBetV2

        !keepBetList && removeLocalStoreSuccessBet(getState().sportBet)
    } catch (error) {
        const errorCode = error.response ? error.response.status : 999
        setErrorMessage && setErrorMessage({ code: errorCode })
        dispatch(updateBetListStatus(BetListStatus.FAILED))
    }

    dispatch(setV1Loading(false))
}

const removeLocalStoreSuccessBet = (bet: BetState) => {
    const {
        list: previousList,
        stake: { single: previousSingleStake },
        keepBetList,
    } = bet

    if (keepBetList) {
        return { ...bet, betListStatus: BetListStatus.BETTING, stake: { single: previousSingleStake, parlay: {} } }
    } else {
        const nextList = filterSuccessBet(previousList, previousSingleStake)
        const nextSingleStake = filterSuccessBetStake(nextList, previousSingleStake)
        return {
            ...bet,
            betListStatus: BetListStatus.BETTING,
            list: nextList,
            stake: { single: nextSingleStake, parlay: {} },
        }
    }
}

export const setStateToLocalStorage = (key: keyof BetState, value: BetState[keyof BetState]): void => {
    try {
        if (typeof value === 'object' && value !== null) {
            localStorage.setItem(`bet.${key}`, JSON.stringify(value))
        } else {
            localStorage.setItem(`bet.${key}`, value?.toString() ?? '')
        }
    } catch (error) {
        // do nothing
    }
}

export const getStateFromLocalStorage = (key: keyof BetState): BetState[keyof BetState] | null => {
    let emptyReturn = {}

    switch (key) {
        case 'list':
            emptyReturn = []
            break
        case 'stake':
            emptyReturn = {
                single: {},
                parlay: {},
            }
            break
        default:
            emptyReturn = {}
    }

    try {
        const state = (JSON.parse(localStorage.getItem(`bet.${key}`) || 'null') as BetState[keyof BetState]) || null
        return state ?? emptyReturn
    } catch (error) {
        return emptyReturn
    }
}

export const updateFilterMatchList = (ids: string[], fromMenu: boolean = false) => ({
    type: UPDATE_COMPETITION_FILTER_IDS,
    payload: {
        ids,
        fromMenu,
    },
})

export const updateUidMap = (payload: UidMap) => ({
    type: UPDATE_UID_MAP,
    payload,
})

const updateBetRecords = (
    settled: BetRecord[],
    unsettled: BetRecord[],
    paging: {
        settled?: Paging
        unsettled?: Paging
    },
) => ({
    type: UPDATE_BET_RECORD,
    payload: {
        settled,
        unsettled,
        paging,
    },
})

export const fetchBetTypeRecord = (page = 1, settled: boolean): ThunkResult<void> => async (dispatch, getState) => {
    try {
        const key = settled ? 'settled' : 'unsettled'

        dispatch(setBetListLoading(true))

        const records = await apiBet.records({ lastSettleTime: settled, page })

        const sortRecordByTime = (records: BetRecord[]) =>
            records.sort((record1, record2) => (record1.createTime > record2.createTime ? -1 : 1))

        const previousRecords = _.cloneDeep(getState().sportBet.records)

        previousRecords.paging[key] = {
            totalElements: records.data.data.totalElements,
            currentPage: records.data.data.pageable.pageNumber,
            totolPages: records.data.data.totalPages,
        }

        const sortedRecord = sortRecordByTime(records.data.data.content)
        previousRecords[key] = sortedRecord

        dispatch(updateBetRecords(previousRecords.settled, previousRecords.unsettled, previousRecords.paging))
    } catch (error) {
        // console.log('03 actions.ts get bet record with error', error);
    }

    dispatch(setBetListLoading(false))
}

const updateBetRecordsMobile = (
    settled: BetRecord[],
    paging: {
        settled: Paging
    },
) => ({
    type: UPDATE_BET_RECORD,
    payload: {
        settled,
        paging,
    },
})

export const fetchBetRecords = (): ThunkResult<void> => async (dispatch) => {
    try {
        const settledRecords = await apiBet.records({ lastSettleTime: true })
        const unsettledRecords = await apiBet.records({ lastSettleTime: false })
        const paging = {
            settled: {
                totalElements: settledRecords.data.data.totalElements,
                currentPage: settledRecords.data.data.pageable.pageNumber,
                totolPages: settledRecords.data.data.totalPages,
            },
            unsettled: {
                totalElements: unsettledRecords.data.data.totalElements,
                currentPage: unsettledRecords.data.data.pageable.pageNumber,
                totolPages: unsettledRecords.data.data.totalPages,
            },
        }

        const sortRecordByTime = (records: BetRecord[]) =>
            records.sort((record1, record2) => (record1.createTime > record2.createTime ? -1 : 1))

        dispatch(
            updateBetRecords(
                sortRecordByTime(settledRecords.data.data.content),
                sortRecordByTime(unsettledRecords.data.data.content),
                paging,
            ),
        )
    } catch (err) {
        // Do nothing
    }
}

export const fetchBetRecordsMobile = (gte: string, lte: string, page: number): ThunkResult<void> => async (
    dispatch,
) => {
    try {
        dispatch(setV1Loading(true))
        const settledRecords = await apiBet.records({ gte, lte, page })
        const paging = {
            settled: {
                totalElements: settledRecords.data.data.totalElements,
                currentPage: settledRecords.data.data.pageable.pageNumber,
                totolPages: settledRecords.data.data.totalPages,
                totalEffectiveAnte: settledRecords.data.data.customData?.totalEffectiveAnte || 0,
                totalPayoutAmount: settledRecords.data.data.customData?.totalPayoutAmount || 0,
            },
        }

        dispatch(updateBetRecordsMobile(settledRecords.data.data.content, paging))
        dispatch(setV1Loading(false))
    } catch (err) {
        // Do nothing
    }
}

export const updateBetDataFromMergedData = (betListData: BetListData): ThunkResult<void> => async (
    dispatch,
    getState,
) => {
    const {
        sportBet: { list },
    } = getState()
    const updatedBetListData = {} as Dictionary<BetData>

    for (const id of list) {
        if (Object.prototype.hasOwnProperty.call(betListData, id)) {
            updatedBetListData[id] = betListData[id]
        }
    }

    dispatch({
        type: UPDATE_BET_DATA_FROM_MERGED_DATA,
        payload: updatedBetListData,
    })
}

export const syncBetListFromBetData = (): ThunkResult<void> => async (dispatch, getState) => {
    const {
        sportBet: { list, data },
    } = getState()
    const newBetList: string[] = []

    for (const id of list) {
        if (Object.prototype.hasOwnProperty.call(data, id)) {
            newBetList.push(id)
        }
    }

    if (list.length !== newBetList.length) {
        dispatch({
            type: SYNC_BETLIST_FROM_BETDATA,
            payload: newBetList,
        })
    }
}
