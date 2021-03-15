import { CheckNotificationResponse, NotificationResponse } from '@services/sportNotification/types'
import axios from './axios'

export const apiNotification = {
    getNotification: (brandCode: string, updatedDate: string | null = null) =>
        axios.get<NotificationResponse>(`/notification/getNotificationUpdate/${brandCode}`),
    checkNotificationUpdate: (updatedDate: string, brandCode: string) =>
        axios.get<CheckNotificationResponse>(`/notification/checkNotificationUpdate/${brandCode}`, {
            params: {
                updatedDate,
            },
        }),
}
