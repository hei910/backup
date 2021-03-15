/* eslint-disable import/no-unused-modules */
import {
    IState,
    ActionTypes,
    UPDATE_VENDOR_DETAIL,
    CLEAR_STATE,
    UPDATE_LIVED_VIDEO_NEEDED_INFO,
    TOGGLE_IS_SHOWN_VIDEO_NAVBAR,
    SET_IS_SR_NAVBAR_LOADED,
    TOGGLE_IS_SHOWN_SR_TAB_POPUP,
} from '@sport/hooks/useLiveSportApi/types'

import { CurrentVendorEnum } from '@services/sportLive/types'

export const clearState = (): ActionTypes => ({ type: CLEAR_STATE })

export const updateVendorDetails = (payload: IState): ActionTypes => ({
    type: UPDATE_VENDOR_DETAIL,
    payload,
})

export const updateLiveVideoNeededInto = (): ActionTypes => ({ type: UPDATE_LIVED_VIDEO_NEEDED_INFO })

export const toggleIsShownVideoNavbar = (setIsShownVideoNavbar: boolean, vendor?: CurrentVendorEnum): ActionTypes => ({
    type: TOGGLE_IS_SHOWN_VIDEO_NAVBAR,
    setIsShownVideoNavbar,
    vendor,
})

export const setIsSrNavbarLoaded = (isSrNavbarLoaded: boolean): ActionTypes => ({
    type: SET_IS_SR_NAVBAR_LOADED,
    isSrNavbarLoaded,
})

export const toggleIsShownSrTabPopup = (): ActionTypes => ({
    type: TOGGLE_IS_SHOWN_SR_TAB_POPUP,
})
