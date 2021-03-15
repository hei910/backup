import { useEffect, useRef, useState } from 'react'
import { useSelector } from '@redux'
import { useDispatch } from '@sport/stores'
import { getGlobalSettingV2 } from '@services/sportGlobalSetting/actions'
import { getMenu } from '@services/sportMenu/actions'

const useGlobalSettingV2 = () => {
    const dispatch = useDispatch()
    const [isInit, setInit] = useState(false)
    const interval = useRef<any>(null)
    const menu = useSelector((state) => state.sportMenu)

    useEffect(() => {
        if (!isInit && menu.success) {
            setInit(true)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [menu])

    useEffect(() => {
        dispatch(getGlobalSettingV2()).then((data) => {
            // const oddsDomain = data.ODDS_API_DOMAIN
            dispatch(getMenu())

            interval.current = setInterval(() => {
                dispatch(getMenu())
            }, 1000 * 10)
        })

        return () => {
            if (interval.current) {
                clearInterval(interval.current)
            }
        }
    }, [dispatch])

    if (process.env.NODE_ENV !== 'production') {
        return true
    }

    return isInit
}

export default useGlobalSettingV2
