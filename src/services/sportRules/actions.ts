import apiRules from '@sport/api/apiRules'
import { ThunkResult } from '@sport/stores'
import {
    // FETCH_BET_ACTIVE,
    FETCH_BET_LIMITS,
    // FETCH_CTID_RULES,
    // PlayerBetActiveTable,
    // PlayerBetLimitsTable,
} from './types'

// export const getRulesActive = (): ThunkResult<void> => async (dispatch, getState) => {
//     const brandCode = getState().sportGlobal.brandCode

//     try {
//         const response = await apiRules.getActive(brandCode)
//         const { data: { success = false, data = [] } = {} } = response

//         if (success === true && data) {
//             const activeTable: PlayerBetActiveTable = {}

//             for (const element of data) {
//                 const { platform, source, sport, marketCode, isActive } = element
//                 const key = `${platform}.${source}.${sport}.${marketCode}`

//                 activeTable[key] = isActive
//             }

//             dispatch({
//                 type: FETCH_BET_ACTIVE,
//                 payload: activeTable,
//             })
//         }
//     } catch (err) {
//         // do nothing
//     }
// }

export const getRulesLimits = (): ThunkResult<void> => async (dispatch, getState) => {
    // const brandCode = getState().sportGlobal.brandCode

    try {
        const response = await apiRules.getLimits()
        const data = response.data

        console.log('103843 actions.ts data', data)

        if (data.success === true && data) {
            // const limitsTable: PlayerBetLimitsTable = {}
            // for (const element of data) {
            //     const factor = 1
            //     const {
            //         isLive,
            //         sportType,
            //         marketCode,
            //         minOdds,
            //         minAnte,
            //         singleMatchLimit,
            //         singleAnteLimit,
            //         maxPayout,
            //     } = element
            //     const key = `${isLive ? 'Live' : 'Pre'}.${sportType}${marketCode ? `.${marketCode}` : ''}`
            //     limitsTable[key] = {
            //         minOdds,
            //         minAnte: minAnte / factor,
            //         singleMatchLimit: singleMatchLimit / factor,
            //         singleAnteLimit: singleAnteLimit / factor,
            //         maxPayout: maxPayout / factor,
            //     }
            // }
            dispatch({
                type: FETCH_BET_LIMITS,
                payload: data.data,
            })
        }
    } catch (err) {
        // do nothing
    }
}

// export const getCtidBlockRules = (): ThunkResult<void> => async (dispatch, getState) => {
//     try {
//         const response = await apiRules.getCtidBlockRule()

//         const { success, data } = response.data

//         if (!success) {
//             throw new Error()
//         }

//         // const newData = _.transform(data, (result: any, val, key) => {
//         //     result[key.toLowerCase()] = val;
//         // });

//         dispatch({
//             type: FETCH_CTID_RULES,
//             payload: data,
//         })
//     } catch (error) {
//         // error
//     }
// }
