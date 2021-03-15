import { apiLiveSport, liveStreamUrl } from '@sport/api/apiLiveSport'
import { liveVideoSettings } from '@sport/components/liveVideo/config'
import { clearState, updateVendorDetails } from '@sport/hooks/useLiveSportApi/actions'
import { initState, liveVideoReducer } from '@sport/hooks/useLiveSportApi/reducers'
import { IState } from '@sport/hooks/useLiveSportApi/types'
import { useEffect, useReducer } from 'react'
import { Platform } from '@services/sportGlobal/types'
import { CurrentVendorEnum, SportTypeEnum, VendorEnum } from '@services/sportLive/types'

const checkForVendorType = (vendorMapResult: VendorEnum | null): VendorEnum | null => {
    switch (vendorMapResult) {
        case VendorEnum.BG:
            return VendorEnum.BG
        case VendorEnum.SR:
            return VendorEnum.SR
        default:
            return null
    }
}

const sourceForBgOrSr = (
    vendor: VendorEnum,
    vendorMapResult: VendorEnum | null,
    endpoint: string | null,
): string | null => (vendorMapResult === vendor ? endpoint : null)

const bgSrPromise = async (host: string, midFromApi: string): Promise<any> => {
    const bgSrData = {
        vendor: null,
        midToRid: null,
        bgURL: null,
        widgetLoader: null,
    }
    try {
        const singleBgSrResponse = await apiLiveSport.getSingleBgSr(host, midFromApi)
        const {
            success,
            data: {
                vendorMid: midToRid,
                ui: { endpoint },
                vcode,
            },
        } = singleBgSrResponse.data
        const vendorMapping = {
            bg: VendorEnum.BG,
            sr: VendorEnum.SR,
        }
        const vendorMapResult = vcode && vendorMapping[vcode]

        if (success && vendorMapResult && endpoint) {
            return {
                ...bgSrData,
                vendor: checkForVendorType(vendorMapResult),
                midToRid,
                bgURL: sourceForBgOrSr(VendorEnum.BG, vendorMapResult, endpoint),
                widgetLoader: sourceForBgOrSr(VendorEnum.SR, vendorMapResult, endpoint),
            }
        } else {
            return bgSrData
        }
    } catch (err) {
        return bgSrData
    }
}

const allBgSrLiveMatchPromise = async (source: string, matchId: string, sportType: SportTypeEnum): Promise<any> => {
    const matchIdBySource = `${source}_${matchId}`
    const hasVideo = {
        midFromApi: null,
        hasAnimation: false,
        hasLiveStream: false,
    }

    try {
        const allBgSrLiveMatchResponse = await apiLiveSport.getAllBgSrLiveMatchApi(sportType)
        const { data, success } = allBgSrLiveMatchResponse.data
        if (success) {
            const inplayMatchInfo = data.filter((el) => el.sourceMid === matchIdBySource)
            if (inplayMatchInfo.length > 0) {
                return {
                    midFromApi: inplayMatchInfo[0].mid,
                    hasAnimation: hasVideo.hasAnimation = inplayMatchInfo[0].animationProviderVendor !== null,
                    hasLiveStream: hasVideo.hasLiveStream = inplayMatchInfo[0].videoVendor !== null,
                }
            }
            return hasVideo
        } else {
            return hasVideo
        }
    } catch (err) {
        return hasVideo
    }
}

const checkCurrentVendor = (cloneState: IState) => {
    if (cloneState.liveStreamUrl) {
        return CurrentVendorEnum.LIVE_STREAM
    } else if (cloneState.vendor === VendorEnum.BG) {
        return CurrentVendorEnum.BG
    } else if (cloneState.vendor === VendorEnum.SR) {
        return CurrentVendorEnum.SR
    } else {
        return null
    }
}

// update both bg / sr api & live stream api
export default (
    source: string | null,
    matchId: string | null,
    sportType: SportTypeEnum | null,
    host: string,
    platform: Platform,
) => {
    const [state, dispatch] = useReducer(liveVideoReducer, initState)

    useEffect(() => {
        dispatch(clearState())

        if (source && matchId && sportType) {
            ;(async function () {
                let cloneState = { ...initState }
                const { midFromApi, hasAnimation, hasLiveStream } = await allBgSrLiveMatchPromise(
                    source,
                    matchId,
                    sportType,
                )
                // cloneState = { ...cloneState, ...(await bgResponse), ...(await liveStreamResponse) };

                if (hasAnimation) {
                    const bgResponse = await bgSrPromise(host, midFromApi)
                    cloneState = { ...cloneState, ...bgResponse }
                }

                if (hasLiveStream) {
                    cloneState.liveStreamUrl = `${liveStreamUrl}${midFromApi}`
                }

                cloneState = {
                    ...cloneState,
                    overlap:
                        sportType &&
                        cloneState.liveStreamUrl &&
                        cloneState.vendor === VendorEnum.SR &&
                        liveVideoSettings[sportType][VendorEnum.SR]
                            ? true
                            : false,
                    isShownToggleBar:
                        sportType &&
                        cloneState.liveStreamUrl &&
                        cloneState.vendor &&
                        liveVideoSettings[sportType][cloneState.vendor]
                            ? true
                            : false,
                    currentVendor: checkCurrentVendor(cloneState),
                    isShownVideoNavbar: platform === 'mobile' ? true : false,
                }

                dispatch(updateVendorDetails(cloneState))
            })()
        }
    }, [matchId, sportType, source, platform, host])

    return {
        ...state,
        dispatchLocalState: dispatch,
    }
}
