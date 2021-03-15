export const FETCH_GLOBAL_SETTING = 'CONFIG/FETCH_GLOBAL_SETTING';

export interface SettingData {
    paramName: string;
    value: string;
    defaultValue: string;
}

export interface GlobalSettingState {
    data: SettingData[];
    setting: GlobalSettingV2Response;
}

export interface MaintenanceState {
    data: boolean;
    msg: string | null;
    success: boolean;
}

export interface GetGlobalSettingAction {
    type: typeof FETCH_GLOBAL_SETTING;
    payload: SettingData[];
}

export interface GlobalSettingResponse {
    success: boolean;
    msg?: string;
    data: Record<string, string>;
}

export type GlobalSettingV2Response = Record<string, string>;

export type SettingActionTypes = GetGlobalSettingAction;
