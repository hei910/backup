import { PlayerResponse, WalletResponse } from '@services/sportPlayer/types'
import axios from './axios'

export const apiPlayer = {
    getInfo: () => axios.get<PlayerResponse>('/player/info'),
    getWallet: () => axios.get<WalletResponse>('/wallet/info'),
    logout: () => axios.get<any>('/api628019/authentication/logout', { baseURL: '/' }),
}
