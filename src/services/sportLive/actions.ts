/* eslint-disable import/no-unused-modules */
import { apiLiveSport } from '@sport/api/apiLiveSport'
import { MatchApiSportType } from '@services/sportData/types'
import { ThunkResult } from '@sport/stores'
import {
    IAllBgSrLiveStreamData,
    LiveScoreInfo,
    LiveSportActionTypes,
    SportTypeEnum,
    TOGGLE_IS_CLOSE_LIVE_CENTER,
    UPDATE_ALL_BG_SR_LIVESTREAM_API,
    UPDATE_LIVE_SCORE,
    UPDATE_MATCH_ID,
} from './types'

export const matchApiSportTypeToSportTypeEnum = (input: MatchApiSportType | ''): SportTypeEnum => {
    switch (input) {
        case 'football':
        default:
            return SportTypeEnum.Football
        case 'basketball':
            return SportTypeEnum.Basketball
        case 'baseball':
            return SportTypeEnum.Baseball
        case 'tennis':
            return SportTypeEnum.Tennis
    }
}

export const updateMatchId = (
    source: string,
    liveMatchId: string,
    liveSportType: SportTypeEnum,
    fixtureId: string,
): LiveSportActionTypes => ({
    type: UPDATE_MATCH_ID,
    payload: { liveMatchId, liveSportType, fixtureId, source },
})

export const updateLiveScore = (payload: Record<string, Omit<LiveScoreInfo, 'sports'>>): LiveSportActionTypes => ({
    type: UPDATE_LIVE_SCORE,
    payload,
})

export const toggleIsLiveCloseCenter = (): LiveSportActionTypes => ({
    type: TOGGLE_IS_CLOSE_LIVE_CENTER,
})

const updateAllBgSrLiveStream = (
    sportType: SportTypeEnum,
    data: IAllBgSrLiveStreamData[] | null,
): LiveSportActionTypes => ({
    type: UPDATE_ALL_BG_SR_LIVESTREAM_API,
    payload: {
        sportType,
        data,
    },
})

export const getAllBgSrLiveStream = (sportType: SportTypeEnum): ThunkResult<void> => async (dispatch) => {
    try {
        const allBgSrLiveMatchResponse = await apiLiveSport.getAllBgSrLiveMatchApi(sportType)
        const { data, success } = allBgSrLiveMatchResponse.data
        if (success) {
            dispatch(updateAllBgSrLiveStream(sportType, data))
        } else {
            dispatch(updateAllBgSrLiveStream(sportType, null))
        }
    } catch (err) {
        dispatch(updateAllBgSrLiveStream(sportType, null))
    }
}
