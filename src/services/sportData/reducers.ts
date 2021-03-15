import storage from 'local-storage-fallback'
import {
    ApiStatus,
    API_CANCELLATION,
    DataActionTypes,
    DataState,
    FETCH_MATCHES_DATE_LIST,
    FETCH_SEARCH_MATCHES,
    FETCH_SEASON_GAME_LIST,
    FETCH_SEASON_LIST,
    FETCH_TOP_PAGE_DATA,
    IMPORT_DATA,
    LOAD_DATA_FROM_CACHES,
    SAVE_BETLIST_DATA,
    SAVE_MERGED_DATA,
    SAVE_RAW_DATA,
    SET_FETCHING,
    SET_LAST_UPDATE,
    SET_USE_CACHE,
    TOGGLE_SAMPLE,
    UPDATE_API_STATUS,
} from './types'

const initialState: DataState = {
    sampleData: storage.getItem('useSampleData') === 'true',
    apiStatus: ApiStatus.Loading,
    fetching: false,
    betList: {},
    importedData: storage.getItem('importedData') ? JSON.parse(storage.getItem('importedData') || '') : undefined,
    seasonList: {
        menu: [],
        popular: [],
        country: [],
    },
    cacheData: process.env.NODE_ENV !== 'development',
}

const dataReducer = (state = initialState, action: DataActionTypes): DataState => {
    switch (action.type) {
        case FETCH_SEARCH_MATCHES:
        case FETCH_MATCHES_DATE_LIST:
        case FETCH_TOP_PAGE_DATA:
        case SET_LAST_UPDATE:
        case FETCH_SEASON_GAME_LIST:
            return {
                ...state,
                ...action.payload,
            }

        case FETCH_SEASON_LIST:
            return {
                ...state,
                ...action.payload,
            }

        case TOGGLE_SAMPLE:
            storage.setItem('useSampleData', !state.sampleData ? 'true' : 'false')
            return {
                ...state,
                sampleData: !state.sampleData,
            }
        case UPDATE_API_STATUS:
            return {
                ...state,
                apiStatus: action.payload,
            }
        case SET_FETCHING:
            return {
                ...state,
                fetching: action.payload,
            }
        case SAVE_RAW_DATA:
            return {
                ...state,
                raw: { ...state.raw, [action.payload.key]: action.payload.data, current: action.payload.data },
            }
        case SAVE_MERGED_DATA:
            return {
                ...state,
                merged: { ...state.merged, [action.payload.key]: action.payload.data, current: action.payload.data },
            }
        case LOAD_DATA_FROM_CACHES:
            return {
                ...state,
                raw: {
                    ...state.raw,
                    current: state?.raw?.[action.payload]!,
                },
                merged: {
                    ...state.merged,
                    current: state?.merged?.[action.payload]!,
                },
            }
        case SAVE_BETLIST_DATA:
            return {
                ...state,
                betList: action.payload,
            }
        case IMPORT_DATA:
            storage.setItem('importedData', action.payload ? JSON.stringify(action.payload) : '')

            return {
                ...state,
                importedData: action.payload,
            }
        case SET_USE_CACHE:
            return {
                ...state,
                cacheData: action.payload,
            }
        case API_CANCELLATION:
        default:
            return state
    }
}

export default dataReducer
