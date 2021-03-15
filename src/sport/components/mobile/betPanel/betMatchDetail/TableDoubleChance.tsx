import ExpandableHeader from '@sport/components/mobile/header/ExpandableHeader'
import { ConvertedEvent, ConvertedMarket, ConvertedOutcome } from '@sport/converters/types'
import React from 'react'
import { NewCompetitors } from '@services/sportData/types'
import styled from 'styled-components/macro'
import { convertOutcome, filterMarket } from '@sport/util/dataProcess'
import { DetailComponentProps } from './common/types'
import DetailOddsButton from './detailOddsButton'

interface TableProps {
    data: ConvertedEvent
    marketCode: string
}

interface TableBodyProps {
    fixtureId: string
    marketId: string
    market: ConvertedMarket
    competitors: NewCompetitors
}

interface DetailOddsSection {
    outcome: ConvertedOutcome
    competitors: NewCompetitors
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

const OddsSection: React.FC<DetailOddsSection> = ({ outcome, competitors }) => {
    // const { t } = useTranslation();
    const homeName = competitors.home.name
    const awayName = competitors.away.name

    const outcomeName = () => {
        const firstVar = outcome?.name.split('/')?.[0]
        const secondVar = outcome?.name.split('/')?.[1]
        if (firstVar === homeName && secondVar === awayName) {
            return '主/客'
        } else if (firstVar === homeName && secondVar === '和局') {
            return '主/和'
        } else if (firstVar === awayName && secondVar === '和局') {
            return '客/和'
        } else if (firstVar === '和局' && secondVar === '和局') {
            return '和局'
        } else {
            return outcome?.name
        }
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

const TableBody: React.FC<TableBodyProps> = ({ fixtureId, marketId, market, competitors }) => {
    return (
        <SBodyRow>
            {convertOutcome(market).map((outcome, index) => (
                <OddsSection
                    key={`MobileDetailTableDoubleChance-body-odds-${fixtureId}-${marketId}-${outcome?.outcomeCode}-${index}`}
                    outcome={outcome}
                    competitors={competitors}
                />
            ))}
        </SBodyRow>
    )
}

const Table: React.FC<TableProps> = ({ data, marketCode }) => {
    const markets = filterMarket(data.markets, marketCode)
    return (
        <>
            {markets.map((market, index) => (
                <TableBody
                    key={`MobileDetailDoubleChance-body-${data.fixtureId}-${marketCode}-${index}`}
                    fixtureId={data?.fixtureId}
                    marketId={market?.market_id}
                    market={market}
                    competitors={data?.competitors}
                />
            ))}
        </>
    )
}

const TableDoubleChance: React.FC<DetailComponentProps> = ({ data, title, marketCode }) => {
    return (
        <>
            <SMainContainer>
                <ExpandableHeader title={title} defaultShow={true} isDetail={true}>
                    <Table data={data} marketCode={marketCode} />
                </ExpandableHeader>
            </SMainContainer>
        </>
    )
}

export default TableDoubleChance
