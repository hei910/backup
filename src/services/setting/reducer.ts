import { createReducer } from '@reduxjs/toolkit'

import { SettingState } from './types'
import { setDepositMinAmountAction } from './action'

const initialState: SettingState = {
    depositMinAmount: 0,
}

const SettingReducer = createReducer(initialState, (builder) =>
    builder.addCase(setDepositMinAmountAction, (state, action) => {
        state.depositMinAmount = action.payload
    }),
)

export default SettingReducer
