import { LocalesContext } from '@app/localesProvider'
import { getPageKeyByRouterPath } from '@utils/route'
import { useContext, useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'

const useLocalesReady = (checkPageReady: boolean = true) => {
    const { path } = useRouteMatch()
    const { localesMessage, loadLocales, isReady, setIsReady } = useContext(LocalesContext)

    useEffect(() => {
        const pageKey = getPageKeyByRouterPath(path)?.toLowerCase()

        if (!localesMessage[pageKey]) {
            setIsReady(false)
            loadLocales(pageKey)
        } else if (
            (checkPageReady ? localesMessage[pageKey] : true) &&
            localesMessage['general'] &&
            localesMessage['maintenance'] &&
            localesMessage['regionblock']
        ) {
            setIsReady(true)
        }
    }, [localesMessage, setIsReady, loadLocales, checkPageReady, path])

    return isReady
}

export default useLocalesReady
