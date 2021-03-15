import { apiConfig } from '@sport/api/apiConfig'
import { useEffect, useRef } from 'react'
import { useSelector } from '@redux'

const useHealth: () => boolean = () => {
    const isLogin = useSelector((state) => state.user.isLoggedIn) // user or sportUser?
    const interval = useRef<any>(null)
    useEffect(() => {
        if (isLogin === true) {
            if (!interval.current) {
                apiConfig.healthCheck()

                interval.current = setInterval(() => {
                    // dispatch(getMenu());

                    apiConfig.healthCheck()
                }, 1000 * 30)
            }
        } else {
            if (interval.current) {
                clearInterval(interval.current)
                interval.current = null
            }
        }
    }, [isLogin])

    return true
}

export default useHealth
