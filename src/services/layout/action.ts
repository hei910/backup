import { createAction } from '@reduxjs/toolkit'
import { LayoutVisibilityProps } from './types'

export const setLayoutVisibility = createAction('LAYOUT:SET_LAYOUT_VISIBILITY', (payload: LayoutVisibilityProps) => ({
    payload,
}))
