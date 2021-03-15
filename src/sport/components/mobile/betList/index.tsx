import BetListBetting from '@sport/components/mobile/betList/betting'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from '@sport/stores'
import { resetBet, setBetForceId, syncBetListFromBetData } from '@services/sportBet/actions'
import { BetListStatus } from '@services/sportBet/types'
import styled from 'styled-components/macro'
import ScrollView from '../scrollView'
import BetListBackground from './background'
import BetListSuccess from './success'
import { useSelector } from '@redux'
import { enableAppScrollAction, disableAppScrollAction } from '@services/app/action'
import ErrorBoundary from '@sport/util/errorBoundary'
// import { toggleBetList } from '@services/sportGlobal/actions'

const zIndex = 9999999

const SBetListScrollViewWrapper = styled(BetListBackground)<{ open?: boolean }>`
    display: ${(props) => (props.open ? 'block' : 'none')};
    position: fixed;
    z-index: ${zIndex};
    left: 0;
`

const SBetListWrapper = styled.div<{ paddingTop: number }>`
    width: 90vw;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    top: ${(props) => props.paddingTop + 60}px;
    /* bottom: 10px; */
    max-height: calc(90vh);
    /* height: 100vh; */
    max-width: 500px;
    -webkit-overflow-scrolling: touch;
    /* margin: 5vw auto 20vw auto; */
    background-color: #2d2d2d;
    border-width: 4px;
    border-style: solid;
    border-color: #2d2d2d;
    overflow-y: auto;
`

const SScrollView = styled(ScrollView)`
    overflow-y: scroll;
    height: calc(100% + 1px);
    z-index: ${zIndex};
`

const BetList: React.FC = () => {
    const betListStatus = useSelector((store) => store.sportBet.betListStatus)
    const isShowBetList = useSelector((store) => store.sportGlobal.betListOpen && store.sportBet.list.length > 0)

    const serializedCombinedIDList = useSelector((store) => store.sportBet.list)
    const betForceId = useSelector((store) => store.sportBet.betForceId)

    // const currentPosition = useRef<number>(0)
    const [openPosition] = useState<number>(0)

    const dispatch = useDispatch()

    // const onWindowScroll = (event: Event) => {
    //     const doc = document.documentElement
    //     const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
    //     currentPosition.current = top

    //     console.log('174240 index.tsx top', top)
    // }

    // disable scroll when bet list is opened, vice versa
    useEffect(() => {
        if (isShowBetList) {
            dispatch(disableAppScrollAction('bet_list'))
        } else {
            dispatch(enableAppScrollAction('bet_list'))
        }
    }, [dispatch, isShowBetList])

    useEffect(() => {
        dispatch(syncBetListFromBetData())
        if (serializedCombinedIDList.length > 0) {
            dispatch(setBetForceId(betForceId ?? serializedCombinedIDList?.[0]))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // useEffect(() => {
    //     window.addEventListener('scroll', onWindowScroll)

    //     return () => window.removeEventListener('scroll', onWindowScroll)
    // }, [])

    // useEffect(() => {
    //     // console.log('174018 index.tsx isShowBetList', isShowBetList)

    //     if (isShowBetList) {
    //         console.log('164854 index.tsx enter isShowBet list change', currentPosition.current)

    //         if (getIOSVersion() <= 12) {
    //             setOpenPosition(currentPosition.current)
    //         }
    //         // setOpenPosition(0)
    //     }
    // }, [isShowBetList])

    return (
        <SBetListScrollViewWrapper open={isShowBetList}>
            {isShowBetList && (
                <SScrollView open={isShowBetList}>
                    <SBetListWrapper paddingTop={openPosition}>
                        {betListStatus !== BetListStatus.SUCCESS && <BetListBetting />}
                        {betListStatus === BetListStatus.SUCCESS && <BetListSuccess />}
                    </SBetListWrapper>
                </SScrollView>
            )}
        </SBetListScrollViewWrapper>
    )
}

const BetListMemo = React.memo(BetList)

const SafeBetList = () => {
    const dispatch = useDispatch()
    const callback = useCallback(() => {
        dispatch(resetBet())
        // dispatch(toggleBetList(false))
    }, [dispatch])

    return <ErrorBoundary noErrorReturn={<BetListMemo />} errorReturn={<></>} callback={callback} />
}

export default SafeBetList
