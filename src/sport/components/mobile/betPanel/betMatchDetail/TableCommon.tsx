import ExpandableHeader from '@sport/components/mobile/header/ExpandableHeader'
import { ConvertedEvent, ConvertedMarket } from '@sport/converters/types'
import useCustomParams from '@sport/hooks/useCustomParams'
import React from 'react'
import { NewCompetitors } from '@services/sportData/types'
import styled from 'styled-components/macro'
import { convertOutcome, filterMarket } from '@sport/util/dataProcess'
import DetailOddsButton from './detailOddsButton'

interface ComponentProps {
    data: ConvertedEvent
    ctid: number
    marketCode: string
    competitors?: NewCompetitors
}

interface TableRowProps {
    fixtureId: string
    marketId: string
    market: ConvertedMarket
}

const SMainContainer = styled.div`
    background: white;
    margin: 10px 0 0 0;
`

// const SGreyCount = styled.div`
//     background: ${(props) => props.theme.sport.colors.background};
//     padding: 5px;
//     border-radius: 5px;
//     line-height: 12px;
//     font-size: 12px;
//     margin-right: 10px;
//     min-width: 22px;
//     text-align: center;
// `;

const STableContainer = styled.div`
    padding: 10px 10px 6px 8px;
`

const STableRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`
const TableRow: React.FC<TableRowProps> = ({ fixtureId, marketId, market }) => {
    return (
        <>
            {convertOutcome(market).map((outcome, index) => (
                <STableRow key={`OurRightDetail-TableRow-${fixtureId}-${marketId}-${outcome?.outcomeCode}`}>
                    <DetailOddsButton
                        outcomeName={outcome?.name}
                        oddsInfo={outcome?.combinedID}
                        handicap={outcome?.specifier}
                        active={outcome?.active}
                        odds={outcome?.odds}
                    />
                </STableRow>
            ))}
        </>
    )
}

const TableCommon: React.FC<ComponentProps> = ({ data, marketCode, ctid, competitors }) => {
    const { date } = useCustomParams()
    const markets = filterMarket(data.markets, marketCode)
    const cornerScore = date !== 'inplay' ? '-' : `${data?.score?.homeScore}-${data?.score?.awayScore}`
    return (
        <>
            {marketCode !== 'eps' &&
                marketCode !== 'tgsp' &&
                marketCode !== 'scoant' &&
                marketCode !== 'sco1st' &&
                marketCode !== 'scolast' &&
                markets.length > 0 && // prettier-ignore
                <>
                    {markets.map((market, index) => (
                        <SMainContainer key={`MobileDetailTableCommon-${market?.name}-${index}`}>
                            <ExpandableHeader
                                // title={`${marketCode} ${market?.header}`}
                                title={market.header}
                                defaultShow={false}
                                isDetail={true}
                                isCorner={data?.ctid === 1}
                                cornerScore={cornerScore}>
                                <STableContainer>
                                    <TableRow
                                        fixtureId={data?.fixtureId}
                                        marketId={market?.market_id}
                                        market={market}
                                    />
                                </STableContainer>
                            </ExpandableHeader>
                        </SMainContainer>
                    ))}
                </>}
        </>
    )
}

export default TableCommon
