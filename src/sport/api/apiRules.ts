import { BetCtidBlockRulesResopnse, PlayerBetActiveResponse, PlayerBetLimitsResponse } from '@services/sportRules/types'
import axios from './axios'

const apiRules = {
    getActive: (brandCode: string) => axios.get<PlayerBetActiveResponse>(`/operation/getPlayerBetRules/${brandCode}`),
    getLimits: () => axios.get<PlayerBetLimitsResponse>(`/info/betSettingV3`),
    getCtidBlockRule: () => axios.get<BetCtidBlockRulesResopnse>('betting/bet-ctid-block-rules'),
}

export default apiRules
