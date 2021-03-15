import BetList from '@sport/components/mobile/betList'
import BetListFloatingButton from '@sport/components/mobile/betList/floatingButton'
import BetPanel from '@sport/components/mobile/betPanel'
import MatchHeader from '@sport/components/mobile/betPanel/betMatchHeader/MatchHeader'
import CompetitionFilter from '@sport/components/mobile/competition/CompetitionFilter'
import CompetitionHeader from '@sport/components/mobile/competition/CompetitionHeader'
import CompetitionMenu from '@sport/components/mobile/competition/CompetitionMenu'
// import Footer from '@sport/components/mobile/footer'
// import DebugPanel from '@sport/components/mobile/general/DebugPanel'
// import MobileHeader from '@sport/components/mobile/general/Header'
import RightMenu from '@sport/components/mobile/general/RightMenu'
import LeftMenu from '@sport/components/mobile/header/LeftMenu'
import MobileSportsMenu from '@sport/components/mobile/header/SportMenuLvl1'
import MobileSportsMenu2 from '@sport/components/mobile/header/SportMenuLvl2'
import useCustomParams from '@sport/hooks/useCustomParams'
import useDebounceFn from '@sport/hooks/useDebounceFn'
import useDefaultDate from '@sport/hooks/useDefaultDate'
import useDefaultSport from '@sport/hooks/useDefaultSport'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from '@redux'
import { setCompetitionTabIndex, setTabletLayout, updateWidthHeight } from '@services/sportGlobal/actions'
import { DateType } from '@services/sportMenu/types'
import styled from 'styled-components/macro'
import { getTotalCount } from '@sport/util/dataProcess'
import { enableAppScrollAction, disableAppScrollAction } from '@services/app/action'
interface PageContainerProps {
    children: any
}

const SMobileLayer = styled.div`
    /* height: 100vh; */
    /* overflow-y: hidden; */

    display: flex;
    flex-direction: column;
`

const SStickyContainer = styled.div<{ show?: boolean }>`
    width: 100%;
    /* position: fixed; */
    /* top: 0; */
    /* z-index: 5; */
    /* transform: ${(props) => (props.show ? 'translate(0, 0%)' : 'translate(0, -140%)')}; */
    /* transition: all 350ms ${(props) => (props.show ? 'ease-in' : 'ease-out')}; */
`

const SMobileBodyContainer = styled.div`
    /* padding-top: 106px; */
    /* overflow-y: scroll; */
`

const SMobileContent = styled.div`
    flex: 1 0 500px;
    background: ${(props) => props.theme.sport.colors.background};
`

const UpdateWindowSize = memo(() => {
    const isTabletLayout = useSelector((state) => state.sportGlobal.isTabletLayout)
    const dispatch = useDispatch()

    const updateWidthAndHeight = useCallback(() => {
        const widthHeight = {
            width: window.innerWidth,
            height: window.innerHeight,
        }

        const nextIsTabletLayout = window.innerWidth > 567
        const shouldUpdate = isTabletLayout !== nextIsTabletLayout
        if (shouldUpdate) {
            const payload = {
                isTabletLayout: nextIsTabletLayout,
            }
            shouldUpdate && dispatch(setTabletLayout(payload))
        }

        dispatch(updateWidthHeight(widthHeight))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.innerHeight, window.innerWidth, isTabletLayout])

    useEffect(() => {
        window.addEventListener('resize', updateWidthAndHeight)
        updateWidthAndHeight()
        return () => {
            window.removeEventListener('resize', updateWidthAndHeight)
        }
    })

    return null
})

const MobileMainHeader: React.FC<{ show?: boolean }> = memo(({ show }) => {
    const [showMenu, setShowMenu] = useState(false)
    const { isBetRecord } = useCustomParams()
    const dispatch = useDispatch()

    const menuHandler = (event: React.MouseEvent<HTMLElement>) => {
        if (!showMenu) {
            dispatch(disableAppScrollAction('sportLeftMenu'))
        } else {
            dispatch(enableAppScrollAction('sportLeftMenu'))
        }

        setShowMenu(!showMenu)
    }

    return (
        <>
            <SStickyContainer show={show}>
                {/* <MobileHeader /> */}
                {!isBetRecord && <MobileSportsMenu menuHandler={menuHandler} />}
            </SStickyContainer>
            {showMenu && <LeftMenu showMenu={showMenu} menuHandler={menuHandler} />}
        </>
    )
})

const MobileSubHeader: React.FC = memo(() => {
    const {
        isHomePage,
        isDetailPage,
        isOutrightPage,
        isSelectCompetition,
        date = 'future',
        isBetRecord,
    } = useCustomParams()
    const competitionTabIndex = useSelector((state) => state.sportGlobal.competitionTabIndex)
    const menuData = useSelector((state) => state.sportMenu.data)

    const countNumber = getTotalCount(menuData, date as DateType)

    const showSportMenu = date !== 'all' && countNumber > 0
    const showCompetitionHeader = date === 'all' && isSelectCompetition
    const showCompetitionFilter =
        isSelectCompetition &&
        competitionTabIndex === 1 &&
        !isOutrightPage &&
        date !== 'today' &&
        date !== 'inplay' &&
        date !== 'upcoming' &&
        date !== 'parlay-Live' &&
        date !== 'parlay-Today'

    return (
        <>
            {!isHomePage && !isDetailPage && !isBetRecord && (
                <>
                    {showSportMenu && <MobileSportsMenu2 />}
                    <MatchHeader />
                    {showCompetitionHeader && <CompetitionHeader />}
                    {showCompetitionFilter && <CompetitionFilter />}
                </>
            )}
        </>
    )
})

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
    const [show, setShow] = useState(true)
    const [currentScroll, setCurrentScroll] = useState(0)
    const competitionTabIndex = useSelector((state) => state.sportGlobal.competitionTabIndex)
    const { date = 'all' } = useCustomParams()

    const dispatch = useDispatch()
    const scrollRef = useRef<number>(0)

    const setCurrentScrollPosition = (scrollY: number) => {
        if (currentScroll !== scrollY) {
            setCurrentScroll(scrollY)
            scrollRef.current = currentScroll
        }
    }

    const { run: debounceSetCurrentScroll, cancel } = useDebounceFn(setCurrentScrollPosition, 100)

    const handleScroll = (event: any) => {
        debounceSetCurrentScroll(window.scrollY)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => {
            cancel()
            window.removeEventListener('scroll', handleScroll)
        }
    })

    useEffect(() => {
        if (currentScroll <= 100 || currentScroll < scrollRef.current) {
            setShow(true)
        } else if (currentScroll > 100 && currentScroll > scrollRef.current) {
            setShow(false)
        }
    }, [currentScroll])

    useEffect(() => {
        dispatch(setCompetitionTabIndex(1))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date])

    useDefaultSport()
    useDefaultDate()

    return (
        <SMobileLayer>
            <RightMenu />
            <UpdateWindowSize />
            <SMobileContent>
                <MobileMainHeader show={show} />
                <SMobileBodyContainer>
                    <MobileSubHeader />
                    <BetPanel>{competitionTabIndex === 0 ? <CompetitionMenu /> : children}</BetPanel>
                </SMobileBodyContainer>
            </SMobileContent>
            <BetList />
            <BetListFloatingButton />
            {/* {process.env.REACT_APP_DEBUG === 'true' && <DebugPanel />} */}
            {/* <Footer /> */}
        </SMobileLayer>
    )
}

export default PageContainer
