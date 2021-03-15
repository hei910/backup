import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from '@redux'
import { directToHomePage, openMobileDrawer, appWindow } from '@utils/v1Functions'
import { setIsLoginModalOpened, setIsRegisterModalOpened } from '@services/modal/action'
import useLoginModal from '@hooks/useLoginModal'
import useRegisterModal from '@hooks/useRegisterModal'

export default () => {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
    const isAppMaintenance = useSelector((state) => state.app.isAppMaintenance)
    const user = useSelector((state) => state.user)
    const { isLoginModalOpened, isRegisterModalOpened } = useSelector((state) => state.modal)
    const { showLoginModal } = useLoginModal()
    const { showRegisterModal } = useRegisterModal()
    const dispatch = useDispatch()

    useEffect(() => {
        if (appWindow.parent.isLoginPopUpDisplay) {
            dispatch(setIsLoginModalOpened(true))
        }
    }, [dispatch])

    const onCloseClick = useCallback(() => {
        dispatch(setIsLoginModalOpened(false))
        dispatch(setIsRegisterModalOpened(false))

        appWindow.parent.document.querySelector('body').classList.remove('noscrolling')
    }, [dispatch])

    return {
        isAppMaintenance,
        isLoggedIn,
        isLoginModalOpened,
        isRegisterModalOpened,
        showLoginModal,
        showRegisterModal,
        onCloseClick,
        directToHomePage,
        openMobileDrawer,
        userProfileIcon: user.userProfile.icon,
        unreadCountInMenu: user.I + user.N,
    }
}
