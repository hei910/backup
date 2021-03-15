import { getStateFromLocalStorage, setStateToLocalStorage } from './actions'
import {
    Acceptance,
    ADD_TO_BET_LIST,
    BetActionTypes,
    BetListStatus,
    BetState,
    CLEAR_STAKE,
    OddsType,
    REMOVE_ALL_BET_LIST,
    REMOVE_FROM_BET_LIST,
    REMOVE_SUCCESS_BET,
    RESET_BET,
    SAVE_SUBMIT_BET_RESULT,
    SET_BET_FORCE_ID,
    SYNC_BETLIST_FROM_BETDATA,
    TOGGLE_KEEP_BET_LIST,
    TOGGLE_SHOW_CONFIRMATION_PAGES,
    UPDATE_ACCEPTANCE,
    UPDATE_BET_DATA_FROM_BET_LIST,
    UPDATE_BET_DATA_FROM_MERGED_DATA,
    UPDATE_BET_LIST,
    UPDATE_BET_LIST_STATUS,
    UPDATE_BET_RECORD,
    UPDATE_COMPETITION_FILTER_IDS,
    UPDATE_ODDS_TYPE,
    UPDATE_TO_WIN,
    UPDATE_UID_MAP,
    REMOVE_INTERVAL,
    ADD_INTERVAL,
    REMOVE_ALL_INTERVAL,
} from './types'

const defaultState = {
    list: [],
    stake: {
        single: {},
        parlay: {},
    },
    data: {},
    acceptance: Acceptance.ANY,
    oddsType: (localStorage.getItem('bet.oddsType') as OddsType) || OddsType.HONG_KONG,
    betListStatus: BetListStatus.BETTING,
    showConfirmationPages: true,
    keepBetList: false,
    sameMatchList: [],
    orSameSeasonList: [],
    filter: {
        competitionIds: [],
        fromMenu: false,
    },
    records: {
        paging: {},
        unsettled: [],
        settled: [],
    },
    uidMap: {},
    betIntervalList: [],
}
let stateFromLocalStorage = {}

const commitHash = localStorage.getItem('version')
const ENV_COMMIT_HASH =
    typeof process.env.REACT_APP_COMMIT_HASH === 'undefined' ? 'unversioned' : process.env.REACT_APP_COMMIT_HASH
if (ENV_COMMIT_HASH !== commitHash) {
    localStorage.clear()
    localStorage.version = commitHash || 'unversioned'
} else {
    stateFromLocalStorage = {
        list: getStateFromLocalStorage('list'),
        stake: getStateFromLocalStorage('stake'),
        data: getStateFromLocalStorage('data'),
        sameMatchList: getStateFromLocalStorage('sameMatchList'),
        orSameSeasonList: getStateFromLocalStorage('orSameSeasonList'),
    }
}
localStorage.setItem('version', ENV_COMMIT_HASH || 'unversioned')

const initialState: BetState = {
    ...defaultState,
    ...stateFromLocalStorage,
}

