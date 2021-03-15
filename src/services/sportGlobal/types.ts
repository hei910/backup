import { RouteSportType } from '@services/sportMenu/types'
import { Theme } from '@sport/styles/common/types'
export const CHANGE_DATA_SOURCE = 'UI/CHANGE_DATA_SOURCE'
export const CHANGE_DATA_TYPE = 'UI/CHANGE_DATA_TYPE'
export const SET_LANGUAGE = 'UI/SET_LANGUAGE'
export const SET_LOGIN_REDIRECT_URL = 'GLOBAL/SET_LOGIN_REDIRECT_URL'
export const SET_STATIC_JSON_CONFIG = 'UI/SET_CONFIG_FROM_STATIC_JSON'
export const SET_TABLET_LAYOUT = 'UI/SET_TABLET_LAYOUT'
export const SET_THEME = 'UI/SET_THEME'
export const SET_TIMEZONE = 'UI/SET_TIMEZONE'
export const SET_SHOW_HEADER = 'UI/SET_SHOW_HEADER'
export const TOGGLE_REPLAY_DATA = 'UI/TOGGLE_REPLAY_DATA'
export const SWITCH_THEME = 'UI/SWITCH_THEME'
export const TOGGLE_BET_LIST = 'UI/TOGGLE_BET_LIST'
export const TOGGLE_SHOW_BACK_TO_TOP = 'UI/TOGGLE_SHOW_BACK_TO_TOP'
export const TOGGLE_SHOW_SEARCH_BAR = 'UI/TOGGLE_SHOW_SEARCH_BAR'
export const TOGGLE_SHOW_RIGHT_MENU = 'UI/TOGGLE_SHOW_RIGHT_MENU'
export const TOGGLE_SHOW_NOTIFICATION = 'UI/TOGGLE_SHOW_NOTIFICATION'
export const TOGGLE_COLOR_PANEL = 'UI/TOGGLE_COLOR_PANEL'
export const UPDATE_SEARCH_KEYWORD = 'UI/UPDATE_SEARCH_KEYWORD'
export const TOGGLE_BET_FILTER_LIST = 'UI/TOGGLE_BET_FILTER_LIST'
export const CLEAR_BET_FILTER_LIST = 'UI/CLEAR_BET_FILTER_LIST'
export const TOGGLE_SPORT_MENU = 'UI/TOGGLE_SPORT_MENU'
export const UPDATE_BET_LIST_CURRENT_INDEX = 'UI/UPDATE_BET_LIST_CURRENT_INDEX'
export const UPDATE_DISPLAY_OPTIONS = 'UI/UPDATE_DISPLAY_OPTIONS'
export const UPDATE_WIDTH_HEIGHT = 'UI/UPDATE_WIDTH_HEIGHT'
export const SET_GLOBAL_LOADING = 'UI/SET_GLOBAL_LOADING'
export const SET_LIVE_SHOW = 'UI/SET_LIVE_SHOW'
export const SET_COMPETITION_TAB_INDEX = 'UI/SET_COMPETITION_TAB_INDEX'
export const SET_SCROLL_POSITION = 'UI/SET_SCROLL_POSITION'
export const SET_BET_LIST_LOADING = 'UI/SET_BET_LIST_LOADING'
export const SET_RESTORE_SCROLL_POSITION = 'UI/SET_RESTORE_SCROLL_POSITION'
export const SET_MAINTENANCE = 'UI/SET_MAINTENANCE'
export const SET_SELECTED_DATE_LIST = 'UI/SET_SELECTED_DATE_LIST'
export const SET_BRAND_CODE = 'GLOBAL/SET_BARND_CODE'
export const SET_BACK_TO_PAGE = 'GLOBAL/SET_BACK_TO_PAGE'

export type ThemeName = 'default' | 'dark' | 'ubs' | 'hg9393'
export type Platform = 'desktop' | 'mobile'
export interface GlobalState {
    betListCurrentIndex: number
    betListOpen: boolean
    dataSource: string
    dataType: DataType
    displayOptions: DisplayOptions
    height: number
    isTabletLayout?: boolean
    isShowHeader?: boolean
    language: Language
    loginRedirectUrl?: string
    oddsHost: string
    platform: Platform
    rootPath: string
    showBackToTop: boolean
    showSearchBar: boolean
    showColorPanel: boolean
    sportMenuOpen: boolean
    showRightMenu: boolean
    showNotification: boolean
    theme: Theme
    themeName: ThemeName
    timezone: string
    searchKeyword: string
    betFilterCollapsedInfo: {
        list: string[]
        sport: string
    }
    liveTabDisplay: LiveDisplayOption
    width: number
    isGlobalLoading: boolean
    replayData: boolean
    competitionTabIndex: number
    scrollPosition: number
    isRestoreScrollPosition: boolean
    isBetListLoading: boolean
    isMaintenance: boolean | null
    selectedDateList: string
    brandCode: string
    backToPage: string
}

export interface WidthHight {
    width: number
    height: number
}

export interface DisplayOptions {
    football: {
        halvesView: boolean
    }
    basketball: {
        halvesView: boolean
        showQuarters: boolean
    }
}

export type LiveDisplayOption = Record<RouteSportType, boolean>

export enum Language {
    en_US = 'en',
    id = 'id',
    zh_CN = 'zh',
    zh_TW = 'zht',
}

export enum DataType {
    array = 'array',
    object = 'object',
}

