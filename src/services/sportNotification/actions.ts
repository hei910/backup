import { apiNotification } from '@sport/api/apiNotification'
import { ThunkResult } from '@sport/stores'
// import { getLastestNotificationDate } from 'util/dataProcess';
import { FETCH_NOTIFICATION } from './types'

export const getNotification = (): ThunkResult<void> => async (dispatch, getState) => {
    const brandCode = getState().sportGlobal.brandCode
    try {
        const response = await apiNotification.getNotification(brandCode)
        const data = response?.data

        if (!data) {
            throw new Error('getMenu:"No notification data returned!"')
        }

        //remove active === false before adding to the store
        const filteredData = data.data.filter((item) => {
            return item.active === true
        })

        dispatch({
            type: FETCH_NOTIFICATION,
            payload: { data: filteredData },
        })
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
    }
}

// export const getNotificationUpdate = (): ThunkResult<void> => async (dispatch, getState) => {
//     const notification = getState().notification.data;
//     const updatedDate = getLastestNotificationDate(notification);

//     const response = await apiNotification.getNotificationUpdate(updatedDate);

//     const data = response.data;

//     if (!data) {
//         throw new Error('getMenu:"No notification data returned!"');
//     } else if (!data.success) {
//         throw new Error('getMenu:"No notification data returned!"');
//     }

//     //remove active === false before adding to the store
//     const filteredData = data.data.filter(item => {
//         return item.active === true;
//     });

//     dispatch({
//         type: FETCH_NOTIFICATION,
//         payload: { data: filteredData },
//     });
// };
