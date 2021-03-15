import { apiConfig } from '@sport/api/apiConfig'
import i18n from '@sport/locale/i18n'
import { setBetForceId } from '@services/sportBet/actions'
import { ThunkResult } from '@sport/stores'
import { Theme } from '@sport/styles/common/types'
import {
    CHANGE_DATA_SOURCE,
    CLEAR_BET_FILTER_LIST,
    DisplayOptions,
    GlobalActionTypes,
    Language,
    SET_BET_LIST_LOADING,
    SET_BRAND_CODE,
    SET_BACK_TO_PAGE,
    SET_COMPETITION_TAB_INDEX,
    SET_LANGUAGE,
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
    ThemeName,
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
    WidthHight,
    SET_GLOBAL_LOADING,
} from './types'
import { hideV1Loading, showV1Loading } from '@utils/v1Functions'

export const setTheme = (theme: Theme): GlobalActionTypes => ({
    type: SET_THEME,
    theme,
})

export const setBetListLoading = (isLoading: boolean): GlobalActionTypes => ({
    type: SET_BET_LIST_LOADING,
    payload: isLoading,
})

export const setGlobalLoading = (loading: boolean): GlobalActionTypes => ({
    type: SET_GLOBAL_LOADING,
    payload: loading,
})

// export const setGlobalLoading = (loading: boolean) => {
//     if (loading) {
//         showV1Loading()
//     } else {
//         hideV1Loading()
//     }
// }

export const setV1Loading = (loading: boolean): ThunkResult<void> => async (dispatch, getState) => {
    if (loading) {
        showV1Loading()
    } else {
        hideV1Loading()
    }
}

export const switchTheme = (themeName: ThemeName): GlobalActionTypes => ({
    type: SWITCH_THEME,
    themeName,
})

export const toggleHeader = (isShowHeader: boolean): GlobalActionTypes => {
    localStorage.setItem('isShowHeader', isShowHeader.toString())

    return {
        type: SET_SHOW_HEADER,
        isShowHeader,
    }
}

export const setLoginRedirectUrl = (url: any): GlobalActionTypes => {
    localStorage.setItem('loginRedirectUrl', url)

    return {
        type: SET_LOGIN_REDIRECT_URL,
        loginRedirectUrl: url,
    }
}

export const updateWidthHeight = (payload: WidthHight): GlobalActionTypes => ({
    type: UPDATE_WIDTH_HEIGHT,
    payload,
})

export const setMaintenance = (isMaintenance: boolean): GlobalActionTypes => ({
    type: SET_MAINTENANCE,
    payload: isMaintenance,
})

export const getMaintenanceStatus = (): ThunkResult<any> => async (dispatch, getState) => {
    const res = await apiConfig.getMaintenanceStatus()

    if (!res.data.success) {
        throw new Error('get maintenance status fail')
    }

    dispatch(setMaintenance(res.data.data))

    return res.data.data
}

export const toggleSportMenu = (open?: boolean): ThunkResult<void> => async (dispatch, getState) => {
    const previousSportMenuOpen = getState().sportGlobal.sportMenuOpen
    const isTabletLayout = getState().sportGlobal.isTabletLayout
    const nextSportMenuOpen = open ?? !previousSportMenuOpen

    isTabletLayout &&
        nextSportMenuOpen &&
        dispatch({
            type: TOGGLE_BET_LIST,
            payload: false,
        })

    dispatch({
        type: TOGGLE_SPORT_MENU,
        payload: nextSportMenuOpen,
    })
}

export const toggleBetList = (open?: boolean): ThunkResult<void> => async (dispatch, getState) => {
    const previousBetListOpen = getState().sportGlobal.betListOpen
    const isTabletLayout = getState().sportGlobal.isTabletLayout
    const nextBetListOpen = open ?? !previousBetListOpen
    const [firstId = ''] = getState().sportBet.list
    const platform = getState().sportGlobal.platform

    isTabletLayout &&
        nextBetListOpen &&
        dispatch({
            type: TOGGLE_SPORT_MENU,
            payload: false,
        })

    if (platform === 'mobile') {
        dispatch(setBetForceId(firstId))
    }

    dispatch({
        type: TOGGLE_BET_LIST,
        payload: nextBetListOpen,
    })
}

export const changeDataSource = (payload: string): GlobalActionTypes => {
    localStorage.setItem('dataSource', payload)

    return {
        type: CHANGE_DATA_SOURCE,
        payload,
    }
}

// export const changeDataType = (payload: DataType): GlobalActionTypes => {
//     localStorage.setItem('dataType', payload);

//     return {
//         type: CHANGE_DATA_TYPE,
//         payload,
//     };
// };

