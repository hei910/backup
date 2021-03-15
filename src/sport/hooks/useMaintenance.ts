import { useEffect, useRef } from 'react'
import { useDispatch } from '@sport/stores'
import { useSelector } from '@redux'
import { getMaintenanceStatus, setMaintenance } from '@services/sportGlobal/actions'

const useMaintenance: () => null | boolean = () => {
    const isMaintenance = useSelector((state) => state.sportGlobal.isMaintenance)
    const isLogin = useSelector((state) => state.user.isLoggedIn)
    const dispatch = useDispatch()
    const interval = useRef<any>(null)

    useEffect(() => {
        if (!isLogin) {
            dispatch(setMaintenance(false))

            if (interval.current) {
                clearInterval(interval.current)
            }
        } else {
            if (!interval.current) {
                dispatch(getMaintenanceStatus())
                interval.current = setInterval(() => {
                    dispatch(getMaintenanceStatus())
                }, 1000 * 60 * 5)
            }
        }

        return () => {
            if (interval.current) {
                clearInterval(interval.current)
            }
        }
    }, [dispatch, isLogin])

    return isMaintenance
}

export default useMaintenance
