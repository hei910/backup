import ExpandableHeader from '@sport/components/mobile/header/ExpandableHeader'
import { ConvertedEvent, ConvertedMarket, ConvertedOutcome } from '@sport/converters/types'
import React from 'react'
import styled from 'styled-components/macro'
import { convertOutcome, filterMarket } from '@sport/util/dataProcess'
import SubHeader from './common/SubHeader'
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
    /* margin-bottom: 5px; */
`

const SColumn = styled.div`
    display: flex;
    flex-direction: column;
    flex-direction: flex-start;
    flex: 1;
`

const OddsSection: React.FC<DetailOddsSection> = ({ outcome }) => {
    const outcomeName = () => {
        return outcome.name.split('&')[1]
    }
    return (
        <DetailOddsButton
            active={outcome?.active}
            odds={outcome?.odds}
            oddsInfo={outcome?.combinedID}
            handicap={''}
            outcomeName={outcomeName()}
        />
    )
}
const RowColumn: React.FC<TableBodyOutcomeArrayProps> = ({ outcomes }) => {
    return (
        <SColumn>
            {outcomes.map((outcome, index) => (
                <OddsSection key={`TableFT1x2OUN-outcomes-${outcome?.outcomeCode}-${index}`} outcome={outcome} />
            ))}
        </SColumn>
    )
}

const Table: React.FC<TableProps> = ({ data, marketCode }) => {
    const markets = filterMarket(data?.markets, marketCode)
    const homeTeam = data?.competitors?.home?.name
    const awayTeam = data?.competitors?.away?.name
    const draw = 'draw'
    const filterOutcome = (market: ConvertedMarket, homeTeam: string, awayTeam: string, dataType: string) => {
        const homeData = convertOutcome(market).filter((outcome) => outcome?.name.includes(homeTeam))
        const awayData = convertOutcome(market).filter((outcome) => outcome?.name.includes(awayTeam))
        const drawData = convertOutcome(market).filter(
            (outcome) => outcome?.name.includes('和局') || outcome?.name.includes('平局'),
        )

        if (dataType === homeTeam) {
            return homeData
        } else if (dataType === awayTeam) {
            return awayData
        } else {
            return drawData
        }
    }
    return (
        <>
            <SubHeader competitors={data?.competitors} />
            {markets.map((market, index) => (
                <SBodyRow key={`TableFT1x2FTOU-SBodyRow-${market?.marketCode}-${index}`}>
                    <RowColumn
                        fixtureId={data?.fixtureId}
                        marketId={market?.market_id}
                        outcomes={filterOutcome(market, homeTeam, awayTeam, homeTeam)}
                    />
                    <RowColumn
                        fixtureId={data?.fixtureId}
                        marketId={market?.market_id}
                        outcomes={filterOutcome(market, homeTeam, awayTeam, draw)}
                    />
                    <RowColumn
                        fixtureId={data?.fixtureId}
                        marketId={market?.market_id}
                        outcomes={filterOutcome(market, homeTeam, awayTeam, awayTeam)}
                    />
                </SBodyRow>
            ))}
        </>
    )
}

const TableFT1x2OU: React.FC<DetailComponentProps> = ({ data, title, marketCode }) => {
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

export default TableFT1x2OU
