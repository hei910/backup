import { CurrentVendorEnum, VendorEnum } from '@services/sportLive/types'
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

export const initState: IState = {
    vendor: null,
    currentVendor: null,
    midToRid: null,
    bgURL: null,
    liveStreamUrl: null,
    widgetLoader: null,
    isShownToggleBar: false,
    overlap: false,
    isShownVideoNavbar: false,
    isSrNavbarLoaded: false,
    isShownSrTabPopup: false,
}

export const liveVideoReducer = (state: IState = initState, action: ActionTypes): IState => {
    const { vendor, currentVendor, liveStreamUrl } = state
    const checkCurrentVendor = (vendor: VendorEnum | null) => {
        if (!vendor) {
            return null
        } else if (vendor === VendorEnum.SR) {
            return CurrentVendorEnum.SR
        } else if (vendor === VendorEnum.BG) {
            return CurrentVendorEnum.BG
        }
    }

    switch (action.type) {
        case CLEAR_STATE:
            return { ...initState }
        case UPDATE_VENDOR_DETAIL:
            return {
                ...state,
                ...action.payload,
            }
        // for desktop switch video button
        case UPDATE_LIVED_VIDEO_NEEDED_INFO:
            if (currentVendor === CurrentVendorEnum.LIVE_STREAM) {
                return {
                    ...state,
                    overlap: false,
                    currentVendor: checkCurrentVendor(vendor) || null,
                }
            }

            if (liveStreamUrl) {
                return {
                    ...state,
                    currentVendor: CurrentVendorEnum.LIVE_STREAM,
                    overlap: true,
                }
            } else {
                return state
            }
        // for mobile switch video navbar and switch button
        case TOGGLE_IS_SHOWN_VIDEO_NAVBAR:
            if (action.vendor === CurrentVendorEnum.LIVE_STREAM && liveStreamUrl) {
                return {
                    ...state,
                    currentVendor: CurrentVendorEnum.LIVE_STREAM,
                    overlap: true,
                    isShownVideoNavbar: false,
                }
            }

            if (action.vendor === CurrentVendorEnum.BG && vendor) {
                return {
                    ...state,
                    currentVendor: checkCurrentVendor(vendor) || null,
                    overlap: false,
                    isShownVideoNavbar: false,
                }
            }
            return {
                ...state,
                isShownVideoNavbar: action.setIsShownVideoNavbar || true,
            }
        // for mobile
        // trigger when sr navbar tab is loaded
        case SET_IS_SR_NAVBAR_LOADED:
            return {
                ...state,
                isSrNavbarLoaded: action.isSrNavbarLoaded,
            }
        // for mobile
        // toggle sr tab popup
        case TOGGLE_IS_SHOWN_SR_TAB_POPUP:
            return {
                ...state,
                isShownSrTabPopup: !state.isShownSrTabPopup,
            }
        default:
            return state
    }
}
