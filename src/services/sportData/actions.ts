import { apiMatch } from '@sport/api/apiMatch'
import axios from 'axios'
import { serializeJoinCharacter, updateBetDataFromMergedData } from '@services/sportBet/actions'
import { CombinedID } from '@services/sportBet/types'
import { Platform } from '@services/sportGlobal/types'
import { updateLiveScore } from '@services/sportLive/actions'
import { mobileDateLookup, MRouteDateType, RouteDateType, RouteSportType } from '@services/sportMenu/types'
import { ThunkResult } from '@sport/stores'
import betListDataCreator from '@sport/util/betListDataCreator'
import { sportSId } from '@sport/util/constant'
import { sleep } from '@sport/util/general'
import matchesDataMerger from '@sport/util/matchesDataMerger'
import {
    ApiStatus,
    BetListData,
    FETCH_MATCHES_DATE_LIST,
    FETCH_SEARCH_MATCHES,
    FETCH_SEASON_GAME_LIST,
    FETCH_SEASON_LIST,
    FETCH_TOP_PAGE_DATA,
    IMPORT_DATA,
    MarketGroup,
    MatchesDate,
    RawData,
    RequestFixtureStatus,
    RequestOrderBy,
    SAVE_BETLIST_DATA,
    SAVE_RAW_DATA,
    SearchMatchesParams,
    SeasonListResponse,
    SET_FETCHING,
    SET_USE_CACHE,
    TOGGLE_SAMPLE,
    UPDATE_API_STATUS,
} from './types'

const pageSize = 30

export const updateApiStatus = (payload: ApiStatus) => ({
    type: UPDATE_API_STATUS,
    payload,
})

const setFetching = (payload: boolean) => ({
    type: SET_FETCHING,
    payload,
})

export const dateToMatchStatus = (date: string): RequestFixtureStatus => {
    switch (date) {
        case 'inplay':
            return RequestFixtureStatus.Live
        case 'today':
            return RequestFixtureStatus.Today
        case 'parlay-Early':
            return RequestFixtureStatus.ParlayEarly
        case 'upcoming':
            return RequestFixtureStatus.UpComingInplay
        case 'parlay-Live':
            return RequestFixtureStatus.ParlayLive
        case 'parlay-Today':
            return RequestFixtureStatus.ParlayToday
        case 'all':
        default:
            return RequestFixtureStatus.Pre
    }
}

export const serializedIDToCombinedID = (stringID: string): CombinedID => {
    const [fixtureId = '', ctId = '', marketId = '', outcomeUId = ''] = stringID.split(serializeJoinCharacter)
    return { fixtureId, ctId, marketId, outcomeUId: outcomeUId }
}

export const isSameParams = (params: any, platform: Platform = 'desktop'): ThunkResult<boolean> => (
    dispatch,
    getState,
) => {
    const { date, sports, market, page, fixtureId, leagueId, matchsStatus } = params
    const lastParams = getState().sportData.lastUpdate?.params
    const selectedDateList = getState().sportGlobal.selectedDateList
    const newMarket = date === 'outright' ? 'am' : lastParams?.marketGroup
    const isSameLeagueId =
        platform === 'mobile' && date !== 'inplay' && date !== 'upcoming'
            ? ((lastParams?.competitionIds ?? [])[0] ?? '') === leagueId
            : true

    const matchStatus = matchsStatus ?? dateToMatchStatus(date)
    const lastMatchStatus = platform === 'desktop' && matchsStatus !== undefined ? matchStatus : lastParams?.matchStatus

    const sameParams =
        fixtureId === lastParams?.fixtureId &&
        market === newMarket &&
        page === lastParams?.page &&
        sportSId[sports] === lastParams?.sId &&
        isSameLeagueId &&
        (matchStatus === lastMatchStatus || selectedDateList === lastMatchStatus)

    return !lastParams ? true : sameParams
}

const switchSampleData = (date: string, sampleData?: any, params?: SearchMatchesParams): ThunkResult<void> => async (
    dispatch,
    getState,
) => {
    if (!sampleData || (!sampleData?.data?.not && !sampleData?.data?.iot)) {
        dispatch({
            type: FETCH_SEARCH_MATCHES,
            payload: {
                lastUpdate: {
                    time: +new Date(),
                    params: params,
                },
                merged: { ...getState().sportData.merged, current: {} },
                apiStatus: ApiStatus.Ready,
            },
        })
        return
    }

    if (date === 'home') {
        dispatch({
            type: FETCH_SEARCH_MATCHES,
            payload: {
                lastUpdate: {
                    time: +new Date(),
                    params: params,
                },
                topRaw: { ...sampleData },
                apiStatus: ApiStatus.Ready,
            },
        })
    } else {
        dispatch({
            type: FETCH_SEARCH_MATCHES,
            payload: {
                lastUpdate: {
                    time: +new Date(),
                    params: params,
                },
                merged: { ...getState().sportData.merged, current: sampleData },
                apiStatus: ApiStatus.Ready,
            },
        })
    }
}

