import ExpandableHeader from '@sport/components/mobile/header/ExpandableHeader'
import OddsButton from '@sport/components/mobile/oddsButton'
import { ConvertedMarket, ConvertedMatches, ConvertedSeason } from '@sport/converters/types'
import dayjs from 'dayjs'
import React from 'react'
import styled from 'styled-components/macro'
import { convertOutcome } from '@sport/util/dataProcess'

interface ComponentProps {
    convertedData: ConvertedSeason[]
}

interface MarketTableProps {
    matches: ConvertedMatches[]
}

interface TableRowProps {
    fixtureId: string
    marketId: string
    market: ConvertedMarket
}
const SMarginTop = styled.div`
    margin-top: 10px;
`
const SMainContainer = styled.div`
    background: white;
    margin-bottom: 10px;
`

const SSeasonInfoContainer = styled.div`
    padding: 10px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
`

const SSeasonName = styled.div`
    font-size: 16px;
    font-weight: 800;
`

const SRightColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    font-size: 12px;
    line-height: 12px;
`

const SDate = styled.div`
    color: ${(props) => props.theme.sport.colors.primary};
`
const STime = styled.div`
    color: ${(props) => props.theme.sport.colors.text.span};
`

const SGreyCount = styled.div`
    background: ${(props) => props.theme.sport.colors.background};
    padding: 5px;
    border-radius: 5px;
    line-height: 12px;
    font-size: 12px;
    margin-right: 10px;
    min-width: 22px;
    text-align: center;
`

const STableContainer = styled.div``

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
`

const TableRow: React.FC<TableRowProps> = ({ fixtureId, marketId, market }) => {
    const oddsStyle = { width: '60px', fontWeight: '500', padding: '5px 0' }
    return (
        <>
            {convertOutcome(market).map((outcome, index) => (
                <STableRow key={`OurRightDetail-TableRow-${fixtureId}-${marketId}-${outcome.outcomeCode}`}>
                    <STitle>{outcome.name}</STitle>
                    <OddsButton
                        active={outcome?.active}
                        odds={outcome?.odds}
                        oddsInfo={outcome?.combinedID}
                        handicap={''}
                        style={oddsStyle}
                        rulesActiveKey={outcome?.rulesActiveKey}
                    />
                </STableRow>
            ))}
        </>
    )
}

const ExpandableMarketTable: React.FC<MarketTableProps> = ({ matches }) => {
    const rightSide = (count: number) => {
        return <SGreyCount>{count}</SGreyCount>
    }

    return (
        <>
            {matches.map((match, index) => (
                <React.Fragment key={`OutrightDetail-match-${match.key}-${index}`}>
                    {match.events.map((fixture, mIndex) => (
                        <React.Fragment
                            key={`OutrightDetail-match-${match.key}-${index}-${mIndex}-${fixture.fixtureId}`}>
                            {fixture.markets.map((market, fIndex) => (
                                <ExpandableHeader
                                    key={`OutrightDetail-match-${match.key}-${index}-${mIndex}-${fixture.fixtureId}-${fIndex}-${market.marketCode}`}
                                    title={market?.header}
                                    rightSide={rightSide(convertOutcome(market).length)}>
                                    <STableContainer>
                                        <TableRow
                                            fixtureId={fixture.fixtureId}
                                            marketId={market.market_id}
                                            market={market}
                                        />
                                    </STableContainer>
                                </ExpandableHeader>
                            ))}
                        </React.Fragment>
                    ))}
                </React.Fragment>
            ))}
        </>
    )
}

const MBetTableOutright: React.FC<ComponentProps> = ({ convertedData }) => {
    // console.log(convertedData);

    return (
        <SMarginTop>
            {convertedData.map((season, index) => (
                <SMainContainer key={`OutrightDetail-${index}`}>
                    <SSeasonInfoContainer>
                        <SSeasonName>{season.info.name}</SSeasonName>
                        <SRightColumn>
                            <SDate>{dayjs(season.info.firstStart).format('YYYY/MM/DD')}</SDate>
                            <STime>{dayjs(season.info.firstStart).format('HH:mm')}</STime>
                        </SRightColumn>
                    </SSeasonInfoContainer>
                    <ExpandableMarketTable matches={season.matchs} />
                </SMainContainer>
            ))}
        </SMarginTop>
    )
}

// eslint-disable-next-line import/no-unused-modules
export default MBetTableOutright
