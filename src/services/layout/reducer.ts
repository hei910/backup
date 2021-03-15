import { createReducer } from '@reduxjs/toolkit'
import { LayoutState } from './types'
import { setLayoutVisibility } from './action'

const initialState: LayoutState = {
    showHeader: true,
    showSubheader: true,
    showFooter: true,
}

const LayoutReducer = createReducer(initialState, (builder) =>
    builder.addCase(setLayoutVisibility, (state, action) => {
        state.showHeader = action.payload.header ?? true
        state.showSubheader = action.payload.subheader ?? true
        state.showFooter = action.payload.footer ?? true
    }),
)

export default LayoutReducer