export const selectCompetitionDate = (
    matchStatus: string,
    routerDate: RouteDateType,
    sports?: RouteSportType,
): ThunkResult<void> => async (dispatch, getState) => {
    const lastParams = getState().sportData.lastUpdate?.params
    const useSampleData = getState().sportData.sampleData
    const platform = getState().sportGlobal.platform

    if (platform === 'desktop') {
        if (!lastParams || useSampleData) return

        dispatch(updateApiStatus(ApiStatus.Loading))

        // const apiMatchStatus = matchStatus === 'Today' ? dayjs().format('YYYY-MM-DD') : matchStatus;
        const apiMatchStatus = matchStatus

        const params: SearchMatchesParams = {
            ...lastParams,
            matchStatus: apiMatchStatus,
        }

        dispatch(fetchSearchMatchesData(params))
    } else {
        dispatch(updateApiStatus(ApiStatus.Loading))
        dispatch(fetchFilterSeasonListData(sports ?? 'football', matchStatus, routerDate))
    }
}

export const fetchSeasonGameInfo = (
    language: string,
    sId: number,
    date: string,
    leagueId?: string,
): ThunkResult<void> => async (dispatch, getState) => {
    const source = getState().sportGlobal.dataSource.toLocaleLowerCase()
    const matchStatus = dateToMatchStatus(date)
    try {
        const response = await apiMatch.getSeasonGameList(source, language, sId, matchStatus, leagueId)
        const { data, success } = response?.data
        if (!success) throw new Error()

        const output = {
            seasonGameData: data,
            apiStatus: ApiStatus.Ready,
            fetching: false,
        }

        dispatch({
            type: FETCH_SEASON_GAME_LIST,
            payload: output,
        })
    } catch (error) {
        getState().sportData.fetching && dispatch(setFetching(false))
    }
}

export const fetchData = (routerParams: any, sampleData?: any, update?: boolean): ThunkResult<void> => async (
    dispatch,
    getState,
) => {
    const {
        date,
        sports,
        market,
        page,
        fixtureId,
        searchKeyword,
        dataSource,
        matchsStatus,
        isDetailPage,
    } = routerParams
    const useSampleData = getState().sportData.sampleData
    const lastLang = getState().sportGlobal.language
    const lastSearchKeyword = getState().sportData.lastUpdate?.params?.searchKeyword
    const lastDataSource = getState().sportGlobal.dataSource
    const competitionIds = getState().sportBet.filter.competitionIds
    const oddsType = getState().sportBet.oddsType
    const matchStatus = matchsStatus ?? dateToMatchStatus(date)
    const timezone = getState().sportGlobal.timezone
    const platform = getState().sportGlobal.platform
    const importedData = getState().sportData.importedData

    //when getting match and platform is mobile, pass ctid === 1 to filter out match other than ctid === 0;
    const simpleMarket = platform === 'mobile' && !fixtureId && date !== 'outright' ? 1 : 0

    const params: SearchMatchesParams = {
        lang: lastLang,
        fixtureId,
        marketGroup: date === 'outright' ? 'or' : market,
        page,
        pageSize,
        sId: sportSId[sports],
        orderBy: RequestOrderBy.league,
        source: dataSource ?? lastDataSource,
        matchStatus,
        timezone: parseInt(timezone),
        oddsType,
        competitionIds,
        searchKeyword: searchKeyword ?? lastSearchKeyword ?? '',
        simpleMarket,
        isDetail: isDetailPage,
    }

    if (useSampleData) {
        if (importedData) {
            dispatch(switchSampleData(date, importedData, params))
            const [betListData, liveScore] = betListDataCreator(
                importedData,
                params.sId,
                params.marketGroup === MarketGroup.or,
            )
            dispatch(saveBetListData(betListData))
            dispatch(updateLiveScore(liveScore))
        } else {
            dispatch(switchSampleData(date, sampleData, params))
        }
        return
    }

    platform === 'mobile' && date === 'home'
        ? dispatch(fetchTopPageSearchMatchesData(params, update))
        : dispatch(fetchSearchMatchesData(params, update))
}

