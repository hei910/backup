import { createAction } from '@reduxjs/toolkit'
import { UserInfo, UserIpInfo } from './types'

export const setUserInfoAction = createAction('USER:USER_INFO', (payload: UserInfo) => ({ payload }))
export const fetchUserInfoAction = createAction('FETCHING:CRM:USER_INFO')

export const setUserBalanceAction = createAction('USER:USER_BALANCE', (payload: string) => ({ payload }))
export const fetchUserBalanceAction = createAction('FETCHING:CRM:USER_BALANCE')

export const setUserIpInfo = createAction('USER:SET_USER_IP_INFO', (payload: UserIpInfo) => ({ payload }))

export const resetUserInfo = createAction('USER:RESET_USER_INFO')

export const setIsLoggedInAction = createAction('APP:UPDATE_IS_LOGGED_IN', (payload: boolean) => ({ payload }))
export const setIsAllowAccessAction = createAction('APP:SET_IS_ALLOW_ACCESS', (payload: boolean) => ({ payload }))
