import store from '@redux'
import { MenuState } from '@services/sportMenu/types'
import { getOddsDomain } from '@sport/util/general'
import paramsObjectToParamsPath from '@sport/util/paramsObjectToParamsPath'
import axios from './axios'

export const apiMenu = {
    getMenu: async (source: string, timezone: number) => {
        const paramsInString = paramsObjectToParamsPath({
            source: source.toLowerCase(),
            timezone: timezone ?? parseInt(store.getState().sportGlobal.timezone),
        })

        return axios.get<MenuState>(
            store.getState().sportGlobal.replayData === true ? 'replay/' : `getMatchCount${paramsInString}`,
            {
                baseURL: await getOddsDomain(),
            },
        )
    },
}
