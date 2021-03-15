import MarketCodeSwitcher from '@sport/components/mobile/betPanel/betMatchDetail/football/MarketCodeSwitcher'
import { ConvertedEvent, ConvertedMatches } from '@sport/converters/types'
import useCustomParams from '@sport/hooks/useCustomParams'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/macro'
import {
    newAhOuCtid,
    newAhOuMarketCode,
    newCornerCtid,
    newDetailCtid,
    newDetailMarketCode,
    newFifteenMinCtid,
    newFirstHalfCtid,
    newFirstHalfMarketCode,
    newOtherMarketCode,
    newOuMarketCode,
    newPopularCtid,
    newPopularMarketCode,
    newSetInitialCtid,
    newSetInitialMarketCode,
    newSetInitialTitle,
    newSpecialMarketCode,
} from '@sport/util/dataProcess'
import MDetailEmptyList from '../common/MDetailEmptyList'
import TableEps from '../TableEps'
import CtidSwitcher from './CtidSwitcher'

interface ComponentProps {
    convertedData: ConvertedMatches
    fixtureId?: string
}

interface BetMatchDetailSwitcherProps {
    marketCodeList: string[]
    ctidList: number[]
    data: ConvertedEvent[]
    fixtureId?: string
    matches: any
}
const SFilterContainer = styled.div`
    background: #ffffff;
    white-space: nowrap;
    overflow-x: scroll;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px 0px;

    ::-webkit-scrollbar {
        width: 0px;
        height: 0px;
    }
`

const SFilterTitle = styled.div<{ active: string }>`
    display: inline-block;
    height: 100%;
    font-size: 15px;
    padding: 10px 0 10px 0;
    margin: 0 10px;
    text-align: center;
    color: ${(props) => (props.active === 'true' ? `#bd4700` : `${props.theme.sport.colors.tertiary}`)};
    font-weight: ${(props) => (props.active === 'true' ? `800` : `0`)};
    border-bottom: ${(props) => (props.active === 'true' ? `solid 3px #bd4700` : `none`)};
