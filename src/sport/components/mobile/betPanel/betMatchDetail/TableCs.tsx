import ExpandableHeader from '@sport/components/mobile/header/ExpandableHeader'
import { ConvertedOutcome } from '@sport/converters/types'
import useCustomParams from '@sport/hooks/useCustomParams'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { NewCompetitors } from '@services/sportData/types'
import styled from 'styled-components/macro'
import { filterMarket, getHomeAwayDrawOutcomes } from '@sport/util/dataProcess'
import { DetailComponentProps } from './common/types'
import DetailOddsButton from './detailOddsButton'

interface ColumnProps {
    outcomes: ConvertedOutcome[]
    fixtureId: string
    marketId: string
}

interface SubHeaderComponentProps {
    competitors: NewCompetitors
    isAh?: string
}

const STableRow = styled.div`
    display: flex;
    align-items: flex-start;
    width: 100%;
`
const SColumn = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`

const STableMargin = styled.div`
    margin: 10px 0 0 0;
    background: white;
`
const SSubHeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px 10px 10px;
    margin-top: 5px;
`

const SCompetitor = styled.div<{ align: string }>`
    text-align: ${(props) => props.align};
    font-size: 13px;
    font-weight: 800;
    color: #232323;
    flex: 2;
`
const SVerses = styled(SCompetitor)`
    flex: 1;
`

const SubHeader: React.FC<SubHeaderComponentProps> = ({ competitors, isAh }) => {
    const { t } = useTranslation()
    const { sports } = useCustomParams()

    const renderVerses = () => {
        return isAh === 'ah' ||
            isAh === 'ah1st' ||
            isAh === 'ah2nd' ||
            isAh === 'ahq1' ||
            isAh === 'ahq2' ||
            isAh === 'ahq3' ||
            isAh === 'ahq4' ||
            isAh === 'ahf5in' ||
            isAh === 'ahfts' ||
            isAh?.includes('ml')
            ? 'VS'
            : t('outcomes.d')
    }
    return (
        <SSubHeaderContainer>
            <SCompetitor align={'left'}>{competitors.home.name}</SCompetitor>
            {sports !== 'tennis' && <SVerses align={'center'}>{renderVerses()}</SVerses>}
            <SCompetitor align={'right'}>{competitors.away.name}</SCompetitor>
        </SSubHeaderContainer>
    )
}

const TableColumns: React.FC<ColumnProps> = ({ outcomes }) => {
    const { t } = useTranslation()
    const csOutcomes = (outcomeCode?: string) => {
        if (!outcomeCode) {
            return ''
        }
        return outcomeCode === 'other' ? t('outcomes.other') : outcomeCode
    }
    return (
        <SColumn>
            {outcomes.map((outcome, index) => (
                <DetailOddsButton
                    key={`MobileDetailTableCs-outcome-${outcome?.outcomeCode}-${index}`}
                    active={outcome?.active}
                    odds={outcome?.odds}
                    oddsInfo={outcome.combinedID}
                    handicap={''}
                    outcomeName={csOutcomes(outcome?.outcomeCode)}
                />
            ))}
        </SColumn>
    )
}

const TableCs: React.FC<DetailComponentProps> = ({ data, title, marketCode }) => {
    const markets = filterMarket(data?.markets, marketCode)
    const { sports } = useCustomParams()

    return (
        <>
            {markets.length > 0 && (
                <>
                    {markets.map((market, index) => {
                        const outcomes = getHomeAwayDrawOutcomes(market.outcomes)
                        return (
                            <STableMargin key={`MobileDetailTableCs-market-${market?.market_id}-${index}`}>
                                <ExpandableHeader title={title} defaultShow={true} isDetail={true}>
                                    <SubHeader competitors={data?.competitors} />
                                    <STableRow>
                                        <TableColumns
                                            outcomes={outcomes?.home}
                                            fixtureId={data?.fixtureId}
                                            marketId={market?.market_id}
                                        />
                                        {sports !== 'tennis' && (
                                            <TableColumns
                                                outcomes={outcomes?.draw}
                                                fixtureId={data?.fixtureId}
                                                marketId={market?.market_id}
                                            />
                                        )}
                                        <TableColumns
                                            outcomes={outcomes.away}
                                            fixtureId={data?.fixtureId}
                                            marketId={market?.market_id}
                                        />
                                    </STableRow>
                                    <TableColumns
                                        outcomes={outcomes.other}
                                        fixtureId={data?.fixtureId}
                                        marketId={market?.market_id}
                                    />
                                </ExpandableHeader>
                            </STableMargin>
                        )
                    })}
                </>
            )}
        </>
    )
}

export default TableCs
