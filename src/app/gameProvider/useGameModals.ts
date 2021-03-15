import { useCallback, useState } from 'react'
import { useImmer } from 'use-immer'

const initialState = {
    isBalanceReminderOpened: false,
    isContactCsOpened: false,
    isGameTrialReminderOpened: false,
    isIPLockOpened: false,
    isBalanceTransferOpened: false,
    isSuccessTransferOpened: false,
}

export default () => {
    const [modalControls, setModalControls] = useImmer(initialState)
    const [errorCode, setErrorCode] = useState('')

    const setModalOpened = useCallback(
        (key: keyof typeof initialState, isOpened: boolean) => {
            setModalControls((draft) => {
                draft[key] = isOpened
            })
        },
        [setModalControls],
    )

    const closeGameTrialReminder = useCallback(() => {
        setModalOpened('isGameTrialReminderOpened', false)
    }, [setModalOpened])

    const openGameTrialReminder = useCallback(() => {
        setModalOpened('isGameTrialReminderOpened', true)
    }, [setModalOpened])

    const closeBalanceReminder = useCallback(() => {
        setModalOpened('isBalanceReminderOpened', false)
    }, [setModalOpened])

    const openBalanceReminder = useCallback(() => {
        setModalOpened('isBalanceReminderOpened', true)
    }, [setModalOpened])

    const closeContactCsModal = useCallback(() => {
        setModalOpened('isContactCsOpened', false)
        setErrorCode('')
    }, [setModalOpened])

    const openContactCsModal = useCallback(() => {
        setModalOpened('isContactCsOpened', true)
    }, [setModalOpened])

    const closeIPLockModal = useCallback(() => {
        setModalOpened('isIPLockOpened', false)
    }, [setModalOpened])

    const openIPLockModal = useCallback(() => {
        setModalOpened('isIPLockOpened', true)
    }, [setModalOpened])

    const closeBalanceTransferModal = useCallback(() => {
        setModalOpened('isBalanceTransferOpened', false)
    }, [setModalOpened])

    const openBalanceTransferModal = useCallback(() => {
        setModalOpened('isBalanceTransferOpened', true)
    }, [setModalOpened])

    const closeSuccessTransferModal = useCallback(() => {
        setModalOpened('isSuccessTransferOpened', false)
    }, [setModalOpened])

    const openSuccessTransferModal = useCallback(() => {
        setModalOpened('isSuccessTransferOpened', true)
    }, [setModalOpened])

    const resetModals = useCallback(() => {
        setModalControls((draft) => {
            draft.isBalanceReminderOpened = false
            draft.isGameTrialReminderOpened = false
            draft.isBalanceTransferOpened = false
            draft.isSuccessTransferOpened = false
        })
    }, [setModalControls])

    return {
        resetModals,
        closeGameTrialReminder,
        openGameTrialReminder,
        closeBalanceReminder,
        openBalanceReminder,
        closeContactCsModal,
        openContactCsModal,
        closeIPLockModal,
        openIPLockModal,
        closeBalanceTransferModal,
        openBalanceTransferModal,
        closeSuccessTransferModal,
        openSuccessTransferModal,
        errorCode,
        setErrorCode,
        modalControls,
    }
}
