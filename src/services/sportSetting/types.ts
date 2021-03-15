export const FETCH_SETTING = 'CONFIG/FETCH_SETTING';

export interface SettingData {
    paramName: string;
    value: string;
    defaultValue: string;
}

export interface SettingState {
    data: SettingData[];
    setting: SettingV2Response['data'];
}

export interface GetSettingAction {
    type: typeof FETCH_SETTING;
    payload: SettingData[];
}

export interface SettingResponse {
    success: boolean;
    msg: string;
    data: SettingData;
}

export type SettingV2Response = {
    data: Record<string, string>;
    msg: string | null;
    success: boolean;
};

export type SettingActionTypes = GetSettingAction;
