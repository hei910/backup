import { createReducer } from '@reduxjs/toolkit'
import { getIsLoginModalOpened, getIsRegisterModalOpened } from '@utils/v1Functions'

import {
    setIsLoginModalOpened,
    setIsRegisterModalOpened,
    setDisplayLoginModal,
    setDisplayRegisterModal,
    setIsRequireLoginModalOpened,
    setIsTransferFailModalOpened,
    setIsTransferSuccessModalOpened,
    setDisplayAppComingSoonModal,
} from './action'

const initialState = {
    isLoginModalOpened: getIsLoginModalOpened(),
    isRegisterModalOpened: getIsRegisterModalOpened(),
    isRequireLoginModalOpened: false,
    isGameTrialModalOpened: false,
    isTransferFailModalOpened: false,
    isTransferSuccessModalOpened: false,
    isAppComingSoonModalOpened: false,
}

const ModalReducer = createReducer(initialState, (builder) =>
    builder
        .addCase(setIsLoginModalOpened, (state, action) => {
            state.isLoginModalOpened = action.payload
        })
        .addCase(setIsRegisterModalOpened, (state, action) => {
            state.isLoginModalOpened = action.payload
            state.isRegisterModalOpened = action.payload
        })
        .addCase(setIsRequireLoginModalOpened, (state, action) => {
            state.isRequireLoginModalOpened = action.payload
        })
        .addCase(setDisplayLoginModal, (state, action) => {
            state.isLoginModalOpened = action.payload
        })
        .addCase(setIsTransferFailModalOpened, (state, action) => {
            state.isTransferFailModalOpened = action.payload
        })
        .addCase(setIsTransferSuccessModalOpened, (state, action) => {
            state.isTransferSuccessModalOpened = action.payload
        })
        .addCase(setDisplayRegisterModal, (state, action) => {
            state.isLoginModalOpened = action.payload
            state.isRegisterModalOpened = action.payload
        })
        .addCase(setDisplayAppComingSoonModal, (state, action) => {
            state.isAppComingSoonModalOpened = action.payload
        }),
)

export default ModalReducer
