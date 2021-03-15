import { DetailComponentProps } from '@sport/components/mobile/betPanel/betMatchDetail/types'
import ExpandableHeader from '@sport/components/mobile/header/ExpandableHeader'
import { ConvertedMarket } from '@sport/converters/types'
import useCustomParams from '@sport/hooks/useCustomParams'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { NewCompetitors } from '@services/sportData/types'
import styled from 'styled-components/macro'
import { convertOutcome, filterMarket } from '@sport/util/dataProcess'
import { headerMarketCodeMap } from '@sport/util/dictionary'
import DetailOddsButton from './detailOddsButton'
interface TableRowProps {
    fixtureId: string
    marketId: string
    market: ConvertedMarket
    competitors: NewCompetitors
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

const TableRow: React.FC<TableRowProps> = ({ fixtureId, marketId, market, competitors }) => {
    const { t } = useTranslation()
    const teamMap = (qualifier: string, competitors: NewCompetitors) => {
        const draw = t(`outcomes.d`)
        if (qualifier === 'h') {
            return competitors?.home?.name
        } else if (qualifier === 'a') {
            return competitors?.away?.name
        } else {
            return draw
        }
    }
    const htftMap = (outcomeCode: string, competitors: NewCompetitors) => {
        if (!outcomeCode || !competitors) {
            return ''
        }

        const qualifierArray = outcomeCode.split('')
        return `${teamMap(qualifierArray[0], competitors)}/${teamMap(qualifierArray[1], competitors)}`
    }
    return (
        <>
            {convertOutcome(market).map((outcome, index) => (
                <STableRow key={`OurRightDetail-TableRow-${fixtureId}-${marketId}-${outcome?.outcomeCode}`}>
                    {/* <STitle>{htftMap(outcome?.outcomeCode, competitors)}</STitle> */}
                    <DetailOddsButton
                        outcomeName={htftMap(outcome?.outcomeCode, competitors)}
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

const TableHtft: React.FC<DetailComponentProps> = ({ data, title, marketCode }) => {
    const { sports } = useCustomParams()

    const markets = filterMarket(data?.markets, marketCode)
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
                        <SMainContainer key={`MobileDetailTableCommon-${market?.name}-${index}`}>
                            <ExpandableHeader
                                // title={`${marketCode} ${headerMarketCodeMap(titleObj(market))}`}
                                title={headerMarketCodeMap(titleObj(market))}
                                defaultShow={false}
                                isDetail={true}>
                                <STableContainer>
                                    <TableRow
                                        fixtureId={data?.fixtureId}
                                        marketId={market?.market_id}
                                        market={market}
                                        competitors={data?.competitors}
                                    />
                                </STableContainer>
                            </ExpandableHeader>
                        </SMainContainer>
                    ))}
                </>
            )}
        </>
    )
}

export default TableHtft
