import { SingleBgSrResponse, allBgSrLiveMatchResponse, SportTypeEnum } from '@services/sportLive/types'
import axios from './axios'

const sportTypeMap = {
    [SportTypeEnum.Football]: '1',
    [SportTypeEnum.Basketball]: '2',
    [SportTypeEnum.Tennis]: '3',
    [SportTypeEnum.Baseball]: '4',
}

export const liveStreamUrl = 'https://lmr.yonghuai5515.com/router/fnapi/video/play.html?mid='

export const apiLiveSport = {
    getSingleBgSr: (domain: string, mid: string) =>
        axios.get<SingleBgSrResponse>('https://lmr.yonghuai5515.com/router/fnapi/match/animationProvider', {
            params: { domain, mid },
        }),
    // getSingleLiveStream: (streamId: string) =>
    //     axios.get<SingleLiveStreamResponse>('https://www.jiushan6688.com/video/play', {
    //         params: { stream_id: streamId },
    //     }),
    getAllBgSrLiveMatchApi: (sportType: SportTypeEnum) =>
        // axios.get<allBgSrLiveMatchResponse>(`https://lmr.yonghuai5515.com/router/fnapi/videos/vendors/${sportTypeMap[sportType]}`)
        axios.get<allBgSrLiveMatchResponse>(
            `https://lmr.yonghuai5515.com/router/fnapi/matchAni/provideService/${sportTypeMap[sportType]}`,
        ),
}
