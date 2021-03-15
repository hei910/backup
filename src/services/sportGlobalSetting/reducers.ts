import { FETCH_GLOBAL_SETTING, GlobalSettingState, SettingActionTypes } from './types';

const initialState: GlobalSettingState = {
    data: [],
    setting: {},
};

const authReducer = (state = initialState, action: SettingActionTypes): GlobalSettingState => {
    switch (action.type) {
        case FETCH_GLOBAL_SETTING: {
            return {
                ...state,
                ...action.payload,
            };
        }

        default:
            return state;
    }
};

export default authReducer;
