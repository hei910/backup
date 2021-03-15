import OddsButton, { OddsEmptyButton } from '@sport/components/mobile/oddsButton'
import CustomSwiper from '@sport/components/mobile/swiper'
import { ConvertedEvent, ConvertedMarket, ConvertedMatches } from '@sport/converters/types'
import useCustomParams from '@sport/hooks/useCustomParams'
import React from 'react'
import { useSelector } from '@sport/stores'
import { MarketCodeType } from '@services/sportData/types'
import styled from 'styled-components/macro'
import TableRightSide from '../TableRightSide'
import TableHeader from './TableHeader'

interface TableRowProps {
    match: ConvertedMatches
}

const SMatchLayout = styled.div`
    display: flex;
    justify-content: space-between;
    background: #fff;
`

const SCompetitorLayout = styled.div`
    display: flex;
    padding-left: 10px;
    flex-direction: column;
    justify-content: space-around;
    font-size: 13px;
    padding-bottom: 20px;
`

const SCompetitorItem = styled.div`
    margin: 5px 0;
    display: flex;
`

const SOddsLayout = styled.div`
    padding: 2px;
    width: 100%;
    height: 100%;
`

const SHandicap = styled.div`
    color: #bd4700;
    font-weight: 700;
`

const SOddsColumn = styled.div<{ isHidden?: boolean }>`
    display: ${(props) => (props.isHidden ? 'none !important' : 'inherit')};
`

const SRedCardLayout = styled.div<{ isBold?: boolean }>`
    display: flex;
    align-items: center;
    margin-right: 10px;
    color: #bd4700;
    font-size: 14px;
    font-weight: ${(props) => (props.isBold ? 'bold' : 'normal')};
`

