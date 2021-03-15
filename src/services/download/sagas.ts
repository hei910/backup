import { all, put, takeLatest } from 'redux-saga/effects'
import { fetchDownloadAppStatusAction } from '../app/action'
import { setDownloadAppData } from './action'
import { getDownloadAppStatus } from './api'

export function* requestDownloadAppStatusData() {
    try {
        const downloadAppStatus = yield getDownloadAppStatus()
        yield put(setDownloadAppData(downloadAppStatus))
    } catch (error) {
        console.warn(error)
    }
}

function* fetchDownloadAppStatusData() {
    yield takeLatest(fetchDownloadAppStatusAction.type, requestDownloadAppStatusData)
}

export default function* () {
    yield all([fetchDownloadAppStatusData()])
}
