import { apiConfig } from '@sport/api/apiConfig'
import { changeTimezone } from '@services/sportGlobal/actions'
import { ThunkResult } from '@sport/stores'
import { FETCH_SETTING } from './types'

export const getSetting = (): ThunkResult<void> => async (dispatch) => {
    const response = await apiConfig.getConfig()

    const data = response?.data

    if (!data) {
        throw new Error('get setting:"No config data returned!"')
    }

    dispatch({
        type: FETCH_SETTING,
        payload: { data: data.data },
    })
}

export const getSettingV2 = (): ThunkResult<void> => async (dispatch, getState) => {
    const brandCode = getState().sportGlobal.brandCode
    const response = await apiConfig.getSettingV2(brandCode)

    const data = response?.data

    if (!data) {
        throw new Error('get Setting v2:"No config data returned!"')
    }

    // const previousTimezone = window.localStorage.getItem('timezone');

    // if (!previousTimezone) {
    dispatch(changeTimezone(data?.data['BRAND_TIMEZONE']?.replace('GMT', '')))
    // }

    dispatch({
        type: FETCH_SETTING,
        payload: { setting: data.data },
    })
}
