import BetMatchEmptyList from '@sport/components/mobile/betPanel/betMatchColumn/EmptyList'
import ErrorPlaceholder from '@sport/components/mobile/betPanel/betMatchColumn/ErrorPlaceholder'
import useCustomParams from '@sport/hooks/useCustomParams'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from '@sport/stores'
import { fetchMatchesDateList } from '@services/sportData/actions'
import { ApiStatus } from '@services/sportData/types'
import ErrorBoundary from '@sport/util/errorBoundary'

interface MCommonPannelProps {
    apiData?: any // FIXME: change to api type
    children: any
}

const MCommonPanel: React.FC<MCommonPannelProps> = ({ children, apiData }) => {
    const { source: fixtureSource, date = 'future', isSelectCompetition, sports = 'football' } = useCustomParams()

    const { Error: ApiError } = ApiStatus
    const dispatch = useDispatch()
    const apiStatus = useSelector((state) => state.sportData.apiStatus)
    const dataSource = useSelector((state) => state.sportGlobal.dataSource)
    const source = fixtureSource ?? dataSource

    const fetchDateList = async () => dispatch(fetchMatchesDateList(date, sports, date === 'parlay'))

    useEffect(() => {
        isSelectCompetition && fetchDateList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [source, date === 'parlay', isSelectCompetition, sports])

    const getPanel = () => {
        try {
            // requirement loading app when the app is in error status
            return apiStatus === ApiError ? (
                <ErrorPlaceholder />
            ) : (
                <ErrorBoundary errorReturn={<ErrorPlaceholder />} noErrorReturn={<>{children}</>} />
            )
        } catch (error) {
            return <ErrorPlaceholder />
        }
    }

    return !children ? <BetMatchEmptyList /> : getPanel()
}

export default MCommonPanel
