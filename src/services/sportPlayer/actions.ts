import { apiPlayer } from '@sport/api/apiPlayer'
import { initialState } from '@services/sportPlayer/reducers'
import { FETCH_API, PlayerActionTypes, SET_USER_DATA } from '@services/sportPlayer/types'
import { ThunkResult } from '@sport/stores'
import { fetchUserBalanceAction } from '../user/action'
import { refreshBalance } from '@utils/v1Functions'

export const getPlayer = (): ThunkResult<void> => async (dispatch, getState) => {
    try {
        const response = await apiPlayer.getInfo()
        const data = response?.data?.data

        // if (!data) {
        //     throw new Error('getPlayer:"The response has not user info."')
        // }

        const previousPlayer = getState().sportPlayer

        dispatch({
            type: FETCH_API,
            payload: {
                ...previousPlayer,
                ...data,
            },
        })

        dispatch({
            type: SET_USER_DATA,
            payload: true,
        })
    } catch (error) {
        dispatch({
            type: FETCH_API,
            payload: initialState,
        })

        dispatch({
            type: SET_USER_DATA,
            payload: false,
        })
    }
}

export const logoutPlayer = (): ThunkResult<void> => async (dispatch) => {
    await apiPlayer.logout()

    dispatch({
        type: FETCH_API,
        payload: { ...initialState },
    })

    dispatch({
        type: SET_USER_DATA,
        payload: false,
    })
}

export const getWallet = (): ThunkResult<void> => async (dispatch, getState) => {
    try {
        const response = await apiPlayer.getWallet()
        const data = response?.data?.data

        if (!data) {
            throw new Error('getWallet:"The response has not wallet info."')
        }

        const previousPlayer = getState().sportPlayer

        dispatch({
            type: FETCH_API,
            payload: {
                ...previousPlayer,
                ...data,
            },
        })
    } catch (error) {
        dispatch({
            type: FETCH_API,
            data: initialState,
        })
    }
}

//update merchant demo balance if is in iframe mode, otherwise, call getWallet to update balance
export const updateBalance = (): ThunkResult<void> => async (dispatch, getState) => {
    //when the app is in iframe mode, disable the header
    // if (isUnderIframe()) {
    //     // eslint-disable-next-line no-restricted-globals
    //     parent.postMessage({ type: 'update-balance' }, '*')
    // } else {
    //     dispatch(getWallet())
    // }

    dispatch(fetchUserBalanceAction())
    refreshBalance()
}

export const setLogin = (payload: boolean): PlayerActionTypes => ({
    type: SET_USER_DATA,
    payload,
})
