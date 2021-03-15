import { createAction } from '@reduxjs/toolkit'

export const setIsLoginModalOpened = createAction('MODAL:SET_LOGIN_MODAL', (payload: boolean) => ({ payload }))
export const setIsRegisterModalOpened = createAction('MODAL:SET_REGISTER_MODAL', (payload: boolean) => ({ payload }))
export const setIsRequireLoginModalOpened = createAction('MODAL:SET_REQUIRE_LOGIN_MODAL', (payload: boolean) => ({
    payload,
}))
export const setIsTransferFailModalOpened = createAction('MODAL:SET_TRANSFER_FAIL_MODAL', (payload: boolean) => ({
    payload,
}))
export const setIsTransferSuccessModalOpened = createAction('MODAL:SET_TRANSFER_SUCCESS_MODAL', (payload: boolean) => ({
    payload,
}))

// only update v2 store
export const setDisplayLoginModal = createAction('MODAL:DISPLAY_LOGIN_MODAL', (payload: boolean) => ({ payload }))
export const setDisplayRegisterModal = createAction('MODAL:DISPLAY_REGISTER_MODAL', (payload: boolean) => ({ payload }))
export const setDisplayAppComingSoonModal = createAction('MODAL:DISPLAY_APP_COMING_SOON_MODAL', (payload: boolean) => ({
    payload,
}))
