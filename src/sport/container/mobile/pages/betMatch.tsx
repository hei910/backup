import MEmptyList from '@sport/components/mobile/betPanel/betMatchColumn/EmptyList'
import BetMatchSkeletonLoader from '@sport/components/mobile/loader/BetMatchSkeletonLoader'
import converter from '@sport/converters'
import useCustomParams from '@sport/hooks/useCustomParams'
import useDataFilter from '@sport/hooks/useDataFilter'
import useDebounce from '@sport/hooks/useDebounce'
import {
    MBaseballBetTableMainMarket,
    MBasketballBetTableMainMarket,
    MFootballBetTableMainMarket,
    MOutright,
    MTennisBetTableMainMarket,
} from '@sport/loadable/mobile'
import React, { Suspense, useEffect } from 'react'
import { useSelector } from '@redux'
import { useDispatch } from '@sport/stores'
import { updateFilterMatchList } from '@services/sportBet/actions'
import { setBackToPage } from '@services/sportGlobal/actions'
// import { fetchData, isSameParams, updateApiStatus } from '@services/sportData/actions'
import { fetchData, updateApiStatus } from '@services/sportData/actions'
import { ApiStatus } from '@services/sportData/types'
import { updateSearchkeyword } from '@services/sportGlobal/actions'
import { RouteSportType } from '@services/sportMenu/types'
import { isEmptyObject } from '@sport/util/general'
import PageContainer from '../PageContainer'
import { useLocation } from 'react-router-dom'

const updateInterval = 1000 * 30
const inplayUpdateInterval = 1000 * 10

const betMatchSwitcher = (convertedData: any, sports?: RouteSportType, isOutrightPage?: boolean) => {
    if (isOutrightPage) return <MOutright convertedData={convertedData} />

    switch (sports) {
        case 'football':
            return <MFootballBetTableMainMarket convertedData={convertedData} />
        case 'basketball':
            return <MBasketballBetTableMainMarket convertedData={convertedData} />
        case 'tennis':
            return <MTennisBetTableMainMarket convertedData={convertedData} />
        case 'baseball':
            return <MBaseballBetTableMainMarket convertedData={convertedData} />
        default:
            return <MEmptyList />
    }
}

const BetMatch: React.FC = () => {
    const {
        date = '',
        sports = 'football',
        market = 'am',
        fixtureId = '',
        source: fixtureSource,
        isOutrightPage,
        leagueId = '',
        matchsStatus,
    } = useCustomParams()

    const apiData: any = null

    const { Ready } = ApiStatus
    const dispatch = useDispatch()
    const apiStatus = useSelector((state) => state.sportData.apiStatus)
    const sampleData = useSelector((state) => state.sportData.sampleData)
    const dataSource = useSelector((state) => state.sportGlobal.dataSource)
    const lang = useSelector((state) => state.sportGlobal.language)
    const timezone = useSelector((state) => state.sportGlobal.timezone)
    const oddsType = useSelector((state) => state.sportBet.oddsType)
    const fetching = useSelector((state) => state.sportData.fetching)
    const source = fixtureSource ?? dataSource

    const lastParams = useSelector((state) => state.sportData.lastUpdate?.params)
    const lastCmpetitionIds = useSelector((state) => state.sportData.lastUpdate?.params?.competitionIds)

    const paramsCode =
        date + sports + market + fixtureId + sampleData + source + leagueId + timezone + lang + oddsType + matchsStatus

    const debounceParamsCode = useDebounce(paramsCode, 120)

    const mergedData = useSelector((state) => state.sportData.merged?.current?.data)
    const filterData = useDataFilter(debounceParamsCode, 'both', mergedData)
    const convertedData = converter(sports, lastParams, filterData)

    const isEmpty =
        (sampleData ? !apiData : !mergedData) || (isEmptyObject(filterData?.iot) && isEmptyObject(filterData?.not))
    const location: any = useLocation()
    const locationMatchStatus = location?.state?.matchStatus
    // const sameParams = dispatch(
    //     isSameParams({ date, sports, market, fixtureId, dataSource, lang, leagueId, matchsStatus }, 'mobile'),
    // )

    // const isReady = apiStatus === Ready && sampleData ? sampleData : sameParams
    const isReady = apiStatus === Ready
    const debounceIsReady = useDebounce(isReady, 150)

    const fetchApiData = async () => {
        dispatch(fetchData({ date, sports, market, fixtureId, dataSource: source, lang, matchsStatus }, apiData?.data))
    }

    const updateApiData = async () => {
        dispatch(
            fetchData({ date, sports, market, fixtureId, dataSource: source, lang, matchsStatus }, apiData?.data, true),
        )
    }

    const clearParams = () => {
        const shouldStoreLeagueId = leagueId.length > 0
        const shouldClearLeagueId = (lastCmpetitionIds?.length ?? 0) > 0 && (date === 'inplay' || date === 'upcoming')

        const shouldSearchKeyword = true

        shouldSearchKeyword && dispatch(updateSearchkeyword(''))

        if (shouldClearLeagueId) {
            dispatch(updateFilterMatchList([]))
        } else if (shouldStoreLeagueId) {
            dispatch(updateFilterMatchList([leagueId]))
        }
    }

    useEffect(() => {
        clearParams()
        fetchApiData()
        if (locationMatchStatus === 'home') {
            dispatch(setBackToPage('home'))
        } else {
            dispatch(setBackToPage('betMatch'))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceParamsCode])

    useEffect(() => {
        if (paramsCode === debounceParamsCode) {
            // dispatch(updateApiStatus(ApiStatus.Ready))
            fetchApiData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paramsCode, debounceParamsCode])

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(updateApiStatus(ApiStatus.Loading))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paramsCode])

    useEffect(() => {
        if (!fetching) {
            const setIntervalHolder = setInterval(
                updateApiData,
                date === ('inplay' || 'parlay-Live') ? inplayUpdateInterval : updateInterval,
            )

            return () => {
                clearInterval(setIntervalHolder)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetching, sampleData])

    return (
        <PageContainer>
            {debounceIsReady && isReady ? (
                !isEmpty ? (
                    <Suspense fallback={<BetMatchSkeletonLoader />}>
                        {betMatchSwitcher(convertedData, sports, isOutrightPage)}
                    </Suspense>
                ) : (
                    <MEmptyList />
                )
            ) : (
                <BetMatchSkeletonLoader />
            )}
        </PageContainer>
    )
}

export default BetMatch
