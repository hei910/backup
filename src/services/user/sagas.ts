import { all, put, takeEvery } from 'redux-saga/effects'
import { setDownloadAppData } from '../download/action'
import { getDownloadAppStatus } from '../download/api'
import {
    fetchUserInfoAction,
    setUserInfoAction,
    fetchUserBalanceAction,
    setUserBalanceAction,
    resetUserInfo,
    setIsLoggedInAction,
    setIsAllowAccessAction,
    setUserIpInfo,
} from './action'
import { getRegionBlockInfo, getUserAppBalance, getUserInfo } from './api'
import { GeoipRes } from './types'

function* requestUserBalance() {
    try {
        const balance = yield getUserAppBalance()
        yield put(setUserBalanceAction(`${balance}`))
    } catch (error) {
        console.warn(error)
    }
}

export function* requestGeoipInfo() {
    try {
        const geoipInfo: GeoipRes | null = yield getRegionBlockInfo()

        if (geoipInfo) {
            yield put(setIsAllowAccessAction(geoipInfo.allowAccess))
            yield put(
                setUserIpInfo({
                    ip: geoipInfo.clientIp,
                    country: geoipInfo.country,
                }),
            )
        }
    } catch (error) {
        console.warn(error)
    }
}

export function* requestDownloadAppData() {
    try {
        const downloadAppStatus = yield getDownloadAppStatus()
        yield put(setDownloadAppData(downloadAppStatus))
    } catch (error) {
        console.warn(error)
    }
}

export function* requestUserInfo() {
    try {
        yield requestDownloadAppData()
        const userInfo = yield getUserInfo()

        if (userInfo) {
            yield all([put(setUserInfoAction(userInfo)), put(setIsLoggedInAction(true)), put(fetchUserBalanceAction())])
        } else {
            yield all([put(setIsLoggedInAction(false)), put(resetUserInfo())])
        }
    } catch (error) {
        yield put(setIsLoggedInAction(false))
        console.warn(error)
    }
}

function* fetchUserInfo() {
    yield takeEvery(fetchUserInfoAction.type, requestUserInfo)
}

function* fetchUserBalance() {
    yield takeEvery(fetchUserBalanceAction.type, requestUserBalance)
}

export default function* () {
    yield all([fetchUserInfo(), fetchUserBalance()])
}