const TableRow: React.FC<TableRowProps> = ({ match }) => {
    const isTabletLayout = useSelector((state) => state.sportGlobal.isTabletLayout)
    const { date } = useCustomParams()
    const tableSize = isTabletLayout ? 360 : 180
    const events = match.events
    const matchInfo = match.info

    const getMarket = (event: ConvertedEvent, marketCode: MarketCodeType) => {
        const { markets } = event
        return markets.find((market) => {
            return market.marketCode === marketCode
        })
    }

    const getHandicap = (market: ConvertedMarket, outcomeCode: string) => {
        const { marketCode } = market

        if (marketCode.startsWith('ml')) {
            if (outcomeCode === 'h') {
                return <SHandicap>主</SHandicap>
            } else if (outcomeCode === 'a') {
                return <SHandicap>客</SHandicap>
            } else if (outcomeCode === 'd') {
                return <SHandicap>和</SHandicap>
            }
        } else if (marketCode.startsWith('ah')) {
            return <SHandicap>{market.outcomes?.[outcomeCode]?.specifier}</SHandicap>
        } else if (marketCode.startsWith('ou')) {
            return (
                <SHandicap>{`${outcomeCode === 'ov' ? '大' : '小'}${
                    market.outcomes?.[outcomeCode]?.specifier
                }`}</SHandicap>
            )
        }

        return ''
    }

    const getOddsButton = (event: ConvertedEvent, market?: ConvertedMarket, outcomeCode?: string) => {
        if (!market || !outcomeCode) {
            return (
                <SOddsLayout>
                    <OddsEmptyButton />
                </SOddsLayout>
            )
        }

        const handicap = getHandicap(market, outcomeCode)

        const extraProps: { handicapFontSize?: number; oddsFontSize?: number } = {}

        if (market.marketCode.startsWith('ml')) {
            extraProps.handicapFontSize = 9
            extraProps.oddsFontSize = 11
        }

        return (
            <SOddsLayout>
                <OddsButton
                    oddsInfo={market.outcomes?.[outcomeCode]?.combinedID}
                    odds={market.outcomes?.[outcomeCode]?.odds!}
                    active={market.outcomes?.[outcomeCode]?.active!}
                    handicap={handicap}
                    rulesActiveKey={market.outcomes?.[outcomeCode]?.rulesActiveKey}
                    {...extraProps}
                />
            </SOddsLayout>
        )
    }

    const getOddsData = (event: ConvertedEvent, isHalfView: boolean) => {
        //column 1 = ml || ml1st
        //column 2 = ah || ah1st
        //column 3 = ou || ou1st

        const hadMarket = getMarket(event, 'ml')
        const ahMarket = getMarket(event, 'ah')
        const ouMarket = getMarket(event, 'ou')
        const had1stMarket = getMarket(event, 'ml1st')
        const ah1stMarket = getMarket(event, 'ah1st')
        const ou1stMarket = getMarket(event, 'ou1st')

        return (
            <>
                <SOddsColumn>
                    {getOddsButton(event, isHalfView ? had1stMarket : hadMarket, 'h')}
                    {getOddsButton(event, isHalfView ? had1stMarket : hadMarket, 'a')}
                </SOddsColumn>
                <SOddsColumn>
                    {getOddsButton(event, isHalfView ? ah1stMarket : ahMarket, 'h')}
                    {getOddsButton(event, isHalfView ? ah1stMarket : ahMarket, 'a')}
                </SOddsColumn>
                <SOddsColumn>
                    {getOddsButton(event, isHalfView ? ou1stMarket : ouMarket, 'ov')}
                    {getOddsButton(event, isHalfView ? ou1stMarket : ouMarket, 'un')}
                </SOddsColumn>
                <SOddsColumn isHidden={!isTabletLayout}>
                    {getOddsButton(event, had1stMarket, 'h')}
                    {getOddsButton(event, had1stMarket, 'a')}
                </SOddsColumn>
                <SOddsColumn isHidden={!isTabletLayout}>
                    {getOddsButton(event, ah1stMarket, 'h')}
                    {getOddsButton(event, ah1stMarket, 'a')}
                </SOddsColumn>
                <SOddsColumn isHidden={!isTabletLayout}>
                    {getOddsButton(event, ou1stMarket, 'ov')}
                    {getOddsButton(event, ou1stMarket, 'un')}
                </SOddsColumn>
            </>
        )
    }

    const getOddsLayout = (event: ConvertedEvent, isHalfView: boolean) => {
        return (
            <div style={{ width: tableSize, paddingBottom: 20 }}>
                <TableRightSide style={{ margin: 1, minHeight: 120 }}>{getOddsData(event, isHalfView)}</TableRightSide>
            </div>
        )
    }

    const getScoreLayout = (event: ConvertedEvent, team: 'home' | 'away') => {
        if (date === 'inplay') {
            const { homeScore, awayScore } = event.score

            return (
                <SRedCardLayout isBold={team === 'home' ? homeScore > awayScore : awayScore > homeScore}>
                    {team === 'home' ? homeScore : awayScore}
                </SRedCardLayout>
            )
        } else {
            return null
        }
    }

    return (
        <>
            {events.map((event) => {
                return (
                    <div key={event.ctid + event.fixtureId}>
                        <TableHeader match={match} matchInfo={match.info} event={event} />
                        <SMatchLayout>
                            <SCompetitorLayout>
                                <SCompetitorItem>
                                    {getScoreLayout(event, 'home')}
                                    {matchInfo?.competitors?.home.name}
                                </SCompetitorItem>
                                <SCompetitorItem>
                                    {getScoreLayout(event, 'away')}
                                    {matchInfo?.competitors?.away.name}
                                </SCompetitorItem>
                            </SCompetitorLayout>
                            <div style={{ width: tableSize }}>
                                {isTabletLayout ? (
                                    getOddsLayout(event, false)
                                ) : (
                                    <CustomSwiper>
                                        {getOddsLayout(event, false)}
                                        {getOddsLayout(event, true)}
                                    </CustomSwiper>
                                )}
                            </div>
                        </SMatchLayout>
                    </div>
                )
            })}
        </>
    )
}

export default TableRow
