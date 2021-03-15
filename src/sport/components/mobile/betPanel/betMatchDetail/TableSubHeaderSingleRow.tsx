import ExpandableHeader from '@sport/components/mobile/header/ExpandableHeader'
import { ConvertedMarket, ConvertedOutcome } from '@sport/converters/types'
import useCustomParams from '@sport/hooks/useCustomParams'
import React from 'react'
import styled from 'styled-components/macro'
import { convertOutcome, filterMarket } from '@sport/util/dataProcess'
import { headerMarketCodeMap } from '@sport/util/dictionary'
import SubHeader from './common/SubHeader'
import { DetailComponentProps } from './common/types'
import DetailOddsButton from './detailOddsButton'

interface TableBodyOutcomeArrayProps {
    outcomes: ConvertedOutcome[]
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
    padding: 0 7.5px 0 7.5px;
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

const SPBody: React.FC<TableBodyOutcomeArrayProps> = ({ outcomes }) => {
    return (
        <>
            <SBodyRow>
                {outcomes.map((outcome, index) => (
                    <OddsSection key={`MobileDetailTableAhSP-${outcome?.outcomeCode}-${index}`} outcome={outcome} />
                ))}
            </SBodyRow>
        </>
    )
}

const TableSubHeaderSingleRow: React.FC<DetailComponentProps> = ({ data, title, marketCode }) => {
    const markets = filterMarket(data.markets, marketCode)
    const { sports } = useCustomParams()

    const titleObj = (market: ConvertedMarket) => {
        return {
            ctid: 0,
            competitors: data?.competitors,
            marketName: market?.name ?? market?.marketCode,
            marketCode,
            fixtureId: data?.fixtureId ?? '',
            sportType: sports ?? '',
        }
    }
    return (
        <>
            {markets.length > 0 && (
                <>
                    {markets.map((market, index) => (
                        <SMainContainer key={`MobileDetailTableAh-body-${data?.fixtureId}-${marketCode}-${index}`}>
                            <ExpandableHeader
                                title={headerMarketCodeMap(titleObj(market))}
                                defaultShow={true}
                                isDetail={true}>
                                <SubHeader competitors={data?.competitors} isAh={marketCode} />
                                <SPBody outcomes={convertOutcome(market)} />
                            </ExpandableHeader>
                        </SMainContainer>
                    ))}
                </>
            )}
        </>
    )
}

export default TableSubHeaderSingleRow
