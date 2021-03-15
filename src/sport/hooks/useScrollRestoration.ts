import { useEffect, useRef } from 'react'
import { useDispatch } from '@sport/stores'
import { useSelector } from '@redux'
import { setRestoreScrollPosition, setScrollPosition } from '@services/sportGlobal/actions'

const useScrollRestoration = (updateRef: any, resetRef: any): any => {
    const dispatch = useDispatch()
    const scrollPosition = useSelector((state) => state.sportGlobal.scrollPosition)
    const isRestoreScrollPosition = useSelector((state) => state.sportGlobal.isRestoreScrollPosition)

    const ref = useRef(0)

    const onScroll = () => {
        ref.current = window.scrollY
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [resetRef])

    useEffect(() => {
        if (scrollPosition !== 0 && isRestoreScrollPosition) {
            window.scrollTo(0, scrollPosition)
            dispatch(setRestoreScrollPosition(false))
        }

        dispatch(setScrollPosition(0))

        window.addEventListener('scroll', onScroll)
        return () => {
            window.removeEventListener('scroll', onScroll)
            ref.current !== 0 && dispatch(setScrollPosition(ref.current))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateRef])
}

export default useScrollRestoration
