export const FETCH_NOTIFICATION = 'NOTIFICATION/FETCH_NOTIFICATION';

export interface NotificationData {
    active: boolean;
    categories: string;
    content: string;
    createdDate: string;
    deleteImages: string[];
    deleted: boolean;
    description: string;
    desktopHomepageImg: string;
    desktopHomepageImgFileName: string;
    desktopHomepageUrl: string;
    notificationId: number;
    publishEndDate: string;
    publishStartDate: string;
    shownInHomePage: boolean;
    title: string;
    updatedDate: string;
}

export interface NotificationState {
    data: NotificationData[];
}

export interface GetNotificationAction {
    type: typeof FETCH_NOTIFICATION;
    payload: NotificationData[];
}

export interface NotificationResponse {
    success: boolean;
    msg: string;
    data: NotificationData[];
}

export interface CheckNotificationResponse {
    success: boolean;
    msg: string;
    data: any;
}

export type NotificationActionTypes = GetNotificationAction;
