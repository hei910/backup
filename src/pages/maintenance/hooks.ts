import { useDispatch, useSelector } from '@redux'
import { getMaintenanceInfo } from '@services/app/api'
import { MaintenanceRes } from '@services/app/types'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { directToHomePage } from '@utils/v1Functions'
import { fetchAppMaintenanceAction } from '@services/app/action'

const REFETCH_APP_MAINTENANCE_INTERVAL = 120 // unit: seconds

const getSearchParams = (name: string) => {
    const results = new RegExp('[?&]' + name + '=([^&#]*)').exec(window.location.href)

    if (results === null) {
        return null
    } else {
        return decodeURI(results[1]) || 0
    }
}

const useMaintenance = (pageKey?: string) => {
    const type = getSearchParams('type') || pageKey || ''

    const [maintenanceInfo, setMaintenanceInfo] = useState<MaintenanceRes | null>(null)
    const [isReady, setIsReady] = useState(false)

    const { brandName, csPhone, webEmail, csLink } = useSelector((state) => state.app.brandInfo)
    const isAppMaintenance = useSelector((state) => state.app.isAppMaintenance)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        const init = async () => {
            const maintenanceInfo = await getMaintenanceInfo(isAppMaintenance ? '' : type)

            // is not semi maintenance & not maintenance, then redirect
            if (!isAppMaintenance && !maintenanceInfo.isMaintenance) {
                // TODO: redirect to the specific page by pageKey
                if (process.env.APP_PLATFORM === 'mobile') {
                    directToHomePage()
                } else {
                    window.parent.location.reload()
                }
            } else {
                setMaintenanceInfo(maintenanceInfo)
                setIsReady(true)
            }
        }
        init()
    }, [dispatch, history, isAppMaintenance, type])

    useEffect(() => {
        if (isAppMaintenance) {
            const intervalId = setInterval(() => {
                dispatch(fetchAppMaintenanceAction())
            }, REFETCH_APP_MAINTENANCE_INTERVAL * 1000)

            return () => {
                clearInterval(intervalId)
            }
        }
    }, [dispatch, isAppMaintenance])

    const endTime = useMemo(() => {
        const today = new Date()
        const day = today.getDate() < 10 ? `0${today.getDate()}` : `${today.getDate()}`
        const month = today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : `${today.getMonth() + 1}`
        return `北京时间${month}月${day}日${maintenanceInfo?.time || ''}`
    }, [maintenanceInfo])

    const onCsButtonClick = useCallback(() => {
        window.open(csLink)
    }, [csLink])

    return {
        endTime,
        notice: maintenanceInfo?.notice || '',
        brandName,
        csPhone,
        webEmail,
        onCsButtonClick,
        isReady,
    }
}

export default useMaintenance
