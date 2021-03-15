import axios from '@sport/api/axios'
import _axios from 'axios'
// import qs from 'qs'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
// import { useHistory, useLocation } from 'react-router-dom'
import { setGlobalLoading, toggleHeader } from '@services/sportGlobal/actions'
import { setLogin } from '@services/sportPlayer/actions'
// import { getCookieByName } from '@sport/util/general'
import networkLogger from '@sport/util/networkLogger'
// import useGlobalSetting from './useGlobalSetting';
// import useGlobalSettingV2 from './useGlobalSettingV2'
// import useHealth from './useHealth'
// import useMaintenance from './useMaintenance'

const useInitialize: () => boolean = () => {
    const dispatch = useDispatch()
    const [isInitialize, setInitialize] = useState(false)
    // const location = useLocation()
    // const history = useHistory()
    // const isMaintenance = useMaintenance()
    // const isGlobalSettingInit = useGlobalSettingV2()

    // disable health check because it depends on v1
    // useHealth()

    useEffect(() => {
        if (isInitialize) {
            dispatch(setGlobalLoading(false))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isInitialize])

    useEffect(() => {
        const executeInAsync = async () => {
            //when http response code === 403 or 401, set the login status to false
            axios.interceptors.response.use(
                function (response) {
                    networkLogger('debug.network.response', response, 4)

                    return response
                },
                function (error) {
                    networkLogger('debug.network.error', error, 32)

                    if (!_axios.isCancel(error) && (error.response?.status === 401 || error.response?.status === 403)) {
                        dispatch(setLogin(false))
                    }
                    return Promise.reject(error)
                },
            )

            //handle specific query string
            // const { pathname, search: queryFromUrl } = location
            // const { pathname } = location
            // const queryArray = Object.entries(qs.parse(queryFromUrl))
            // let formatQuery = ''

            // render iframe mode only
            dispatch(toggleHeader(false))

            //when the app is in iframe mode, disable the header
            // if (isUnderIframe()) {
            // } else {
            //     dispatch(toggleHeader(true))
            // }

            // queryArray.forEach((query) => {
            //     if (query[0] === 'loginRedirectUrl') {
            //         dispatch(setLoginRedirectUrl(query?.[1]))
            //     } else if (query[0] === 'iframe') {
            //         // dispatch(toggleHeader(query?.[1] === 'true'));
            //     } else {
            //         formatQuery += `${formatQuery ? '&' : '?'}${query[0]}=${query[1]}`
            //     }
            // })

            // history.replace(pathname + formatQuery)

            //save login referer
            // const loginReferer = getCookieByName('loginReferer')
            // if (loginReferer) {
            //     window.localStorage.setItem('loginReferer', loginReferer)
            // }

            //notify application to render content
            setInitialize(true)
        }

        executeInAsync()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return isInitialize
}

export default useInitialize