export const fetchMatchesDateList = (
    date: RouteDateType,
    sports: RouteSportType,
    parlayOnly: boolean = false,
): ThunkResult<void> => async (dispatch, getState) => {
    const platform = getState().sportGlobal.platform

    try {
        const source = getState().sportGlobal.dataSource.toLocaleLowerCase()
        const timezone = parseInt(getState().sportGlobal.timezone)
        const sId = sportSId[sports]

        const params = { sId, source, timezone, parlayOnly }
        const response = await apiMatch.getDateList(params)

        const responseData = response?.data
        const { success = false } = responseData
        const rawDateList = responseData.data

        if (!success || !Array.isArray(rawDateList)) {
            getState().sportData.fetching && dispatch(setFetching(false))
            throw new Error()
        }

        const dateList: MatchesDate[] = rawDateList.map((matchsDate) => {
            const convertMatchsDate = getMatchStatus(matchsDate.date, date, platform)
            return { date: matchsDate.date, matchsDate: convertMatchsDate }
        })

        dispatch({
            type: FETCH_MATCHES_DATE_LIST,
            payload: { dateList },
        })
    } catch (error) {
        getState().sportData.fetching && dispatch(setFetching(false))

        // if (axios.isCancel(error)) {
        //     dispatch(updateApiStatus(ApiStatus.Cancelled));
        // } else {
        //     dispatch(updateApiStatus(ApiStatus.Error));
        // }

        // dispatch({
        //     type: FETCH_MATCHES_DATE_LIST,
        //     payload: { dateList: [] },
        // });
    }
}

const fetchTopPageSearchMatchesData = (params: SearchMatchesParams, update?: boolean): ThunkResult<void> => async (
    dispatch,
    getState,
) => {
    !getState().sportData.fetching && dispatch(setFetching(true))
    try {
        const source = getState().sportGlobal.dataSource.toLocaleLowerCase()
        const response = await apiMatch.getTopPage({ source, timezone: params.timezone })
        const responseData = response?.data

        const { success = false, data, pageData, reason = '' } = responseData

        if (!success) throw new Error(reason)

        const output = {
            lastUpdate: {
                time: +new Date(),
                params: params,
            },
            pageData,
            topRaw: data,
            apiStatus: ApiStatus.Ready,
            fetching: false,
        }

        dispatch({
            type: FETCH_TOP_PAGE_DATA,
            payload: output,
        })
    } catch (error) {
        getState().sportData.fetching && dispatch(setFetching(false))
        if (axios.isCancel(error)) {
            // dispatch(updateApiStatus(ApiStatus.Cancelled));
        } else {
            if (update) {
                dispatch(updateApiStatus(ApiStatus.Ready))
            }
            // dispatch(updateApiStatus(update ? ApiStatus.Ready : ApiStatus.Error))
        }
    }
}

const fetchSearchMatchesData = (params: SearchMatchesParams, update?: boolean): ThunkResult<void> => async (
    dispatch,
    getState,
) => {
    !getState().sportData.fetching && dispatch(setFetching(true))

    try {
        const { lastTimestamp, ...paramsWithoutTimeStamp } = params
        const dataKey = JSON.stringify(paramsWithoutTimeStamp)
        const platform = getState().sportGlobal.platform
        const {
            sportData: { merged: previousMerged },
        } = getState()

        const newTime = +new Date()

        const apiMatchStatus = params.matchStatus === 'Parlay' ? 'parlay-Early' : params.matchStatus

        const newDataResponse = await apiMatch.getMatches({ ...params, matchStatus: apiMatchStatus })

        const {
            data: { data: newData, pageData },
        } = newDataResponse

        const rawDataInStore = {} as RawData
        rawDataInStore.pageData = pageData
        rawDataInStore.dataTime = newTime
        rawDataInStore.lastUpdateTime = newTime

        rawDataInStore.base = newData
        rawDataInStore.update = []

        dispatch(saveRawData(dataKey, rawDataInStore))

        const mergedData = matchesDataMerger(rawDataInStore)

        setTimeout(() => {
            const [betListData, liveScore] = betListDataCreator(
                mergedData,
                params.sId,
                params.marketGroup === MarketGroup.or,
            )
            dispatch(saveBetListData(betListData))
            dispatch(updateBetDataFromMergedData(betListData))
            dispatch(updateLiveScore(liveScore))
        }, 0)

        const regex = /\d+-\d+-\d+/gm
        const nextParams =
            regex.test(params?.matchStatus ?? '') && platform === 'desktop'
                ? { ...params, matchStatus: RequestFixtureStatus.Pre }
                : params

        const output = {
            lastUpdate: {
                time: newTime,
                params: nextParams,
            },
            merged: {
                ...previousMerged,
                [dataKey]: mergedData,
                current: mergedData,
            },
        }

        dispatch({
            type: FETCH_SEARCH_MATCHES,
            payload: output,
        })

        await sleep(100)

        dispatch(setFetching(false))
        dispatch(updateApiStatus(ApiStatus.Ready))
    } catch (error) {
        getState().sportData.fetching && dispatch(setFetching(false))

        if (axios.isCancel(error)) {
            dispatch(updateApiStatus(ApiStatus.Cancelled))
            dispatch({
                type: FETCH_SEARCH_MATCHES,
                payload: { merged: {} },
            })
        } else {
            if (update) {
                dispatch(updateApiStatus(ApiStatus.Ready))
            }

            // dispatch(updateApiStatus(update ? ApiStatus.Ready : ApiStatus.Error))
        }
    }
}

