import { apiConfig } from '@sport/api/apiConfig'
import { ThunkResult } from '@sport/stores'
import { changeDataSource } from '@services/sportGlobal/actions'
import { FETCH_GLOBAL_SETTING } from './types'

// export const getGlobalSetting = (): ThunkResult<void> => async (dispatch) => {
//     const response = await apiConfig.getGlobalSetting();

//     const data = response?.data;
//     const success = response?.data?.success;

//     if (!data || !success) {
//         throw new Error('get global setting:"No config data returned!"');
//     }

//     const previousDataSource = localStorage.getItem('dataSource');

//     //when there is data source preference in local storage, do not change the default api data source
//     if (!previousDataSource) {
//         const dataSource = data.data.find((value) => {
//             return value.paramName === 'GLOBAL_SOURCE';
//         })?.value;

//         dispatch({
//             type: CHANGE_DATA_SOURCE,
//             payload: dataSource,
//         });
//     }

//     dispatch({
//         type: FETCH_GLOBAL_SETTING,
//         payload: { data: data.data },
//     });
// };

export const getGlobalSettingV2 = (): ThunkResult<Promise<Record<string, string>>> => async (dispatch) => {
    const response = await apiConfig.getGlobalSettingV2()

    const data = response?.data
    const success = response?.data?.success

    if (!data || !success) {
        throw new Error('get global setting v2:"No config data returned!"')
    }

    // const previousDataSource = localStorage.getItem('dataSource');

    //when there is data source preference in local storage, do not change the default api data source
    // if (!previousDataSource) {
    //     const dataSource = data.data.find((value) => {
    //         return value.paramName === 'GLOBAL_SOURCE';
    //     })?.value;

    //     dispatch({
    //         type: CHANGE_DATA_SOURCE,
    //         payload: dataSource,
    //     });
    // }

    // const dataSource = window.localStorage.getItem('dataSource');

    // if (!dataSource) {
    dispatch(changeDataSource(data?.data['GLOBAL_SOURCE']))
    // }

    dispatch({
        type: FETCH_GLOBAL_SETTING,
        payload: { setting: data.data },
    })

    return data.data
}
