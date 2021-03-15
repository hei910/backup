import { createReducer } from '@reduxjs/toolkit'
import { DownloadState } from './types'
import { setDownloadAppData } from './action'

const initialState: DownloadState = {
    ios: {
        status: 'comingSoon',
        version: '10.1', // 10.1 or above
        type: 'app',
        link: '',
        bookmarkLink: '',
    },
    android: {
        status: 'comingSoon',
        version: '5.0', //5.0以上
        link: '',
    },
}

const DownloadReducer = createReducer(initialState, (builder) =>
    builder.addCase(setDownloadAppData, (state, action) => {
        state.ios = action.payload.ios
        state.android = action.payload.android
    }),
)

export default DownloadReducer
