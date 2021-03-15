import { useDispatch } from '@redux'
import { fetchAppInitDataAction, showLoadingAction, hideLoadingAction } from '@services/app/action'
import { setApiResponseInterceptor, setApiRequestInterceptor } from '@utils/api'
import { initFunctionForV1 } from '@utils/v1Functions'
import { AxiosRequestConfig } from 'axios'
import { useEffect, useState, useCallback } from 'react'

const useAppInitial = () => {
    const dispatch = useDispatch()
    const [isInit, setisInit] = useState(false)

    const onApiRequest = useCallback(
        (config: AxiosRequestConfig) => {
            dispatch(showLoadingAction(config.url!))
        },
        [dispatch],
    )

    const onApiResponse = useCallback(
        (response) => {
            dispatch(hideLoadingAction(response.config.url))
        },
        [dispatch],
    )

    useEffect(() => {
        if (!isInit) {
            // TODO: remove this
            initFunctionForV1(dispatch)
            // END
            setApiRequestInterceptor(onApiRequest)
            setApiResponseInterceptor(onApiResponse)
            dispatch(fetchAppInitDataAction())
            setisInit(true)
        }
    }, [dispatch, isInit, onApiRequest, onApiResponse])

    // fix safari iframe width issue
    useEffect(() => {
        if (process.env.APP_PLATFORM === 'mobile') {
            const resizeHandler = () => {
                const _htmlEl = document.querySelector('html')
                if (_htmlEl) {
                    _htmlEl.style.width = `${window.innerWidth}px`
                }
            }
            resizeHandler()

            window.addEventListener('resize', resizeHandler)

            return () => window.removeEventListener('resize', resizeHandler)
        }
    }, [])

    useEffect(() => {
        ;(window as any).__COMMIT_HASH__ = __COMMIT_HASH__
    })

    // return { isAllowIp, clientIp, isInit }
    return { isInit }
}

export default useAppInitial
