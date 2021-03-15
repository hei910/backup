import { useCallback, useState } from 'react'

import { locationTo } from '@utils/v1Functions'
import { useDispatch, useSelector } from '@redux'
import { addDownloadCount } from '@services/download/api'
import { setDisplayAppComingSoonModal } from '@services/modal/action'

export default () => {
    const dispatch = useDispatch()
    const [isDownloaded, setIsDownloaded] = useState(false)
    const clickRateBrandCode = useSelector((state) => state.app.brandInfo.clickRateBrandCode)
    const { link, version, status } = useSelector((state) => state.download.ios)
    const settingLink = 'https://web01.app-store-update.com/ios/brand.mobileprovision'

    const onSettingClick = useCallback(() => {
        locationTo(settingLink)
    }, [settingLink])

    const onDownloadClick = useCallback(() => {
        if (status === 'comingSoon') {
            dispatch(setDisplayAppComingSoonModal(true))
        } else {
            addDownloadCount(clickRateBrandCode, link, true)
            window.parent.location.href = link
            setIsDownloaded(true)
        }
    }, [clickRateBrandCode, dispatch, link, status])

    return {
        version,
        isDownloaded,
        onSettingClick,
        onDownloadClick,
    }
}
