import { setIsLoginModalOpened } from '@services/modal/action'
import { useCallback } from 'react'
import { useDispatch } from '@redux'

export default () => {
    const dispatch = useDispatch()
    const showLoginModal = useCallback(() => {
        dispatch(setIsLoginModalOpened(true))
    }, [dispatch])

    const hideLoginModal = useCallback(() => {
        dispatch(setIsLoginModalOpened(false))
    }, [dispatch])

    return {
        showLoginModal,
        hideLoginModal,
    }
}