export interface SetThemeAction {
    type: typeof SET_THEME
    theme: Theme
}

export interface SwitchThemeAction {
    type: typeof SWITCH_THEME
    themeName: ThemeName
}
export interface SetLoginRedirectUrlAction {
    type: typeof SET_LOGIN_REDIRECT_URL
    loginRedirectUrl: string
}

export interface ToggleHeaderAction {
    type: typeof SET_SHOW_HEADER
    isShowHeader: boolean
}

export interface UpdateWidthHeightAction {
    type: typeof UPDATE_WIDTH_HEIGHT
    payload: WidthHight
}

export interface ToggleSportMenu {
    type: typeof TOGGLE_SPORT_MENU
    payload: boolean
}

export interface ToggleBetList {
    type: typeof TOGGLE_BET_LIST
    payload: boolean
}

export interface ChangeDataSource {
    type: typeof CHANGE_DATA_SOURCE
    payload: string
}

export interface ChangeDataType {
    type: typeof CHANGE_DATA_TYPE
    payload: DataType
}

export interface ChangeTimezone {
    type: typeof SET_TIMEZONE
    payload: string
}

export interface SetLanguageAction {
    type: typeof SET_LANGUAGE
    payload: Language
}

export interface SetTabletLayout {
    type: typeof SET_TABLET_LAYOUT
    payload: {
        isTabletLayout: boolean
        sportMenuOpen?: boolean
        betListOpen?: boolean
    }
}

export interface UpdateDisplayOptions {
    type: typeof UPDATE_DISPLAY_OPTIONS
    payload: DisplayOptions
}

export interface ToggleShowBackToTopAction {
    type: typeof TOGGLE_SHOW_BACK_TO_TOP
    payload: boolean
}

export interface UpdateBetListCurrentIndex {
    type: typeof UPDATE_BET_LIST_CURRENT_INDEX
    payload: {
        index: number
    }
}

export interface ToggleShowSearchBarAction {
    type: typeof TOGGLE_SHOW_SEARCH_BAR
    payload: boolean
}

export interface ToggleShowRightMenuAction {
    type: typeof TOGGLE_SHOW_RIGHT_MENU
    payload: boolean
}

export interface ToggleShowNotificationAction {
    type: typeof TOGGLE_SHOW_NOTIFICATION
    payload: boolean
}

export interface ToggleColorPanelAction {
    type: typeof TOGGLE_COLOR_PANEL
}

export interface UpdateSearchKeywordAction {
    type: typeof UPDATE_SEARCH_KEYWORD
    payload: string
}

export interface ToggleBetFilterListAction {
    type: typeof TOGGLE_BET_FILTER_LIST
    payload: {
        sport: string
        updatedList: string[]
    }
}

export interface ClearBetFilterListAction {
    type: typeof CLEAR_BET_FILTER_LIST
    payload: string
}

export interface SetStaticJsonConfigAction {
    type: typeof SET_STATIC_JSON_CONFIG
    payload: {
        oddsHost: string
        rootPath: string
    }
}

export interface SetGlobalLoadingAction {
    type: typeof SET_GLOBAL_LOADING
    payload: boolean
}

export interface SetLiveShow {
    type: typeof SET_LIVE_SHOW
    payload: LiveDisplayOption
}

export interface SetBetListLoading {
    type: typeof SET_BET_LIST_LOADING
    payload: boolean
}

export interface SetMaintenance {
    type: typeof SET_MAINTENANCE
    payload: boolean
}

export interface SetReplayData {
    type: typeof TOGGLE_REPLAY_DATA
}

export interface SetCompetitionTabIndexAction {
    type: typeof SET_COMPETITION_TAB_INDEX
    payload: number
}

export interface SetScrollPositionAction {
    type: typeof SET_SCROLL_POSITION
    payload: number
}

export interface setRestoreScrollPosition {
    type: typeof SET_RESTORE_SCROLL_POSITION
    payload: boolean
}

export interface setSelectedDateListAction {
    type: typeof SET_SELECTED_DATE_LIST
    payload: string
}

export interface setBrandCodeAction {
    type: typeof SET_BRAND_CODE
    payload: string
}

export interface setBackToPageAction {
    type: typeof SET_BACK_TO_PAGE
    payload: string
}

export type GlobalActionTypes =
    | SetThemeAction
    | SwitchThemeAction
    | ToggleHeaderAction
    | SetLoginRedirectUrlAction
    | UpdateWidthHeightAction
    | ToggleSportMenu
    | ToggleBetList
    | ToggleShowRightMenuAction
    | ChangeDataSource
    | ChangeDataType
    | SetLanguageAction
    | SetTabletLayout
    | UpdateDisplayOptions
    | ToggleShowBackToTopAction
    | UpdateBetListCurrentIndex
    | ToggleShowSearchBarAction
    | UpdateSearchKeywordAction
    | ChangeTimezone
    | ToggleBetFilterListAction
    | ClearBetFilterListAction
    | SetStaticJsonConfigAction
    | SetGlobalLoadingAction
    | ToggleColorPanelAction
    | SetLiveShow
    | SetReplayData
    | SetCompetitionTabIndexAction
    | SetBetListLoading
    | SetScrollPositionAction
    | setRestoreScrollPosition
    | SetMaintenance
    | ToggleShowNotificationAction
    | setSelectedDateListAction
    | setBrandCodeAction
    | setBackToPageAction
