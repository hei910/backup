import {
    BetRecordRequestParams,
    BetRecordsResponse,
    Betslip,
    BetTickets,
    BetTicketsResponse,
    SubmitBetResponse,
} from '@services/sportBet/types'
import axios from './axios'

export const apiBet = {
    submit: (betslip: Betslip) => axios.post<SubmitBetResponse>('/betting/submitBet?version=2', betslip),
    submitV2: (tickets: BetTickets, platform = 'desktop') => {
        return axios.request<BetTicketsResponse>({
            url: '/player/submitBetv2',
            data: tickets,
            method: 'post',
            headers: {
                platform,
            },
        })
    },
    records: (params: BetRecordRequestParams) => {
        const { lastSettleTime, page = 1, pageSize = 25, gte = '', lte = '' } = params

        return axios.get<BetRecordsResponse>('/betting/getBetRecords', {
            params: {
                'lastSettleTime.specified': lastSettleTime,
                'createTime.greaterThanOrEqual': gte,
                'createTime.lessThanOrEqual': lte,
                pageSize,
                page,
            },
        })
    },
}
