import { apiMenu } from '@sport/api/apiMenu'
import { ThunkResult } from '@sport/stores'
import { FETCH_MENU } from './types'

export const getMenu = (): ThunkResult<void> => async (dispatch, getState) => {
    const dataSource = getState().sportGlobal.dataSource ?? 'a'
    const timezone = getState().sportGlobal.timezone

    try {
        const response = await apiMenu.getMenu(dataSource, parseInt(timezone))

        const { data: { success = false } = {}, data } = response

        if (success === true) {
            dispatch({
                type: FETCH_MENU,
                payload: data,
            })
        }
    } catch (error) {
        console.log('112033 actions.ts error', error)
        // does not dispatch
    }
}
