import ExpandableHeader from '@sport/components/mobile/header/ExpandableHeader'
import { ConvertedEvent, ConvertedMarket, ConvertedOutcome } from '@sport/converters/types'
import React from 'react'
import styled from 'styled-components/macro'
import { convertOutcome, filterMarket } from '@sport/util/dataProcess'
import { tgMap } from '@sport/util/dictionary'
import { DetailComponentProps } from './common/types'
import DetailOddsButton from './detailOddsButton'

interface TableProps {
    data: ConvertedEvent
    marketCode: string
    title: string
}

interface TableBodyProps {
    fixtureId: string
    marketId: string
    market: ConvertedMarket
}

const SMainContainer = styled.div`
    margin: 10px 0 0 0;
    background: white;
`

const SBodyRow = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    background: #ffffff;
    margin: 10px 0 0;
    padding: 0 7.5px 5px 7.5px;
`

const SOddsWrap = styled.div`
    width: 50%;
`

const TableBody: React.FC<TableBodyProps> = ({ fixtureId, marketId, market }) => {
    const getOutcomeCodeArray = (outcomes: ConvertedOutcome[]) => {
        const outcomeCodeArray: number[] = []
        outcomes.forEach((outcome) => {
            const outcomeNumber = outcome?.outcomeCode.split('')[1]
            outcomeCodeArray.push(Number(outcomeNumber))
        })
        return outcomeCodeArray
    }

    const largestNumber = (outcomes: ConvertedOutcome[]) => {
        const outcomeCodeArray = getOutcomeCodeArray(outcomes)
        return Math.max.apply(Math, outcomeCodeArray).toString()
    }

    return (
        <>
            <SBodyRow>
                {convertOutcome(market).map((outcome, index) => (
                    <SOddsWrap
                        key={`MobileDetailTableTg-body-odds-${fixtureId}-${marketId}-${outcome?.outcomeCode}-${index}`}>
                        <DetailOddsButton
                            active={outcome?.active}
                            odds={outcome?.odds}
                            oddsInfo={outcome?.combinedID}
                            handicap={''}
                            outcomeName={tgMap(outcome?.outcomeCode, largestNumber(convertOutcome(market)), outcome)}
                        />
                    </SOddsWrap>
                ))}
            </SBodyRow>
        </>
    )
}

const Table: React.FC<TableProps> = ({ data, marketCode, title }) => {
    const markets = filterMarket(data?.markets, marketCode)
    return (
        <>
            {markets.map((market, index) => (
                <SMainContainer key={`MobileDetailTableTg-body-${data?.fixtureId}-${marketCode}-${index}`}>
                    <ExpandableHeader title={title} defaultShow={true} isDetail={true}>
                        <TableBody fixtureId={data?.fixtureId} marketId={market?.market_id} market={market} />
                    </ExpandableHeader>
                </SMainContainer>
            ))}
        </>
    )
}

const TableTg: React.FC<DetailComponentProps> = ({ data, title, marketCode }) => {
    const markets = filterMarket(data?.markets, marketCode)
    return <>{markets.length > 0 && <Table data={data} marketCode={marketCode} title={title} />}</>
}

export default TableTg
