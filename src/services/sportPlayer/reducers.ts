import { FETCH_API, PlayerActionTypes, PlayerState, SET_USER_DATA } from './types'

export const initialState: PlayerState = {
    id: -1,
    username: '',
    brand: '',
    balance: -1,
    createTime: '',
    updateTime: '',
    // isLogin: null,
}

const authReducer = (state = initialState, action: PlayerActionTypes): PlayerState => {
    switch (action.type) {
        case FETCH_API: {
            return {
                ...state,
                ...action.payload,
            }
        }

        case SET_USER_DATA:
            return {
                ...state,
                // isLogin: action.payload,
            }

        default:
            return state
    }
}

export default authReducer
