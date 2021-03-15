import { RequestFixtureStatus, Source } from '@services/sportData/types'
import { Theme } from '@sport/styles/common/types'
import { theme } from '@sport/styles/theme'
import { getCookieByName } from '@sport/util/general'
import {
    CHANGE_DATA_SOURCE,
    CHANGE_DATA_TYPE,
    CLEAR_BET_FILTER_LIST,
    DataType,
    GlobalActionTypes,
    GlobalState,
    Language,
    Platform,
    SET_BET_LIST_LOADING,
    SET_BRAND_CODE,
    SET_BACK_TO_PAGE,
    SET_COMPETITION_TAB_INDEX,
    SET_GLOBAL_LOADING,
    SET_LANGUAGE,
    SET_LIVE_SHOW,
    SET_LOGIN_REDIRECT_URL,
    SET_MAINTENANCE,
    SET_RESTORE_SCROLL_POSITION,
    SET_SCROLL_POSITION,
    SET_SELECTED_DATE_LIST,
    SET_SHOW_HEADER,
    SET_STATIC_JSON_CONFIG,
    SET_TABLET_LAYOUT,
    SET_THEME,
    SET_TIMEZONE,
    SWITCH_THEME,
    TOGGLE_BET_FILTER_LIST,
    TOGGLE_BET_LIST,
    TOGGLE_COLOR_PANEL,
    TOGGLE_REPLAY_DATA,
    TOGGLE_SHOW_BACK_TO_TOP,
    TOGGLE_SHOW_NOTIFICATION,
    TOGGLE_SHOW_RIGHT_MENU,
    TOGGLE_SHOW_SEARCH_BAR,
    TOGGLE_SPORT_MENU,
    UPDATE_BET_LIST_CURRENT_INDEX,
    UPDATE_DISPLAY_OPTIONS,
    UPDATE_SEARCH_KEYWORD,
    UPDATE_WIDTH_HEIGHT,
} from './types'

const getisShowHeader = () => {
    // no iframe mode is allowed in 188v2
    return false

    // const isShowHeader = localStorage.getItem('isShowHeader')

    // if (isShowHeader === null) {
    //     return true
    // } else {
    //     return isShowHeader === 'true'
    // }
}

const getBrandCode = () => {
    const brandCode = getCookieByName('sv2brandCode')

    return brandCode || ''
}

const platform: Platform = (process.env.REACT_APP_PLATFORM as Platform) ?? 'mobile'
const initialState: GlobalState = {
    themeName: 'default',
    theme: theme[platform].default,
    loginRedirectUrl: '',
    isShowHeader: getisShowHeader(),
    dataSource: Source.A,
    dataType: localStorage.getItem('dataType') === 'object' ? DataType.object : DataType.array,
    language: (localStorage.getItem('language') as Language) || Language.zh_CN,
    width: 0,
    height: 0,
    sportMenuOpen: true,
    betListOpen: platform === 'desktop',
    displayOptions: {
        football: {
            halvesView: false,
        },
        basketball: {
            halvesView: false,
            showQuarters: false,
        },
    },
    liveTabDisplay: { football: false, basketball: false, tennis: false, baseball: false },
    platform,
    showSearchBar: false,
    showBackToTop: false,
    showColorPanel: false,
    showRightMenu: false,
    showNotification: false,
    oddsHost: '/api/matches',
    rootPath: '',
    betListCurrentIndex: 2,
    timezone: '-4',
    searchKeyword: '',
    betFilterCollapsedInfo: {
        sport: '',
        list: [],
    },
    isGlobalLoading: true,
    replayData: localStorage.getItem('replayData') === 'true',
    competitionTabIndex: 1,
    scrollPosition: 0,
    isRestoreScrollPosition: false,
    isBetListLoading: false,
    isMaintenance: null,
    selectedDateList: RequestFixtureStatus.Pre,
    brandCode: getBrandCode(),
    backToPage: '',
}

