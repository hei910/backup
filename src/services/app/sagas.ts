import { requestGeoipInfo, requestUserInfo } from '@services/user/sagas'
import { all, put, takeEvery } from 'redux-saga/effects'
import {
    fetchAppInitDataAction,
    fetchGamesMaintenanceAction,
    setAppInfoAction,
    setBrandInfoAction,
    setAppMaintenanceAction,
    setGamesMaintenanceAction,
    fetchAppMaintenanceAction,
} from './action'
import { MaintenanceRes } from './types'
import { requestDownloadAppStatusData } from '../download/sagas'
import {
    getMaintenanceInfo,
    getBrandInfo,
    getMobileAppInfo,
    getAllGamesMaintenanceInfo,
    getIsSemiMaintenance,
} from './api'

function* requestBrandInfo() {
    try {
        const brandInfo = yield getBrandInfo()
        yield put(setBrandInfoAction(brandInfo))
    } catch (error) {
        console.warn(error)
    }
}

function* requestAppInfo() {
    try {
        const appInfo = yield getMobileAppInfo()
        yield put(setAppInfoAction(appInfo))
    } catch (error) {
        console.warn(error)
    }
}

function* requestIsAppMaintenance() {
    const [maintenanceData, isSemi]: [MaintenanceRes, boolean] = yield all([
        getMaintenanceInfo('', true),
        getIsSemiMaintenance(),
    ])
    yield put(setAppMaintenanceAction(maintenanceData.isMaintenance || isSemi))
}

function* requestGamesMaintenanceData() {
    try {
        const gamesMaintenanceData = yield getAllGamesMaintenanceInfo()
        yield put(setGamesMaintenanceAction(gamesMaintenanceData))
    } catch (error) {
        console.warn(error)
    }
}

function* requestAppInitData() {
    yield all([
        requestAppInfo(),
        requestUserInfo(),
        requestBrandInfo(),
        requestIsAppMaintenance(),
        requestGamesMaintenanceData(),
        requestGeoipInfo(),
        requestDownloadAppStatusData(),
    ])
}

function* fetchAppMaintenance() {
    yield takeEvery(fetchAppMaintenanceAction.type, requestIsAppMaintenance)
}

function* fetchAppInitialData() {
    yield takeEvery(fetchAppInitDataAction.type, requestAppInitData)
}

function* fetchGamesMaintenance() {
    yield takeEvery(fetchGamesMaintenanceAction.type, requestGamesMaintenanceData)
}

export default function* () {
    yield all([fetchAppInitialData(), fetchGamesMaintenance(), fetchAppMaintenance()])
}
