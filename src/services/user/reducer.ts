import { createReducer } from '@reduxjs/toolkit'
import { UserInfo } from './types'

import {
    setUserInfoAction,
    setUserBalanceAction,
    setUserIpInfo,
    resetUserInfo,
    setIsAllowAccessAction,
    setIsLoggedInAction,
} from './action'

const initialState: UserInfo = {
    A: 0,
    I: 0,
    N: 0,
    userProfile: {
        icon: '',
        username: '',
    },
    balance: '载入中...',
    ipInfo: {
        ip: '',
        country: '',
    },
    isAllowAccess: true,
    isLoggedIn: false,
}

const UserReducer = createReducer(initialState, (builder) =>
    builder
        .addCase(setUserInfoAction, (state, action) => {
            state.A = action.payload.A
            state.I = action.payload.I
            state.N = action.payload.N
            state.userProfile = action.payload.userProfile
        })
        .addCase(setUserBalanceAction, (state, action) => {
            state.balance = action.payload
        })
        .addCase(setUserIpInfo, (state, action) => {
            state.ipInfo.ip = action.payload.ip
            state.ipInfo.country = action.payload.country
        })
        .addCase(resetUserInfo, (state) => {
            state.A = 0
            state.I = 0
            state.N = 0
            state.userProfile = {
                icon: '',
                username: '',
            }
        })
        .addCase(setIsLoggedInAction, (state, action) => {
            state.isLoggedIn = action.payload
        })
        .addCase(setIsAllowAccessAction, (state, action) => {
            state.isAllowAccess = action.payload
        }),
)

export default UserReducer
