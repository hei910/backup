import ExpandableHeader from '@sport/components/mobile/header/ExpandableHeader'
import { ConvertedEvent, ConvertedOutcome } from '@sport/converters/types'
import React from 'react'
import styled from 'styled-components/macro'
import { convertOutcome, filterMarket } from '@sport/util/dataProcess'
import { DetailComponentProps } from './common/types'
import DetailOddsButton from './detailOddsButton'

interface TableProps {
    data: ConvertedEvent
    marketCode: string
}

interface DetailOddsSection {
    outcome: ConvertedOutcome
}

interface TableBodyOutcomeArrayProps {
    outcomes: ConvertedOutcome[]
    fixtureId: string
    marketId: string
}
const SMainContainer = styled.div`
    margin: 10px 0 0 0;
    background: white;
`

const SBodyRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background: #ffffff;
    padding: 0 7.5px 5px 7.5px;
    margin: 10px 0 0;
`

const OddsSection: React.FC<DetailOddsSection> = ({ outcome }) => {
    return (
        <DetailOddsButton
            active={outcome?.active}
            odds={outcome?.odds}
            oddsInfo={outcome?.combinedID}
            handicap={''}
            outcomeName={outcome?.name}
        />
    )
}

const TableBody: React.FC<TableBodyOutcomeArrayProps> = ({ fixtureId, marketId, outcomes }) => {
    return (
        <SBodyRow>
            {outcomes.map((outcome, index) => (
                <OddsSection
                    key={`MobileDetailTableSingleRow-${fixtureId}-${marketId}-${outcome?.outcomeCode}-${index}`}
                    outcome={outcome}
                />
            ))}
        </SBodyRow>
    )
}

const Table: React.FC<TableProps> = ({ data, marketCode }) => {
    const markets = filterMarket(data?.markets, marketCode)
    return (
        <>
            {markets.map((market, index) => (
                <TableBody
                    key={`MobileDetailTableSingleRow-body-${data?.fixtureId}-${marketCode}-${index}`}
                    fixtureId={data?.fixtureId}
                    marketId={market?.market_id}
                    outcomes={convertOutcome(market)}
                />
            ))}
        </>
    )
}

const TableSingleRow: React.FC<DetailComponentProps> = ({ data, title, marketCode }) => {
    const markets = filterMarket(data.markets, marketCode)
    return (
        <>
            {markets.length > 0 && (
                <SMainContainer>
                    <ExpandableHeader title={title} defaultShow={true} isDetail={true}>
                        <Table data={data} marketCode={marketCode} />
                    </ExpandableHeader>
                </SMainContainer>
            )}
        </>
    )
}

export default TableSingleRow
