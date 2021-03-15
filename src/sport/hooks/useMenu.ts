import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from '@redux'
import { getMenu } from '@services/sportMenu/actions'

const useMenu: () => void = () => {
    const dispatch = useDispatch()
    const dataSource = useSelector((state) => state.sportGlobal.dataSource)
    // const menu = useSelector((state) => state.sportMenu)
    const interval = useRef<any>(null)

    // useEffect(() => {
    //     if (!isMenuInit && menu.success) {
    //         setMenuInit(true)
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [menu.success])

    useEffect(() => {
        if (interval.current) {
            clearInterval(interval.current)
        }

        dispatch(getMenu())

        interval.current = setInterval(() => {
            dispatch(getMenu())
        }, 1000 * 10)

        return () => {
            clearInterval(interval.current)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataSource])

    //disable menu check in development stage
    // if (process.env.NODE_ENV !== 'production') {
    //     return true
    // }

    // return isMenuInit
    return null
}

export default useMenu
