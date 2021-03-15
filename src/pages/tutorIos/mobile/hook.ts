import { useCallback, useEffect, useState } from 'react'

import { locationTo } from '@utils/v1Functions'
import { useSelector } from '@redux'
import { addDownloadCount } from '@services/download/api'

export default () => {
    const clickRateBrandCode = useSelector((state) => state.app.brandInfo.clickRateBrandCode)
    const { link, type, version } = useSelector((state) => state.download.ios)
    const settingLink = 'https://web01.app-store-update.com/ios/brand.mobileprovision'

    const [count, setCount] = useState(10)

    const onSettingClick = useCallback(() => {
        if (count < 0) {
            locationTo(settingLink)
        }
    }, [count, settingLink])

    const onDownloadClick = useCallback(() => {
        const appWindow = window as any
        appWindow.parent.location = link
        addDownloadCount(clickRateBrandCode, link, true)
    }, [clickRateBrandCode, link])

    useEffect(() => {
        const t1 = setTimeout(() => {
            if (count >= 0) {
                setCount(count - 1)
            } else {
                t1 && clearTimeout(t1)
            }
        }, 1000)

        return () => {
            t1 && clearTimeout(t1)
        }
    }, [count])

    useEffect(() => {
        if (link !== 'NA' && link !== '') {
            let t2: any
            const t3 = setTimeout(() => {
                locationTo(link)
                addDownloadCount(clickRateBrandCode, link, true)
                if (type === 'individual') {
                    t2 = window.setTimeout(() => {
                        locationTo(settingLink)
                    }, 3000)
                }
            }, 2000)

            return () => {
                t2 && clearTimeout(t2)
                t3 && clearTimeout(t3)
            }
        }
    }, [clickRateBrandCode, link, settingLink, type])

    return {
        type,
        count,
        onSettingClick,
        onDownloadClick,
        version,
    }
}
