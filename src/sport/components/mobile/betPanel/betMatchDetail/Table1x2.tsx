import SubHeader from '@sport/components/mobile/betPanel/betMatchDetail/common/SubHeader'
import ExpandableHeader from '@sport/components/mobile/header/ExpandableHeader'
import { ConvertedEvent, ConvertedOutcome } from '@sport/converters/types'
import useCustomParams from '@sport/hooks/useCustomParams'
import React from 'react'
import { NewCompetitors } from '@services/sportData/types'
import styled from 'styled-components/macro'
import { filterMarket } from '@sport/util/dataProcess'
import EmptyOdds from './common/EmptyOdds'
import { DetailComponentProps, TableBodyOutcomeObjectProps } from './common/types'
import DetailOddsButton from './detailOddsButton'

interface TableProps {
    data: ConvertedEvent
    marketCode: string
    competitors: NewCompetitors
}

interface DetailOddsSection {
    outcome: ConvertedOutcome
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
`

const OddsSection: React.FC<DetailOddsSection> = ({ outcome }) => {
    return (
        <DetailOddsButton
            active={outcome?.active}
            odds={outcome?.odds}
            oddsInfo={outcome?.combinedID}
            handicap={outcome?.specifier}
            outcomeName={''}
        />
    )
}
const TableBody: React.FC<TableBodyOutcomeObjectProps> = ({ outcomes }) => {
    return (
        <SBodyRow>
            {outcomes?.h ? <OddsSection outcome={outcomes?.h} /> : <EmptyOdds />}
            {outcomes?.d && <OddsSection outcome={outcomes?.d} />}
            {outcomes?.a ? <OddsSection outcome={outcomes?.a} /> : <EmptyOdds />}
        </SBodyRow>
    )
}

const Table: React.FC<TableProps> = ({ data, marketCode, competitors }) => {
    const markets = filterMarket(data?.markets, marketCode)

    return (
        <>
            <SubHeader competitors={competitors} isAh={marketCode} />
            {markets.map((market, index) => (
                <TableBody
                    key={`MobileDetailTable1x2-body-${data?.fixtureId}-${marketCode}-${index}`}
                    outcomes={market?.outcomes}
                />
            ))}
        </>
    )
}

const Table1x2: React.FC<DetailComponentProps> = ({ data, title, marketCode, competitors }) => {
    const { date } = useCustomParams()
    const cornerScore = date !== 'inplay' ? '-' : `${data?.score?.homeScore}-${data?.score?.awayScore}`
    const markets = filterMarket(data?.markets, marketCode)
    return (
        <>
            {markets.length > 0 && (
                <SMainContainer>
                    <ExpandableHeader
                        title={title}
                        defaultShow={true}
                        isDetail={true}
                        isCorner={data?.ctid === 1}
                        cornerScore={cornerScore}>
                        <Table data={data} marketCode={marketCode} competitors={competitors ?? data?.competitors} />
                    </ExpandableHeader>
                </SMainContainer>
            )}
        </>
    )
}

export default Table1x2
