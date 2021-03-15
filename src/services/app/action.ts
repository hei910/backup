import { createAction } from '@reduxjs/toolkit'
import Locales from '@constants/locales'
import { AppInfo, BrandInfo, GamesMaintenance } from './types'

export const changeLocale = createAction<Locales, 'APP:CHANGE_LOCALE'>('APP:CHANGE_LOCALE')

export const setAppInfoAction = createAction('APP:APP_INFO', (payload: AppInfo) => ({ payload }))
export const setBrandInfoAction = createAction('APP:BRAND_INFO', (payload: BrandInfo) => ({ payload }))
export const setAppMaintenanceAction = createAction('APP:MAINTENANCE', (payload: boolean) => ({ payload }))
export const setGamesMaintenanceAction = createAction('APP:GAMES_MAINTENANCE', (payload: GamesMaintenance) => ({
    payload,
}))

export const fetchAppInitDataAction = createAction('FETCHING:CRM:APP_INIT_DATA')
export const fetchGamesMaintenanceAction = createAction('FETCHING:GAMES_MAINTENANCE')
export const fetchDownloadAppStatusAction = createAction('FETCHING:DOWNLOAD_APP_STATUS_DATA')
export const fetchAppMaintenanceAction = createAction('FETCHING:APP_MAINTENANCE')

export const showLoadingAction = createAction('APP:LOADING', (payload: string) => ({ payload }))
export const hideLoadingAction = createAction('APP:HIDE_LOADING', (payload: string) => ({ payload }))

export const setBetRecordPageAction = createAction('APP:BET_RECORD_PAGE', (payload: string) => ({ payload }))
export const enableAppScrollAction = createAction('APP:ENABLE_APP_SCROLL', (payload: string) => ({ payload }))
export const disableAppScrollAction = createAction('APP:DISABLE_APP_SCROLL', (payload: string) => ({ payload }))
