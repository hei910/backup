import { DetailComponentProps } from '@sport/components/mobile/betPanel/betMatchDetail/types'
import ExpandableHeader from '@sport/components/mobile/header/ExpandableHeader'
import { ConvertedMarket, ConvertedOutcome } from '@sport/converters/types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { NewCompetitors } from '@services/sportData/types'
import styled from 'styled-components/macro'
import { filterMarket } from '@sport/util/dataProcess'
import GreySubHeader from './common/GreySubHeader'
import DetailOddsButton from './detailOddsButton'

interface TableRowProps {
    market: ConvertedMarket
    competitors?: NewCompetitors
}

interface DetailOddsSection {
    outcome: ConvertedOutcome
    outcomeName?: string
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
    /* border-bottom: 1px solid ${(props) => props.theme.sport.colors.background}; */

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const OddsSection: React.FC<DetailOddsSection> = ({ outcome, outcomeName }) => {
    return (
        <DetailOddsButton
            outcomeName={outcomeName}
            oddsInfo={outcome?.combinedID}
            handicap={outcome?.specifier}
            active={outcome?.active}
            odds={outcome?.odds}
        />
    )
}
const TableRow1st: React.FC<TableRowProps> = ({ market, competitors }) => {
    return (
        <>
            <STableRow>
                <OddsSection outcome={market?.outcomes?.hfg} outcomeName={competitors?.home?.name} />
            </STableRow>
            <STableRow>
                <OddsSection outcome={market?.outcomes?.afg} outcomeName={competitors?.away?.name} />
            </STableRow>
        </>
    )
}

const TableRowLast: React.FC<TableRowProps> = ({ market, competitors }) => {
    return (
        <>
            <STableRow>
                <OddsSection outcome={market?.outcomes?.hlg} outcomeName={competitors?.home?.name} />
            </STableRow>
            <STableRow>
                <OddsSection outcome={market?.outcomes?.alg} outcomeName={competitors?.away?.name} />
            </STableRow>
        </>
    )
}

const TableTts: React.FC<DetailComponentProps> = ({ data, title, marketCode }) => {
    const tts1stMarkets = filterMarket(data?.markets, 'tts1st')
    const ttslastMarkets = filterMarket(data?.markets, 'ttslast')
    const { t } = useTranslation()
    if (marketCode === 'ttslast') {
        return <></>
    }
    return (
        <>
            {tts1stMarkets.length > 0 && ttslastMarkets.length > 0 && (
                <SMainContainer>
                    <ExpandableHeader title={title} defaultShow={false} isDetail={true}>
                        <GreySubHeader title={t('table.subheader.tts1st')} />
                        {tts1stMarkets.map((market, index) => (
                            <STableContainer key={`MobileDetailTableTts-tts1st-${market?.name}-${index}`}>
                                <TableRow1st market={market} competitors={data?.competitors} />
                            </STableContainer>
                        ))}
                        <GreySubHeader title={t('table.subheader.ttslast')} />
                        <STableContainer>
                            {ttslastMarkets.map((market, index) => (
                                <React.Fragment key={`MobileDetailTableTts-ttslast-${market?.name}-${index}`}>
                                    <TableRowLast market={market} competitors={data?.competitors} />
                                </React.Fragment>
                            ))}
                            {tts1stMarkets.map((market, index) => (
                                <STableRow key={`MobileDetailTableTts-ttsng-${market?.name}-${index}`}>
                                    <OddsSection
                                        outcome={market?.outcomes.ng}
                                        outcomeName={market?.outcomes?.ng?.name}
                                    />
                                </STableRow>
                            ))}
                        </STableContainer>
                    </ExpandableHeader>
                </SMainContainer>
            )}
        </>
    )
}

export default TableTts
