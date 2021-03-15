import { createAction } from '@reduxjs/toolkit'

export const fetchDepositMinAmountAction = createAction('FETCHING:CRM:DEPOSIT_MIN_AMOUNT')
export const setDepositMinAmountAction = createAction('SETTING:SET_DEPOSIT_MIN_AMOUNT', (payload: number) => ({
    payload,
}))
