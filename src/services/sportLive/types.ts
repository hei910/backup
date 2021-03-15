import { NewCompetitors, Score, ScoreBarInfo } from '@services/sportData/types'

// constant of react-redux liveSport state
export const UPDATE_MATCH_ID = 'LIVE_SPORT/UPDATE_MATCH_ID'
export const UPDATE_LIVE_SCORE = 'LIVE_SPORT/UPDATE_LIVE_SCORE'
export const TOGGLE_IS_CLOSE_LIVE_CENTER = 'LIVE_SPORT/TOGGLE_IS_CLOSE_LIVE_CENTER'
export const UPDATE_ALL_BG_SR_LIVESTREAM_API = 'LIVE_SPORT/UPDATE_ALL_BG_SR_LIVESTREAM_API'

export enum SportIconEnum {
    LiveIcon = 'LiveIcon',
    AnimationIcon = 'AnimationIcon',
    None = 'None',
}

export enum SportTypeEnum {
    Football = 'football',
    Basketball = 'basketball',
    Tennis = 'tennis',
    Baseball = 'baseball',
}

export enum VendorEnum {
    BG = 'bg',
    SR = 'sr',
}

export enum CurrentVendorEnum {
    BG = 'bg',
    SR = 'sr',
    LIVE_STREAM = 'live-stream',
}

export interface IAllBgSrLiveStreamData {
    mid: string | number
    animationProviderVendor: 'bg' | 'sr' | null
    videoVendor: string | null
    sourceMid: string
}

export interface ILiveSportState {
    source: string | null
    liveMatchId: string | null
    liveSportType: SportTypeEnum | null
    jetsostaticConfig: {
        enableLiveMatch: boolean
        liveMatchLoginRequired: boolean
    }
    allBgSrLiveStreamData: {
        [SportTypeEnum.Football]: IAllBgSrLiveStreamData[] | null
        [SportTypeEnum.Basketball]: IAllBgSrLiveStreamData[] | null
        [SportTypeEnum.Tennis]: IAllBgSrLiveStreamData[] | null
        [SportTypeEnum.Baseball]: IAllBgSrLiveStreamData[] | null
    }
    isCloseLiveCenter: boolean
    fixtureId?: string
    liveScoreInfo?: Record<string, LiveScoreInfo>
}

export interface LiveScoreInfo {
    competitors: NewCompetitors
    fixtureId: string
    matchId: string
    score?: Score
    scoreBarInfo?: ScoreBarInfo
    clock: string
    liveStatus: string
}

// react-redux liveSport actions interfact
export interface IUpdateMatchId {
    type: typeof UPDATE_MATCH_ID
    payload: {
        liveMatchId: string
        liveSportType: SportTypeEnum
        fixtureId: string
        source: string
    }
}

export interface IToggleIsCloseLiveCenter {
    type: typeof TOGGLE_IS_CLOSE_LIVE_CENTER
}

export interface IUpdateAllBgSrLiveStreamApi {
    type: typeof UPDATE_ALL_BG_SR_LIVESTREAM_API
    payload: {
        sportType: SportTypeEnum
        data: IAllBgSrLiveStreamData[] | null
    }
}

export interface IUpdateLiveScore {
    type: typeof UPDATE_LIVE_SCORE
    payload: Record<string, Omit<LiveScoreInfo, 'sports'>>
}

export type LiveSportActionTypes =
    | IUpdateMatchId
    | IToggleIsCloseLiveCenter
    | IUpdateAllBgSrLiveStreamApi
    | IUpdateLiveScore

// api
export interface SingleBgSrResponse {
    success: boolean
    data: {
        mid: string
        sportType: string | null
        vendor: 'betGenius' | 'betRadar' | null
        vendorId: string | null
        vendorMid: string | null
        metadata:
            | {
                  liveodds: boolean | null
                  matchstatus: string | null
              }
            | {}
        ui: {
            endpoint: string | null
            initUIMethod: string | null
        }
        vcode: 'bg' | 'sr' | null
    }
}

// export interface SingleLiveStreamResponse {
//     hostname: string;
//     ifUrl: string;
//     success: number;
//     m3u8Url: string;
// }

export interface allBgSrLiveMatchResponse {
    success: boolean
    data: [
        {
            mid: string | number
            animationProviderVendor: 'bg' | 'sr' | null
            videoVendor: string | null
            sourceMid: string
        },
    ]
}
