import { all, put, takeEvery } from 'redux-saga/effects'
import { fetchDepositMinAmountAction, setDepositMinAmountAction } from './action'
import { getDepositMinAmount } from './api'

function* requestDepositReminder() {
    try {
        const depositMinAmount = yield getDepositMinAmount()
        yield put(setDepositMinAmountAction(depositMinAmount))
    } catch (error) {
        console.warn(error)
    }
}

function* fetchDepositReminder() {
    yield takeEvery(fetchDepositMinAmountAction.type, requestDepositReminder)
}

export default function* () {
    yield all([fetchDepositReminder()])
}