`

const BetMatchDetailSwitcher: React.FC<BetMatchDetailSwitcherProps> = ({
    data,
    fixtureId,
    matches,
    marketCodeList,
    ctidList,
}) => {
    return (
        <>
            <>
                {newDetailMarketCode(data).includes('eps') && <TableEps data={data} marketCode={'eps'} />}
                {marketCodeList.length > 0 && (
                    <>
                        {marketCodeList.map((marketCode, index) => (
                            <MarketCodeSwitcher
                                key={`mobileDetail-football-marketCodeSwitcher-${marketCode}-${index}`}
                                marketCode={marketCode}
                                data={data}
                                fixtureId={fixtureId}
                                matches={matches}
                            />
                        ))}
                    </>
                )}
                {ctidList.length > 0 && (
                    <>
                        {ctidList.map((ctid, index) => (
                            <React.Fragment key={`${ctid}-${index}`}>
                                <CtidSwitcher data={data} ctid={ctid} fixtureId={fixtureId} />
                            </React.Fragment>
                        ))}
                    </>
                )}
            </>
        </>
    )
}
const FootballDetail: React.FC<ComponentProps> = ({ convertedData, fixtureId }) => {
    const { t } = useTranslation()
    const event = convertedData?.events
    const { sports, date } = useCustomParams()
    const [marketCodeList, setMarketCodeList] = useState(newSetInitialMarketCode(event, sports, date))
    const [ctidList, setCtidList] = useState(newSetInitialCtid(event, sports, date))
    const [filterTitle, setFilterTitle] = useState(newSetInitialTitle(event, sports, date))

    const ctidCountHandler = (filterType?: string) => {
        switch (filterType) {
            case 'popular':
                return newPopularCtid(event)
            case 'all':
                return newDetailCtid(event)
            case 'ahOu':
                return newAhOuCtid(event)
            case 'ou':
                return newAhOuCtid(event)
            case 'firstHalf':
                return newFirstHalfCtid(event)
            case 'corner':
                return newCornerCtid(event)
            case 'fifteenMinutes':
                return newFifteenMinCtid(event)
            case 'special':
                return []
            case 'other':
                return newCornerCtid(event)
        }
    }

    const marketCountHandler = (filterType?: string) => {
        switch (filterType) {
            case 'popular':
                return newPopularMarketCode(event)
            case 'all':
                return newDetailMarketCode(event)
            case 'ahOu':
                return newAhOuMarketCode(event)
            case 'ou':
                return newOuMarketCode(event)
            case 'firstHalf':
                return newFirstHalfMarketCode(event)
            case 'corner':
                return []
            case 'fifteenMinutes':
                return []
            case 'special':
                return newSpecialMarketCode(event)
            case 'other':
                return newOtherMarketCode(event)
        }
    }

    const ctidCounter = (filterType: string) => {
        let ctidCount = 0
        if (ctidCountHandler(filterType) !== undefined) {
            ctidCountHandler(filterType)?.forEach((ctidNumber: any) => {
                // if (currentCtid(ctidNumber)) {
                ctidCount++
                // }
            })
            return ctidCount
        } else {
            return 0
        }
    }

    const marketCounter = (filterType: string) => {
        let marketCount = 0
        if (marketCountHandler(filterType) !== undefined) {
            marketCountHandler(filterType)?.forEach((market) => {
                // if (currentTables(market)) {
                marketCount++
                // }
            })
            return marketCount
        } else {
            return 0
        }
    }

    const detailItems: any[] = [
        { title: 'popular', handler: () => popularHandler() },
        { title: 'all', handler: () => allDataHandler() },
        { title: 'ahOu', handler: () => ahOuHandler() },
        { title: 'ou', handler: () => ouHandler() },
        { title: 'firstHalf', handler: () => firstHalfHandler() },
        { title: 'corner', handler: () => cornerHandler() },
        { title: 'fifteenMinutes', handler: () => fifteenMinHandler() },
        { title: 'special', handler: () => specialsHandler() },
        { title: 'other', handler: () => otherHandler() },
    ]

    const allDataHandler = () => {
        setMarketCodeList(newDetailMarketCode(event))
        setCtidList(newDetailCtid(event))
        setFilterTitle('all')
    }

    const ahOuHandler = () => {
        setMarketCodeList(newAhOuMarketCode(event))
        setCtidList([233])
        setFilterTitle('ahOu')
    }

    const ouHandler = () => {
        setMarketCodeList(newOuMarketCode(event))
        setCtidList(newAhOuCtid(event))
        setFilterTitle('ou')
    }

    const firstHalfHandler = () => {
        setMarketCodeList(newFirstHalfMarketCode(event))
        setCtidList([244])
        setFilterTitle('firstHalf')
    }

    const popularHandler = () => {
        setMarketCodeList(newPopularMarketCode(event))
        setCtidList(newPopularCtid(event))
        setFilterTitle('popular')
    }

    const cornerHandler = () => {
        setMarketCodeList([])
        setCtidList([1])
        setFilterTitle('corner')
    }

    const fifteenMinHandler = () => {
        setMarketCodeList([])
        setCtidList(newFifteenMinCtid(event))
        setFilterTitle('fifteenMinutes')
    }

    const specialsHandler = () => {
        setMarketCodeList(newSpecialMarketCode(event))
        setCtidList([])
        setFilterTitle('special')
    }

    const otherHandler = () => {
        setMarketCodeList(newOtherMarketCode(event))
        setCtidList([255])
        setFilterTitle('other')
    }

    return (
        <>
            {date !== 'inplay' && (
                <SFilterContainer>
                    {detailItems.map((item, index) => (
                        <React.Fragment key={`detailTab-${index}`}>
                            {(ctidCounter(item?.title) > 0 || marketCounter(item?.title) > 0) && (
                                <SFilterTitle
                                    key={`MBetMatchDetail-banner-${index}`}
                                    active={(filterTitle === item?.title).toString()}
                                    onClick={item?.handler}>
                                    {t(`betDetail.${item?.title}`)}
                                </SFilterTitle>
                            )}
                        </React.Fragment>
                    ))}
                </SFilterContainer>
            )}
            {convertedData?.events?.[0]?.markets?.length > 0 ? (
                <BetMatchDetailSwitcher
                    marketCodeList={marketCodeList}
                    ctidList={ctidList}
                    data={event}
                    fixtureId={fixtureId}
                    matches={convertedData}
                />
            ) : (
                <MDetailEmptyList />
            )}
        </>
    )
}

export default FootballDetail
