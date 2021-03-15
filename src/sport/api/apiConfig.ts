import { AxiosResponse } from 'axios'
import { GlobalSettingResponse, MaintenanceState } from '@services/sportGlobalSetting/types'
import { SettingResponse, SettingV2Response } from '@services/sportSetting/types'
import axios from './axios'

export const apiConfig = {
    getConfig: () => axios.get<SettingResponse>('/operation/systemSettings'),
    getSettingV2: (brandCode: string) => axios.get<SettingV2Response>(`/operation/v2/systemSettings/${brandCode}`),
    getGlobalSetting: () => axios.get<GlobalSettingResponse>('/operation/globalSettings'),
    getGlobalSettingV2: () => axios.get<GlobalSettingResponse>('/operation/v2/globalSettings'),
    getMaintenanceStatus: () =>
        axios.get<MaintenanceState>('/api628019/api/operation/v2/maintenance-status', {
            baseURL: '/',
        }),
    healthCheck: () => axios.get<AxiosResponse>('/session/checkLogin'),
}
