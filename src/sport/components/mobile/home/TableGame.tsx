import { MobileLiveIcon } from '@sport/components/icons'
import converter from '@sport/converters'
import { ConvertedEvent, ConvertedMarket, ConvertedSeason } from '@sport/converters/types'
import dayjs from 'dayjs'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { useSelector } from '@sport/stores'
import { MatchCount, MatchInfo, MobileMainMatchesData } from '@services/sportData/types'
import styled from 'styled-components/macro'
import { device } from '@sport/styles/common/device'
import { allCounts, mobileSportsCount } from '@sport/util/dataProcess'
import { sportTypeCodeMap } from '@sport/util/dictionary'
import { isEmptyObject } from '@sport/util/general'
import { sportSId } from '@sport/util/constant'
// import ExpandableHeader from '../header/ExpandableHeader'
import HigherRateButton from '../higherRateButton'
import InplayButton from '../sportsTotalButton'
import MainTitle from './MainTitle'
import LiveStatIcon from '../statIcon'
import { scrollToTop } from '@utils/v1Functions'

interface ComponentProps {
    data: MobileMainMatchesData
}

interface ButtonComponentProps {
    matchCount: MatchCount
    sport: string
}

interface BodyComponentProps {
    event: ConvertedEvent
    info: MatchInfo
    sport: string
}

interface FootballComponentProps {
    seasons: ConvertedSeason[]
    sport: string
    matchCount: MatchCount
    sportsCount: number
}

const SMainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 6px 0 0;
`
const STableHeader = styled.div`
    color: #bd4700;
    font-weight: bold;
    text-align: left;
    width: 100%;
    padding: 10px 0 0px 14px;
    font-size: 16px;
`

const SWhiteContainer = styled.div`
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    border-radius: 3px;

    /* padding-bottom: 6px; */
`

const SBodyContainer = styled.div`
    background: white;
    width: 100%;
    padding: 0px 10px 0px 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* border-bottom: 1px solid ${(props) => props.theme.sport.colors.background}; */
`

const SSportsContainer = styled.div`
    margin-bottom: 10px;
    width: 100%;
    background: white;
    padding-bottom: 8px;
    box-shadow: 0px 8px 0px 0px rgba(245, 245, 245, 1);
`
const STableContainer = styled.div<{ even: boolean }>`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: space-between;

    > a:last-child {
        border-bottom: none;
    }

    > a:nth-last-child(2) {
        border-bottom: ${(props) => (props.even ? `1px solid ${props.theme.sport.colors.background};` : `none`)};
    }

    @media ${device.tablet} {
        flex-wrap: wrap;
        flex-direction: row;
        margin: 0 10px;

        > a:nth-last-child(2) {
            border-bottom: none;
        }
    }
`
const SInplayButtonContainer = styled.div`
    width: 95%;
    @media ${device.tablet} {
        width: 50%;
    }
`
const STableBodyMainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 15px 4px 15px 4px;
    border-bottom: 1px solid ${(props) => props.theme.sport.colors.background};

    @media ${device.tablet} {
        width: 50%;
    }
`

const SEmptyTableBodyMainContainer = styled.div`
    width: 100%;
    padding: 0 0 0 0;
    @media ${device.tablet} {
        width: 50%;
    }
`

const STableBodyContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const SEmptyTableBodyContainer = styled(STableBodyContainer)`
    width: 100%;
`

const STimeDateMore = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-right: 6px;
    min-width: 40px;
`

const STimeDate = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 13px;
    color: #939393;
`

const STime = styled.div`
    color: black;
    margin-bottom: 5px;
`
const STableRightColumn = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 200px;

    @media ${device.tablet} {
        width: 200px;
        padding-right: 10px;
    }
`

const SChevron = styled.div`
    width: 10px;
    height: 10px;
    border-top: 1px solid black;
    border-right: 1px solid black;
    transform: rotate(45deg);
`

const SCompetitorScoreContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 3.8;

    @media ${device.tablet} {
        flex: 4;
    }
`

const SInplayIcon = styled(MobileLiveIcon)`
    width: 24px;
    height: auto;

    path {
        fill: ${(props) => props.theme.sport.colors.table.column.icon};
    }
`

const SCompetitor = styled.div`
    /* margin-right: 4px; */
    margin: 2px 4px 2px 0;
    flex: 3;
    font-size: 14px;
    color: ${(props) => props.theme.sport.colors.text.tertiary};

    @media ${device.tablet} {
        flex: 3;
    }
`

const SMainButtonsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    @media ${device.tablet} {
        flex-direction: row;
        flex-wrap: wrap;
    }
`

const SHigherRateButtonContainer = styled.div`
    margin: 2px 5px 0 0;
    /* width: 100%; */
`
const SIconMargin = styled.div`
    margin-right: 5px;
    /* min-width: 25px; */
    display: flex;
    flex-direction: column;
    align-items: center;
`

const renderFirstButton = (matchCount: MatchCount, sport: string) => {
    if (sport === 'football') {
        if (matchCount.todayCount > 0) {
            return (
                <SInplayButtonContainer>
                    <InplayButton
                        title={'今日赛事'}
                        sport={sport}
                        inplayNumber={matchCount.todayCount}
                        date={'today'}
                    />
                </SInplayButtonContainer>
            )
        }
        // else if (matchCount.todayCount === 0 && matchCount.tomorrowCount > 0) {
        //     return (
        //         <SInplayButtonContainer>
        //             <InplayButton
        //                 title={'明日赛事'}
        //                 sport={sport}
        //                 inplayNumber={matchCount.tomorrowCount}
        //                 date={'tomorrow'}
        //             />
        //         </SInplayButtonContainer>
        //     );
        // } else if (
        //     matchCount.todayCount === 0 && matchCount.tomorrowCount === 0
        // ) {
        //     return (
        //         <SInplayButtonContainer>
        //             <InplayButton title={'所有赛事'} sport={sport} inplayNumber={matchCount.allCount} date={'all'} />
        //         </SInplayButtonContainer>
        //     );
        // }
        else {
            return (
                <SInplayButtonContainer>
                    <InplayButton title={'所有赛事'} sport={sport} inplayNumber={matchCount?.allCount} date={'all'} />
                </SInplayButtonContainer>
            )
        }
    } else {
        return (
            <SInplayButtonContainer>
                <InplayButton title={'所有赛事'} sport={sport} inplayNumber={matchCount?.allCount} date={'all'} />
            </SInplayButtonContainer>
        )
    }
}
const Buttons: React.FC<ButtonComponentProps> = ({ matchCount, sport }) => {
    return (
        <>
            {renderFirstButton(matchCount, sport)}
            {matchCount?.leagues.length > 0 && (
                <>
                    {matchCount?.leagues.map((league, index) => (
                        <SInplayButtonContainer key={`${league?.name}-${league.count}-${index}`}>
                            <InplayButton
                                title={league?.name}
                                sport={sport}
                                inplayNumber={league?.count}
                                date={'all'}
                                competitionId={league?.competitionIds}
                            />
                        </SInplayButtonContainer>
                    ))}
                </>
            )}
        </>
    )
}

const TableBody: React.FC<BodyComponentProps> = ({ event, info, sport }) => {
    const source = useSelector((state) => state.sportGlobal.dataSource)
    const history = useHistory()

    const onMainContainerClick = () => {
        scrollToTop()
        document.getElementById('layout-container')?.scrollTo({ top: 0, behavior: 'smooth' })
        history.push(`/sport/all/${sport}/details/${event.fixtureId}/${source}`)
    }

    return (
        <STableBodyMainContainer onClick={onMainContainerClick} data-mid={info.matchId}>
            <STableBodyContainer>
                <SCompetitorScoreContainer>
                    <SCompetitor>{event?.competitors?.home?.name}</SCompetitor>
                    <SCompetitor>{event?.competitors?.away?.name}</SCompetitor>
                </SCompetitorScoreContainer>
                <STableRightColumn>
                    <SIconMargin>
                        {info.haveLiveMatch && <SInplayIcon />}
                        <LiveStatIcon sId={sportSId[sport]} mId={info.matchId} />
                    </SIconMargin>
                    {event.markets.filter((market: ConvertedMarket) => market.marketCode === 'eps').length > 0 && (
                        <SHigherRateButtonContainer>
                            <HigherRateButton />
                        </SHigherRateButtonContainer>
                    )}
                    <STimeDateMore>
                        <STimeDate>
                            <div>{dayjs(info.startTime).format('MM/DD')}</div>
                            <STime>{dayjs(info.startTime).format('HH:mm')}</STime>
                        </STimeDate>
                    </STimeDateMore>
                    <SChevron />
                </STableRightColumn>
            </STableBodyContainer>
        </STableBodyMainContainer>
    )
}

const Body: React.FC<FootballComponentProps> = ({ seasons, sport, sportsCount, matchCount }) => {
    const { t } = useTranslation()

    const even = sportsCount % 2 === 0

    return (
        <SSportsContainer>
            <STableHeader>{t(sportTypeCodeMap[sport])}</STableHeader>
            <SBodyContainer>
                <STableContainer even={even}>
                    {seasons.map((season, index) => (
                        <React.Fragment key={`TableSport-${sport}-${season.key}-${index}`}>
                            {season.matchs.map((match, mIndex) => (
                                <React.Fragment key={`TableSport-${sport}-${season.key}-${index}-${mIndex}`}>
                                    {match.events.map((event, eIndex) => (
                                        <TableBody
                                            event={event}
                                            info={match.info}
                                            sport={sport}
                                            key={`TableSport-${sport}-${season.key}-${index}-${mIndex}-${eIndex}`}
                                        />
                                    ))}
                                </React.Fragment>
                            ))}
                        </React.Fragment>
                    ))}
                    {!even && (
                        <SEmptyTableBodyMainContainer>
                            <SEmptyTableBodyContainer />
                        </SEmptyTableBodyMainContainer>
                    )}
                </STableContainer>
            </SBodyContainer>
            <SMainButtonsContainer>
                <Buttons matchCount={matchCount} sport={sport} />
            </SMainButtonsContainer>
        </SSportsContainer>
    )
}
const TableGame: React.FC<ComponentProps> = ({ data }) => {
    const { t } = useTranslation()
    const lastParams = useSelector((state) => state.sportData.lastUpdate?.params)
    const sport = data?.sport
    const football = data?.sport?.football
    const convertedFootball = converter('football', lastParams, football)?.not
    const basketball = data?.sport?.basketball
    const convertedBasketball = converter('basketball', lastParams, basketball)?.not
    const tennis = data?.sport?.tennis
    const convertedTennis = converter('tennis', lastParams, tennis)?.not
    const baseball = data?.sport?.baseball
    const convertedBaseball = converter('baseball', lastParams, baseball)?.not
    const matchCount = data.matchCount

    // from getMatchCount api
    const matchCountAll = allCounts(
        matchCount?.football?.allCount ?? 0,
        matchCount?.basketball?.allCount ?? 0,
        matchCount?.tennis?.allCount ?? 0,
        matchCount?.baseball?.allCount ?? 0,
    )

    // from getTopPage api
    const allSportsCount = allCounts(
        mobileSportsCount(convertedFootball),
        mobileSportsCount(convertedBasketball),
        mobileSportsCount(convertedTennis),
        mobileSportsCount(convertedBaseball),
    )

    return (
        <>
            {!isEmptyObject(sport) && (
                <SMainContainer>
                    <SWhiteContainer>
                        <MainTitle title={t('topPage.sports')} count={matchCountAll} date={'sports'} />

                        {allSportsCount > 0 && (
                            <>
                                {mobileSportsCount(convertedFootball) > 0 && (
                                    <Body
                                        seasons={convertedFootball}
                                        matchCount={matchCount.football}
                                        sportsCount={mobileSportsCount(convertedFootball)}
                                        sport={'football'}
                                    />
                                )}
                                {mobileSportsCount(convertedBasketball) > 0 && (
                                    <Body
                                        seasons={convertedBasketball}
                                        matchCount={matchCount.basketball}
                                        sportsCount={mobileSportsCount(convertedBasketball)}
                                        sport={'basketball'}
                                    />
                                )}
                                {mobileSportsCount(convertedTennis) > 0 && (
                                    <Body
                                        seasons={convertedTennis}
                                        matchCount={matchCount.tennis}
                                        sportsCount={mobileSportsCount(convertedTennis)}
                                        sport={'tennis'}
                                    />
                                )}
                                {mobileSportsCount(convertedBaseball) > 0 && (
                                    <Body
                                        seasons={convertedBaseball}
                                        matchCount={matchCount.baseball}
                                        sportsCount={mobileSportsCount(convertedBaseball)}
                                        sport={'baseball'}
                                    />
                                )}
                            </>
                        )}
                    </SWhiteContainer>
                </SMainContainer>
            )}
        </>
    )
}

export default TableGame
