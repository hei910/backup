import ExpandableHeader from '@sport/components/mobile/header/ExpandableHeader'
import { ConvertedEvent, ConvertedOutcome } from '@sport/converters/types'
import useCustomParams from '@sport/hooks/useCustomParams'
import React from 'react'
import { NewCompetitors } from '@services/sportData/types'
import styled from 'styled-components/macro'
import { filterMarket } from '@sport/util/dataProcess'
import SubHeader from './common/SubHeader'
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

// const SSubHeaderContainer = styled.div`
//     display: flex;
//     flex-direction: row;
//     justify-content: space-between;
//     align-items: center;
//     padding: 5px 10px 15px 10px;
// `;

// const SCompetitor = styled.div<{ align: string }>`
//     text-align: ${(props) => props.align};
//     font-size: 13px;
//     font-weight: 800;
//     color: #232323;
// `;

const SBodyRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background: #ffffff;
    padding: 0 7.5px 0 7.5px;
`
// const SVerses = styled(SCompetitor)``;

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
            {outcomes?.h && <OddsSection outcome={outcomes?.h} />}
            {outcomes?.a && <OddsSection outcome={outcomes?.a} />}
        </SBodyRow>
    )
}

const Table: React.FC<TableProps> = ({ data, marketCode, competitors }) => {
    const markets = filterMarket(data.markets, marketCode)

    return (
        <>
            <SubHeader competitors={competitors} isAh={marketCode} />
            {markets.map((market, index) => (
                <TableBody
                    key={`MobileDetailTableAh-body-${data?.fixtureId}-${marketCode}-${index}`}
                    outcomes={market?.outcomes}
                />
            ))}
        </>
    )
}

const TableAh: React.FC<DetailComponentProps> = ({ data, title, marketCode, competitors }) => {
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

export default TableAh
