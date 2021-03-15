import { FETCH_NOTIFICATION, NotificationActionTypes, NotificationState } from './types';

const initialState: NotificationState = {
    data: [
        // {
        //     active: true,
        //     categories: '',
        //     content: 'test estes setst tests',
        //     createdDate: '',
        //     deleteImages: [],
        //     deleted: false,
        //     description: '',
        //     desktopHomepageImg: '',
        //     desktopHomepageImgFileName: '',
        //     desktopHomepageUrl: '',
        //     notificationId: -1,
        //     publishEndDate: '',
        //     publishStartDate: '',
        //     shownInHomePage: false,
        //     title: '',
        //     updatedDate: '',
        // },
    ],
};

const notificationReducer = (state = initialState, action: NotificationActionTypes): NotificationState => {
    switch (action.type) {
        case FETCH_NOTIFICATION: {
            return {
                ...state,
                ...action.payload,
            };
        }

        default:
            return state;
    }
};

export default notificationReducer;
