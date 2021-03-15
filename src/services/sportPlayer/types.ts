export const FETCH_API = 'PLAYER/FETCH_API'
export const SET_USER_DATA = 'PLAYER/SET_DATA'

export interface PlayerState {
    id: number
    username: string
    brand: string
    balance: number
    createTime: string
    updateTime: string
    // isLogin: boolean | null;
}

export interface GetPlayerAction {
    type: typeof FETCH_API
    payload: PlayerState
}

export interface SetPlayerLoginAction {
    type: typeof SET_USER_DATA
    payload: boolean
}

export type PlayerActionTypes = GetPlayerAction | SetPlayerLoginAction

export interface PlayerResponse {
    success: boolean
    msg: string | null
    data: {
        id: number
        username: string
        brand: string
        createTime: string
        updateTime: string
    }
}

export interface WalletResponse {
    success: boolean
    msg: string | null
    data: {
        balance: number
    }
}
