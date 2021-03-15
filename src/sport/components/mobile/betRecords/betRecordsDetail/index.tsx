import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from '@sport/stores'
import { BetRecord } from '@services/sportBet/types'
import styled from 'styled-components/macro'
import BetRecordItem from './BetRecordItem'
import PageNumberIndicator from './PageNumberIndicator'

interface BetRecordsDetailProps {
    fetchRecord: (nextPage: number) => void
}
const BetListLayout = styled.div`
    padding: 10px;
`

const BetListHeader = styled.div`
    background: #363636;
    display: flex;
    padding: 10px 15px;
    margin-top: 10px;
    color: #ffffff;
    font-size: 12px;
    justify-content: space-between;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
`

const BetListHeaderItem = styled.div<{ position: string } & React.HTMLAttributes<HTMLDivElement>>`
    flex: 1 1 auto;
    text-align: ${(props) => props.position};
`

const HighlightBetWin = styled.span<{ amount: number } & React.HTMLAttributes<HTMLSpanElement>>`
    color: ${(props) => (props.amount > 0 ? '#19DA05' : props.amount < 0 ? '#E51717' : '#FFFFFF')};
`

const BetRecordsContainer = styled.div<{ isLoading: boolean } & React.HTMLAttributes<HTMLDivElement>>`
    display: ${(props) => (props.isLoading ? 'none' : 'block')};
`

const BetRecordEmpty = styled.div`
    min-height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #cccccc;
`

const BetRecordsDetail: React.FC<BetRecordsDetailProps> = ({ fetchRecord }) => {
    const { t } = useTranslation()
    const allRecords: BetRecord[] = useSelector((state) => state.sportBet.records['settled'])
    const isLoading = useSelector((state) => state.sportGlobal.isGlobalLoading)
    const numOfRecords = useSelector((state) => state.sportBet.records.paging.settled?.totalElements) || 0
    const totalEffectiveAnte = useSelector((state) => state.sportBet.records.paging.settled?.totalEffectiveAnte) || 0
    const totalPayoutAmount = useSelector((state) => state.sportBet.records.paging.settled?.totalPayoutAmount) || 0
    const [expandList, setExpandList] = useState<{ [id: string]: boolean }>({})

    const toggleExpand = useCallback((id: number) => {
        setExpandList((prevExpandList) => {
            return { ...prevExpandList, [id]: !prevExpandList[id] }
        })
    }, [])

    useEffect(() => {
        setExpandList({})
    }, [allRecords])

    return (
        <BetListLayout>
            <PageNumberIndicator fetchRecord={fetchRecord}></PageNumberIndicator>
            <BetListHeader>
                <BetListHeaderItem position="left">{`${t('betRecord.numOfBet')} ${
                    isLoading ? '' : numOfRecords
                }`}</BetListHeaderItem>
                <BetListHeaderItem position="center">{`${t('betRecord.validAnteAmount')} ${
                    isLoading ? '' : totalEffectiveAnte.toFixed(2)
                }`}</BetListHeaderItem>
                <BetListHeaderItem position="right">
                    {`${t('betRecord.winOrLose')}: `}
                    <HighlightBetWin amount={totalPayoutAmount - totalEffectiveAnte}>
                        {isLoading ? '' : (totalPayoutAmount - totalEffectiveAnte).toFixed(2)}
                    </HighlightBetWin>
                </BetListHeaderItem>
            </BetListHeader>
            <BetRecordsContainer isLoading={isLoading}>
                {numOfRecords === 0 ? (
                    <BetRecordEmpty>{t('betRecord.emptyRecord')}</BetRecordEmpty>
                ) : (
                    <>
                        {allRecords.map((record: BetRecord) => {
                            return (
                                <BetRecordItem
                                    key={`bet-record-item-${record.id}`}
                                    id={record.id}
                                    settled={!!record.lastSettleTime}
                                    data={record}
                                    isExpanded={expandList[record.id]}
                                    toggleExpand={toggleExpand}
                                />
                            )
                        })}
                        <PageNumberIndicator fetchRecord={fetchRecord}></PageNumberIndicator>
                    </>
                )}
            </BetRecordsContainer>
        </BetListLayout>
    )
}

export default BetRecordsDetail
