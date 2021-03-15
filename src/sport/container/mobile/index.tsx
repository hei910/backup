import PageLoader from '@sport/components/common/pageLoader/football'
import BetMatch from '@sport/container/mobile/pages/betMatch'
import Home from '@sport/container/mobile/pages/Home'
// import RedirectPage from '@sport/container/mobile/pages/Redirect'
// import useCtidBlockRules from '@sport/hooks/useCtidBlockRules'
import useInitialize from '@sport/hooks/useInitialize'
import usePlayer from '@sport/hooks/usePlayer'
import useRulesLimits from '@sport/hooks/useRulesLimits'
// import useSettingV2 from '@sport/hooks/useSettingV2'
import useWallet from '@sport/hooks/useWallet'
import React, { useEffect } from 'react'
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'
import { useSelector } from '@redux'
import BetMatchDetail from './pages/betMatchDetail'
import BetMatchFilter from './pages/betMatchFilter'
import BetRecordsContainer from './pages/betRecords'
import styled from 'styled-components/macro'
import useMenu from '@sport/hooks/useMenu'
import {} from '@utils/v1Functions'
import { addBetItemOddsUpdateInterval } from '@services/sportBet/actions'
import { useDispatch } from '@sport/stores'
import { REMOVE_ALL_INTERVAL } from '@services/sportBet/types'
import { scrollV1ContainerToTop, refreshBalance } from '@utils/v1Functions'

const SGlobalMobileStyle = styled.div`
    a {
        text-decoration: none;
        cursor: pointer;
        color: ${(props) => props.theme.sport.colors.text.primary};
    }

    button {
        outline: none;
        cursor: pointer;
        touch-action: manipulation;
    }

    input {
        font-size: 100%;
    }
`

const MobileRoutes = () => {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

    return (
        <Switch>
            <Route exact path="/sport/home" component={Home} />
            <Route exact path="/sport/select-competition/:date/:sports/:matchsStatus?" component={BetMatchFilter} />
            <Route exact path="/sport/:date/:sports/details/:fixtureId/:source?" component={BetMatchDetail} />
            <Route exact path="/sport/:date/:sports/:leagueId?/:matchsStatus?" component={BetMatch} />
            <Route exact path="/sport/:date/:sports" component={BetMatch} />
            {isLoggedIn && <Route exact path="/sports/bet-records" component={BetRecordsContainer} />}
            <Route path="/sport">
                <Redirect to="/sport/home" />
            </Route>
        </Switch>
    )
}

const MobileMain: React.FC<{}> = () => {
    usePlayer()
    useWallet()
    useMenu()
    useRulesLimits()

    const isInitialize = useInitialize()
    const betList = useSelector((state) => state.sportBet.list)
    const betData = useSelector((state) => state.sportBet.data)
    const dispatch = useDispatch()
    const location = useLocation()

    // const pathKeys = useRef<string[]>([])

    // auto scroll to container top if browser navigate to new page except back action
    useEffect(() => {
        scrollV1ContainerToTop()

        // if (!pathKeys.current.includes(location?.key ?? 'nil')) {
        //     scrollV1ContainerToTop()
        // }

        // pathKeys.current.unshift(location?.key ?? 'nil')

        // if (pathKeys.current.length > 5) {
        //     pathKeys.current.length = 5
        // }
    }, [location])

    useEffect(() => {
        // refresh v1 balance in header bar
        refreshBalance()
        // set interval to update odds for betlist stored in localstorage
        betList.forEach((outcomeUId) => {
            const data = betData[outcomeUId]
            dispatch(
                addBetItemOddsUpdateInterval(
                    data.sid,
                    data.matchStatus,
                    data.fixtureId,
                    data.marketId,
                    outcomeUId,
                    data.seasonId,
                ),
            )
        })

        return () => {
            dispatch({
                type: REMOVE_ALL_INTERVAL,
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    return (
        <SGlobalMobileStyle>
            <PageLoader />
            {isInitialize && <MobileRoutes />}
        </SGlobalMobileStyle>
    )
}

export default MobileMain
