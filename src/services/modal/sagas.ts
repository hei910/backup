import { PayloadAction } from '@reduxjs/toolkit'
import { showLoginPopUp, hideLoginPopUp, showRegister } from '@utils/v1Functions'
import { takeEvery, all } from 'redux-saga/effects'
import { setIsLoginModalOpened, setIsRegisterModalOpened } from './action'

function* handleV1LoginModal() {
    yield takeEvery(setIsLoginModalOpened.type, (action: PayloadAction<boolean>) => {
        if (action.payload) {
            showLoginPopUp()
        } else {
            hideLoginPopUp()
        }
    })
}

function* handleV1RegisterModal() {
    yield takeEvery(setIsRegisterModalOpened.type, (action: PayloadAction<boolean>) => {
        if (action.payload) {
            showRegister()
        } else {
            hideLoginPopUp()
        }
    })
}

export default function* () {
    yield all([handleV1LoginModal(), handleV1RegisterModal()])
}
