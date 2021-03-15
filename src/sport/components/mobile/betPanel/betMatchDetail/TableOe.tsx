import ExpandableHeader from '@sport/components/mobile/header/ExpandableHeader'
import { ConvertedEvent, ConvertedOutcome } from '@sport/converters/types'
import useCustomParams from '@sport/hooks/useCustomParams'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/macro'
import { filterMarket } from '@sport/util/dataProcess'
import { DetailComponentProps, TableBodyOutcomeObjectProps } from './common/types'
import DetailOddsButton from './detailOddsButton'

interface TableProps {
    data: ConvertedEvent
    marketCode: string
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
    margin: 10px 0 0;
`

const OddsSection: React.FC<DetailOddsSection> = ({ outcome }) => {
    const { t } = useTranslation()
    const outcomeName = () => {
        if (outcome?.outcomeCode === 'od') {
            return `${t('outcomes.od')}`
        } else {
            return `${t('outcomes.ev')}`
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

const TableBody: React.FC<TableBodyOutcomeObjectProps> = ({ outcomes }) => {
    return (
        <SBodyRow>
            <OddsSection outcome={outcomes?.od} />
            <OddsSection outcome={outcomes?.ev} />
        </SBodyRow>
    )
}

const Table: React.FC<TableProps> = ({ data, marketCode }) => {
    const markets = filterMarket(data?.markets, marketCode)
    return (
        <>
            {markets.map((market, index) => (
                <TableBody
                    key={`MobileDetailTableOe-body-${data?.fixtureId}-${marketCode}-${index}`}
                    outcomes={market?.outcomes}
                />
            ))}
        </>
    )
}

const TableOe: React.FC<DetailComponentProps> = ({ data, title, marketCode }) => {
    const { date } = useCustomParams()
    const cornerScore = date !== 'inplay' ? '-' : `${data?.score?.homeScore}-${data?.score?.awayScore}`
    const markets = filterMarket(data.markets, marketCode)
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
                        <Table data={data} marketCode={marketCode} />
                    </ExpandableHeader>
                </SMainContainer>
            )}
        </>
    )
}

export default TableOe
