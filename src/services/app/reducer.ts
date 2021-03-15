import { createReducer, PayloadAction } from '@reduxjs/toolkit'

import { AppState, GamesMaintenance } from './types'
import {
    changeLocale,
    setAppInfoAction,
    setBrandInfoAction,
    showLoadingAction,
    setAppMaintenanceAction,
    hideLoadingAction,
    setBetRecordPageAction,
    disableAppScrollAction,
    enableAppScrollAction,
    setGamesMaintenanceAction,
} from './action'

import Locales from '@constants/locales'

const initialState: AppState = {
    locale: Locales.ZH_CN,
    appInfo: {
        ios: '',
        iosType: '',
        android: '',
        iosComingSoon: true,
        androidComingSoon: true,
    },
    brandInfo: {
        complaintPhone: '',
        csPhone: '',
        csLink: '',
        webEmail: '',
        csQq: '',
        brandCode: '',
        brandName: '',
        clickRateBrandCode: '',
        csQqLink: '',
        csWxLink: '',
        appMainDomain: '',
    },
    loadingList: [],
    isAppMaintenance: false,
    gamesMaintenance: {} as GamesMaintenance,
    banners: [],
    betRecordPage: 'summary',
    disableAppScrollList: [],
}

const addDisableScrollItem = (state: AppState, itemId: string) => {
    state.disableAppScrollList.push(itemId)
}

const removeDisableScrollItem = (state: AppState, itemId: string) => {
    state.disableAppScrollList = state.disableAppScrollList.filter((id) => id !== itemId)
}

const AppReducer = createReducer(initialState, (builder) =>
    builder
        .addCase(changeLocale, (state, action: PayloadAction<Locales>) => {
            if (Object.values(Locales).includes(action.payload)) {
                state.locale = action.payload
            }
        })
        .addCase(showLoadingAction, (state, action) => {
            state.loadingList.push(action.payload)
        })
        .addCase(hideLoadingAction, (state, action) => {
            state.loadingList = state.loadingList.filter((id) => id !== action.payload)
        })
        .addCase(setAppInfoAction, (state, action) => {
            state.appInfo = action.payload
        })
        .addCase(setBrandInfoAction, (state, action) => {
            state.brandInfo = action.payload
        })
        .addCase(setAppMaintenanceAction, (state, action) => {
            state.isAppMaintenance = action.payload
        })
        .addCase(setGamesMaintenanceAction, (state, action) => {
            state.gamesMaintenance = action.payload
        })
        .addCase(setBetRecordPageAction, (state, action) => {
            state.betRecordPage = action.payload
        })
        .addCase(enableAppScrollAction, (state, action) => {
            removeDisableScrollItem(state, action.payload)
        })
        .addCase(disableAppScrollAction, (state, action) => {
            addDisableScrollItem(state, action.payload)
        }),
)

export default AppReducer
