import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { useSelector } from '@redux'
import { isWeixin } from '@utils/userAgent'

export default (targetPath?: string) => {
    const [isReady, setIsReady] = useState(false)
    const appMainDomain = useSelector((state) => state.app.brandInfo.appMainDomain)
    const history = useHistory()

    useEffect(() => {
        if (!isWeixin()) {
            window.location.href = `${appMainDomain}${targetPath || '/mobile/main'}`
        } else {
            setIsReady(true)
        }
    }, [history, appMainDomain, targetPath])

    return isReady
}