const betReducer = (state = initialState, action: BetActionTypes): BetState => {
    switch (action.type) {
        case UPDATE_BET_LIST:
            setStateToLocalStorage('stake', action.payload)

            return {
                ...state,
                stake: action.payload,
            }
        case ADD_TO_BET_LIST:
        case REMOVE_FROM_BET_LIST:
            setStateToLocalStorage('list', action.payload.list)
            setStateToLocalStorage('stake', action.payload.stake)
            setStateToLocalStorage('data', action.payload.data)
            setStateToLocalStorage('sameMatchList', action.payload.sameMatchList)
            setStateToLocalStorage('orSameSeasonList', action.payload.orSameSeasonList)

            return {
                ...state,
                ...action.payload,
            }
        case REMOVE_SUCCESS_BET:
            setStateToLocalStorage('list', action.payload.list)
            setStateToLocalStorage('stake', action.payload.stake)

            return {
                ...state,
                ...action.payload,
            }
        case UPDATE_BET_DATA_FROM_BET_LIST:
            setStateToLocalStorage('data', { ...state.data, ...action.payload })

            return {
                ...state,
                data: {
                    ...state.data,
                    ...action.payload,
                },
            }
        case SET_BET_FORCE_ID:
            return {
                ...state,
                betForceId: action.betForceId,
            }
        case CLEAR_STAKE:
            setStateToLocalStorage('stake', {
                single: {},
                parlay: {},
            })

            return {
                ...state,
                stake: {
                    single: {},
                    parlay: {},
                },
            }
        case REMOVE_ALL_BET_LIST:
            setStateToLocalStorage('list', [])
            setStateToLocalStorage('data', {})
            setStateToLocalStorage('stake', {
                single: {},
                parlay: {},
            })

            return {
                ...state,
                list: [],
                data: {},
                stake: {
                    single: {},
                    parlay: {},
                },
                sameMatchList: [],
                orSameSeasonList: [],
                submitBetResult: {
                    single: {},
                    parlay: {},
                    confirm: true,
                },
            }

        case UPDATE_BET_LIST_STATUS:
            return {
                ...state,
                betListStatus: action.payload,
            }

        case UPDATE_TO_WIN:
            return {
                ...state,
                stake: {
                    ...state.stake,
                    ...action.payload,
                },
            }

        case UPDATE_ACCEPTANCE:
            return {
                ...state,
                acceptance: action.payload ?? state.acceptance === Acceptance.ANY ? Acceptance.NEVER : Acceptance.ANY,
            }

        case TOGGLE_SHOW_CONFIRMATION_PAGES:
            return {
                ...state,
                showConfirmationPages: !state.showConfirmationPages,
            }
        case TOGGLE_KEEP_BET_LIST:
            return {
                ...state,
                keepBetList: !state.keepBetList,
            }
        case UPDATE_COMPETITION_FILTER_IDS:
            return {
                ...state,
                filter: {
                    competitionIds: action.payload?.ids,
                    fromMenu: Boolean(action.payload?.fromMenu),
                },
            }
        case UPDATE_BET_RECORD:
            return {
                ...state,
                records: {
                    settled: action.payload.settled,
                    unsettled: action.payload.unsettled,
                    paging: action.payload.paging,
                },
            }
        case UPDATE_ODDS_TYPE:
            setStateToLocalStorage('oddsType', action.payload)
            return {
                ...state,
                oddsType: action.payload,
            }
        case UPDATE_BET_DATA_FROM_MERGED_DATA:
            setStateToLocalStorage('data', { ...state.data, ...action.payload })

            return {
                ...state,
                data: {
                    ...state.data,
                    ...action.payload,
                },
            }
        case SAVE_SUBMIT_BET_RESULT:
            return {
                ...state,
                submitBetResult: action.payload,
            }
        case SYNC_BETLIST_FROM_BETDATA:
            setStateToLocalStorage('list', [])
            setStateToLocalStorage('sameMatchList', [])
            setStateToLocalStorage('orSameSeasonList', [])
            setStateToLocalStorage('stake', {
                single: {},
                parlay: {},
            })

            return {
                ...state,
                list: action.payload,
                stake: {
                    single: {},
                    parlay: {},
                },
            }
        case UPDATE_UID_MAP:
            return {
                ...state,
                uidMap: action.payload,
            }
        case RESET_BET:
            setStateToLocalStorage('list', [])
            setStateToLocalStorage('stake', {
                single: {},
                parlay: {},
            })
            setStateToLocalStorage('data', {})
            setStateToLocalStorage('sameMatchList', [])
            setStateToLocalStorage('orSameSeasonList', [])

            return defaultState
        case REMOVE_INTERVAL:
            return {
                ...state,
                betIntervalList: state.betIntervalList.filter(
                    (intervalInfo) => intervalInfo.outcomeUid !== action.payload.outcomeUid,
                ),
            }
        case ADD_INTERVAL:
            return {
                ...state,
                betIntervalList: state.betIntervalList.concat(action.payload),
            }
        case REMOVE_ALL_INTERVAL:
            return {
                ...state,
                betIntervalList: [],
            }
        default:
            return state
    }
}

export default betReducer
