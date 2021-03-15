import { apiNotification } from '@sport/api/apiNotification'
import { useEffect } from 'react'
import { useSelector } from '@redux'
import { useDispatch } from '@sport/stores'
import { getNotification } from '@services/sportNotification/actions'
import { NotificationState } from '@services/sportNotification/types'
import { getLastestNotificationDate } from '@sport/util/dataProcess'
import { useInterval } from './useInterval'

const useNotification: () => NotificationState = () => {
    const dispatch = useDispatch()
    const notification = useSelector((state) => state.sportNotification)
    const brandCode = useSelector((state) => state.sportGlobal.brandCode)

    useEffect(() => {
        dispatch(getNotification())
    }, [dispatch])

    //get notification update every 60 seconds
    useInterval(() => {
        const updatedDate = getLastestNotificationDate(notification.data)
        apiNotification.checkNotificationUpdate(updatedDate, brandCode).then((res) => {
            const { success, data } = res.data
            //case when update available
            if (success === true && data === true) {
                dispatch(getNotification())
            }
        })
    }, 60000)

    return notification
}

export default useNotification
