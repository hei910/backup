import MEmptyList from '@sport/components/mobile/betPanel/betMatchColumn/EmptyList'
import BetFilterSkeletonLoader from '@sport/components/mobile/loader/BetFilterSkeletonLoader'
import useCustomParams from '@sport/hooks/useCustomParams'
import useDebounce from '@sport/hooks/useDebounce'
import useScrollRestoration from '@sport/hooks/useScrollRestoration'
import { MBetMatchFilter } from '@sport/loadable/mobile'
import React, { Suspense, useEffect, useState } from 'react'
import { useDispatch } from '@sport/stores'
import { useSelector } from '@redux'
import { fetchFilterSeasonListData, updateApiStatus } from '@services/sportData/actions'
import { ApiStatus, SeasonListResponse } from '@services/sportData/types'
import { clearBetFilterList } from '@services/sportGlobal/actions'
import { filterSeasonData, getDefaultDate } from '@sport/util/dataProcess'
import PageContainer from '../PageContainer'
import { useLocation } from 'react-router-dom'
import { setBackToPage } from '@services/sportGlobal/actions'

interface SeasonListFilterProps {
    data: SeasonListResponse
    children: (data: any) => void
}

const updateInterval = 1000 * 30

const SeasonListFilter: React.FC<SeasonListFilterProps> = ({ children, data }) => {
    const searchKeyword = useSelector((state) => state.sportGlobal.searchKeyword)
    const seasonListData = [
        ...data.popular.map((info) => {
            return { ...info, type: 'popular' }
        }),
        ...data.country.map((info) => {
            return { ...info, type: 'country' }
        }),
    ]
    const [filterSeasonList, setFilterSeasonList] = useState(seasonListData)

    useEffect(() => {
        data &&
            setFilterSeasonList(
                searchKeyword.length > 0 ? filterSeasonData(seasonListData, searchKeyword) : seasonListData,
            )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchKeyword, data])

    return (
        <>
            {children && filterSeasonList && filterSeasonList?.length > 0 ? children(filterSeasonList) : <MEmptyList />}
        </>
    )
}

const BetMatchFilter: React.FC = () => {
    const { sports = 'football', date = 'all', matchsStatus } = useCustomParams()
    const dispatch = useDispatch()
    const location: any = useLocation()
    const locationMatchStatus = location?.state?.matchStatus
    const source = useSelector((state) => state.sportGlobal.dataSource)
    const seasonList = useSelector((state) => state.sportData.seasonList)
    const sportsStored = useSelector((state) => state.sportGlobal.betFilterCollapsedInfo.sport)
    const apiStatus = useSelector((state) => state.sportData.apiStatus)
    const fetching = useSelector((state) => state.sportData.fetching)
    const dateList = useSelector((state) => state.sportData.dateList)

    const isReady = apiStatus === ApiStatus.Ready && dateList
    const debounceIsReady = useDebounce(isReady, 150)

    const updateRef = date + source + sports + matchsStatus + (dateList?.length ?? -1 > 0).toString()
    const debounceUpdateRef = useDebounce(updateRef, 100)
    const isParlayBetMatch = matchsStatus === 'parlay-Live' || matchsStatus === 'parlay-Today'

    useScrollRestoration(updateRef, date)

    const fetchSeasonListData = async (update?: boolean) => {
        const defaultDate = getDefaultDate(
            dateList ?? [],
            date,
            matchsStatus ?? (date === 'parlay' ? 'parlay-Early' : 'Pre'),
        )
        dispatch(fetchFilterSeasonListData(sports, defaultDate, date, update))
    }

    const updateSeasonListData = async () => {
        fetchSeasonListData(true)
    }

    useEffect(() => {
        if (sportsStored !== sports) {
            dispatch(clearBetFilterList(sports))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sports, sportsStored])

    useEffect(() => {
        dateList && fetchSeasonListData()
        if (locationMatchStatus === 'home') {
            dispatch(setBackToPage('home'))
        } else {
            dispatch(setBackToPage('regular'))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceUpdateRef])

    useEffect(() => {
        if (updateRef === debounceUpdateRef) {
            dateList && fetchSeasonListData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateRef, debounceUpdateRef])

    useEffect(() => {
        if (!fetching) {
            const setIntervalHolder = setInterval(updateSeasonListData, updateInterval)

            return () => {
                clearInterval(setIntervalHolder)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetching])

    useEffect(() => {
        return () => {
            dispatch(updateApiStatus(ApiStatus.Loading))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateRef])

    return (
        <PageContainer>
            {isReady && debounceIsReady && !isParlayBetMatch ? (
                <SeasonListFilter data={seasonList!}>
                    {(data) => (
                        <>
                            {data && (
                                <Suspense fallback={<BetFilterSkeletonLoader />}>
                                    <MBetMatchFilter data={data} />
                                </Suspense>
                            )}
                        </>
                    )}
                </SeasonListFilter>
            ) : (
                <BetFilterSkeletonLoader />
            )}
        </PageContainer>
    )
}

export default BetMatchFilter
