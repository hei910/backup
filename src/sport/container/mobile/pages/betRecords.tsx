import BetRecordsDetail from '@sport/components/mobile/betRecords/betRecordsDetail/index'
import BetRecordsMenu from '@sport/components/mobile/betRecords/betRecordsMenu/index'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useDispatch } from '@sport/stores'
import { fetchBetRecordsMobile } from '@services/sportBet/actions'
import styled from 'styled-components/macro'
import PageContainer from '../PageContainer'

const SBetRecordContainer = styled.div`
    margin-top: -56px;
`

const BetRecordsContainer: React.FC = () => {
    const [info, setInfo] = useState({ greaterThan: '', lessThan: '' })
    const dispatch = useDispatch()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    function fetchRecord<T extends string | number>(page = 1, gte?: T, lte?: T): void {
        if (gte !== undefined && lte !== undefined) {
            let greaterThan: string
            let lessThan: string
            if (typeof gte === 'number' && typeof lte === 'number') {
                greaterThan = `${dayjs().subtract(gte, 'day').format('YYYY-MM-DD')}T00:00:00Z`
                lessThan = `${dayjs().subtract(lte, 'day').format('YYYY-MM-DD')}T23:59:59Z`
            } else {
                lessThan = lte as string
                greaterThan = gte as string
            }
            setInfo({ greaterThan, lessThan })
            dispatch(fetchBetRecordsMobile(greaterThan, lessThan, page))
        } else {
            dispatch(fetchBetRecordsMobile(info.greaterThan, info.lessThan, page))
        }
    }

    return (
        <PageContainer>
            <SBetRecordContainer>
                <BetRecordsMenu fetchRecord={fetchRecord} />
                <BetRecordsDetail fetchRecord={fetchRecord} />
            </SBetRecordContainer>
        </PageContainer>
    )
}

export default React.memo(BetRecordsContainer)