export const changeTimezone = (payload: string): GlobalActionTypes => {
    localStorage.setItem('timezone', payload)
    return {
        type: SET_TIMEZONE,
        payload,
    }
}

export const setLanguage = (payload: Language): GlobalActionTypes => {
    localStorage.setItem('language', payload)
    i18n.changeLanguage(payload)

    return {
        type: SET_LANGUAGE,
        payload,
    }
}

export const setTabletLayout = (payload: {
    isTabletLayout: boolean
    sportMenuOpen?: boolean
    betListOpen?: boolean
}): GlobalActionTypes => ({
    type: SET_TABLET_LAYOUT,
    payload,
})

export const updateDisplayOptions = (
    payload: { [key: string]: boolean },
    key: keyof DisplayOptions,
): ThunkResult<void> => async (dispatch, getState) => {
    const {
        sportGlobal: { displayOptions: previousDisplayOptions },
    } = getState()

    const nextDisplayOptions = {
        ...previousDisplayOptions,
        [key]: {
            ...previousDisplayOptions[key],
            ...payload,
        },
    }

    dispatch({
        type: UPDATE_DISPLAY_OPTIONS,
        payload: nextDisplayOptions,
    })
}

export const toggleShowBackToTop = (payload: boolean): GlobalActionTypes => ({
    type: TOGGLE_SHOW_BACK_TO_TOP,
    payload,
})

export const updateBetListCurrentIndex = (index: number): GlobalActionTypes => ({
    type: UPDATE_BET_LIST_CURRENT_INDEX,
    payload: {
        index,
    },
})

export const toggleShowSearchBar = (payload: boolean): GlobalActionTypes => ({
    type: TOGGLE_SHOW_SEARCH_BAR,
    payload,
})

export const toggleShowRightMenu = (payload: boolean): GlobalActionTypes => ({
    type: TOGGLE_SHOW_RIGHT_MENU,
    payload,
})

export const toggleShowNotification = (payload: boolean): GlobalActionTypes => ({
    type: TOGGLE_SHOW_NOTIFICATION,
    payload,
})

// eslint-disable-next-line
export const toggleColorPancel = (): GlobalActionTypes => ({
    type: TOGGLE_COLOR_PANEL,
})

export const updateSearchkeyword = (payload: string): GlobalActionTypes => ({
    type: UPDATE_SEARCH_KEYWORD,
    payload,
})

export const setSelectedDateList = (payload: string): GlobalActionTypes => ({
    type: SET_SELECTED_DATE_LIST,
    payload,
})

// export const setLiveTabDisplay = (payload: Partial<LiveDisplayOption>) => ({
//     type: SET_LIVE_SHOW,
//     payload,
// });

export const toggleBetFilterList = (sport: string, country: string, isOpen: boolean): ThunkResult<void> => (
    dispatch,
    getState,
) => {
    const targetIndex = getState().sportGlobal.betFilterCollapsedInfo.list.findIndex((name) => name === country)
    const updatedList = getState().sportGlobal.betFilterCollapsedInfo.list.slice(0)

    if (targetIndex < 0) {
        if (isOpen) {
            return
        }

        updatedList.push(country)
    } else {
        updatedList.splice(targetIndex, 1)
    }

    dispatch({
        type: TOGGLE_BET_FILTER_LIST,
        payload: {
            sport,
            updatedList,
        },
    })
}

export const clearBetFilterList = (sport: string): GlobalActionTypes => ({
    type: CLEAR_BET_FILTER_LIST,
    payload: sport,
})
export const setStaticJsonConfig = (payload: { oddsHost: string; rootPath: string }): ThunkResult<void> => (
    dispatch,
) => {
    dispatch({
        type: SET_STATIC_JSON_CONFIG,
        payload,
    })
}

export const toggleReplayData = (): GlobalActionTypes => ({
    type: TOGGLE_REPLAY_DATA,
})

export const setCompetitionTabIndex = (payload: number): GlobalActionTypes => ({
    type: SET_COMPETITION_TAB_INDEX,
    payload,
})

export const setScrollPosition = (payload: number): GlobalActionTypes => ({
    type: SET_SCROLL_POSITION,
    payload,
})

export const setRestoreScrollPosition = (payload: boolean): GlobalActionTypes => ({
    type: SET_RESTORE_SCROLL_POSITION,
    payload,
})

export const setBrandCode = (payload: string): GlobalActionTypes => ({
    type: SET_BRAND_CODE,
    payload,
})

export const setBackToPage = (payload: string): GlobalActionTypes => ({
    type: SET_BACK_TO_PAGE,
    payload,
})
