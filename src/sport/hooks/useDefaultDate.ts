import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from '@redux'
import { getDefaultDate } from '@sport/util/dataProcess'
import useCustomParams from './useCustomParams'

const useDefaultDate = () => {
    const { date = 'all', sports = 'football', matchsStatus, isDetailPage } = useCustomParams()

    const dateList = useSelector((state) => state.sportData.dateList)
    const history = useHistory()

    useEffect(() => {
        const defaultDate = getDefaultDate(
            dateList ?? [],
            date,
            matchsStatus ?? date === 'parlay' ? 'parlay-Early' : 'Pre',
        )

        const reset = matchsStatus === undefined || (matchsStatus?.includes('parlay') && date !== 'parlay')

        if (dateList && reset && (date === 'future' || date === 'parlay') && !isDetailPage) {
            history.replace(`/sport/select-competition/${date}/${sports}/${defaultDate}`)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date, dateList])
}

export default useDefaultDate