const globalReducer = (state = initialState, action: GlobalActionTypes): GlobalState => {
    switch (action.type) {
        case SET_THEME:
            return {
                ...state,
                theme: action.theme,
            }
        case SET_BET_LIST_LOADING:
            return {
                ...state,
                isBetListLoading: action.payload,
            }
        case SET_TIMEZONE:
            return {
                ...state,
                timezone: action.payload,
            }
        case SWITCH_THEME:
            return {
                ...state,
                themeName: action.themeName,
                theme: theme[state.platform][action.themeName] as Theme,
            }

        case SET_SHOW_HEADER:
            return {
                ...state,
                isShowHeader: action.isShowHeader,
            }
        case SET_LOGIN_REDIRECT_URL:
            return {
                ...state,
                loginRedirectUrl: action.loginRedirectUrl,
            }

        case UPDATE_WIDTH_HEIGHT:
            return {
                ...state,
                ...action.payload,
            }

        case TOGGLE_SPORT_MENU:
            return {
                ...state,
                sportMenuOpen: action.payload,
            }

        case TOGGLE_BET_LIST:
            return {
                ...state,
                betListOpen: action.payload,
            }
        case CHANGE_DATA_SOURCE:
            return {
                ...state,
                dataSource: action.payload,
            }
        case CHANGE_DATA_TYPE:
            return {
                ...state,
                dataType: action.payload,
            }
        case SET_LANGUAGE:
            return {
                ...state,
                language: action.payload,
            }
        case SET_TABLET_LAYOUT:
            return {
                ...state,
                ...action.payload,
            }

        case UPDATE_DISPLAY_OPTIONS:
            return {
                ...state,
                displayOptions: {
                    ...state.displayOptions,
                    ...action.payload,
                },
            }

        case TOGGLE_SHOW_BACK_TO_TOP:
            return {
                ...state,
                showBackToTop: action.payload,
            }
        case UPDATE_BET_LIST_CURRENT_INDEX:
            return {
                ...state,
                betListCurrentIndex: action.payload.index,
            }
        case TOGGLE_SHOW_SEARCH_BAR:
            return {
                ...state,
                showSearchBar: action.payload,
            }
        case TOGGLE_COLOR_PANEL:
            return {
                ...state,
                showColorPanel: !state.showColorPanel,
            }
        case TOGGLE_SHOW_RIGHT_MENU:
            return {
                ...state,
                showRightMenu: action.payload,
            }
        case TOGGLE_SHOW_NOTIFICATION:
            return {
                ...state,
                showNotification: action.payload,
            }
        case UPDATE_SEARCH_KEYWORD:
            return {
                ...state,
                searchKeyword: action.payload,
            }
        case SET_GLOBAL_LOADING:
            return {
                ...state,
                isGlobalLoading: action.payload,
            }
        case SET_LIVE_SHOW:
            return {
                ...state,
                liveTabDisplay: { ...state.liveTabDisplay, ...action.payload },
            }
        case TOGGLE_BET_FILTER_LIST:
            return {
                ...state,
                betFilterCollapsedInfo: {
                    list: action.payload.updatedList,
                    sport: action.payload.sport,
                },
            }
        case CLEAR_BET_FILTER_LIST:
            return {
                ...state,
                betFilterCollapsedInfo: {
                    list: [],
                    sport: action.payload,
                },
            }
        case SET_STATIC_JSON_CONFIG:
            return {
                ...state,
                ...action.payload,
            }
        case TOGGLE_REPLAY_DATA:
            localStorage.setItem('replayData', !state.replayData === true ? 'true' : 'false')

            return {
                ...state,
                replayData: !state.replayData,
            }

        case SET_COMPETITION_TAB_INDEX:
            return {
                ...state,
                competitionTabIndex: action.payload,
            }
        case SET_SCROLL_POSITION:
            return {
                ...state,
                scrollPosition: action.payload,
            }
        case SET_RESTORE_SCROLL_POSITION:
            return {
                ...state,
                isRestoreScrollPosition: action.payload,
            }
        case SET_MAINTENANCE:
            return {
                ...state,
                isMaintenance: action.payload,
            }
        case SET_SELECTED_DATE_LIST:
            return {
                ...state,
                selectedDateList: action.payload,
            }
        case SET_BRAND_CODE:
            return {
                ...state,
                brandCode: action.payload,
            }
        case SET_BACK_TO_PAGE:
            return {
                ...state,
                backToPage: action.payload,
            }
        default:
            return state
    }
}

export default globalReducer
