import call from '@utils/api'
import axios from 'axios'
import { AppInfo, BrandInfo, GamesMaintenance, MaintenanceRes, MobileAppBanner } from './types'

export const getBrandInfo = () => call<BrandInfo>('GET', '/crmSetting/v2/brandInfo')

export const getMaintenanceInfo = (pageKey: string, withoutLoading?: boolean) => {
    return call<MaintenanceRes>(
        'GET',
        `/crmSetting/v2/maintenance/${process.env.APP_PLATFORM}`,
        {
            page: pageKey,
        },
        undefined,
        withoutLoading,
    )
}
export const getMobileAppInfo = () => call<AppInfo>('GET', '/info/mobileAppList')

export const getAllGamesMaintenanceInfo = () =>
    call<GamesMaintenance>('GET', `/crmSetting/v2/maintenances/${process.env.APP_PLATFORM}`)

export const getMobileAppBanner = () => call<MobileAppBanner>('GET', '/info/mobileAppBannerV2')

export const getIsSemiMaintenance = () =>
    axios
        .get('/semi/setting')
        .then((res) => res.data.semi)
        .catch(() => false)
