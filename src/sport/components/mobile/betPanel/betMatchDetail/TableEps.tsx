import ExpandableHeader from '@sport/components/mobile/header/ExpandableHeader'
import OddsButton from '@sport/components/mobile/oddsButton'
import { ConvertedEvent, ConvertedOutcome } from '@sport/converters/types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/macro'
import { convertOutcome, filterMarket } from '@sport/util/dataProcess'

interface ComponentProps {
    data: ConvertedEvent[]
    marketCode: string
}

interface TableRowProp {
    outcome: ConvertedOutcome
}
const SMainContainer = styled.div`
    background: #ffffff;
`

const STitleRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 200px;
    font-size: 14px;
    flex: 3;
`

const SBefore = styled.div`
    color: ${(props) => props.theme.sport.colors.tertiary};
    margin-right: 40px;
`

const SNow = styled.div`
    margin-right: 25px;
    color: ${(props) => props.theme.sport.colors.active};
`

const STableRow = styled.div`
    border-bottom: 1px solid ${(props) => props.theme.sport.colors.background};
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const STitle = styled.div`
    color: ${(props) => props.theme.sport.colors.primary};
    font-size: 14px;
    margin-right: 5px;
    flex: 1;
`

const SSpecifier = styled.div`
    font-size: 12px;
    flex: 1;
    height: 100%;
    width: 60px;
    padding: 15px 0;
    text-align: center;
    margin-right: 10px;
    text-decoration: line-through;
    text-decoration-color: ${(props) => props.theme.sport.colors.table.detail.higherRate.background};
`

const SRightContainer = styled.div`
    display: flex;
    align-items: center;
`

const SMargin = styled.div`
    margin: 10px 0 0 0;
`

const TableRow: React.FC<TableRowProp> = ({ outcome }) => {
    const oddsStyle = { height: '100%', minWidth: '60px', width: '60px', fontWeight: '500', padding: '15px 0' }
    return (
        <STableRow>
            <STitle>{outcome?.name}</STitle>
            <SRightContainer>
                <SSpecifier>{outcome?.specifier}</SSpecifier>
                <OddsButton
                    active={outcome?.active}
                    odds={outcome?.odds}
                    oddsInfo={outcome?.combinedID}
                    handicap={''}
                    style={oddsStyle}
                    rulesActiveKey={outcome?.rulesActiveKey}
                />
            </SRightContainer>
        </STableRow>
    )
}

const TableEps: React.FC<ComponentProps> = ({ data, marketCode }) => {
    const convertedFixture = data.filter((event) => event?.ctid === 0)[0]
    const markets = filterMarket(convertedFixture.markets, marketCode)
    const { t } = useTranslation()

    const rightSide = (
        <STitleRow>
            <SBefore>{t('table.eps.before')}</SBefore>
            <SNow>{t('table.eps.now')}</SNow>
        </STitleRow>
    )
    return (
        <>
            {markets.length > 0 && (
                <SMargin>
                    {markets.map((market, index) => (
                        <ExpandableHeader
                            key={`MobileDetailTableEps-${index}`}
                            title={t('table.eps.eps')}
                            defaultShow={true}
                            isDetail={true}
                            rightSide={rightSide}
                            isEps={true}>
                            <SMainContainer>
                                {convertOutcome(market).map((outcome, oIndex) => (
                                    <TableRow
                                        key={`MobileDetailTableEps-TableRow-${convertedFixture?.fixtureId}-${market?.market_id}-${outcome?.outcomeCode}-${oIndex}`}
                                        outcome={outcome}
                                    />
                                ))}
                            </SMainContainer>
                        </ExpandableHeader>
                    ))}
                </SMargin>
            )}
        </>
    )
}
export default TableEps
