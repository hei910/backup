import useResizeObserver from 'use-resize-observer/polyfilled'
import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'

import Pages from '@pages'
import { useDispatch, useSelector } from '@redux'
import { setLayoutVisibility } from '@services/layout/action'
import useLocalesReady from '@hooks/useLocalesReady'

export default () => {
    const location = useLocation()
    const dispatch = useDispatch()

    const [isHeaderLogoCenter, setIsHeaderLogoCenter] = useState(false)

    const disableAppScrollList = useSelector((state) => state.app.disableAppScrollList)
    const { showHeader, showSubheader, showFooter } = useSelector((state) => state.layout)

    const { ref: headerRef, height: headerHeight } = useResizeObserver<HTMLDivElement>()
    const { ref: footerRef, height: footerHeight } = useResizeObserver<HTMLDivElement>()

    const shouldDisableScroll = useMemo(() => disableAppScrollList.length > 0, [disableAppScrollList])

    const isLocalesReady = useLocalesReady(false)

    useEffect(() => {
        const page = Object.values(Pages).find((page) =>
            page.path !== '/' ? location.pathname.startsWith(page.path) : location.pathname === '/',
        )
        setIsHeaderLogoCenter(!!page?.isHeaderLogoCenter)
        dispatch(
            setLayoutVisibility({
                header: !page?.hideHeader,
                subheader: !page?.hideSubheader,
                footer: !page?.hideFooter,
            }),
        )
    }, [dispatch, location.pathname])

    useEffect(() => {
        window.document.body.style.overflow = shouldDisableScroll ? 'hidden' : 'visible'
    }, [shouldDisableScroll])

    return {
        headerRef,
        footerRef,
        headerHeight: headerHeight || 0,
        footerHeight: footerHeight || 0,
        hideHeader: !showHeader || !isLocalesReady,
        hideSubheader: !showSubheader || !isLocalesReady,
        hideFooter: !showFooter || !isLocalesReady,
        isHeaderLogoCenter,
        shouldDisableScroll,
    }
}
