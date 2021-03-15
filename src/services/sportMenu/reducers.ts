import { FETCH_MENU, MenuActionTypes, MenuState } from './types'

const initialState: MenuState = {
    success: false,
    data: {
        football: {
            Today: 0,
            Pre: 0,
            Live: 0,
            Parlay: 0,
            Or: 0,
            UpComingInplay: 0,
        },
        basketball: {
            Today: 0,
            Pre: 0,
            Live: 0,
            Parlay: 0,
            Or: 0,
            UpComingInplay: 0,
        },
        tennis: {
            Today: 0,
            Pre: 0,
            Live: 0,
            Parlay: 0,
            Or: 0,
            UpComingInplay: 0,
        },
        baseball: {
            Today: 0,
            Pre: 0,
            Live: 0,
            Parlay: 0,
            Or: 0,
            UpComingInplay: 0,
        },
    },
}

const authReducer = (state = initialState, action: MenuActionTypes): MenuState => {
    switch (action.type) {
        case FETCH_MENU: {
            return {
                ...state,
                ...action.payload,
            }
        }

        default:
            return state
    }
}

export default authReducer