const fetchSeasonListData = (
    sports: RouteSportType,
    matchStatus: string,
): ThunkResult<Promise<SeasonListResponse>> => async (dispatch, getState) => {
    const source = getState().sportGlobal.dataSource
    const response = await apiMatch.getSeasonList(source, sports, matchStatus)
    const { data, success } = response.data

    if (!success) throw new Error()

    return data
}

const getMatchStatus = (date: string, routerDate: RouteDateType, platform: Platform) => {
    const regex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/gm
    const matchYYYYMMDD = regex.exec(date) !== null
    const preType = routerDate === 'parlay' ? 'parlay-' : ''

    if (matchYYYYMMDD) {
        return `${preType}${date}`
    } else if (routerDate === 'parlay') {
        return date
    } else {
        return `${preType}${mobileDateLookup[date.toLowerCase() as MRouteDateType] ?? 'Pre'}`
    }
}

export const fetchFilterSeasonListData = (
    sports: RouteSportType,
    matchStatus: string,
    routerDate: RouteDateType,
    update?: boolean,
): ThunkResult<void> => async (dispatch, getState) => {
    !getState().sportData.fetching && dispatch(setFetching(true))

    const source = getState().sportGlobal.dataSource
    const platform = getState().sportGlobal.platform
    const seasonList = getState().sportData.seasonList

    try {
        let seasonListData
        if (routerDate === 'outright' && platform === 'mobile') {
            const rawSeasonList = !seasonList
                ? ((await dispatch(fetchSeasonListData(sports, 'Pre'))) as any)
                : seasonList

            const response = await apiMatch.getOrSeasonList(source, sports)
            const { data, success } = response.data

            if (!success) throw new Error()

            seasonListData = {
                ...rawSeasonList!,
                country: data.country,
                popular: data.popular,
            }
        } else {
            seasonListData = await dispatch(fetchSeasonListData(sports, matchStatus))
        }

        const payload = {
            seasonList: seasonListData,
            apiStatus: ApiStatus.Ready,
            fetching: false,
        }

        dispatch({
            type: FETCH_SEASON_LIST,
            payload,
        })
    } catch (error) {
        // console.log(error);
        getState().sportData.fetching && dispatch(setFetching(false))

        if (axios.isCancel(error)) {
            // dispatch(updateApiStatus(ApiStatus.Cancelled));
        } else {
            if (update) {
                dispatch(updateApiStatus(ApiStatus.Ready))
            }
            // dispatch(updateApiStatus(update ? ApiStatus.Ready : ApiStatus.Error))
        }
    }
}

export const toggleSampleData = (): ThunkResult<void> => (dispatch) => {
    dispatch({
        type: TOGGLE_SAMPLE,
    })
}

export const saveRawData = (key: string, rawData: RawData): ThunkResult<void> => (dispatch) => {
    dispatch({
        type: SAVE_RAW_DATA,
        payload: { key, data: rawData },
    })
}

export const saveBetListData = (payload: BetListData) => ({
    type: SAVE_BETLIST_DATA,
    payload,
})

export const importData = (payload: any) => ({
    type: IMPORT_DATA,
    payload,
})

export const setUseCache = (payload: boolean) => ({
    type: SET_USE_CACHE,
    payload,
})
