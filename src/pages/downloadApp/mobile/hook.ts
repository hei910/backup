import { useCallback } from 'react'
import { useSelector } from '@redux'
import { useHistory } from 'react-router'
import { isIos } from '@utils/userAgent'
import { locationTo } from '@utils/v1Functions'
import useRegisterModal from '@hooks/useRegisterModal'
import Pages from '@pages/mobile'
import { addDownloadCount } from '@services/download/api'

export default () => {
    const { brandName, clickRateBrandCode } = useSelector((state) => state.app.brandInfo)
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
    const downloadState = useSelector((state) => state.download)
    const { showRegisterModal } = useRegisterModal()
    const history = useHistory()

    const platform = isIos() ? 'ios' : 'android'

    const appLink = downloadState[platform].link
    const appVersion = downloadState[platform].version
    const status = downloadState[platform].status

    const onDownloadClick = useCallback(() => {
        locationTo(appLink)
        addDownloadCount(clickRateBrandCode, appLink, isIos())
    }, [clickRateBrandCode, appLink])

    const onHowClick = useCallback(() => {
        history.push(Pages.tutorIos.path)
    }, [history])

    return {
        brandName,
        isLoggedIn,
        isIos,
        platform,
        appVersion,
        status,
        onDownloadClick,
        onHowClick,
        showRegisterModal,
    }
}
