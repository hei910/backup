// interface
import store from '@redux'
import { sportSId } from '@sport/util/constant'
import { getOddsDomain } from '@sport/util/general'
import paramsObjectToParamsPath from '@sport/util/paramsObjectToParamsPath'
import {
    BetItemOddsResponse,
    GetOneOddsParams,
    GetOneOddsResponse,
    MatchesDateResponse,
    MatchesResponse,
    MobileMainMatchesDataResponse,
    RawOrSeasonListResponse,
    RawSeasonListResponse,
    SearchMatchesParams,
    SeasonGameInfoResponse,
} from '@services/sportData/types'
import axios from './axios'

// const oddsApiDomain = store.getState()?.globalSetting?.ODD_API_DOMAIN ?? '';

export const apiMatch = {
    getMatches: async (params: SearchMatchesParams) => {
        const paramsInString = paramsObjectToParamsPath({
            ...params,
            marketGroup: params.fixtureId ? 'all' : params.marketGroup,
            searchKeyword: params.searchKeyword,
            timezone: params.timezone ?? parseInt(store.getState().sportGlobal.timezone),
        })

        return axios.request<MatchesResponse>({
            baseURL: await getOddsDomain(),
            method: 'GET',
            url: `${store.getState().sportGlobal.replayData === true ? 'replay/' : ''}matches${paramsInString}`,
        })
    },
    getOneOdds: async (params: GetOneOddsParams) => {
        const paramsInString = paramsObjectToParamsPath(params)

        return axios.get<GetOneOddsResponse>(`getOneOdds${paramsInString}`, { baseURL: await getOddsDomain() })
    },
    getSeasonList: async (source: string, sport: string, date: string = '', timezone?: string) => {
        const paramsInString = paramsObjectToParamsPath({
            source: source.toLowerCase(),
            sId: sportSId[sport],
            matchStatus: date,
            timezone: timezone ?? parseInt(store.getState().sportGlobal.timezone),
        })

        return axios.get<RawSeasonListResponse>(`getSeasonList${paramsInString}`, { baseURL: await getOddsDomain() })
    },
    getOrSeasonList: async (source: string, sport: string, timezone?: string) => {
        const paramsInString = paramsObjectToParamsPath({
            source: source.toLowerCase(),
            sId: sportSId[sport],
            timezone: timezone ?? parseInt(store.getState().sportGlobal.timezone),
        })

        return axios.get<RawOrSeasonListResponse>(`getOrSeasonList${paramsInString}`, {
            baseURL: await getOddsDomain(),
        })
    },
    getDateList: async (params: Pick<SearchMatchesParams, 'sId' | 'source' | 'timezone' | 'parlayOnly'>) => {
        const paramsInString = paramsObjectToParamsPath({
            ...params,
            timezone: params.timezone ?? parseInt(store.getState().sportGlobal.timezone),
        })

        return axios.get<MatchesDateResponse>(`getDateList${paramsInString}`, {
            baseURL: await getOddsDomain(),
        })
    },
    getTopPage: async (params: Pick<SearchMatchesParams, 'source' | 'timezone'>) => {
        const paramsInString = paramsObjectToParamsPath({
            ...params,
            timezone: params.timezone ?? parseInt(store.getState().sportGlobal.timezone),
        })

        return axios.get<MobileMainMatchesDataResponse>(`getTopPage${paramsInString}`, {
            baseURL: await getOddsDomain(),
        })
    },
    getSeasonGameList: async (
        source: string,
        language: string,
        sId: number,
        matchStatus: string,
        leagueId?: string,
    ) => {
        const paramsInString = paramsObjectToParamsPath({
            source: source.toLowerCase(),
            competitionIds: leagueId,
            lang: language,
            matchStatus: matchStatus,
            sId: sId,
            timezone: parseInt(store.getState().sportGlobal.timezone),
        })

        return axios.get<SeasonGameInfoResponse>(`getMatchStaticInfoByCompetitionIds${paramsInString}`, {
            baseURL: await getOddsDomain(),
        })
    },
    getBetItemOdds: async (
        sId: number,
        matchStatus: string,
        fixtureId: string,
        marketId: string,
        competitionIds?: string,
    ) => {
        const paramsInString = paramsObjectToParamsPath({
            source: 'a',
            sId,
            competitionIds,
            fixtureId,
            marketId,
            matchStatus,
        })

        return axios
            .get<BetItemOddsResponse>(`/getOdds${paramsInString}`, {
                baseURL: await getOddsDomain(),
            })
            .then((res) => res.data)
    },
}
