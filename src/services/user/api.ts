import GameSuppliers from '@constants/gameSuppliers'
import call from '@utils/api'
import axios from 'axios'
import { getGameBalance } from '../game/api'
import { GeoipRes, UserInfo } from './types'

const brandNum = (parseFloat(process.env.BRAND_CODE.replace(/^\D+/gm, '')) * 3.14).toFixed(2)

export const getUserInfo = () => call<UserInfo>('GET', '/player/getPlayerStatus')

export const getUserAppBalance = () => getGameBalance(GameSuppliers.sport)

export const getRegionBlockInfo = async () => {
    let info = null

    try {
        info = await axios
            .get<{ data: GeoipRes }>(`https://drdjh8lq0xzd4.cloudfront.net/cnzz/geoip?b=q${brandNum}`)
            .then((res) => res.data.data)
    } catch {}

    try {
        if (!info) {
            info = await axios
                .get<{ data: GeoipRes }>(`https://apiauthg.yonghuai5515.com/cnzz/geoip?b=q${brandNum}`)
                .then((res) => res.data.data)
        }
    } catch {}

    return info
}
