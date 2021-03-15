import { createAction } from '@reduxjs/toolkit'
import { DownloadState } from './types'

export const setDownloadAppData = createAction('DOWNLOAD:SET_DOWNLOAD_DATA', (payload: DownloadState) => ({
    payload,
}))
