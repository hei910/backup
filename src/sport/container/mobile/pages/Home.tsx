import SportHeader from '@sport/components/mobile/header/SportHeader'
import TableGame from '@sport/components/mobile/home/TableGame'
import TableInplayGame from '@sport/components/mobile/home/TableInplayGame'
import TableSpecialGame from '@sport/components/mobile/home/TableSpecialGame'
import HomeSkeletonLoader from '@sport/components/mobile/loader/HomeSkeletonLoader'
import useCustomParams from '@sport/hooks/useCustomParams'
import useDebounce from '@sport/hooks/useDebounce'
import { setBackToPage } from '@services/sportGlobal/actions'
// import usePrevious from 'hooks/usePrevious';
import React, { Suspense, useEffect } from 'react'
import { useDispatch } from '@sport/stores'
import { useSelector } from '@redux'
import { updateFilterMatchList } from '@services/sportBet/actions'
import { fetchData, updateApiStatus } from '@services/sportData/actions'
import { ApiStatus } from '@services/sportData/types'
import PageContainer from '../PageContainer'
// import { css } from 'react-select/src/components/SingleValue'

const updateInterval = 1000 * 10

const Home: React.FC = () => {
    const {
        date = 'home',
        sports = '',
        market = 'am',
        page = '1',
        fixtureId = '',
        source: fixtureSource,
    } = useCustomParams()

    const apiData: any = null

    const { Ready } = ApiStatus
    const dispatch = useDispatch()
    const apiStatus = useSelector((state) => state.sportData.apiStatus)
    const topRaw = useSelector((state) => state.sportData.topRaw)
    const sampleData = useSelector((state) => state.sportData.sampleData)
    const dataSource = useSelector((state) => state.sportGlobal.dataSource)
    const lang = useSelector((state) => state.sportGlobal.language)
    const source = fixtureSource ?? dataSource
    const oddsType = useSelector((state) => state.sportBet.oddsType)
    const timezone = useSelector((state) => state.sportGlobal.timezone)

    const fetching = useSelector((state) => state.sportData.fetching)
    // const previousFetching = usePrevious(fetching);

    const isReady = apiStatus === Ready
    const isReadyDebounce = useDebounce(isReady, 200)
    const isEmpty = !topRaw || (!topRaw?.live && !topRaw?.matchCount && !topRaw?.special && !topRaw?.sport)
    const paramsCode = date + sports + market + page + fixtureId + sampleData + source + oddsType + lang + timezone

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchApiData = async (update?: boolean) => {
        dispatch(fetchData({ date, sports, market, page, fixtureId, dataSource: source, lang }, apiData?.data, update))
    }

    const updateApiData = async () => {
        fetchApiData(true)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(setBackToPage('home'))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        dispatch(updateFilterMatchList([]))

        fetchApiData()

        return () => {
            dispatch(updateApiStatus(ApiStatus.Loading))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paramsCode])

    useEffect(() => {
        if (!fetching) {
            const setIntervalHolder = setInterval(updateApiData, updateInterval)

            return () => {
                clearInterval(setIntervalHolder)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetching])

    return (
        <PageContainer>
            {isReady && isReadyDebounce ? (
                !isEmpty ? (
                    <Suspense fallback={<HomeSkeletonLoader />}>
                        <SportHeader />
                        <TableInplayGame data={topRaw!} />
                        <TableSpecialGame data={topRaw!} />
                        <TableGame data={topRaw!} />
                    </Suspense>
                ) : (
                    <HomeSkeletonLoader />
                )
            ) : (
                <HomeSkeletonLoader />
            )}
        </PageContainer>
    )
}

export default Home
