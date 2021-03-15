import { VendorEnum, CurrentVendorEnum } from '@services/sportLive/types'

export const UPDATE_VENDOR_DETAIL = 'LIVE_VIDEO/UPDATE_VENDOR_DETAIL'
export const CLEAR_STATE = 'LIVE_VIDEO/CLEAR_STATE'
export const UPDATE_LIVED_VIDEO_NEEDED_INFO = 'LIVE_VIDEO/UPDATE_LIVED_VIDEO_NEEDED_INFO'
export const TOGGLE_IS_SHOWN_VIDEO_NAVBAR = 'LIVE_VIDEO/TOGGLE_IS_SHOWN_VIDEO_NAVBAR'
export const SET_IS_SR_NAVBAR_LOADED = 'LIVE_VIDEO/SET_IS_SR_NAVBAR_LOADED'
export const TOGGLE_IS_SHOWN_SR_TAB_POPUP = 'LIVE_VIDEO/TOGGLE_IS_SHOWN_SR_TAB_POPUP'

/**
 * Types of reducer
 */
export interface IState {
    vendor: VendorEnum | null
    currentVendor: CurrentVendorEnum | null
    midToRid: string | null
    bgURL: string | null
    liveStreamUrl: string | null
    widgetLoader: string | null
    overlap: boolean
    isShownToggleBar: boolean
    isShownVideoNavbar: boolean
    isSrNavbarLoaded: boolean
    isShownSrTabPopup: boolean
}

interface IUpdateVendorDetails {
    type: typeof UPDATE_VENDOR_DETAIL
    payload: IState
}

interface IClearState {
    type: typeof CLEAR_STATE
}

interface ILiveVideoNeededInfo {
    type: typeof UPDATE_LIVED_VIDEO_NEEDED_INFO
}

interface IToggleIsShownVideoNavbar {
    type: typeof TOGGLE_IS_SHOWN_VIDEO_NAVBAR
    setIsShownVideoNavbar: boolean
    vendor?: CurrentVendorEnum
}

interface ISetIsSrNavbarLoaded {
    type: typeof SET_IS_SR_NAVBAR_LOADED
    isSrNavbarLoaded: boolean
}

interface IToggleIsShownSrTabPopup {
    type: typeof TOGGLE_IS_SHOWN_SR_TAB_POPUP
}

export type ActionTypes =
    | IUpdateVendorDetails
    | IClearState
    | ILiveVideoNeededInfo
    | IToggleIsShownVideoNavbar
    | ISetIsSrNavbarLoaded
    | IToggleIsShownSrTabPopup
