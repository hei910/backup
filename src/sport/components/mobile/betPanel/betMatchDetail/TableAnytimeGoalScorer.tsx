import ExpandableHeader from '@sport/components/mobile/header/ExpandableHeader'
import { ConvertedOutcome } from '@sport/converters/types'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/macro'
import { filterMarket, filterSpecifier } from '@sport/util/dataProcess'
import { ConvertedEvent } from '@sport/converters/types'
import GreySubHeader from './common/GreySubHeader'
import DetailOddsButton from './detailOddsButton'
import ExpandableContainer from './ExpandableContainer'

interface DetailComponentProps {
    data: ConvertedEvent
    marketCode: string
    ctid?: number
    firstHalf?: boolean
    title: string
}
interface TableComponentProps {
    firstData: ConvertedOutcome[]
    lastData: ConvertedOutcome[]
    anyData: ConvertedOutcome[]
    fixtureId: string
    firstId: string
    lastId: string
    anyId: string
}

interface TableBodyProps {
    outcomes: ConvertedOutcome[]
    marketId: string
}

const SMainContainer = styled.div`
    margin: 10px 0 0 0;
`

const STableContainer = styled.div`
    background: white;
`

const SRowContainer = styled.div`
    padding: 10px 10px 6px 8px;
`

const SButtonRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${(props) => props.theme.sport.colors.background};
    width: 100%;
`

const SButton = styled.div<{ active: string }>`
    background: ${(props) => (props.active === 'true' ? '#FFFFFF' : `${props.theme.sport.colors.background}`)};
    color: ${(props) => props.theme.sport.colors.primary};
    flex: 1;
    padding: 10px;
    text-align: center;
    border-right: 1px solid ${(props) => props.theme.sport.colors.table.column.border};
`

const STableRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const TableBody: React.FC<TableBodyProps> = ({ outcomes, marketId }) => {
    return (
        <SRowContainer>
            {outcomes.map((outcome, index) => (
                <STableRow key={`MobileDetailTableAnytimeGoalScorer-${marketId}-${index}-${outcome?.name}`}>
                    <DetailOddsButton
                        outcomeName={outcome?.name}
                        oddsInfo={outcome?.combinedID}
                        active={outcome?.active}
                        odds={outcome?.odds}
                    />
                </STableRow>
            ))}
        </SRowContainer>
    )
}
const ExpandableTable: React.FC<TableComponentProps> = ({
    firstData,
    lastData,
    anyData,
    fixtureId,
    firstId,
    lastId,
    anyId,
}) => {
    const { t } = useTranslation()
    const [outcomes, setOutcomes] = useState(firstData)
    const [activeButton, setActiveButton] = useState('first')
    const [marketId, setMarketId] = useState(firstId)
    const defaultHeight = firstData.length * 66
    const [activeHeight, setActiveHeight] = useState(defaultHeight)
    const firstDataHandler = () => {
        setOutcomes(firstData)
        setActiveButton('first')
        setMarketId(firstId)
        setActiveHeight(firstData.length * 66)
    }
    const lastDataHandler = () => {
        setOutcomes(lastData)
        setActiveButton(t(`last`))
        setMarketId(lastId)
        setActiveHeight(lastData.length * 66)
    }
    const anyDataHandler = () => {
        setOutcomes(anyData)
        setActiveButton(t(`anytime`))
        setMarketId(anyId)
        setActiveHeight(anyData.length * 66)
    }
    const buttonArray = [
        { title: t(`table.subheader.first`), handler: firstDataHandler, type: 'first', marketId: firstId },
        { title: t(`table.subheader.last`), handler: lastDataHandler, type: 'last', marketId: lastId },
        { title: t(`table.subheader.anytime`), handler: anyDataHandler, type: 'anytime', marketId: anyId },
    ]

    return (
        <>
            {firstData && lastData && anyData && (
                <>
                    <SButtonRow>
                        {buttonArray.map((button, index) => (
                            <SButton
                                onClick={button.handler}
                                active={(activeButton === button?.type).toString()}
                                key={`MobileDetailTableAnytimeGoalScorer-button-${button?.marketId}-${index}`}>
                                {button?.title}
                            </SButton>
                        ))}
                    </SButtonRow>
                    <STableContainer>
                        <ExpandableContainer activeHeight={activeHeight}>
                            <TableBody outcomes={outcomes} marketId={marketId} />
                        </ExpandableContainer>
                    </STableContainer>
                </>
            )}
        </>
    )
}

const TableAnytimeGoalScorer: React.FC<DetailComponentProps> = ({ data, title, marketCode }) => {
    const first = filterMarket(data?.markets, 'sco1st')?.[0]
    const last = filterMarket(data?.markets, 'scolast')?.[0]
    const any = filterMarket(data?.markets, 'scoant')?.[0]

    const homeFirst = filterSpecifier(first, 'h')
    const homeLast = filterSpecifier(last, 'h')
    const homeAny = filterSpecifier(any, 'h')

    const awayFirst = filterSpecifier(first, 'a')
    const awayLast = filterSpecifier(last, 'a')
    const awayAny = filterSpecifier(any, 'a')

    const totalMarkets =
        filterMarket(data?.markets, 'sco1st').length +
        filterMarket(data?.markets, 'scolast').length +
        filterMarket(data?.markets, 'scoant').length

    return (
        <>
            {totalMarkets > 0 && (
                <SMainContainer>
                    <ExpandableHeader title={title} defaultShow={true} isDetail={true}>
                        <GreySubHeader title={data?.competitors?.home?.name} />
                        <ExpandableTable
                            fixtureId={data.fixtureId}
                            firstData={homeFirst}
                            lastData={homeLast}
                            anyData={homeAny}
                            firstId={'hSco1st'}
                            lastId={'hScolast'}
                            anyId={'hScoant'}
                        />
                        <GreySubHeader title={data?.competitors?.away?.name} />
                        <ExpandableTable
                            fixtureId={data.fixtureId}
                            firstData={awayFirst}
                            lastData={awayLast}
                            anyData={awayAny}
                            firstId={'aSco1st'}
                            lastId={'aScolast'}
                            anyId={'aScoant'}
                        />
                    </ExpandableHeader>
                </SMainContainer>
            )}
        </>
    )
}

export default TableAnytimeGoalScorer
