import { FETCH_SETTING, SettingActionTypes, SettingState } from './types';

const initialState: SettingState = {
    data: [],
    setting: {},
};

const authReducer = (state = initialState, action: SettingActionTypes): SettingState => {
    switch (action.type) {
        case FETCH_SETTING: {
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
