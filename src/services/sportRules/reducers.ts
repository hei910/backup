import {
    // BetCtidBlockRules,
    // FETCH_BET_ACTIVE,
    FETCH_BET_LIMITS,
    PlayerBetLimitsResponseData,
    // FETCH_CTID_RULES,
    RulesActionTypes,
    // RulesState,
} from './types'

const initialState: PlayerBetLimitsResponseData = {
    soccerLimit: { nonLive: {}, isLive: {} },
    basketballLimit: { nonLive: {}, isLive: {} },
    tennisLimit: { nonLive: {}, isLive: {} },
    baseballLimit: { nonLive: {}, isLive: {} },
    esportLimit: { nonLive: {}, isLive: {} },
    esportSoccerLimit: { nonLive: {}, isLive: {} },
    esportBasketballLimit: { nonLive: {}, isLive: {} },
    parlayLimit: {
        minBetAmount: 0,
        singleBetLimit: 0,
        maxPayout: 0,
    },
}

const rulesReducer = (state = initialState, action: RulesActionTypes): PlayerBetLimitsResponseData => {
    switch (action.type) {
        // case FETCH_BET_ACTIVE:
        //     return {
        //         ...state,
        //         active: action.payload,
        //     }
        case FETCH_BET_LIMITS:
            return {
                ...state,
                ...action.payload,
            }
        // case FETCH_CTID_RULES:
        //     return {
        //         ...state,
        //         ctid: action.payload,
        //     }
        default:
            return state
    }
}

export default rulesReducer
