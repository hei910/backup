import MDetailEmptyList from '@sport/components/mobile/betPanel/betMatchDetail/common/MDetailEmptyList'
import DetailSkeletonLoader from '@sport/components/mobile/loader/BetDetailSkeletonLoader'
import converter from '@sport/converters'
import useCustomParams from '@sport/hooks/useCustomParams'
import useDebounce from '@sport/hooks/useDebounce'
import { MBetMatchDetail } from '@sport/loadable/mobile'
import React, { Suspense, useEffect, useState } from 'react'
import { useSelector } from '@redux'
import { useDispatch } from '@sport/stores'
import { updateFilterMatchList } from '@services/sportBet/actions'
import { fetchData, fetchSeasonGameInfo, isSameParams, updateApiStatus } from '@services/sportData/actions'
import { ApiStatus } from '@services/sportData/types'
import { isEmptyObject } from '@sport/util/general'
import PageContainer from '../PageContainer'
import { useLocation } from 'react-router-dom'

const updateInterval = 1000 * 30
const inplayUpdateInterval = 1000 * 10

const getSportsId = (sports: string) => {
    switch (sports) {
        case 'football':
            return 1
        case 'basketball':
            return 2
        case 'tennis':
            return 3
        case 'baseball':
            return 4
        default:
            return 1
    }
}

const DetailSection: React.FC = () => {
    const {
        date = 'home',
        sports = 'football',
        market = 'am',
        page = '1',
        fixtureId = '',
        source: fixtureSource,
        isDetailPage,
    } = useCustomParams()
    const location: any = useLocation()
    const apiData: any = null

    const { Ready } = ApiStatus
    const dispatch = useDispatch()
    const apiStatus = useSelector((state) => state.sportData.apiStatus)
    const sampleData = useSelector((state) => state.sportData.sampleData)
    const dataSource = useSelector((state) => state.sportGlobal.dataSource)
    const fetching = useSelector((state) => state.sportData.fetching)
    const lastParams = useSelector((state) => state.sportData.lastUpdate?.params)
    const source = fixtureSource ?? dataSource
    const language = useSelector((state) => state.sportGlobal.language)
    const oddsType = useSelector((state) => state.sportBet.oddsType)
    const sameParams = dispatch(isSameParams({ date, sports, market, page, fixtureId, dataSource, language }))

    const mergedData = useSelector((state) => state.sportData.merged?.current?.data)
    const convertedData = converter(sports, lastParams, mergedData)

    const seasonGameData = useSelector((state) => state?.sportData?.seasonGameData)
    const convertedSeasonGameData = converter(sports, lastParams, seasonGameData)

    const [leagueId, setLeagueId] = useState('')
    const sId = getSportsId(sports)
    const paramsCode = date + sports + market + page + fixtureId + sampleData + source + leagueId + oddsType + language

    const isReady = apiStatus === Ready && sameParams
    const isReadyDebounce = useDebounce(isReady, 200)

    const isEmpty = !mergedData || (isEmptyObject(mergedData?.iot) && isEmptyObject(mergedData?.not))
    const locationMatchStatus = location?.state?.matchStatus
    // const isSeasonDataEmpty = isEmptyObject(seasonGameData?.iot) && isEmptyObject(seasonGameData?.not);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchApiData = async (update = false) => {
        dispatch(
            fetchData(
                { date, sports, market, page, fixtureId, dataSource, language, isDetailPage },
                apiData?.data,
                update,
            ),
        )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchSeasonGameData = async () => {
        if (date === 'inplay') {
            dispatch(fetchSeasonGameInfo(language, sId, date))
        } else {
            dispatch(fetchSeasonGameInfo(language, sId, date, leagueId))
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(updateFilterMatchList([]))

        fetchApiData()

        return () => {
            dispatch(updateApiStatus(ApiStatus.Loading))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paramsCode, apiData])

    useEffect(() => {
        if (!fetching && leagueId.length > 0) {
            const setIntervalHolder = setInterval(
                () => fetchApiData(true),
                date === 'inplay' ? inplayUpdateInterval : updateInterval,
            )
            const setSeasonIntervalHolder = setInterval(
                fetchSeasonGameData,
                date === 'inplay' ? inplayUpdateInterval : updateInterval,
            )

            return () => {
                clearInterval(setIntervalHolder)
                clearInterval(setSeasonIntervalHolder)
            }
        }
    }, [date, fetchApiData, fetchSeasonGameData, fetching, leagueId.length])

    useEffect(() => {
        if (!fetching && convertedData && convertedData.length > 0 && leagueId.length === 0) {
            setLeagueId(convertedData[0].info.seasonId)
        }
    }, [fetching, convertedData, leagueId.length])

    useEffect(() => {
        if (leagueId.length > 0) {
            fetchSeasonGameData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [leagueId, paramsCode])

    return (
        <PageContainer>
            {isReadyDebounce ? (
                !isEmpty ? (
                    <Suspense fallback={<DetailSkeletonLoader />}>
                        <MBetMatchDetail
                            convertedData={convertedData}
                            seasonGames={convertedSeasonGameData}
                            locationMatchStatus={locationMatchStatus}
                        />
                    </Suspense>
                ) : (
                    <MDetailEmptyList />
                )
            ) : (
                <DetailSkeletonLoader />
            )}
        </PageContainer>
    )
}
export default DetailSection
