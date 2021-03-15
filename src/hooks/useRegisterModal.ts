import { setIsRegisterModalOpened } from '@services/modal/action'
import { useCallback } from 'react'
import { useDispatch } from '@redux'

export default () => {
    const dispatch = useDispatch()
    const showRegisterModal = useCallback(() => {
        dispatch(setIsRegisterModalOpened(true))
    }, [dispatch])

    const hideRegisterModal = useCallback(() => {
        dispatch(setIsRegisterModalOpened(false))
    }, [dispatch])

    return {
        showRegisterModal,
        hideRegisterModal,
    }
}
